import { Market } from "@/lib/types";

export function ResolutionPanel({ market }: { market: Market }) {
  return (
    <section className="card stack-md">
      <div className="row-between gap-sm wrap">
        <div>
          <p className="eyebrow">Resolution panel</p>
          <h2>How this market settles</h2>
        </div>
        <span className="tag">GenLayer-aware</span>
      </div>

      <div className="inset-panel">
        <span className="label">Resolver prompt</span>
        <p className="bottomless">{market.oraclePrompt}</p>
      </div>

      <div className="stack-sm">
        {market.resolutionSteps.map((step) => (
          <div key={step.label} className={`timeline-step timeline-${step.state}`}>
            <div>
              <strong>{step.label}</strong>
              <p className="muted bottomless">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="inset-panel">
        <span className="label">Evidence checklist</span>
        <ul className="bullet-list">
          {market.evidenceSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <p className="muted bottomless">
        Integration point: after the GenLayer resolver finishes, the operator or relayer can submit the structured YES / NO / INVALID result to the EVM market contract so claims become available.
      </p>
    </section>
  );
}
