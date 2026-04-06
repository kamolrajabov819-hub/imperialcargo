import { useTranslation, type Language } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "kg", label: "Кыргызча", flag: "🇰🇬" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = languages.find((l) => l.code === language)!;

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-sm text-foreground hover:border-primary/40 transition-colors"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 top-full mt-2 glass-strong rounded-lg overflow-hidden z-50 min-w-[150px]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-primary/10 ${
                  language === lang.code ? "text-primary" : "text-foreground"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
