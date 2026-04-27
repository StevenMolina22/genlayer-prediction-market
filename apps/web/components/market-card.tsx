import Link from "next/link";
import { Market } from "@/lib/types";

const statusTone: Record<Market["status"], string> = {
  funding: "bg-white/10 text-white/70 border-white/20",
  trading: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  resolving: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  resolved: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  invalid: "bg-rose-500/20 text-rose-400 border-rose-500/30"
};

export function MarketCard({ market }: { market: Market }) {
  return (
    <article className="flex flex-col gap-6 p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl transition-all hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-2xl hover:border-white/20 h-full relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem] pointer-events-none" />
      
      <div className="flex justify-between items-center gap-4 flex-wrap relative z-10">
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold tracking-wide shadow-sm">
          {market.category}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${statusTone[market.status]} shadow-sm`}>
          {market.status}
        </span>
      </div>

      <div className="flex flex-col gap-2 min-h-[8rem] relative z-10">
        <h3 className="text-xl font-bold leading-snug text-white tracking-tight line-clamp-3">{market.question}</h3>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{market.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 relative z-10 py-2">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">YES</span>
          <strong className="text-2xl font-black text-white">{market.probabilityYes}%</strong>
          <p className="text-white/40 text-xs mt-1">{market.yesPoolEth.toFixed(1)} ETH pooled</p>
        </div>
        <div className="flex flex-col gap-1 pl-6 border-l border-white/10">
          <span className="text-xs uppercase font-bold text-rose-400 tracking-wider">NO</span>
          <strong className="text-2xl font-black text-white/90">{market.probabilityNo}%</strong>
          <p className="text-white/40 text-xs mt-1">{market.noPoolEth.toFixed(1)} ETH pooled</p>
        </div>
      </div>

      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden shadow-inner relative z-10" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.4)]" style={{ width: `${market.probabilityYes}%` }} />
      </div>

      <div className="flex justify-between items-end pt-2 mt-auto relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Closes</span>
          <p className="font-mono text-sm text-white/80">{market.endDate}</p>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Total Liquidity</span>
          <p className="font-mono text-sm text-white/80">{market.totalLiquidityEth.toFixed(1)} ETH</p>
        </div>
      </div>

      <Link href={`/markets/${market.id}`} className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-white/5 border border-white/10 px-6 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-[0.98] relative z-10">
        Open market detail
      </Link>
    </article>
  );
}
