import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-desserts.jpg";
import coffeeImg from "@/assets/coffee-station.jpg";
import beverageImg from "@/assets/beverage-bar.jpg";
import appsImg from "@/assets/appetizers.jpg";
import logoImg from "@/assets/logo.png";

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
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Allura&family=Jost:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#top" className="font-display text-2xl tracking-wide text-primary">
          Bonbon <span className="font-script text-gold">by Cusani</span>
        </a>
        <div className="hidden gap-10 text-sm uppercase tracking-[0.2em] md:flex">
          <a href="#servicios" className="text-foreground/70 hover:text-primary transition">Servicios</a>
          <a href="#nosotros" className="text-foreground/70 hover:text-primary transition">Nosotros</a>
          <a href="#galeria" className="text-foreground/70 hover:text-primary transition">Galería</a>
          <a href="#contacto" className="text-foreground/70 hover:text-primary transition">Contacto</a>
        </div>
        <a
          href="#contacto"
          className="hidden rounded-full bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-soft hover:opacity-90 md:inline-block"
        >
          Encargar
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-gradient-warm">
      <Nav />
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pt-32 pb-20 md:grid-cols-2 md:pt-24">
        <div className="space-y-8">
          <p className="font-script text-3xl text-rose-deep" style={{ color: "var(--rose-deep)" }}>
            dulce, fresco, hecho a mano
          </p>
          <h1 className="text-5xl leading-[0.95] text-primary md:text-7xl lg:text-8xl">
            Postres que <em className="font-script text-gradient-gold not-italic">enamoran</em> en cada bocado.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Una línea de repostería artesanal en desarrollo. Estación de café,
            barra de bebidas y mesa de entremeses para hacer de tu evento un
            momento inolvidable.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="rounded-full bg-primary px-8 py-4 text-sm uppercase tracking-[0.25em] text-primary-foreground shadow-soft hover:translate-y-[-2px] transition"
            >
              Hacer un pedido
            </a>
            <a
              href="#servicios"
              className="rounded-full border border-primary/30 px-8 py-4 text-sm uppercase tracking-[0.25em] text-primary hover:bg-primary/5 transition"
            >
              Ver servicios
            </a>
          </div>
          <div className="flex items-center gap-6 pt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span>✦ Hechos diariamente</span>
            <span>✦ Solo por encargo</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-gradient-gold opacity-20 blur-3xl" />
          <img
            src={heroImg}
            alt="Surtido de postres artesanales de Bonbon by Cusani"
            width={1536}
            height={1280}
            className="relative animate-float rounded-[2rem] object-cover shadow-elegant"
          />
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-card p-5 shadow-soft md:block">
            <p className="font-script text-3xl text-gradient-gold">100%</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Frescura diaria</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Estación de Café",
    desc: "Café recién preparado y acompañamientos dulces para una experiencia cálida y elegante.",
    img: coffeeImg,
    tag: "01",
  },
  {
    title: "Barra de Bebidas",
    desc: "Limonadas artesanales, jugos y refrescos. (No trabajamos barra de bebidas alcohólicas.)",
    img: beverageImg,
    tag: "02",
  },
  {
    title: "Mesa de Entremeses",
    desc: "Tablas curadas con quesos, frutas, frutos secos y bocados salados perfectos para compartir.",
    img: appsImg,
    tag: "03",
  },
];

function Services() {
  return (
    <section id="servicios" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Nuestros servicios</p>
            <h2 className="text-5xl text-primary md:text-6xl">
              Tres mesas, una <span className="font-script text-gradient-gold">experiencia</span>.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Diseñamos cada estación pensando en la estética, el sabor y el detalle
            que tu evento merece.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-3xl bg-card shadow-soft transition hover:shadow-elegant"
            >
              <div className="overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl text-primary">{s.title}</h3>
                  <span className="font-script text-2xl text-gold">{s.tag}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-primary py-28 text-primary-foreground md:py-36">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-rose blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <p className="font-script text-4xl text-gold">nuestra historia</p>
          <h2 className="mt-4 text-5xl md:text-6xl">
            Repostería hecha con <em className="font-script not-italic text-gold">amor</em>, todos los días.
          </h2>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-primary-foreground/80">
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
          <div className="flex gap-10 pt-4">
            <div>
              <p className="font-display text-5xl text-gold">100%</p>
              <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">Artesanal</p>
            </div>
            <div>
              <p className="font-display text-5xl text-gold">24h</p>
              <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">Recién hecho</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const items = [heroImg, coffeeImg, appsImg, beverageImg];
  return (
    <section id="galeria" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Galería</p>
          <h2 className="text-5xl text-primary md:text-6xl">
            Pequeños <span className="font-script text-gradient-gold">placeres</span>.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl shadow-soft ${
                i % 3 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="bg-gradient-warm py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="font-script text-4xl text-rose-deep" style={{ color: "var(--rose-deep)" }}>
          ¿listo para algo dulce?
        </p>
        <h2 className="mt-4 text-5xl text-primary md:text-7xl">
          Hagamos tu próximo <em className="font-script text-gradient-gold not-italic">evento</em> inolvidable.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Cuéntanos los detalles de tu celebración. Respondemos cada mensaje
          personalmente para diseñar una propuesta a tu medida.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/?text=Hola%20Bonbon%20by%20Cusani,%20me%20gustaría%20hacer%20un%20pedido"
            className="rounded-full bg-primary px-10 py-5 text-sm uppercase tracking-[0.25em] text-primary-foreground shadow-soft hover:translate-y-[-2px] transition"
          >
            Escribir por WhatsApp
          </a>
          <a
            href="mailto:hola@bonboncusani.com"
            className="rounded-full border border-primary/30 px-10 py-5 text-sm uppercase tracking-[0.25em] text-primary hover:bg-primary/5 transition"
          >
            Enviar email
          </a>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-12 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          <span>✦ Solo por entregas</span>
          <span>✦ Pedidos con anticipación</span>
          <span>✦ Eventos privados</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <img src={logoImg} alt="Bonbon by Cusani" className="h-16 w-auto" />
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
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
      <Services />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
