import Link from "next/link";
import { MarketCard } from "@/components/market-card";
import { featuredFlow, markets } from "@/lib/mock-data";

const featured = markets[0];

export default function HomePage() {
  return (
    <div className="stack-xxl">
      <section className="hero-split card card-hero">
        <div className="hero-copy stack-lg">
          <p className="kicker">GenLayer x EVM prediction infrastructure</p>
          <h1>Prediction markets with auditable payout logic and intelligent resolution.</h1>
          <p className="lead-copy muted">
            This frontend is a premium mock walkthrough for judges: create a market, take a side, review how GenLayer resolves evidence, and see how settlement lands on the EVM contract.
          </p>

          <div className="button-row">
            <Link href={`/markets/${featured.id}`} className="button button-primary">
              Open featured market
            </Link>
            <Link href="/create" className="button button-secondary">
              Review create flow
            </Link>
          </div>

          <div className="hero-metrics editorial-grid">
            <div className="metric-block">
              <span className="label">Featured market</span>
              <strong>{featured.question}</strong>
            </div>
            <div className="metric-block compact-metric">
              <span className="label">YES liquidity</span>
              <strong>{featured.yesPoolEth.toFixed(1)} ETH</strong>
            </div>
            <div className="metric-block compact-metric">
              <span className="label">Resolver mode</span>
              <strong>Structured verdict</strong>
            </div>
          </div>
        </div>

        <div className="hero-stage stack-md">
          <div className="hero-preview-panel">
            <div className="preview-topline">
              <span className="signal-pill">Market in focus</span>
              <span className="mono-copy">{featured.status}</span>
            </div>
            <h2>{featured.question}</h2>
            <p className="muted">{featured.description}</p>

            <div className="preview-probability-row">
              <div>
                <span className="label">YES</span>
                <strong>{featured.probabilityYes}%</strong>
              </div>
              <div>
                <span className="label">NO</span>
                <strong>{featured.probabilityNo}%</strong>
              </div>
            </div>

            <div className="progress-shell" aria-hidden="true">
              <div className="progress-yes" style={{ width: `${featured.probabilityYes}%` }} />
            </div>
          </div>

          <div className="hero-rail">
            {featuredFlow.map((item, index) => (
              <div key={item.title} className="rail-step">
                <span className="rail-index">0{index + 1}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p className="muted bottomless">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="market-section stack-lg">
        <div className="section-head row-between gap-sm wrap">
          <div>
            <p className="kicker">Live product narrative</p>
            <h2>Three market states, one clean review path.</h2>
          </div>
          <p className="section-note muted bottomless">
            The frontend is mocked on purpose. The story is complete, the controls are labeled honestly, and the contract handoff is visible everywhere a judge expects it.
          </p>
        </div>

        <div className="card-grid dense-grid">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>
    </div>
  );
}
