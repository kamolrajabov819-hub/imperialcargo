import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LogoIcon } from "./LogoIcon";
import { useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "@/lib/mockData";

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const user = getCurrentUser();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy for hash sections
  useEffect(() => {
    if (!isHome) return;
    const sectionIds = ["about", "services", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const links = [
    { to: "/", label: t("nav.home") },
    ...(isHome
      ? [
          { to: "#about", label: t("nav.about") },
          { to: "#services", label: t("nav.services") },
          { to: "#contact", label: t("nav.contact") },
        ]
      : []),
    ...(user
      ? [{ to: "/dashboard", label: t("nav.dashboard") }]
      : [
          { to: "/login", label: t("nav.login") },
          { to: "/signup", label: t("nav.signup") },
        ]),
  ];

  const handleHashClick = useCallback((to: string) => {
    setActiveSection(to);
    // Use setTimeout to let mobile menu close animation start before scrolling
    setTimeout(() => {
      const el = document.querySelector(to);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/" && !activeSection;
    if (to.startsWith("#")) return activeSection === to;
    return location.pathname === to;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glass-strong shadow-lg shadow-black/20"
          : "bg-card/60 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Box className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold">ISU <span className="text-primary">Cargo</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-muted/60 border border-border">
            {links.map((link) =>
              link.to.startsWith("#") ? (
                <button
                  key={link.to}
                  onClick={() => handleHashClick(link.to)}
                  className={`px-4 py-2 text-sm transition-colors rounded-full ${
                    isActive(link.to)
                      ? "bg-primary text-primary-foreground font-medium shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 text-sm transition-colors rounded-full ${
                    isActive(link.to)
                      ? "bg-primary text-primary-foreground font-medium shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </nav>

        {/* Desktop right */}
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
            className="md:hidden bg-card/95 backdrop-blur-lg border-t border-border overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((link) =>
                link.to.startsWith("#") ? (
                  <button
                    key={link.to}
                    onClick={() => {
                      setMobileOpen(false);
                      handleHashClick(link.to);
                    }}
                    className={`block w-full text-left px-4 py-3 text-sm rounded-xl transition-colors ${
                      isActive(link.to)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-sm rounded-xl transition-colors ${
                      isActive(link.to)
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
