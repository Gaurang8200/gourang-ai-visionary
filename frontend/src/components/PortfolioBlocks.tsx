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
  return <div className="fixed top-0 left-0 h-[2px] z-[200]" style={{ width: `${w}%`, background: "#ff5b2e" }} />;
}

const NAV_LINKS = [
  { label: "About", to: "/about" },
  { label: "Works", to: "/projects" },
  { label: "Journey", to: "/journey" },
  { label: "Skills", to: "/skills" },
  { label: "Contact", to: "/contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-[#f5f5f3]">
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <Link to="/" className="font-extrabold text-xl tracking-tight text-[#111111]">
          gourang<sup className="text-xs">&reg;</sup>
        </Link>
        <ul className="hidden md:flex gap-10">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-sm font-medium text-[#111111] hover:text-[#ff5b2e] transition-colors">{l.label}</Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-md bg-[#111111] flex flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span className="w-5 h-[2px] bg-white" />
          <span className="w-5 h-[2px] bg-white" />
        </button>
        <Link to="/contact" className="hidden md:block px-5 py-2.5 rounded-md bg-[#111111] text-white text-sm font-semibold hover:bg-[#ff5b2e] transition-colors">
          Get In Touch
        </Link>
      </div>
      {open && (
        <ul className="md:hidden flex flex-col gap-1 px-6 pb-6">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} onClick={() => setOpen(false)} className="block py-2 text-base font-medium text-[#111111]">{l.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 px-6 md:px-10">
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
        <div className="font-extrabold text-5xl md:text-7xl tracking-tight">
          gourang<sup className="text-xl">&reg;</sup>
        </div>
        <div className="flex gap-16">
          <div className="space-y-2">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="block text-sm text-white/60 hover:text-white transition-colors">{l.label}</Link>
            ))}
          </div>
          <div className="space-y-2">
            <a href="https://github.com/Gaurang8200" target="_blank" rel="noreferrer" className="block text-sm text-white/60 hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/gourangkumar-n-m" target="_blank" rel="noreferrer" className="block text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:monashragaurang6@gmail.com" className="block text-sm text-white/60 hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-2 pt-6 border-t border-white/10 text-xs text-white/40">
        <p>2026 Gourangkumar N Monashara. All rights reserved.</p>
        <p>AI Developer based in Berlin, Germany.</p>
      </div>
    </footer>
  );
}

export function Block({ bg = "#f5f5f3", dark, className = "", children }: { bg?: string; dark?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <section
      className={`relative px-6 md:px-10 py-20 md:py-28 ${dark ? "text-white" : "text-[#111111]"} ${className}`}
      style={{ background: bg }}
    >
      {children}
    </section>
  );
}

export const H2 = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`font-extrabold leading-[1.05] tracking-tight text-[clamp(2.2rem,5.5vw,4.2rem)] mb-6 ${className}`}>
    {children}
  </h2>
);

export const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-[#ff5b2e]">{children}</p>
);

export function PageNextLink({ to, label }: { to: string; label: string }) {
  return (
    <div className="text-center py-14 bg-[#f5f5f3]">
      <Link to={to} className="inline-flex items-center gap-2 px-7 py-4 rounded-md bg-[#111111] text-white font-semibold hover:bg-[#ff5b2e] transition-colors">
        {label}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
