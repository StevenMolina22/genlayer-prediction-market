from __future__ import annotations

import argparse
import json
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from typing import Any, Dict, Iterable, List, Literal, Optional, Tuple
from urllib.parse import urlparse

Outcome = Literal["YES", "NO", "INVALID"]
Stance = Literal["YES", "NO", "UNCERTAIN"]


@dataclass
class EvidenceSource:
    url: str
    title: str
    excerpt: str
    published_at: Optional[str] = None
    source_type: str = "news"
    reliability_hint: float = 0.7
    stance: Stance = "UNCERTAIN"
    notes: str = ""

    def normalized_domain(self) -> str:
        parsed = urlparse(self.url)
        return (parsed.netloc or "unknown").replace("www.", "")


@dataclass
class ResolutionRequest:
    question: str
    deadline: str
    sources: List[EvidenceSource] = field(default_factory=list)
    evidence_notes: List[str] = field(default_factory=list)
    market_id: Optional[str] = None
    requested_at: Optional[str] = None


@dataclass
class ScoredEvidence:
    title: str
    url: str
    domain: str
    stance: Stance
    score: float
    directness: float
    reliability: float
    temporal_relevance: float
    summary: str


@dataclass
class ResolutionResult:
    question: str
    market_id: Optional[str]
    deadline: str
    outcome: Outcome
    confidence: float
    reasoning: str
    evidence_summary: str
    resolved_at: str
    yes_score: float
    no_score: float
    ignored_sources: int
    scored_evidence: List[Dict[str, Any]]


DIRECT_YES_HINTS = {
    "won",
    "passed",
    "approved",
    "launched",
    "closed above",
    "occurred",
    "completed",
    "signed",
    "reached",
    "was elected",
    "announced",
}

DIRECT_NO_HINTS = {
    "lost",
    "failed",
    "rejected",
    "canceled",
    "cancelled",
    "did not",
    "missed",
    "below",
    "postponed",
    "was not",
}

SOURCE_TYPE_WEIGHT = {
    "official": 1.0,
    "regulator": 0.95,
    "exchange": 0.95,
    "news": 0.8,
    "research": 0.75,
    "social": 0.45,
    "other": 0.6,
}


