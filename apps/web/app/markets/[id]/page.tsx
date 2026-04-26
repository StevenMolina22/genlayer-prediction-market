import Link from "next/link";
import { notFound } from "next/navigation";
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
    <div className="stack-lg">
      <section className="card stack-md">
        <div className="row-between gap-sm wrap">
          <div>
            <p className="eyebrow">Market detail</p>
            <h1>{market.question}</h1>
          </div>
          <span className={`status-pill ${statusTone[market.status]}`}>{market.status}</span>
        </div>

        <p className="muted">{market.description}</p>

        <div className="three-up-grid">
          <div>
            <span className="label">Trading close</span>
            <strong>{market.endDate}</strong>
          </div>
          <div>
            <span className="label">Resolution target</span>
            <strong>{market.resolutionDate}</strong>
          </div>
          <div>
            <span className="label">Pool size</span>
            <strong>{market.totalLiquidityEth.toFixed(1)} ETH</strong>
          </div>
        </div>

        <div className="row-between gap-sm wrap top-border">
          <p className="muted bottomless">Featured integration story: create → trade → resolve → claim.</p>
          <Link href="/" className="button ghost-button">
            Back to markets
          </Link>
        </div>
      </section>

      <div className="detail-grid">
        <PositionPanel market={market} />
        <ResolutionPanel market={market} />
      </div>

      <ClaimStatusPanel market={market} />
    </div>
  );
}
