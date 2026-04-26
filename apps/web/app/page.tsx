import Link from "next/link";
import { MarketCard } from "@/components/market-card";
import { featuredFlow, markets } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="stack-xl">
      <section className="hero card">
        <div className="hero-copy stack-md">
          <p className="eyebrow">Judge-friendly demo flow</p>
          <h1>Understand the full prediction market in under two minutes</h1>
          <p className="muted lead-copy">
            This frontend is a polished static walkthrough of the product lifecycle: market creation, YES / NO positioning, GenLayer-assisted resolution, and final claims.
          </p>
          <div className="button-row">
            <Link href="/markets/genlayer-mainnet-q3" className="button">
              Open featured market
            </Link>
            <Link href="/create" className="button ghost-button">
              Review create flow
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          {featuredFlow.map((item) => (
            <div key={item.title} className="mini-card">
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stack-md">
        <div className="row-between gap-sm wrap">
          <div>
            <p className="eyebrow">Market list</p>
            <h2>Mock markets</h2>
          </div>
          <p className="muted bottomless">All pricing, wallet state, and outcomes below are intentionally mocked for local review.</p>
        </div>
        <div className="card-grid">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>
    </div>
  );
}
