import { NavLink } from "react-router-dom";
import { Logo } from "@/Components/Shared/Logo/Logo";
import { cn } from "@/lib/utils";

// Main menu links - lets the user move between the chat and the about page.
const links = [
  { to: "/", label: "Chat", end: true },
  { to: "/about", label: "About", end: false },
];

export function Header() {
  return (
    <header className="relative z-20 border-b border-edge bg-paper/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <NavLink to="/" className="transition-opacity hover:opacity-80" aria-label="Converse home">
          <Logo />
        </NavLink>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:bg-paper-2 hover:text-ink",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
