import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function ProgressBar() {
  const [w, setW] = useState(0);
  const { pathname } = useLocation();
  useEffect(() => setW(0), [pathname]);
  useEffect(() => {
    const fn = () => setW((window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)) * 100);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="fixed top-0 left-0 h-[3px] z-[200]" style={{ width: `${w}%`, background: "#5fd4ff" }} />;
}

const NAV_LINKS = [
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Journey", to: "/journey" },
  { label: "Contact", to: "/contact" },
];

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-[#0b0b12] border-b border-white/10">
      <Link to="/" className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-[#5fd4ff] flex items-center justify-center font-extrabold text-[#0b0b12] text-sm">GM</span>
        <span className="hidden sm:block font-semibold text-white">Gourangkumar</span>
      </Link>
      <ul className="hidden md:flex gap-8">
        {NAV_LINKS.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm font-medium text-white/70 hover:text-white transition-colors">{l.label}</Link>
          </li>
        ))}
      </ul>
      <Link to="/contact" className="px-5 py-2.5 rounded-full bg-white text-[#0b0b12] text-sm font-semibold hover:bg-[#5fd4ff] transition-colors">
        Say Hi
      </Link>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="py-8 text-center">
      <p className="text-xs font-medium opacity-40">
        2026 Gourangkumar N Monashara. AI Developer based in Berlin, Germany.
      </p>
    </footer>
  );
}

export function Block({ bg, dark, className = "", children }: { bg: string; dark?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <section
      className={`relative mx-3 md:mx-6 my-3 md:my-4 rounded-[32px] md:rounded-[48px] px-6 md:px-16 py-16 md:py-24 ${dark ? "text-white" : "text-[#0b0b12]"} ${className}`}
      style={{ background: bg }}
    >
      {children}
    </section>
  );
}

export const H2 = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`font-extrabold leading-[1.02] tracking-tight text-[clamp(2.5rem,6vw,5rem)] mb-8 ${className}`}>
    {children}
  </h2>
);

export const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-bold uppercase tracking-wide mb-4 opacity-60">{children}</p>
);

export function PageNextLink({ to, label }: { to: string; label: string }) {
  return (
    <div className="text-center py-14">
      <Link to={to} className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#0b0b12] font-semibold hover:-translate-y-0.5 transition-transform">
        {label}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
