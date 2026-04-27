import Link from "next/link";

const navItems = [
  { href: "/", label: "Markets" },
  { href: "/create", label: "Create" }
];

export function Header() {
  return (
    <header className="site-header">
      <div className="brand-lockup">
        <Link href="/" className="brand-mark">
          <span className="brand-dot" aria-hidden="true" />
          GenLayer Market
        </Link>
        <p className="brand-note">Premium mock product surface for the BuildersClaw submission.</p>
      </div>

      <div className="header-actions">
        <nav className="nav-shell" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-status">
          <span className="status-indicator" aria-hidden="true" />
          Mocked frontend, real repo
        </div>
      </div>
    </header>
  );
}
