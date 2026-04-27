export function CreateMarketForm() {
  return (
    <section className="card stack-lg create-form-shell">
      <div className="row-between gap-sm wrap">
        <div>
          <p className="kicker">Create market UI</p>
          <h2>Launch a market with clean resolution rails.</h2>
        </div>
        <span className="signal-pill">Static preview</span>
      </div>

      <p className="muted create-form-intro">
        This form is intentionally read-only for the hackathon demo, but the structure is real: question, timing, liquidity, and evidence policy are enough to explain the entire product contract boundary.
      </p>

      <div className="form-grid premium-form-grid">
        <label className="field">
          <span>Market question</span>
          <input defaultValue="Will GenLayer process 1M agent actions by end of 2026?" readOnly />
        </label>
        <label className="field">
          <span>Category</span>
          <input defaultValue="Adoption" readOnly />
        </label>
        <label className="field field-full">
          <span>Resolution source notes</span>
          <textarea
            defaultValue="Use official GenLayer dashboards, docs, and launch communications. If public evidence is inconsistent, allow INVALID resolution."
            rows={5}
            readOnly
          />
        </label>
        <label className="field">
          <span>Trading close</span>
          <input defaultValue="2026-12-20 18:00 UTC" readOnly />
        </label>
        <label className="field">
          <span>Initial liquidity</span>
          <input defaultValue="10 ETH" readOnly />
        </label>
      </div>

      <div className="two-column-grid compact-grid">
        <div className="inset-panel stack-sm surface-soft">
          <span className="label">EVM contract input</span>
          <strong>Question, deadline, resolver, liquidity rails.</strong>
          <p className="muted bottomless">
            A live path submits market parameters to the Foundry contract, returns a market ID, and opens the YES / NO pool.
          </p>
        </div>
        <div className="inset-panel stack-sm surface-soft">
          <span className="label">GenLayer resolver input</span>
          <strong>Evidence policy, ambiguity rules, INVALID fallback.</strong>
          <p className="muted bottomless">
            The intelligent contract receives source guidance so a later resolution can return structured settlement data instead of a black-box answer.
          </p>
        </div>
      </div>

      <div className="row-between gap-sm wrap top-border">
        <p className="muted bottomless">Mock preview only. No transaction leaves the browser in this frontend build.</p>
        <button className="button button-primary">Create market</button>
      </div>
    </section>
  );
}
