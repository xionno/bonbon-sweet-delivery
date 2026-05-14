import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "motion/react";
import heroImg from "@/assets/hero-desserts.jpg";
import coffeeImg from "@/assets/coffee-station.jpg";
import beverageImg from "@/assets/beverage-bar.jpg";
import appsImg from "@/assets/appetizers.jpg";
import logoImg from "@/assets/logo.png";
import ownersImg from "@/assets/owners.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bonbon by Cusani — Repostería artesanal por encargo" },
      {
        name: "description",
        content:
          "Bonbon by Cusani: estación de café, barra de bebidas y mesa de entremeses. Postres frescos hechos diariamente, por entregas.",
      },
      { property: "og:title", content: "Bonbon by Cusani" },
      {
        property: "og:description",
        content:
          "Repostería artesanal hecha diariamente. Estación de café, bebidas y entremeses para tus eventos.",
      },
      { property: "og:image", content: heroImg },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Allura&family=Jost:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

/* ---------- Reusable motion helpers ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Nav with mobile menu ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#servicios", label: "Servicios" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#galeria", label: "Galería" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <a href="#top" className="font-display text-xl tracking-wide text-primary md:text-2xl">
          Bonbon <span className="font-script text-gradient-gold text-2xl md:text-3xl">by Cusani</span>
        </a>

        <div className="hidden gap-10 text-xs uppercase tracking-[0.25em] lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative text-foreground/70 transition hover:text-primary">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contacto"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-soft transition hover:opacity-90 lg:inline-block"
        >
          Encargar
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <span className="sr-only">Menú</span>
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-primary"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-6 bg-primary"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-primary"
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 right-0 top-full bg-background/95 backdrop-blur-lg shadow-elegant lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="border-b border-border/50 py-4 font-display text-3xl text-primary"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full bg-primary px-6 py-4 text-center text-xs uppercase tracking-[0.25em] text-primary-foreground"
              >
                Encargar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- Hero with parallax ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const heroImages = [heroImg, coffeeImg, appsImg, beverageImg];
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden bg-gradient-warm">
      <Nav />

      {/* decorative orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -left-40 h-64 w-64 rounded-full bg-rose/30 blur-3xl sm:h-96 sm:w-96"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -right-40 h-64 w-64 rounded-full bg-gold/30 blur-3xl sm:h-[30rem] sm:w-[30rem]"
        />
      </div>

      <motion.div style={{ opacity }} className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-4 pt-20 pb-12 sm:px-8 sm:pt-28 sm:pb-16 md:grid-cols-2 md:gap-12 md:pt-24 md:pb-20">
        <motion.div style={{ y: yText }} className="space-y-6 md:space-y-8">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-script text-2xl text-rose-deep sm:text-3xl"
          >
            dulce, fresco, hecho a mano
          </motion.p>

          <h1 className="text-balance text-4xl leading-[0.95] text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            {"Postres que".split(" ").map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.7 }}
                className="mr-3 inline-block"
              >
                {w}
              </motion.span>
            ))}
            <motion.em
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.9 }}
              className="font-script not-italic shimmer-text inline-block"
            >
              enamoran
            </motion.em>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="block"
            >
              en cada bocado.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Una línea de repostería artesanal en desarrollo. Estación de café,
            barra de bebidas y mesa de entremeses para hacer de tu evento un
            momento inolvidable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex flex-wrap gap-2 sm:gap-4"
          >
            <a
              href="#contacto"
              className="group relative overflow-hidden rounded-full bg-primary px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-primary-foreground shadow-soft transition hover:shadow-elegant sm:px-8 sm:py-4 sm:text-xs"
            >
              <span className="relative z-10">Hacer un pedido</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-gold transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#servicios"
              className="rounded-full border border-primary/30 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-primary transition hover:bg-primary/5 sm:px-8 sm:py-4 sm:text-xs"
            >
              Ver servicios
            </a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: yImg }} className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 sm:-inset-6 md:-inset-10"
          >
            <svg viewBox="0 0 200 200" className="h-full w-full opacity-40">
              <defs>
                <path id="circle" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
              </defs>
              <text className="fill-[var(--rose-deep)] text-[10px] uppercase tracking-[0.3em]">
                <textPath href="#circle">
                  ✦ hecho con amor ✦ frescura diaria ✦ artesanal ✦ por encargo
                </textPath>
              </text>
            </svg>
          </motion.div>

          <div className="absolute -inset-4 rounded-full bg-gradient-gold opacity-20 blur-3xl" />

          <div className="relative w-full aspect-square sm:aspect-auto sm:h-80 md:h-[32rem]">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIndex}
                src={heroImages[imageIndex]}
                alt="Surtido de postres artesanales de Bonbon by Cusani"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="relative w-full h-full rounded-[2rem] object-cover shadow-elegant"
              />
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="absolute -bottom-4 -left-2 rounded-2xl bg-card p-4 shadow-soft sm:-bottom-6 sm:-left-6 sm:p-5"
          >
            <p className="font-script text-2xl text-gradient-gold sm:text-3xl">100%</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">Frescura diaria</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span>scroll</span>
          <span className="block h-10 w-px bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Marquee strip ---------- */
