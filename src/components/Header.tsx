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
      className="fixed top-0 left-0 right-0 z-40 glass-strong"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-bold text-foreground">
            Cargo<span className="text-primary">Link</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) =>
            link.to.startsWith("#") ? (
              <button
                key={link.to}
                onClick={() => handleClick(link.to)}
                className="text-sm transition-colors hover:text-primary text-muted-foreground"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <LanguageSwitcher />
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass-strong border-t border-border"
        >
          {links.map((link) =>
            link.to.startsWith("#") ? (
              <button
                key={link.to}
                onClick={() => handleClick(link.to)}
                className="block w-full text-left px-6 py-3 text-sm text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-sm text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
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
