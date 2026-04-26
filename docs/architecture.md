# Architecture

## Overview

This repository is structured as a three-part hackathon monorepo:

1. `apps/web`
   - Next.js UI for creating markets, taking YES/NO positions, reviewing evidence, and displaying resolution status.
2. `contracts`
   - Foundry-based EVM prediction market contracts that custody funds, enforce deadlines, and pay claims.
3. `genlayer`
   - GenLayer intelligent resolution layer that evaluates whether a real-world event occurred and emits structured settlement data.

The separation is intentional:
- the UI handles user interaction,
- the EVM layer handles capital and immutable settlement rules,
- the GenLayer layer handles uncertain real-world resolution.

## Prediction market lifecycle

### 1. Market creation
A creator submits:
- question
- market deadline
- optional metadata / category
- resolver configuration

The EVM contract stores the market and opens staking.

### 2. Position taking
Users buy or stake into YES or NO before the deadline.

The EVM contract is the source of truth for:
- stake amounts
- deadline enforcement
- claim accounting
- final payout math

### 3. Resolution request
After the market closes, a caller or automation layer submits a request to the GenLayer resolver containing:
- market id
- question
- deadline
- evidence bundle or source hints

In production, the evidence bundle can be partially caller-supplied, but the preferred path is for the GenLayer contract to fetch and normalize live sources itself.

### 4. GenLayer evidence evaluation
`genlayer/prediction_resolver.py` models this layer.

The resolver:
- ingests the question and deadline
- scores each source by reliability, directness, source type, and timing
- counts corroboration across independent domains
- chooses `YES`, `NO`, or `INVALID`
- emits a structured JSON result

### 5. EVM settlement handoff
The GenLayer result should be passed to the EVM contract in a narrow, auditable shape.

Recommended handoff payload:
- `marketId: uint256`
- `outcome: uint8` where `0 = Unresolved`, `1 = Yes`, `2 = No`, `3 = Invalid`
- `confidenceBps: uint16`
- `resolvedAt: uint64`
- `evidenceHash: bytes32`
- `detailsURI: string`

Recommended production flow:
1. GenLayer resolves the market.
2. The full JSON result is stored off-chain, for example on IPFS, Arweave, or app storage.
3. The JSON bytes are hashed to `evidenceHash`.
4. A bridge / relayer / settlement service calls the EVM resolver contract with the compact settlement payload.
5. The EVM contract records the outcome and unlocks claims.

This keeps gas usage low while preserving explainability:
- the chain stores the final verdict plus a hash,
- off-chain clients can fetch the full reasoning and evidence summary,
- judges and users can inspect exactly what the resolver concluded.

## GenLayer contract shape in production

The local resolver is intentionally deterministic for review and testing. In production, the same logic would be wrapped in a GenLayer contract method that:
- uses GenLayer web access to retrieve official and independent sources,
- normalizes fetched evidence into a stable structure,
- applies equivalence-principle-safe scoring,
- returns the same structured payload used in the example artifacts.

Conceptual contract entrypoint:

- input:
  - question
  - deadline
  - market id
  - optional evidence hints
- output:
  - outcome
  - confidence
  - reasoning
  - evidence summary
  - resolved_at
  - scored evidence details

## Local verification boundary

Locally verified in this repo:
- Python resolver syntax compiles
- example request executes successfully
- structured JSON output is produced

Documented but not locally executed here:
- live GenLayer Studio run
- `genvm-lint`
- `genlayer-test`
- actual on-chain relay from GenLayer to the EVM resolver

## Security assumptions

- The EVM settlement contract only accepts resolution from an authorized relay or resolver role.
- The relay submits a hash of the full GenLayer output, not hand-written outcome-only data.
- Off-chain evidence hosting remains available so users can audit the result.
- Market questions are written clearly enough to be machine-resolved.

## Failure modes

- Ambiguous questions can produce `INVALID` even when humans might infer intent.
- Thin or low-quality evidence can cause low confidence or no settlement.
- If the bridge from GenLayer to EVM fails, markets remain unresolved until retried.
- Divergent source quality can bias the result if governance does not define acceptable evidence classes.