function Marquee() {
  const items = ["✦ Estación de Café", "✦ Barra de Bebidas", "✦ Mesa de Entremeses", "✦ Hechos Diariamente", "✦ Por Encargo", "✦ Eventos Privados"];
  return (
    <div className="border-y border-primary/10 bg-primary py-8 text-primary-foreground overflow-hidden sm:py-10">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="mx-8 font-display text-xl italic sm:text-2xl md:mx-12 md:text-3xl">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Services ---------- */
const services = [
  { title: "Estación de Café", desc: "Café recién preparado y acompañamientos dulces para una experiencia cálida y elegante.", img: coffeeImg, tag: "01" },
  { title: "Barra de Bebidas", desc: "Limonadas artesanales, jugos y refrescos. (No trabajamos barra de bebidas alcohólicas.)", img: beverageImg, tag: "02" },
  { title: "Mesa de Entremeses", desc: "Tablas curadas con quesos, frutas, frutos secos y bocados salados perfectos para compartir.", img: appsImg, tag: "03" },
];

function Services() {
  return (
    <section id="servicios" className="relative py-24 sm:py-36 md:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Nuestros servicios</p>
          <h2 className="text-balance text-3xl text-primary sm:text-4xl md:text-5xl lg:text-6xl">
              Tres mesas, una <span className="font-script text-gradient-gold">experiencia</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground sm:text-base">
            Diseñamos cada estación pensando en la estética, el sabor y el detalle
            que tu evento merece.
          </p>
        </Reveal>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3 lg:gap-10">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15}>
              <motion.article
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-3xl bg-card shadow-soft"
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7 }}
                    className="h-72 w-full object-cover sm:h-80"
                  />
                </div>
                <div className="space-y-3 p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl text-primary sm:text-3xl">{s.title}</h3>
                    <span className="font-script text-2xl text-gold">{s.tag}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="h-px w-12 bg-gold transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-primary py-24 text-primary-foreground sm:py-36 md:py-48">
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -left-40 top-20 h-64 w-64 rounded-full bg-gold blur-3xl sm:h-96 sm:w-96"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-rose blur-3xl sm:h-96 sm:w-96"
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 sm:gap-12 sm:px-8 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="font-script text-2xl text-gold sm:text-3xl md:text-4xl">nuestra historia</p>
          <h2 className="mt-4 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Repostería hecha con <em className="font-script not-italic shimmer-text">amor</em>, todos los días.
          </h2>
        </Reveal>

        <Reveal delay={0.2} className="space-y-6">
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <motion.img
              src={ownersImg}
              alt="Dueños de Bonbon by Cusani"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
              className="h-full w-full object-cover aspect-[3/4]"
            />
          </div>
          <div className="space-y-6 text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            <p>
              Somos una línea de repostería en desarrollo y trabajamos
              <strong className="text-primary-foreground"> exclusivamente por encargo</strong>.
              Cada pieza se prepara el mismo día para llegar a tu mesa con la
              frescura, la textura y el sabor que merece.
            </p>
            <p>
              En Bonbon by Cusani creemos que un postre no es solo un dulce —
              es un detalle, una pausa, un recuerdo.
            </p>
            <div className="flex gap-8 pt-4 sm:gap-10">
              {[
                { v: "100%", l: "Artesanal" },
                { v: "24h", l: "Recién hecho" },
                { v: "∞", l: "Detalles" },
              ].map((x, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring" }}
                >
                  <p className="font-display text-4xl text-gold sm:text-5xl">{x.v}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60 sm:text-xs">{x.l}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Lightbox Gallery ---------- */
function LightboxGallery() {
  const items = [heroImg, coffeeImg, appsImg, beverageImg, heroImg, appsImg, beverageImg, coffeeImg, appsImg, heroImg];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedIndex(null);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <>
      <section id="galeria" className="py-24 sm:py-36 md:py-48">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Reveal className="mb-12 text-center md:mb-20">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold sm:mb-4">Galería</p>
            <h2 className="text-3xl text-primary sm:text-4xl md:text-5xl lg:text-6xl">
              Pequeños <span className="font-script text-gradient-gold">placeres</span>.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:grid-cols-5">
            {items.map((src, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.button
                  onClick={() => setSelectedIndex(i)}
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-2xl shadow-soft aspect-square w-full cursor-pointer border-none bg-none p-0"
                >
                  <motion.img
                    src={src}
                    alt=""
                    loading="lazy"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.7 }}
                    className="h-full w-full object-cover"
                  />
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl mx-4"
            >
              <motion.img
                key={selectedIndex}
                src={items[selectedIndex]}
                alt={`Imagen ${selectedIndex + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
              />

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 rounded-full bg-white/20 hover:bg-white/30 transition text-white z-10"
                aria-label="Imagen anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 rounded-full bg-white/20 hover:bg-white/30 transition text-white z-10"
                aria-label="Siguiente imagen"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Close button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-10 right-0 text-white hover:text-gold transition"
                aria-label="Cerrar"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
                {selectedIndex + 1} / {items.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Gallery ---------- */
function Gallery() {
  return <LightboxGallery />;
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-gradient-warm py-24 sm:py-36 md:py-48">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -right-32 top-10 h-40 w-40 rounded-full border border-gold/20 sm:-right-20 sm:top-20 sm:h-72 sm:w-72"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -left-32 -bottom-20 h-48 w-48 rounded-full border border-rose/20 sm:-left-20 sm:bottom-20 sm:h-96 sm:w-96"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-8">
        <Reveal>
          <p className="font-script text-2xl text-rose-deep sm:text-3xl md:text-4xl">¿listo para algo dulce?</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 text-balance text-3xl text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            Hagamos tu próximo <em className="font-script not-italic shimmer-text">evento</em> inolvidable.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
            Cuéntanos los detalles de tu celebración. Respondemos cada mensaje
            personalmente para diseñar una propuesta a tu medida.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4 sm:mt-10">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/?text=Hola%20Bonbon%20by%20Cusani,%20me%20gustaría%20hacer%20un%20pedido"
              className="rounded-full bg-primary px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-primary-foreground shadow-soft animate-pulse-glow sm:px-10 sm:py-4 sm:text-xs md:text-sm"
            >
              Escribir por WhatsApp
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="mailto:hola@bonboncusani.com"
              className="rounded-full border border-primary/30 px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-primary transition hover:bg-primary/5 sm:px-10 sm:py-4 sm:text-xs md:text-sm"
            >
              Enviar email
            </motion.a>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-14 flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:gap-12 sm:text-xs">
            <span>✦ Solo por entregas</span>
            <span>✦ Pedidos con anticipación</span>
            <span>✦ Eventos privados</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card py-14 sm:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:px-8 md:flex-row">
        <img src={logoImg} alt="Bonbon by Cusani" className="h-14 w-auto sm:h-16" />
        <p className="text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
          © {new Date().getFullYear()} Bonbon by Cusani · Hecho con dulzura
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
