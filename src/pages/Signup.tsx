import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { addClient, setCurrentUser, type Client } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Check, User, Phone, MapPin } from "lucide-react";

const cities = [
  "bishkek", "osh", "jalalabad", "karakol", "tokmok", "naryn", "batken", "talas",
] as const;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 200 : -200, opacity: 0 }),
};

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+996");
  const [city, setCity] = useState("");
  const [result, setResult] = useState<Client | null>(null);

  const next = () => { setDir(1); setStep((s) => s + 1); };
  const back = () => { setDir(-1); setStep((s) => s - 1); };

  const submit = () => {
    const client = addClient({ name, phone, city });
    setCurrentUser(client);
    setResult(client);
    setDir(1);
    setStep(3);
  };

  const canProceed = [
    name.trim().length > 1,
    phone.length > 5,
    city.length > 0,
  ];

  const stepIcons = [User, Phone, MapPin];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      <div className="min-h-screen flex items-center justify-center pt-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-2xl p-8 glow-box-cyan">
            <h2 className="text-2xl font-bold text-foreground text-center mb-6">
              {t("signup.title")}
            </h2>

            {/* Progress */}
            {step < 3 && (
              <div className="flex gap-2 mb-8">
                {[0, 1, 2].map((i) => {
                  const Icon = stepIcons[i];
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {i < step ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <div className={`h-1 w-full rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
                    </div>
                  );
                })}
              </div>
            )}

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <label className="block text-sm text-muted-foreground">{t("signup.step1")}</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("signup.namePlaceholder")}
                      className="bg-secondary border-border text-foreground"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={next}
                      disabled={!canProceed[0]}
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
                    >
                      {t("signup.next")} <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <label className="block text-sm text-muted-foreground">{t("signup.step2")}</label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t("signup.phonePlaceholder")}
                      className="bg-secondary border-border text-foreground"
                    />
                    <div className="flex gap-3">
                      <motion.button whileTap={{ scale: 0.95 }} onClick={back} className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-medium flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> {t("signup.back")}
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={next} disabled={!canProceed[1]} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-40">
                        {t("signup.next")} <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <label className="block text-sm text-muted-foreground">{t("signup.step3")}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {cities.map((c) => (
                        <motion.button
                          key={c}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setCity(c)}
                          className={`py-3 rounded-xl text-sm font-medium transition-colors ${
                            city === c ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
                          }`}
                        >
                          {t(`city.${c}` as any)}
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <motion.button whileTap={{ scale: 0.95 }} onClick={back} className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-medium flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> {t("signup.back")}
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={submit} disabled={!canProceed[2]} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-40">
                        {t("signup.submit")} <Check className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                )}

                {step === 3 && result && (
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto"
                    >
                      <Check className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground">{t("signup.success")}</h3>
                    <p className="text-muted-foreground">{t("signup.yourCode")}</p>
                    <div className="text-3xl font-bold text-primary glow-cyan tracking-wider">{result.code}</div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/dashboard")}
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
                    >
                      {t("nav.dashboard")} →
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