class PredictionMarketResolver:
    """
    A locally verifiable stand-in for a GenLayer intelligent contract.

    In production this logic would sit inside a GenLayer contract method that:
    1. Uses non-deterministic web access to fetch and normalize external evidence.
    2. Applies equivalence-principle-safe scoring and explanation logic.
    3. Returns a structured payload that an EVM resolver can consume.

    This file keeps the evaluation logic deterministic so it can be reviewed and
    executed locally without a full GenVM runtime.
    """

    def resolve(self, request: ResolutionRequest) -> ResolutionResult:
        deadline = self._parse_datetime(request.deadline)
        scored: List[ScoredEvidence] = []
        ignored_sources = 0

        for source in request.sources:
            scored_evidence = self._score_source(source, deadline)
            if scored_evidence is None:
                ignored_sources += 1
                continue
            scored.append(scored_evidence)

        yes_score = round(sum(item.score for item in scored if item.stance == "YES"), 4)
        no_score = round(sum(item.score for item in scored if item.stance == "NO"), 4)

        unique_yes_domains = len({item.domain for item in scored if item.stance == "YES"})
        unique_no_domains = len({item.domain for item in scored if item.stance == "NO"})

        outcome, confidence = self._decide_outcome(yes_score, no_score, unique_yes_domains, unique_no_domains)
        reasoning = self._build_reasoning(request, scored, outcome, confidence, yes_score, no_score)
        evidence_summary = self._build_evidence_summary(scored)

        return ResolutionResult(
            question=request.question,
            market_id=request.market_id,
            deadline=request.deadline,
            outcome=outcome,
            confidence=confidence,
            reasoning=reasoning,
            evidence_summary=evidence_summary,
            resolved_at=self._now_iso(),
            yes_score=yes_score,
            no_score=no_score,
            ignored_sources=ignored_sources,
            scored_evidence=[asdict(item) for item in scored],
        )

    def _score_source(self, source: EvidenceSource, deadline: datetime) -> Optional[ScoredEvidence]:
        domain = source.normalized_domain()
        reliability = max(0.0, min(1.0, source.reliability_hint))
        source_weight = SOURCE_TYPE_WEIGHT.get(source.source_type, SOURCE_TYPE_WEIGHT["other"])
        text = f"{source.title} {source.excerpt} {source.notes}".lower()

        stance = source.stance
        if stance == "UNCERTAIN":
            stance = self._infer_stance(text)
        if stance == "UNCERTAIN":
            return None

        directness = self._directness_score(text, stance)
        temporal_relevance = self._temporal_relevance(source.published_at, deadline)
        score = round(reliability * source_weight * directness * temporal_relevance, 4)

        if score < 0.12:
            return None

        summary = (
            f"{source.title} ({domain}) supports {stance} with reliability={reliability:.2f}, "
            f"directness={directness:.2f}, temporal_relevance={temporal_relevance:.2f}."
        )

        return ScoredEvidence(
            title=source.title,
            url=source.url,
            domain=domain,
            stance=stance,
            score=score,
            directness=round(directness, 4),
            reliability=round(reliability, 4),
            temporal_relevance=round(temporal_relevance, 4),
            summary=summary,
        )

    def _infer_stance(self, text: str) -> Stance:
        yes_hits = sum(1 for hint in DIRECT_YES_HINTS if hint in text)
        no_hits = sum(1 for hint in DIRECT_NO_HINTS if hint in text)
        if yes_hits > no_hits and yes_hits > 0:
            return "YES"
        if no_hits > yes_hits and no_hits > 0:
            return "NO"
        return "UNCERTAIN"

    def _directness_score(self, text: str, stance: Stance) -> float:
        if stance == "YES":
            direct_hits = sum(1 for hint in DIRECT_YES_HINTS if hint in text)
        else:
            direct_hits = sum(1 for hint in DIRECT_NO_HINTS if hint in text)

        if any(token in text for token in ["according to", "expects", "rumor", "if approved", "could", "may"]):
            speculative_penalty = 0.15
        else:
            speculative_penalty = 0.0

        base = 0.55 + min(direct_hits, 3) * 0.15 - speculative_penalty
        return max(0.35, min(1.0, base))

    def _temporal_relevance(self, published_at: Optional[str], deadline: datetime) -> float:
        if not published_at:
            return 0.75

        published = self._parse_datetime(published_at)
        hours_from_deadline = abs((published - deadline).total_seconds()) / 3600

        if published <= deadline:
            if hours_from_deadline <= 48:
                return 0.85
            if hours_from_deadline <= 24 * 30:
                return 0.7
            return 0.55

        if hours_from_deadline <= 48:
            return 1.0
        if hours_from_deadline <= 24 * 14:
            return 0.9
        if hours_from_deadline <= 24 * 90:
            return 0.75
        return 0.6

    def _decide_outcome(
        self,
        yes_score: float,
        no_score: float,
        unique_yes_domains: int,
        unique_no_domains: int,
    ) -> Tuple[Outcome, float]:
        total = yes_score + no_score
        if total < 0.85:
            return "INVALID", 0.28

        margin = abs(yes_score - no_score)
        leader = "YES" if yes_score > no_score else "NO"
        corroboration = unique_yes_domains if leader == "YES" else unique_no_domains

        if margin < 0.2:
            return "INVALID", 0.4
        if corroboration < 2 and margin < 0.55:
            return "INVALID", 0.46

        confidence = 0.5 + min(0.45, margin / max(total, 0.01))
        confidence += min(0.05, 0.02 * max(corroboration - 1, 0))
        confidence = round(min(confidence, 0.99), 4)

        return leader, confidence

    def _build_reasoning(
        self,
        request: ResolutionRequest,
        scored: List[ScoredEvidence],
        outcome: Outcome,
        confidence: float,
        yes_score: float,
        no_score: float,
    ) -> str:
        if not scored:
            return (
                "No evidence source produced a direct, sufficiently reliable signal about whether the event "
                f"described in '{request.question}' occurred by the deadline."
            )

        top_items = sorted(scored, key=lambda item: item.score, reverse=True)[:3]
        citations = "; ".join(f"{item.domain}:{item.stance}:{item.score:.2f}" for item in top_items)

        if outcome == "INVALID":
            return (
                f"Evidence was mixed or too weak to safely settle the market. yes_score={yes_score:.2f}, "
                f"no_score={no_score:.2f}, confidence={confidence:.2f}. Strongest signals: {citations}."
            )

        return (
            f"Outcome {outcome} selected because weighted corroboration favored it over the alternative. "
            f"yes_score={yes_score:.2f}, no_score={no_score:.2f}, confidence={confidence:.2f}. "
            f"Top evidence: {citations}."
        )

    def _build_evidence_summary(self, scored: Iterable[ScoredEvidence]) -> str:
        lines = []
        for item in sorted(scored, key=lambda s: s.score, reverse=True):
            lines.append(f"- {item.summary}")
        return "\n".join(lines) if lines else "No decisive evidence was retained."

    def _parse_datetime(self, value: str) -> datetime:
        normalized = value.replace("Z", "+00:00")
        parsed = datetime.fromisoformat(normalized)
        if parsed.tzinfo is None:
            return parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc)

    def _now_iso(self) -> str:
        return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def load_request(path: str) -> ResolutionRequest:
    with open(path, "r", encoding="utf-8") as handle:
        raw = json.load(handle)

    sources = [EvidenceSource(**source) for source in raw.get("sources", [])]
    return ResolutionRequest(
        question=raw["question"],
        deadline=raw["deadline"],
        sources=sources,
        evidence_notes=raw.get("evidence_notes", []),
        market_id=raw.get("market_id"),
        requested_at=raw.get("requested_at"),
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Resolve a prediction market request using local GenLayer-style logic.")
    parser.add_argument("request", help="Path to the input JSON request")
    args = parser.parse_args()

    request = load_request(args.request)
    resolver = PredictionMarketResolver()
    result = resolver.resolve(request)
    print(json.dumps(asdict(result), indent=2))


if __name__ == "__main__":
    main()
