export function CreateMarketForm() {
  return (
    <section className="card stack-lg">
      <div>
        <p className="eyebrow">Create market UI</p>
        <h1>Launch a new prediction market</h1>
        <p className="muted">
          This page is intentionally static for the hackathon repo, but every field maps to a plausible contract or resolver input.
        </p>
      </div>

      <div className="form-grid">
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

      <div className="two-column-grid">
        <div className="inset-panel stack-sm">
          <span className="label">EVM contract input</span>
          <p className="bottomless">
            On a live path, submit the question, timing, and market metadata to the market creation function. Store the resulting market ID for routing and reads.
          </p>
        </div>
        <div className="inset-panel stack-sm">
          <span className="label">GenLayer resolver input</span>
          <p className="bottomless">
            Pass the resolution prompt, evidence policy, and INVALID criteria so the resolver can return a structured answer later.
          </p>
        </div>
      </div>

      <div className="row-between gap-sm wrap top-border">
        <p className="muted bottomless">Mock preview only — no transaction is sent in this frontend build.</p>
        <button className="button">Create market</button>
      </div>
    </section>
  );
}
