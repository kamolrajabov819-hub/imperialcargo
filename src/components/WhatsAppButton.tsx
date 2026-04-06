import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function WhatsAppButton() {
  const { t } = useTranslation();

  return (
    <motion.a
      href="https://wa.me/996555000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white font-medium shadow-lg shadow-green-500/30"
      style={{ backgroundColor: "hsl(142, 70%, 45%)" }}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">{t("dashboard.contactManager")}</span>
    </motion.a>
  );
}
