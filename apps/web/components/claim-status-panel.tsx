import { Market } from "@/lib/types";

export function ClaimStatusPanel({ market }: { market: Market }) {
  const { claimStatus, resolutionOutcome } = market;

  const headline =
    resolutionOutcome === "INVALID"
      ? "Refund path"
      : resolutionOutcome === "PENDING"
        ? "Claim remains locked until final resolution"
        : "Settlement is ready";

  return (
    <section className="card stack-md panel-premium settlement-shell">
      <div className="row-between gap-sm wrap">
        <div>
          <p className="kicker">Settlement</p>
          <h2>{headline}</h2>
        </div>
        <span className="signal-pill">Wallet state</span>
      </div>

      <div className="editorial-grid editorial-grid-wide">
        <div className="metric-block compact-metric">
          <span className="label">Wallet</span>
          <strong>{claimStatus.walletConnected ? "Connected" : "Not connected"}</strong>
        </div>
        <div className="metric-block compact-metric">
          <span className="label">Outcome</span>
          <strong>{resolutionOutcome}</strong>
        </div>
        <div className="metric-block compact-metric">
          <span className="label">Claimable</span>
          <strong>{claimStatus.claimableEth} ETH</strong>
        </div>
      </div>

      <div className="inset-panel surface-soft">
        <p className="bottomless">{claimStatus.note}</p>
      </div>

      <div className="row-between gap-sm wrap settlement-actions">
        <button className="button button-primary" disabled={claimStatus.claimableEth === 0 || claimStatus.hasClaimed}>
          {claimStatus.hasClaimed ? "Already claimed" : claimStatus.claimableEth > 0 ? "Claim payout / refund" : "Await final resolution"}
        </button>
        <p className="muted bottomless settlement-note">
          Replace this mock action with the final contract write, then refetch wallet balances and claim state.
        </p>
      </div>
    </section>
  );
}
