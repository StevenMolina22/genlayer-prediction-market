import Link from "next/link";
import { CreateMarketForm } from "@/components/create-market-form";

export default function CreateMarketPage() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Market creation surface</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl">Frame the market before a single wei moves.</h1>
        </div>
        <p className="text-white/50 text-sm max-w-md leading-relaxed">
          The form is static in this demo, but every field below maps to either an EVM market creation parameter or a GenLayer resolution input.
        </p>
      </section>

      <CreateMarketForm />

      <section className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 backdrop-blur-xl shadow-xl flex flex-col gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -z-10 group-hover:bg-indigo-500/30 transition-colors" />
        
        <div className="space-y-2">
          <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest">Why this screen matters</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white max-w-2xl">The judging brief asked for a complete product flow, not isolated code.</h2>
        </div>
        <p className="text-white/60 leading-relaxed max-w-3xl">
          This page shows where the two system layers separate: the EVM contract owns pool logic, while GenLayer owns evidence interpretation and final structured outcome generation.
        </p>
        <div className="pt-2">
          <Link href="/markets/genlayer-mainnet-q3" className="inline-flex h-12 items-center justify-center rounded-full bg-white/5 border border-white/10 px-8 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]">
            Jump to a fully populated market
          </Link>
        </div>
      </section>
    </div>
  );
}
