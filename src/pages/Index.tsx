import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { ContactButtons } from "@/components/ContactButtons";
import { ArrowRight, Box, Star, Mail, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, User, ShoppingCart, ClipboardCopy, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "@/lib/mockData";
import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import heroBg from "@/assets/hero-bg.jpg";
import taobaoLogo from "@/assets/taobao.webp";
import dewuLogo from "@/assets/dewu.jfif";
import pinduoduoLogo from "@/assets/pinduoduo.jpg";
import logo1688 from "@/assets/1688.jfif";
import whyTeam from "@/assets/why-team.jpg";
import whyDelivery from "@/assets/why-delivery.jpg";
import whyTracking from "@/assets/why-tracking.jpg";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const Index = () => {
  const { t } = useTranslation();
  const user = getCurrentUser();
  const [openService, setOpenService] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const services = [
    { title: t("services.cargo.title"), desc: t("services.cargo.desc") },
    { title: t("services.warehouse.title"), desc: t("services.warehouse.desc") },
    { title: t("services.freight.title"), desc: t("services.freight.desc") },
    { title: t("services.supply.title"), desc: t("services.supply.desc") },
  ];

  const testimonials = [
    { text: t("testimonial.1.text" as any), name: t("testimonial.1.name" as any), city: t("testimonial.1.city" as any) },
    { text: t("testimonial.2.text" as any), name: t("testimonial.2.name" as any), city: t("testimonial.2.city" as any) },
    { text: t("testimonial.3.text" as any), name: t("testimonial.3.name" as any), city: t("testimonial.3.city" as any) },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <ContactButtons />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center px-4 md:px-8 pt-20 pb-8">
        {/* Rounded hero container */}
        <div className="relative w-full max-w-[1400px] mx-auto rounded-3xl overflow-hidden min-h-[85vh] flex items-end md:items-center">
          <img src={heroBg} alt="Cargo truck on highway" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

          <div className="relative z-10 w-full px-6 md:px-12 py-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                <Star className="w-4 h-4 text-primary" /> {t("hero.learnMore")}
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] text-center max-w-5xl mx-auto mb-10 font-heading"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              {t("hero.title")}{" "}
              <span className="text-primary" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.3)' }}>{t("hero.titleHighlight")}</span>
            </motion.h1>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <Link to={user ? "/dashboard" : "/signup"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base flex items-center gap-2 shadow-lg"
                >
                  {t("hero.cta")} <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <a href="#about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-base flex items-center gap-2"
                >
                  {t("hero.learnMore")} <ArrowRight className="w-5 h-5" />
                </motion.button>
              </a>
            </motion.div>

            {/* Bottom stat chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex justify-between items-end"
            >
              {/* Left - Business Clients */}
              <div className="bg-card rounded-2xl px-5 py-3 shadow-lg border border-border flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    "bg-gradient-to-br from-primary/80 to-primary",
                    "bg-gradient-to-br from-blue-400 to-blue-600",
                    "bg-gradient-to-br from-emerald-400 to-emerald-600",
                  ].map((gradient, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${gradient} border-2 border-card flex items-center justify-center`}>
                      <User className="w-4 h-4 text-white" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] font-bold text-foreground">
                    500+
                  </div>
                </div>
                <div className="text-sm font-semibold text-foreground">{t("hero.stat.clients")}</div>
              </div>

              {/* Right - Shipments */}
              <div className="hidden md:flex bg-card rounded-2xl px-4 py-3 shadow-lg border border-border items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden">
                  <img src={heroBg} alt="Shipment" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground"><AnimatedCounter end={10000} suffix="+" /></div>
                  <div className="text-xs text-muted-foreground">{t("hero.stat.shipments")}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PARTNER LOGOS ─── */}
      <Section className="py-8 border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-10 flex-wrap opacity-40">
            {["DHL", "FedEx", "Maersk", "COSCO", "SF Express", "Cainiao"].map((name) => (
              <span key={name} className="text-lg font-bold text-foreground tracking-wider">{name}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── ABOUT ─── */}
      <Section id="about" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-6">
                <Star className="w-3.5 h-3.5" /> {t("about.tag")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6 font-heading">{t("about.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">{t("about.desc")}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass-dark rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Box className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{t("about.card1.title")}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{t("about.card1.desc")}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{t("about.card2.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t("about.card2.desc")}</p>
                </div>
              </div>
            </div>

            {/* Transfer card + truck image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/30 via-primary/20 to-secondary rounded-3xl p-6 md:p-8 border border-primary/20">
                <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-xs mx-auto border border-border mb-6">
                  <p className="text-sm font-semibold text-foreground mb-3">Transfer From</p>
                  <div className="bg-muted rounded-xl p-3 mb-4">
                    <p className="text-primary text-sm font-mono font-bold">kf145721457ad</p>
                    <p className="text-xs text-muted-foreground">Yiwu, China</p>
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground text-xs">↕</div>
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-3">Transfer To</p>
                  <div className="bg-muted rounded-xl p-3">
                    <p className="text-primary text-sm font-mono font-bold">eilm1452145klm</p>
                    <p className="text-xs text-muted-foreground">Bishkek, Kyrgyzstan</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden">
                  <img src={heroBg} alt="Cargo truck" className="w-full h-48 object-cover rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── SERVICES ACCORDION ─── */}
      <Section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-6">
                <Star className="w-3.5 h-3.5" /> {t("services.tag")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight font-heading">{t("services.title")}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed self-end">{t("about.desc")}</p>
          </div>

          <div className="space-y-3">
            {services.map((svc, i) => {
              const isOpen = openService === i;
              return (
                <motion.div
                  key={i}
                  layout
                  className={`rounded-2xl overflow-hidden transition-colors duration-300 ${
                    isOpen ? "glass-dark" : "bg-card border border-border"
                  }`}
                >
                  <button
                    onClick={() => setOpenService(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-8 py-6 text-left"
                  >
                    <div className="flex items-center gap-6">
                      <span className={`text-lg font-bold ${isOpen ? "text-primary" : "text-primary"}`}>
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      <span className={`text-xl font-bold ${isOpen ? "text-white" : "text-foreground"}`}>
                        {svc.title}
                      </span>
                    </div>
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                      isOpen ? "border-white/30 text-white" : "border-primary text-primary"
                    }`}>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6 pl-20">
                          <p className="text-white/70 leading-relaxed max-w-lg">{svc.desc}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ─── WHY CHOOSE US — Image Cards ─── */}
      <Section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-6">
              <Star className="w-3.5 h-3.5" /> {t("why.tag")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-heading">{t("why.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: whyTeam, title: t("why.team.title"), desc: t("why.team.desc") },
              { img: whyDelivery, title: t("why.delivery.title"), desc: t("why.delivery.desc") },
              { img: whyTracking, title: t("why.tracking.title"), desc: t("why.tracking.desc") },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="relative group rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── HOW IT WORKS ─── */}
      <Section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-6">
              <Star className="w-3.5 h-3.5" /> {t("how.tag")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-heading">{t("how.title")}</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-0">
            {[
              { step: "01", title: t("how.step1.title"), desc: t("how.step1.desc"), icon: ShoppingCart },
              { step: "02", title: t("how.step2.title"), desc: t("how.step2.desc"), icon: ClipboardCopy },
              { step: "03", title: t("how.step3.title"), desc: t("how.step3.desc"), icon: Truck },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                className="flex gap-4 md:gap-6 lg:gap-10 relative"
              >
                {/* Left: number + line */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm md:text-lg font-bold shrink-0 shadow-lg shadow-primary/30 animate-pulse-gold">
                    {item.step}
                  </div>
                  {i < 2 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-primary/50 to-border min-h-[60px]" />
                  )}
                </div>
                {/* Right: card */}
                <motion.div
                  whileHover={{ scale: 1.02, borderColor: 'hsl(43, 50%, 54%)' }}
                  transition={{ duration: 0.2 }}
                  className="bg-card rounded-2xl p-4 md:p-6 lg:p-8 border border-border transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10 flex-1 mb-4 md:mb-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  {/* Marketplace logos for step 1 */}
                  {i === 0 && (
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-4 md:mt-5">
                      {[
                        { name: "Taobao", src: taobaoLogo },
                        { name: "1688", src: logo1688 },
                        { name: "Pinduoduo", src: pinduoduoLogo },
                        { name: "Dewu", src: dewuLogo },
                      ].map((platform) => (
                        <motion.div
                          key={platform.name}
                          whileHover={{ scale: 1.12, y: -2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl overflow-hidden bg-secondary border border-border shadow-md">
                            <img src={platform.src} alt={platform.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] text-muted-foreground font-medium">{platform.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── TESTIMONIALS CAROUSEL ─── */}
      <Section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-6">
              <Star className="w-3.5 h-3.5" /> {t("testimonials.tag")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-heading">{t("testimonials.title")}</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-background rounded-2xl border border-border p-8 md:p-10"
              >
                <div className="text-4xl text-primary/30 mb-4">"</div>
                <p className="text-foreground text-lg leading-relaxed mb-6 italic">
                  {testimonials[activeTestimonial].text}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-foreground">— {testimonials[activeTestimonial].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[activeTestimonial].city}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer id="contact" className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Box className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold">ISU <span className="text-primary">Cargo</span></span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.desc")}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t("footer.quickLinks")}</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-sm text-muted-foreground hover:text-primary transition-all">{t("nav.about")}</a>
                <a href="#services" className="block text-sm text-muted-foreground hover:text-primary transition-all">{t("nav.services")}</a>
                <Link to="/signup" className="block text-sm text-muted-foreground hover:text-primary transition-all">{t("nav.signup")}</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t("footer.contact")}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>+996 555 123 456</p>
                <p>info@cargolink.kg</p>
                <p>Bishkek, Kyrgyzstan</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t("footer.newsletter")}</h4>
              <p className="text-sm text-muted-foreground mb-3">{t("footer.newsletterDesc")}</p>
              <div className="flex gap-2">
                <Input placeholder={t("footer.emailPlaceholder")} className="bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm shrink-0"
                >
                  <Mail className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ISU Cargo. {t("footer.rights")}</p>
            <Link to="/admin" className="inline-block w-2 h-2 rounded-full bg-border/20 hover:bg-primary/30 transition-colors mt-2" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
