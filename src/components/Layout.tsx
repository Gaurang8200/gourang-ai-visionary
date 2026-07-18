import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation, Footer, ProgressBar } from "./PortfolioBlocks";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative bg-[#0b0b12] text-white overflow-x-hidden">
      <ProgressBar />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
