import Link from "next/link";

const navItems = [
  { href: "/", label: "Markets" },
  { href: "/create", label: "Create market" }
];

export function Header() {
  return (
    <header className="site-header">
      <div>
        <Link href="/" className="brand-mark">
          GenLayer Prediction Market
        </Link>
        <p className="eyebrow">Static demo frontend for the hackathon repo</p>
      </div>
      <nav className="nav-row" aria-label="Primary">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
