export function CreateMarketForm() {
  return (
    <section className="flex flex-col gap-10 p-8 md:p-12 rounded-[2rem] bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Create market UI</p>
          <h2 className="text-3xl font-bold tracking-tight text-white">Launch a market with clean resolution rails.</h2>
        </div>
        <span className="px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold uppercase tracking-wider shadow-sm">
          Static preview
        </span>
      </div>

      <p className="text-white/60 text-lg leading-relaxed max-w-3xl relative z-10">
        This form is intentionally read-only for the hackathon demo, but the structure is real: question, timing, liquidity, and evidence policy are enough to explain the entire product contract boundary.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white/70">Market question</span>
          <input className="h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner cursor-not-allowed" defaultValue="Will GenLayer process 1M agent actions by end of 2026?" readOnly />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white/70">Category</span>
          <input className="h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner cursor-not-allowed" defaultValue="Adoption" readOnly />
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm font-semibold text-white/70">Resolution source notes</span>
          <textarea
            className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner resize-y min-h-[120px] cursor-not-allowed leading-relaxed"
            defaultValue="Use official GenLayer dashboards, docs, and launch communications. If public evidence is inconsistent, allow INVALID resolution."
            rows={4}
            readOnly
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white/70">Trading close</span>
          <input className="h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner cursor-not-allowed" defaultValue="2026-12-20 18:00 UTC" readOnly />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white/70">Initial liquidity</span>
          <input className="h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner cursor-not-allowed" defaultValue="10 ETH" readOnly />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 pt-4">
        <div className="flex flex-col gap-3 p-6 rounded-[1.5rem] bg-indigo-500/5 border border-indigo-500/20 shadow-inner group transition-colors hover:bg-indigo-500/10">
          <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider">EVM contract input</span>
          <strong className="text-lg text-white">Question, deadline, resolver, liquidity rails.</strong>
          <p className="text-white/60 text-sm leading-relaxed mt-auto pt-4">
            A live path submits market parameters to the Foundry contract, returns a market ID, and opens the YES / NO pool.
          </p>
        </div>
        <div className="flex flex-col gap-3 p-6 rounded-[1.5rem] bg-emerald-500/5 border border-emerald-500/20 shadow-inner group transition-colors hover:bg-emerald-500/10">
          <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">GenLayer resolver input</span>
          <strong className="text-lg text-white">Evidence policy, ambiguity rules, INVALID fallback.</strong>
          <p className="text-white/60 text-sm leading-relaxed mt-auto pt-4">
            The intelligent contract receives source guidance so a later resolution can return structured settlement data instead of a black-box answer.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 relative z-10">
        <p className="text-white/40 text-sm italic">Mock preview only. No transaction leaves the browser in this frontend build.</p>
        <button className="h-12 px-10 rounded-full bg-emerald-500 text-emerald-950 font-bold text-sm shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98]">
          Create market
        </button>
      </div>
    </section>
  );
}
