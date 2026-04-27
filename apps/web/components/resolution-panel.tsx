import { Market } from "@/lib/types";

export function ResolutionPanel({ market }: { market: Market }) {
  return (
    <section className="card stack-md panel-premium">
      <div className="row-between gap-sm wrap">
        <div>
          <p className="kicker">Resolution layer</p>
          <h2>Show the evidence path before settlement.</h2>
        </div>
        <span className="signal-pill">GenLayer aware</span>
      </div>

      <div className="inset-panel surface-soft">
        <span className="label">Resolver prompt</span>
        <p className="bottomless">{market.oraclePrompt}</p>
      </div>

      <div className="stack-sm">
        {market.resolutionSteps.map((step, index) => (
          <div key={step.label} className={`timeline-step timeline-${step.state}`}>
            <div className="timeline-row">
              <span className="rail-index">0{index + 1}</span>
              <div>
                <strong>{step.label}</strong>
                <p className="muted bottomless">{step.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="inset-panel surface-soft">
        <span className="label">Evidence checklist</span>
        <ul className="bullet-list">
          {market.evidenceSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <p className="muted bottomless">
        Integration point: once the GenLayer resolver produces a structured YES / NO / INVALID outcome, the operator or relay submits it to the EVM market contract and unlocks claims.
      </p>
    </section>
  );
}
