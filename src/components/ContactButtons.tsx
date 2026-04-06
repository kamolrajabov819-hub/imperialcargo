import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function ContactButtons() {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      <motion.a
        href="https://t.me/sultanb19"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center gap-2 px-5 py-3 rounded-full text-white font-medium shadow-lg"
        style={{ backgroundColor: "#229ED9", boxShadow: "0 4px 14px rgba(34,158,217,0.3)" }}
      >
        <Send className="w-5 h-5" />
        <span className="hidden sm:inline">{t("dashboard.contactTelegram")}</span>
      </motion.a>

      <motion.a
        href="https://wa.me/77718191119"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center gap-2 px-5 py-3 rounded-full text-white font-medium shadow-lg"
        style={{ backgroundColor: "hsl(142, 70%, 45%)", boxShadow: "0 4px 14px rgba(37,211,102,0.3)" }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">{t("dashboard.contactManager")}</span>
      </motion.a>
    </div>
  );
}
