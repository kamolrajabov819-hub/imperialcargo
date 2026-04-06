import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getCurrentUser, logoutUser, getWarehouseString, getWarehouseAddress } from "@/lib/mockData";
import { Copy, Check, Package, MapPin, Truck, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [codeCopied, setCodeCopied] = useState(false);
  const [addrCopied, setAddrCopied] = useState(false);

  useEffect(() => {
    if (!user) navigate("/signup");
  }, [user, navigate]);

  if (!user) return null;

  const copyToClipboard = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      <div className="pt-24 pb-32 px-4 container mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t("dashboard.title")}</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm"
          >
            <LogOut className="w-4 h-4" />
            {t("dashboard.logout")}
          </motion.button>
        </motion.div>

        {/* Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 mb-6 glow-box-cyan relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">{t("dashboard.idCard")}</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{user.name}</p>
          <p className="text-xs text-muted-foreground mb-4">{t("dashboard.code")}</p>
          <div className="flex items-center justify-between">
            <div className="text-3xl md:text-4xl font-bold text-primary glow-cyan tracking-widest">{user.code}</div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => copyToClipboard(user.code, setCodeCopied)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
            >
              {codeCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {codeCopied ? t("dashboard.copied") : t("dashboard.copyCode")}
            </motion.button>
          </div>
        </motion.div>

        {/* Warehouse Address */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">{t("dashboard.warehouse")}</h2>
          </div>
          <div className="space-y-1 text-sm text-foreground mb-6 font-mono bg-secondary/50 rounded-xl p-4">
            <p className="font-semibold">{WAREHOUSE_ADDRESS.name}</p>
            <p>{WAREHOUSE_ADDRESS.line1}</p>
            <p>{WAREHOUSE_ADDRESS.line2}</p>
            <p>{WAREHOUSE_ADDRESS.city}, {WAREHOUSE_ADDRESS.country} {WAREHOUSE_ADDRESS.postal}</p>
            <p className="text-muted-foreground">Tel: {WAREHOUSE_ADDRESS.phone}</p>
            <p className="text-primary font-semibold mt-2">ID: {user.code}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => copyToClipboard(getWarehouseString() + `\nID: ${user.code}`, setAddrCopied)}
            className="w-full py-3 rounded-xl bg-primary/10 text-primary font-medium flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
          >
            {addrCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {addrCopied ? t("dashboard.copied") : t("dashboard.copyAddress")}
          </motion.button>
        </motion.div>

        {/* Order Tracking Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-8 opacity-60"
        >
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">{t("dashboard.tracking")}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{t("dashboard.trackingDesc")}</p>
        </motion.div>
      </div>
    </div>
  );
}
