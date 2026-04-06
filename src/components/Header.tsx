import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/mockData";

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = getCurrentUser();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground italic">
            Cargo<span className="text-primary">Link</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-muted/60 border border-border">
            {links.map((link) =>
              link.to.startsWith("#") ? (
                <button
                  key={link.to}
                  onClick={() => handleClick(link.to)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/80"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 text-sm transition-colors rounded-full ${
                    location.pathname === link.to
                      ? "bg-white text-foreground font-medium shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </nav>

        {/* Desktop right - only language switcher */}
        <div className="hidden md:flex items-center">
          <LanguageSwitcher />
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-border overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((link) =>
                link.to.startsWith("#") ? (
                  <button
                    key={link.to}
                    onClick={() => handleClick(link.to)}
                    className="block w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-xl transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-sm rounded-xl transition-colors ${
                      location.pathname === link.to
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
