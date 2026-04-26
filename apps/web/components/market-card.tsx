import Link from "next/link";
import { Market } from "@/lib/types";

const statusTone: Record<Market["status"], string> = {
  funding: "status-neutral",
  trading: "status-open",
  resolving: "status-pending",
  resolved: "status-closed",
  invalid: "status-invalid"
};

export function MarketCard({ market }: { market: Market }) {
  return (
    <article className="card market-card">
      <div className="stack-sm">
        <div className="row-between gap-sm wrap">
          <span className="tag">{market.category}</span>
          <span className={`status-pill ${statusTone[market.status]}`}>{market.status}</span>
        </div>
        <h3>{market.question}</h3>
        <p className="muted">{market.description}</p>
      </div>

      <div className="split-metrics">
        <div>
          <span className="label">YES</span>
          <strong>{market.probabilityYes}%</strong>
        </div>
        <div>
          <span className="label">NO</span>
          <strong>{market.probabilityNo}%</strong>
        </div>
        <div>
          <span className="label">Liquidity</span>
          <strong>{market.totalLiquidityEth.toFixed(1)} ETH</strong>
        </div>
      </div>

      <div className="progress-shell" aria-hidden="true">
        <div className="progress-yes" style={{ width: `${market.probabilityYes}%` }} />
      </div>

      <div className="row-between gap-sm wrap top-border">
        <div>
          <span className="label">Closes</span>
          <p>{market.endDate}</p>
        </div>
        <Link href={`/markets/${market.id}`} className="button secondary-button">
          Open detail
        </Link>
      </div>
    </article>
  );
}
