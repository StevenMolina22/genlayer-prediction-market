import { Market } from "@/lib/types";

export function PositionPanel({ market }: { market: Market }) {
  const position = market.position;

  return (
    <section className="card stack-md">
      <div className="row-between gap-sm wrap">
        <div>
          <p className="eyebrow">YES / NO position</p>
          <h2>Take a side</h2>
        </div>
        <span className="tag">Mock trade ticket</span>
      </div>

      <p className="muted">
        In a live integration, these action buttons would call the prediction market contract and refresh the connected wallet position after confirmation.
      </p>

      <div className="two-column-grid compact-grid">
        <div className="option-card option-yes">
          <span className="label">YES pool</span>
          <strong>{market.yesPoolEth.toFixed(1)} ETH</strong>
          <p>Implied probability: {market.probabilityYes}%</p>
          <button className="button">Buy YES</button>
        </div>
        <div className="option-card option-no">
          <span className="label">NO pool</span>
          <strong>{market.noPoolEth.toFixed(1)} ETH</strong>
          <p>Implied probability: {market.probabilityNo}%</p>
          <button className="button ghost-button">Buy NO</button>
        </div>
      </div>

      {position ? (
        <div className="inset-panel">
          <p className="eyebrow">Connected wallet snapshot</p>
          <div className="three-up-grid">
            <div>
              <span className="label">Side</span>
              <strong>{position.side}</strong>
            </div>
            <div>
              <span className="label">Size</span>
              <strong>{position.amountEth} ETH</strong>
            </div>
            <div>
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
