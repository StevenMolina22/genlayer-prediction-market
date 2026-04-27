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
    <article className="card market-card stack-md">
      <div className="row-between gap-sm wrap market-card-topline">
        <span className="signal-pill">{market.category}</span>
        <span className={`status-pill ${statusTone[market.status]}`}>{market.status}</span>
      </div>

      <div className="stack-sm market-card-copy">
        <h3>{market.question}</h3>
        <p className="muted">{market.description}</p>
      </div>

      <div className="market-pool-metrics">
        <div>
          <span className="label">YES side</span>
          <strong>{market.probabilityYes}%</strong>
          <p className="muted bottomless">{market.yesPoolEth.toFixed(1)} ETH pooled</p>
        </div>
        <div>
          <span className="label">NO side</span>
          <strong>{market.probabilityNo}%</strong>
          <p className="muted bottomless">{market.noPoolEth.toFixed(1)} ETH pooled</p>
        </div>
      </div>

      <div className="progress-shell" aria-hidden="true">
        <div className="progress-yes" style={{ width: `${market.probabilityYes}%` }} />
      </div>

      <div className="market-card-footer">
        <div>
          <span className="label">Closes</span>
          <p className="bottomless mono-copy">{market.endDate}</p>
        </div>
        <div>
          <span className="label">Total liquidity</span>
          <p className="bottomless mono-copy">{market.totalLiquidityEth.toFixed(1)} ETH</p>
        </div>
      </div>

      <Link href={`/markets/${market.id}`} className="button button-secondary button-full">
        Open market detail
      </Link>
    </article>
  );
}
