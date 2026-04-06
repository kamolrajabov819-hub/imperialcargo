import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ArrowRight, Package, Warehouse, Ship, Boxes, Users, Truck, BarChart3, UserPlus, QrCode, Send, Star, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "@/lib/mockData";
import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

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
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
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

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/3 rounded-full" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Package className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">CargoLink</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight"
          >
            {t("hero.title")}
            <br />
            <span className="text-primary glow-cyan">{t("hero.titleHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to={user ? "/dashboard" : "/signup"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg flex items-center gap-2 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
              >
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <a href="#about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-muted transition-colors"
              >
                {t("hero.learnMore")}
              </motion.button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: 10000, suffix: "+", label: t("hero.stat.shipments") },
              { value: 500, suffix: "+", label: t("hero.stat.clients") },
              { value: 2, suffix: "", label: t("hero.stat.countries") },
              { value: 5, suffix: "+", label: t("hero.stat.years") },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary glow-cyan">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("about.tag")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("about.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("about.desc")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: t("about.card1.title"), desc: t("about.card1.desc"), icon: Truck },
              { title: t("about.card2.title"), desc: t("about.card2.desc"), icon: BarChart3 },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-8 hover:glow-box-cyan transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services" className="py-24 relative z-10 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("services.tag")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("services.title")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Package, title: t("services.cargo.title"), desc: t("services.cargo.desc") },
              { icon: Warehouse, title: t("services.warehouse.title"), desc: t("services.warehouse.desc") },
              { icon: Ship, title: t("services.freight.title"), desc: t("services.freight.desc") },
              { icon: Boxes, title: t("services.supply.title"), desc: t("services.supply.desc") },
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-2xl p-6 text-center hover:glow-box-cyan transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("why.tag")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("why.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Users, title: t("why.team.title"), desc: t("why.team.desc") },
              { icon: Truck, title: t("why.delivery.title"), desc: t("why.delivery.desc") },
              { icon: BarChart3, title: t("why.tracking.title"), desc: t("why.tracking.desc") },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 hover:bg-primary/20 transition-colors">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="py-24 relative z-10 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("how.tag")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("how.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: UserPlus, step: "01", title: t("how.step1.title"), desc: t("how.step1.desc") },
              { icon: QrCode, step: "02", title: t("how.step2.title"), desc: t("how.step2.desc") },
              { icon: Send, step: "03", title: t("how.step3.title"), desc: t("how.step3.desc") },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="relative glass rounded-2xl p-8 text-center hover:glow-box-cyan transition-all duration-500"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {item.step}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 mt-2">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("testimonials.tag")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("testimonials.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-8 hover:glow-box-cyan transition-all duration-500"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-6 italic">
                  "{t(`testimonial.${i}.text` as any)}"
                </p>
                <div>
                  <p className="text-foreground font-semibold text-sm">{t(`testimonial.${i}.name` as any)}</p>
                  <p className="text-muted-foreground text-xs">{t(`testimonial.${i}.city` as any)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer id="contact" className="py-16 border-t border-border bg-card/50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold text-foreground">Cargo<span className="text-primary">Link</span></span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{t("footer.desc")}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t("footer.quickLinks")}</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">{t("nav.about")}</a>
                <a href="#services" className="block text-sm text-muted-foreground hover:text-primary transition-colors">{t("nav.services")}</a>
                <Link to="/signup" className="block text-sm text-muted-foreground hover:text-primary transition-colors">{t("nav.signup")}</Link>
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
                <Input placeholder={t("footer.emailPlaceholder")} className="bg-secondary border-border text-foreground text-sm" />
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
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CargoLink. {t("footer.rights")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
