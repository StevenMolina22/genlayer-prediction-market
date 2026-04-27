import { notFound } from "next/navigation";
import Link from "next/link";
import { ClaimStatusPanel } from "@/components/claim-status-panel";
import { PositionPanel } from "@/components/position-panel";
import { ResolutionPanel } from "@/components/resolution-panel";
import { getMarketById, markets } from "@/lib/mock-data";
import { Market } from "@/lib/types";

const statusTone: Record<Market["status"], string> = {
  funding: "status-neutral",
  trading: "status-open",
  resolving: "status-pending",
  resolved: "status-closed",
  invalid: "status-invalid"
};

export function generateStaticParams() {
  return markets.map((market) => ({ id: market.id }));
}

export default function MarketDetailPage({ params }: { params: { id: string } }) {
  const market = getMarketById(params.id);

  if (!market) {
    notFound();
  }

  return (
    <div className="stack-xl">
      <section className="card card-hero stack-lg">
        <div className="row-between gap-sm wrap">
          <div>
            <p className="kicker">Market detail</p>
            <h1>{market.question}</h1>
          </div>
          <span className={`status-pill ${statusTone[market.status]}`}>{market.status}</span>
        </div>

        <p className="lead-copy muted">{market.description}</p>

        <div className="editorial-grid editorial-grid-wide">
          <div className="metric-block">
            <span className="label">Trading close</span>
            <strong>{market.endDate}</strong>
          </div>
          <div className="metric-block">
            <span className="label">Resolution target</span>
            <strong>{market.resolutionDate}</strong>
          </div>
          <div className="metric-block">
            <span className="label">YES / NO split</span>
            <strong>
              {market.probabilityYes}% / {market.probabilityNo}%
            </strong>
          </div>
          <div className="metric-block">
            <span className="label">Total liquidity</span>
            <strong>{market.totalLiquidityEth.toFixed(1)} ETH</strong>
          </div>
        </div>

        <div className="row-between gap-sm wrap top-border">
          <p className="muted bottomless">This is the cleanest judge path: product story, contract inputs, resolution logic, then settlement.</p>
          <Link href="/" className="button button-secondary">
            Back to market index
          </Link>
        </div>
      </section>

      <div className="detail-grid detail-grid-premium">
        <PositionPanel market={market} />
        <ResolutionPanel market={market} />
      </div>

      <ClaimStatusPanel market={market} />
    </div>
  );
}
