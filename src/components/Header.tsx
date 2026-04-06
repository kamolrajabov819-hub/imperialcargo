import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link, useLocation } from "react-router-dom";
import { Package, Menu, X } from "lucide-react";
import { useState } from "react";
import { getCurrentUser } from "@/lib/mockData";

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = getCurrentUser();
  const isHome = location.pathname === "/";

  const links = [
    { to: "/", label: t("nav.home") },
    ...(isHome
      ? [
          { to: "#about", label: t("nav.about") },
          { to: "#services", label: t("nav.services") },
          { to: "#contact", label: t("nav.contact") },
        ]
      : []),
    ...(user ? [{ to: "/dashboard", label: t("nav.dashboard") }] : [{ to: "/signup", label: t("nav.signup") }]),
  ];

  const handleClick = (to: string) => {
    setMobileOpen(false);
    if (to.startsWith("#")) {
      const el = document.querySelector(to);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-40 bg-transparent"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white italic">
            Cargo<span className="text-primary">Link</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            {links.map((link) =>
              link.to.startsWith("#") ? (
                <button
                  key={link.to}
                  onClick={() => handleClick(link.to)}
                  className="px-4 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 text-sm transition-colors rounded-full ${
                    location.pathname === link.to ? "bg-white text-foreground font-medium" : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <button className="p-2 text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-white">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/10"
        >
          {links.map((link) =>
            link.to.startsWith("#") ? (
              <button
                key={link.to}
                onClick={() => handleClick(link.to)}
                className="block w-full text-left px-6 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </motion.div>
      )}
    </motion.header>
  );
}
