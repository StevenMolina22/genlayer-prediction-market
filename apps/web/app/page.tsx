import Link from "next/link";
import { MarketCard } from "@/components/market-card";
import { featuredFlow, markets } from "@/lib/mock-data";

const featured = markets[0];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 relative z-10">
      {/* Hero Section */}
      <section className="grid lg:grid-cols-[1.2fr_1fr] gap-12 min-h-[75vh] items-center py-12 md:py-20 relative">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none" />

        <div className="flex flex-col gap-8 relative z-10">
          <div className="space-y-4">
            <p className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">GenLayer x EVM prediction infrastructure</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50">
              Prediction markets with auditable payout logic.
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
              This frontend is a premium mock walkthrough for judges: create a market, take a side, review how GenLayer resolves evidence, and see how settlement lands on the EVM contract.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href={`/markets/${featured.id}`} className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-400 px-8 text-sm font-semibold text-emerald-950 transition-all hover:bg-emerald-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_25px_rgba(52,211,153,0.5)]">
              Open featured market
            </Link>
            <Link href="/create" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-sm font-medium text-white transition-all hover:bg-white/5 hover:border-white/30 hover:scale-[1.02]">
              Review create flow
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/10 mt-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">Featured market</span>
              <strong className="text-sm text-white/90 leading-tight">{featured.question}</strong>
            </div>
            <div className="flex flex-col gap-2 md:pl-8 md:border-l md:border-white/10">
              <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">YES liquidity</span>
              <strong className="text-lg text-emerald-400">{featured.yesPoolEth.toFixed(1)} ETH</strong>
            </div>
            <div className="flex flex-col gap-2 md:pl-8 md:border-l md:border-white/10">
              <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">Resolver mode</span>
              <strong className="text-sm text-white/90">Structured verdict</strong>
            </div>
          </div>
        </div>

        {/* Right Stage */}
        <div className="flex flex-col gap-6 relative z-10">
          <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-xl backdrop-blur-xl flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Market in focus</span>
              <span className="font-mono text-xs text-white/50">{featured.status.toUpperCase()}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2">{featured.question}</h2>
              <p className="text-white/60 text-sm leading-relaxed line-clamp-2">{featured.description}</p>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-emerald-400 tracking-wider">YES</span>
                <strong className="text-3xl font-black text-white">{featured.probabilityYes}%</strong>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-xs font-bold text-rose-400 tracking-wider">NO</span>
                <strong className="text-3xl font-black text-white/80">{featured.probabilityNo}%</strong>
              </div>
            </div>

            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: `${featured.probabilityYes}%` }} />
            </div>
          </div>

          <div className="grid gap-6 pt-4">
            {featuredFlow.map((item, index) => (
              <div key={item.title} className="flex gap-5 pl-4 border-l-2 border-white/10 hover:border-white/30 transition-colors">
                <span className="text-emerald-400 font-mono text-sm font-bold mt-0.5">0{index + 1}</span>
                <div className="flex flex-col gap-1">
                  <strong className="text-white text-sm tracking-wide">{item.title}</strong>
                  <p className="text-white/50 text-xs leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets List Section */}
      <section className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Live product narrative</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight font-bold tracking-tight text-white">Three market states, one clean review path.</h2>
          </div>
          <p className="text-white/50 text-sm max-w-md leading-relaxed">
            The frontend is mocked on purpose. The story is complete, the controls are labeled honestly, and the contract handoff is visible everywhere a judge expects it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>
    </div>
  );
}
