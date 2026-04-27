import Link from "next/link";

const navItems = [
  { href: "/", label: "Markets" },
  { href: "/create", label: "Create" }
];

export function Header() {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-white/10 mb-8 relative z-20">
      <div className="flex flex-col gap-1.5">
        <Link href="/" className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-white hover:text-white/90 transition-colors">
          <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]" aria-hidden="true" />
          GenLayer Market
        </Link>
        <p className="text-sm text-white/50 max-w-sm">Premium mock product surface for the BuildersClaw submission.</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <nav className="flex items-center p-1.5 rounded-full bg-white/5 border border-white/10 shadow-inner backdrop-blur-md" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-medium text-white/70 transition-all hover:text-white hover:bg-white/10 active:scale-[0.98]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="inline-flex items-center gap-2.5 h-12 px-5 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.4)]" aria-hidden="true" />
          Mocked frontend, real repo
        </div>
      </div>
    </header>
  );
}
