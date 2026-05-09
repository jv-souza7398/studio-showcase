import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type Project = {
  name: string;
  tagline: string;
  image: string;
  url: string;
  tag: string;
};

const projects: Project[] = [
  { name: "Maison Lavoir", tagline: "Heritage fashion house, reimagined for the digital floor.", image: p1, url: "#", tag: "Fashion" },
  { name: "Ostra & Vine", tagline: "A coastal restaurant where every scroll feels like a tasting.", image: p2, url: "#", tag: "Hospitality" },
  { name: "Fold Architects", tagline: "Quiet portfolio for a studio that builds in concrete.", image: p3, url: "#", tag: "Architecture" },
  { name: "Hôtel Solène", tagline: "Boutique hotel booking, paced like a cinematic stay.", image: p4, url: "#", tag: "Travel" },
  { name: "Ember Roastery", tagline: "Single-origin commerce with the warmth of a café.", image: p5, url: "#", tag: "E-commerce" },
  { name: "Galerie Noir", tagline: "Contemporary gallery presenting works as living rooms.", image: p6, url: "#", tag: "Culture" },
];

function Index() {
  return (
    <div className="grain relative min-h-screen overflow-x-hidden bg-bg text-text">
      <Navbar />
      <Hero />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-[color:var(--bg)]/70 border-b border-[color:var(--border)]" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="font-serif text-2xl tracking-tight text-text">
          studio<span className="text-gold">.</span>
        </a>
        <ul className="hidden items-center gap-10 text-sm uppercase tracking-[0.2em] text-text-muted md:flex">
          {[
            { label: "Work", href: "#work" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden rounded-full border border-[color:var(--gold)]/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-bg md:inline-block"
        >
          Start a project
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-6 pt-32 md:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(158,130,83,0.12), transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(105,81,50,0.18), transparent 55%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl">
        <p className="animate-fade-up mb-8 text-xs uppercase tracking-[0.4em] text-gold">
          Independent design studio · Est. 2020
        </p>
        <h1
          className="animate-fade-up text-balance font-serif text-[clamp(3rem,9vw,9rem)] leading-[0.95] text-text"
          style={{ animationDelay: "120ms" }}
        >
          Websites that <em className="italic text-text-muted">live</em>
          <br />
          and breathe.
        </h1>
        <p
          className="animate-fade-up mt-10 max-w-xl text-lg leading-relaxed text-text-muted"
          style={{ animationDelay: "240ms" }}
        >
          We design immersive digital homes for brands who refuse to feel like everyone else.
        </p>

        <div
          className="animate-fade-up absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-text-muted md:flex"
          style={{ animationDelay: "500ms" }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-[color:var(--gold)] to-transparent">
            <span className="block h-2 w-px animate-scroll-bounce bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const next = () => setActive((i) => (i + 1) % projects.length);
  const prev = () => setActive((i) => (i - 1 + projects.length) % projects.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (focused !== null) {
        if (e.key === "Escape") setFocused(null);
        return;
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused]);

  return (
    <section id="work" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">Selected work</p>
            <h2 className="font-serif text-5xl text-text md:text-7xl">A small archive.</h2>
          </div>
          <p className="max-w-sm text-text-muted">
            Six recent pieces. Use the arrows, swipe, or click a card to step inside.
          </p>
        </div>

        {/* Desktop / tablet 3D carousel */}
        <div
          ref={stageRef}
          className="perspective-stage relative hidden h-[560px] items-center justify-center md:flex"
        >
          {projects.map((p, i) => {
            const offset = i - active;
            const total = projects.length;
            // shortest path
            let d = offset;
            if (d > total / 2) d -= total;
            if (d < -total / 2) d += total;

            const abs = Math.abs(d);
            const visible = abs <= 2;
            const translateX = d * 320;
            const rotateY = d * -22;
            const translateZ = -abs * 220;
            const opacity = abs > 2 ? 0 : 1 - abs * 0.25;
            const z = 100 - abs;

            return (
              <button
                key={p.name}
                onClick={() => (i === active ? setFocused(i) : setActive(i))}
                aria-label={i === active ? `Open ${p.name}` : `View ${p.name}`}
                className="card-3d group absolute h-[460px] w-[680px] max-w-[80vw] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-surface text-left"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                  opacity,
                  zIndex: z,
                  pointerEvents: visible ? "auto" : "none",
                  boxShadow:
                    abs === 0
                      ? "0 50px 100px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(158,130,83,0.4), 0 0 80px -10px rgba(158,130,83,0.25)"
                      : "0 30px 60px -20px rgba(0,0,0,0.6)",
                }}
              >
                <img
                  src={p.image}
                  alt={`${p.name} website preview`}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(45,34,30,0) 30%, rgba(45,34,30,0.85) 80%, rgba(45,34,30,0.95) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-8">
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-gold">{p.tag}</p>
                    <h3 className="font-serif text-3xl text-text">{p.name}</h3>
                    <p className="mt-2 max-w-md text-sm text-text-muted">{p.tagline}</p>
                  </div>
                  {abs === 0 && (
                    <span className="shrink-0 rounded-full border border-[color:var(--gold)]/50 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold transition-colors group-hover:bg-gold group-hover:text-bg">
                      Enter →
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-12 hidden items-center justify-between md:flex">
          <div className="flex items-center gap-3">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-px transition-all ${
                  i === active ? "w-12 bg-gold" : "w-6 bg-[color:var(--text-muted)]/40 hover:bg-[color:var(--text-muted)]"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous"
              className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--border)] text-text-muted transition-all hover:border-gold hover:text-gold"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--border)] text-text-muted transition-all hover:border-gold hover:text-gold"
            >
              →
            </button>
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="flex flex-col gap-8 md:hidden">
          {projects.map((p) => (
            <article
              key={p.name}
              className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-surface"
            >
              <img
                src={p.image}
                alt={`${p.name} website preview`}
                width={1280}
                height={800}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-6">
                <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-gold">{p.tag}</p>
                <h3 className="font-serif text-2xl text-text">{p.name}</h3>
                <p className="mt-2 text-sm text-text-muted">{p.tagline}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block rounded-full border border-[color:var(--gold)]/50 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-gold"
                >
                  View site →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Focus mode */}
      {focused !== null && (
        <FocusView project={projects[focused]} onClose={() => setFocused(null)} />
      )}
    </section>
  );
}

function FocusView({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/95 px-6 py-10 backdrop-blur-xl animate-fade-up"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-[color:var(--gold)]/30 bg-surface gold-glow"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-[color:var(--border)] bg-bg/60 text-text-muted backdrop-blur transition hover:border-gold hover:text-gold"
        >
          ✕
        </button>
        <img
          src={project.image}
          alt={`${project.name} expanded preview`}
          width={1280}
          height={800}
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-end md:p-12">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-gold">{project.tag}</p>
            <h3 className="font-serif text-4xl text-text md:text-6xl">{project.name}</h3>
            <p className="mt-4 max-w-xl text-text-muted">{project.tagline}</p>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold px-7 py-3 text-xs uppercase tracking-[0.3em] text-bg transition hover:bg-gold-soft"
          >
            View site →
          </a>
        </div>
      </div>
    </div>
  );
}

function About() {
  const stats = [
    { value: "12", label: "Projects shipped" },
    { value: "5", label: "Years of practice" },
    { value: "3", label: "Countries served" },
  ];
  return (
    <section id="about" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">About the studio</p>
          <h2 className="font-serif text-5xl text-text md:text-6xl">
            Quiet craft, <em className="italic text-text-muted">loud</em> intent.
          </h2>
        </div>
        <div className="flex flex-col gap-10">
          <p className="text-lg leading-relaxed text-text-muted">
            studio. is a two-person practice designing and building websites for hospitality,
            culture and considered commerce. We work in small batches, treat type as a material,
            and ship sites that feel as good as they look — six months later.
          </p>
          <div className="grid grid-cols-3 gap-6 border-t border-[color:var(--border)] pt-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-4xl text-gold md:text-5xl">{s.value}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative px-6 py-32 md:px-10">
      <div
        className="mx-auto max-w-4xl rounded-3xl border border-[color:var(--border)] p-10 md:p-16"
        style={{
          background:
            "linear-gradient(160deg, rgba(78,61,43,0.6), rgba(45,34,30,0.9))",
        }}
      >
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">Contact</p>
        <h2 className="font-serif text-5xl text-text md:text-6xl">Let's make something quiet.</h2>
        <p className="mt-4 max-w-lg text-text-muted">
          Tell us about your brand. We reply within two working days.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-12 grid gap-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Name" name="name" type="text" />
            <Field label="Email" name="email" type="email" />
          </div>
          <Field label="Message" name="message" textarea />
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">
              {sent ? "Thank you — we'll be in touch." : "We read every message."}
            </span>
            <button
              type="submit"
              className="rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-[0.3em] text-bg transition hover:bg-gold-soft"
            >
              Send →
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full bg-transparent border-b border-[color:var(--border)] py-3 text-text placeholder:text-text-muted/50 focus:border-gold focus:outline-none transition-colors";
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-text-muted">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} rows={4} className={cls} required />
      ) : (
        <input name={name} type={type} className={cls} required />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-xs text-text-muted md:flex-row">
        <span>© {new Date().getFullYear()} studio. All rights reserved.</span>
        <div className="flex items-center gap-5">
          {[
            { label: "GitHub", href: "https://github.com" },
            { label: "LinkedIn", href: "https://linkedin.com" },
            { label: "Instagram", href: "https://instagram.com" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="uppercase tracking-[0.3em] transition-colors hover:text-gold"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
