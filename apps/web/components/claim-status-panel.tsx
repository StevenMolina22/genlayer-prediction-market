import { Market } from "@/lib/types";

export function ClaimStatusPanel({ market }: { market: Market }) {
  const { claimStatus, resolutionOutcome } = market;

  const headline =
    resolutionOutcome === "INVALID"
      ? "Refund path"
      : resolutionOutcome === "PENDING"
        ? "Claim not yet open"
        : "Settlement ready";

  return (
    <section className="card stack-md">
      <div className="row-between gap-sm wrap">
        <div>
          <p className="eyebrow">Claim & settlement</p>
          <h2>{headline}</h2>
        </div>
        <span className="tag">Wallet state</span>
      </div>

      <div className="three-up-grid">
        <div>
          <span className="label">Wallet</span>
          <strong>{claimStatus.walletConnected ? "Connected" : "Not connected"}</strong>
        </div>
        <div>
          <span className="label">Outcome</span>
          <strong>{resolutionOutcome}</strong>
        </div>
        <div>
          <span className="label">Claimable</span>
          <strong>{claimStatus.claimableEth} ETH</strong>
        </div>
      </div>

      <div className="inset-panel">
        <p className="bottomless">{claimStatus.note}</p>
      </div>

      <button className="button" disabled={claimStatus.claimableEth === 0 || claimStatus.hasClaimed}>
        {claimStatus.hasClaimed ? "Already claimed" : claimStatus.claimableEth > 0 ? "Claim payout / refund" : "Await final resolution"}
      </button>

      <p className="muted bottomless">
        Integration point: replace this mock button with a contract write for the final claim function, then refetch balances and claim status from the connected wallet.
      </p>
    </section>
  );
}
