import { Market } from "@/lib/types";

export function PositionPanel({ market }: { market: Market }) {
  const position = market.position;

  return (
    <section className="card stack-md panel-premium">
      <div className="row-between gap-sm wrap">
        <div>
          <p className="kicker">Positioning surface</p>
          <h2>Take a side with clear pool context.</h2>
        </div>
        <span className="signal-pill">Mock trade ticket</span>
      </div>

      <p className="muted">
        In a live integration, these actions would submit a contract transaction, wait for confirmation, and refresh the connected wallet snapshot from the market contract.
      </p>

      <div className="two-column-grid compact-grid trade-grid">
        <div className="option-card option-yes stack-sm">
          <span className="label">YES pool</span>
          <strong>{market.yesPoolEth.toFixed(1)} ETH</strong>
          <p className="muted bottomless">Implied probability: {market.probabilityYes}%</p>
          <button className="button button-primary">Buy YES</button>
        </div>
        <div className="option-card option-no stack-sm">
          <span className="label">NO pool</span>
          <strong>{market.noPoolEth.toFixed(1)} ETH</strong>
          <p className="muted bottomless">Implied probability: {market.probabilityNo}%</p>
          <button className="button button-secondary">Buy NO</button>
        </div>
      </div>

      {position ? (
        <div className="inset-panel stack-md surface-soft">
          <div className="row-between gap-sm wrap">
            <div>
              <p className="kicker">Wallet snapshot</p>
              <h3>Current exposure</h3>
            </div>
            <span className="mono-copy">connected</span>
          </div>

          <div className="editorial-grid editorial-grid-tight">
            <div className="metric-block compact-metric">
              <span className="label">Side</span>
              <strong>{position.side}</strong>
            </div>
            <div className="metric-block compact-metric">
              <span className="label">Size</span>
              <strong>{position.amountEth} ETH</strong>
            </div>
            <div className="metric-block compact-metric">
              <span className="label">Avg. entry</span>
              <strong>{position.averagePrice}</strong>
            </div>
          </div>

          <p className="muted bottomless">
            {position.estimatedPayoutEth
              ? `Estimated payout if correct: ${position.estimatedPayoutEth} ETH.`
              : "Payout appears here once a live contract read is available."}
          </p>
        </div>
      ) : null}
    </section>
  );
}
