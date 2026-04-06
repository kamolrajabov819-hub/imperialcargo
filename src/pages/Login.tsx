import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { Header } from "@/components/Header";

import { findClientByNameAndPhone, setCurrentUser } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/PhoneInput";
import { LogIn, AlertCircle } from "lucide-react";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+996");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const client = findClientByNameAndPhone(name, phone);
    if (client) {
      setCurrentUser(client);
      navigate("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      

      <div className="min-h-screen flex items-center justify-center pt-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-2xl p-8 glow-box-cyan">
            <div className="flex items-center justify-center gap-3 mb-6">
              <LogIn className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">{t("login.title")}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">{t("login.nameLabel")}</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("signup.namePlaceholder")}
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">{t("login.phoneLabel")}</label>
                <PhoneInput value={phone} onChange={setPhone} />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {t("login.error")}
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={name.trim().length < 2 || phone.length < 6}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <LogIn className="w-4 h-4" />
                {t("login.submit")}
              </motion.button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t("login.noAccount")}{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                {t("login.signupLink")}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
