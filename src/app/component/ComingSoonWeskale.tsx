"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MotionProps } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Mail, X as Close } from "lucide-react";
import Image from "next/image";

/* ------------------ Motion easing (typed, no TS errors) ------------------ */
const EASE: CubicBezierDefinition = [0.22, 1, 0.36, 1]; // smooth premium ease-out

/* ------------------ Hooks & Motion helpers ------------------ */
// Smooth scroll that accounts for sticky header height (mobile-safe)
const useSmoothScroll = () => {
    const HEADER_OFFSET = 72; // keep in sync with your header height
    return (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const absoluteY = rect.top + window.scrollY;
        const targetY = Math.max(absoluteY - HEADER_OFFSET, 0);
        window.scrollTo({ top: targetY, behavior: "smooth" });
    };
};

const useMounted = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
};

const fadeInView = (delay = 0): Pick<MotionProps, "initial" | "whileInView" | "viewport"> => ({
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
    viewport: { once: true, amount: 0.2 },
});

/* ------------------ Visual FX ------------------ */
type FloatingOrbProps = { className?: string; delay?: number; duration?: number };
const FloatingOrb: React.FC<FloatingOrbProps> = ({ className = "", delay = 0, duration = 16 }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
            opacity: 1,
            y: [0, -20, 0] as const,
            x: [0, 10, 0] as const,
            // Keep your blur sheen; typed as const so TS is happy:
            filter: ["blur(60px)", "blur(80px)", "blur(60px)"] as const,
        }}
        transition={{ duration, ease: EASE, repeat: Infinity, delay }}
        className={className}
    />
);

const Grain: React.FC = () => (
    <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-soft-light"
        style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
        }}
    />
);

const GlowDivider: React.FC = () => (
    <div className="relative mx-auto my-10 w-full max-w-4xl">
        <div className="absolute inset-0 -z-10 blur-2xl">
            <div className="h-24 w-full bg-gradient-to-r from-[var(--electric)]/40 via-violet-600/50 to-fuchsia-600/40 opacity-50" />
        </div>
        <motion.hr
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1, ease: EASE }}
            className="h-px border-0 bg-gradient-to-r from-[var(--electric)]/50 via-violet-400/60 to-fuchsia-400/50"
        />
    </div>
);

/* Neon strip that fades in when section is visible */
const SectionGlow: React.FC = () => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.8, ease: EASE } }}
        viewport={{ once: true, amount: 0.2 }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 h-24 blur-3xl"
        style={{
            background:
                "radial-gradient(60% 100% at 50% 0%, rgba(0,178,255,0.18), transparent 60%), radial-gradient(60% 100% at 50% 0%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(60% 100% at 50% 0%, rgba(217,70,239,0.14), transparent 60%)",
        }}
    />
);

/* ------------------ Reusable UI ------------------ */
const BrandMark: React.FC = () => (
    <div className="flex items-center gap-3">
        <Image src="/WESKALE.svg" alt="Weskale Logo" width={120} height={40} priority className="h-9 w-auto" />
        <span className="text-xl font-semibold tracking-wide text-white">Weskale Agency</span>
    </div>
);

/* Two-line title: lower line in electric blue */
const Title: React.FC<{ top: string; bottom: string; center?: boolean }> = ({ top, bottom, center }) => (
    <h2
        className={`max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl ${
            center ? "mx-auto text-center" : ""
        }`}
    >
        {top}
        <span className="block text-[var(--electric)]">{bottom}</span>
    </h2>
);

/* ------------------ Modals ------------------ */
type ModalBaseProps = { open: boolean; onClose: () => void; children: React.ReactNode; maxW?: string };
const ModalBase: React.FC<ModalBaseProps> = ({ open, onClose, children, maxW = "max-w-3xl" }) => {
    // iOS-safe body lock (no jump)
    useEffect(() => {
        if (!open) return;
        const scrollY = window.scrollY;

        const { style } = document.body;
        const prevOverflow = style.overflow;
        const prevPosition = style.position;
        const prevTop = style.top;
        const prevWidth = style.width;

        style.position = "fixed";
        style.top = `-${scrollY}px`;
        style.width = "100%";
        style.overflow = "hidden";

        const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleKey);

        return () => {
            window.removeEventListener("keydown", handleKey);
            style.position = prevPosition;
            style.top = prevTop;
            style.width = prevWidth;
            style.overflow = prevOverflow;
            window.scrollTo(0, scrollY);
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm md:backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className={`relative w-full ${maxW} overflow-hidden rounded-2xl border border-white/10 bg-neutral-900`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            className="absolute right-3 top-3 z-10 rounded-full bg-white/10 p-2 text-white/80 transition hover:bg-white/20"
                        >
                            <Close className="h-5 w-5" />
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const CalendlyModal: React.FC<{ open: boolean; onClose: () => void; url: string }> = ({ open, onClose, url }) => (
    <ModalBase open={open} onClose={onClose} maxW="max-w-3xl">
        <div className="aspect-[16/12] w-full">
            <iframe title="Book a meeting — Calendly" src={url} className="h-full w-full" allow="clipboard-write; fullscreen" />
        </div>
    </ModalBase>
);

const QuoteModal: React.FC<{ open: boolean; onClose: () => void; title: string; quote: string }> = ({
                                                                                                        open,
                                                                                                        onClose,
                                                                                                        title,
                                                                                                        quote,
                                                                                                    }) => (
    <ModalBase open={open} onClose={onClose} maxW="max-w-2xl">
        <div className="relative p-8">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-white/80">“{quote}”</p>
            <div className="mt-6">
                <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
                >
                    Close
                </button>
            </div>
        </div>
    </ModalBase>
);

/* ------------------ Page ------------------ */
const OnePageWeskale: React.FC = () => {
    const mounted = useMounted();
    const year = useMemo(() => new Date().getFullYear(), []);
    const scrollTo = useSmoothScroll();
    const [calOpen, setCalOpen] = useState(false);
    const calendlyUrl = "https://calendly.com/contact-weskaleagency/30min?month=2025-09"; // TODO: VERIFY

    // Expertise modals
    const [expertise, setExpertise] = useState<null | "identity" | "digital" | "influence">(null);

    if (!mounted) return null; // avoid hydration mismatch

    return (
        <div className="relative min-h-[100svh] w-full overflow-x-hidden bg-black text-white">
            {/* Background halos */}
            <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[var(--electric)]/20 blur-[120px]" />
            <div className="absolute top-[-10rem] right-[-6rem] h-[420px] w-[420px] rounded-full bg-violet-700/25 blur-[120px]" />
            <div className="absolute bottom-[-10rem] left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-fuchsia-700/20 blur-[110px]" />
            <FloatingOrb className="absolute left-12 top-24 h-40 w-40 rounded-full bg-[var(--electric)]/20" delay={0.4} duration={18} />
            <FloatingOrb className="absolute right-24 top-40 h-56 w-56 rounded-full bg-violet-500/20" delay={0.8} duration={20} />
            <FloatingOrb className="absolute bottom-24 left-1/3 h-52 w-52 -translate-x-1/2 rounded-full bg-fuchsia-500/20" delay={1.2} duration={22} />
            <Grain />

            {/* Sticky Nav (lighter blur on mobile) */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-sm md:backdrop-blur-md">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
                    <BrandMark />
                    <nav className="hidden gap-6 text-sm text-white/80 md:flex">
                        {[
                            { id: "home", label: "Home" },
                            { id: "process", label: "Our Process" },
                            { id: "solutions", label: "Our Solutions" },
                            { id: "contacts", label: "Contacts" },
                            { id: "network", label: "Join Our Network" },
                        ].map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollTo(link.id)}
                                className="rounded-md px-2 py-1 transition hover:text-white"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCalOpen(true)}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
                        >
                            Book a meeting <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* HOME */}
            <section id="home" className="scroll-mt-24">
                <main className="relative z-10 mx-auto grid w-full max-w-5xl place-items-center px-6 pt-16 pb-28">
                    <SectionGlow />
                    <motion.div {...fadeInView(0.05)} className="text-center">
                        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[var(--electric)] via-violet-400 to-fuchsia-400" />
                            <span>A new website experience is in progress.</span>
                        </div>

                        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                            Measured creativity.
                            <span className="block text-[var(--electric)]">Calculated impact.</span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
                            We build legacies, not just outputs. Weskale blends identity clarity, technical excellence, and scalable
                            influence to turn ambition into sustained performance.
                        </p>

                        <div className="mt-8 flex items-center justify-center gap-3">
                            <button
                                onClick={() => setCalOpen(true)}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                            >
                                Book a meeting <ArrowRight className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => scrollTo("solutions")}
                                className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
                            >
                                Explore solutions
                            </button>
                        </div>
                    </motion.div>

                    <GlowDivider />

                    {/* Clickable pillars */}
                    <motion.div {...fadeInView(0.1)} className="mx-auto grid w-full max-w-3xl grid-cols-3 gap-4">
                        {["Brandlab", "Digital", "Influence"].map((item) => (
                            <button
                                key={item}
                                onClick={() =>
                                    setExpertise(item === "Brandlab" ? "identity" : item === "Digital" ? "digital" : "influence")
                                }
                                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/80 backdrop-blur-sm transition hover:bg-white/10"
                            >
                                {item}
                            </button>
                        ))}
                    </motion.div>
                </main>
            </section>

            {/* OUR PROCESS — real client onboarding */}
            <section id="process" className="scroll-mt-24">
                <div className="relative mx-auto w-full max-w-5xl px-6 py-16 text-center">
                    <SectionGlow />
                    <Title top="Our process" bottom="Clarity → Performance → Scale" center />
                    <p className="mx-auto mt-3 max-w-2xl text-white/70">
                        A premium, measurable journey from first audit to enduring growth.
                    </p>

                    <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-3">
                        {[
                            {
                                title: "01 — Initial Audit",
                                text: "Rapid diagnostic of identity, stack, funnels, and data to surface the highest-ROI moves.",
                            },
                            {
                                title: "02 — Strategy & Roadmap",
                                text:
                                    "We align objectives, KPIs, and constraints. Then we architect a phased plan to de-risk and accelerate.",
                            },
                            {
                                title: "03 — Foundations",
                                text: "Brandlab refresh, design system, and technical baselines to ship faster with quality.",
                            },
                            {
                                title: "04 — Build & Integrate",
                                text: "Web/app delivery, analytics, SEO, CRM automation, and content ops wired for iteration.",
                            },
                            {
                                title: "05 — Launch & Influence",
                                text: "Creators, partners, and paid distribution to turn attention into predictable demand.",
                            },
                            {
                                title: "06 — Operate & Scale",
                                text: "Continuous optimization, reporting, and compounding wins—sustained performance over time.",
                            },
                        ].map((c, i) => (
                            <motion.div
                                key={c.title}
                                {...fadeInView(i * 0.03)}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 text-left"
                            >
                                <div
                                    className="absolute inset-0 -z-10 opacity-0 blur-2xl transition group-hover:opacity-100"
                                    style={{
                                        background:
                                            "radial-gradient(120px 120px at 20% 10%, rgba(255,255,255,0.08), transparent)",
                                    }}
                                />
                                <h3 className="text-base font-semibold">{c.title}</h3>
                                <p className="mt-2 text-sm text-white/70">{c.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        {/* OUR SOLUTIONS */}
<section id="solutions" className="scroll-mt-24">
  <div className="relative mx-auto w-full max-w-5xl px-6 py-16 text-center">
    <SectionGlow />
    <Title top="Solutions engineered" bottom="for sustained growth" center />
    <p className="mx-auto mt-3 max-w-2xl text-white/70">
      From Brandlab to Digital build and Influence scale, we deliver end-to-end value.
    </p>

    <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-3">
      {[
        {
          key: "identity",
          badge: "Brandlab",
          title: "Identity Systems & Story",
          items: ["Brand platforms", "Visual systems", "Playbooks", "Go-to-market narratives"],
          quote:
            "Identity is not decoration. It’s the operating system for trust and decision-making.",
        },
        {
          key: "digital",
          badge: "Digital",
          title: "High-Performance Build",
          items: ["Web & apps", "CRO & analytics", "SEO & content ops", "CRM & automations"],
          quote:
            "Software compounds. Clean architecture and tight feedback loops turn speed into advantage.",
        },
        {
          key: "influence",
          badge: "Influence",
          title: "Reach & Reputation",
          items: ["Creator programs", "Thought leadership", "PR assets", "Paid amplification"],
          quote:
            "Distribution is strategy. The best stories win when they meet the right audience at the right time.",
        },
      ].map((s, i) => (
        <motion.article
          key={s.title}
          {...fadeInView(i * 0.03)}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left"
        >
          {/* Haut de la card */}
          <div>
            <button
              onClick={() => setExpertise(s.key as "identity" | "digital" | "influence")}
              className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[var(--electric)] via-violet-400 to-fuchsia-400" />
              {s.badge}
            </button>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-white/70">
              {s.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-white/50" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bouton caché → visible au hover */}
          <button
            onClick={() => setCalOpen(true)}
            className="mt-auto inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 transition 
                       opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white/10"
          >
            Discuss this solution <ArrowRight className="h-4 w-4" />
          </button>

          {/* Glow au hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
            <div
              className="absolute -inset-1 rounded-3xl blur-2xl"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,178,255,.18), rgba(139,92,246,.18), rgba(217,70,239,.12))",
              }}
            />
          </div>

          {/* Quote modal */}
          <QuoteModal
            open={expertise === (s.key as "identity" | "digital" | "influence")}
            onClose={() => setExpertise(null)}
            title={s.badge}
            quote={s.quote}
          />
        </motion.article>
      ))}
    </div>
  </div>
</section>
            {/* CONTACTS */}
            <section id="contacts" className="scroll-mt-24">
                <div className="relative mx-auto w-full max-w-5xl px-6 py-16 text-center">
                    <SectionGlow />
                    <Title top="Contact us" bottom="Tell us where you want to go" center />
                    <p className="mx-auto mt-3 max-w-2xl text-white/70">We’ll architect the most efficient path to get there.</p>

                    <div className="mx-auto mt-8 grid max-w-3xl gap-6 md:grid-cols-2">
                        <motion.div {...fadeInView(0.05)} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left">
                            <h3 className="text-lg font-semibold">Book a strategy call</h3>
                            <p className="mt-2 text-sm text-white/70">30 minutes to align on goals, constraints, and growth levers.</p>
                            <div className="mt-4">
                                <button
                                    onClick={() => setCalOpen(true)}
                                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                                >
                                    Book via Calendly <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>

                        <motion.div {...fadeInView(0.1)} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left">
                            <h3 className="text-lg font-semibold">Email</h3>
                            <p className="mt-2 text-sm text-white/70">Prefer writing? We read every message.</p>
                            <a
                                href="mailto:hello@weskale.com"
                                className="mt-4 inline-flex items-center gap-2 text-sm text-white/90 underline-offset-4 hover:underline"
                            >
                                <Mail className="h-4 w-4" /> contact@weskaleagency.com
                            </a>
                            <div className="mt-4 flex items-center gap-4 text-white/70">
                                <a href="https://www.instagram.com/weskaleagency" aria-label="Instagram" className="hover:text-white">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/weskale-agency/posts/?feedView=all"
                                    aria-label="LinkedIn"
                                    className="hover:text-white"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* JOIN OUR NETWORK */}
            <section id="network" className="scroll-mt-24">
                <div className="relative mx-auto w-full max-w-5xl px-6 py-16 text-center">
                    <SectionGlow />
                    <Title top="Join our network" bottom="Collaborators who ship excellence" center />
                    <p className="mx-auto mt-3 max-w-2xl text-white/70">
                        Designers, engineers, analysts, creators. If you demand excellence and ship reliably, we want to meet you.
                    </p>

                    <motion.div
                        {...fadeInView(0.1)}
                        className="mx-auto mt-8 flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:flex-row md:items-center md:justify-between"
                    >
                        <p className="text-sm text-white/75">
                            Share your portfolio and two projects you’re proud of. We review weekly.
                        </p>
                        <a
                            href="mailto:talent@weskaleagency.com?subject=Join%20Weskale%20Network&body=Hi%20Weskale%2C%0D%0A%0D%0AHere%20are%20my%20links%20and%20two%20flagship%20projects%3A%0D%0A-%20%0D%0A-%20%0D%0A"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                        >
                            Apply via email <ArrowRight className="h-4 w-4" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10">
                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row">
                    <div className="flex items-center gap-2">
                        <span>© {year} Weskale Agency</span>
                        <span className="hidden md:inline">— Built with clarity, performance, and scale. by LeOuazz</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="https://www.instagram.com/weskaleagency" className="hover:text-white/90" aria-label="Instagram">
                            <Instagram className="h-4 w-4" />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/weskale-agency/posts/?feedView=all"
                            className="hover:text-white/90"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-4 w-4" />
                        </a>
                    </div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--electric)]/10 via-violet-500/10 to-transparent blur-2xl" />
            </footer>

            {/* Modals */}
            <CalendlyModal open={calOpen} onClose={() => setCalOpen(false)} url={calendlyUrl} />

            {/* Expertise quote modals (mounted once; controlled by state) */}
            <QuoteModal
                open={expertise === "identity"}
                onClose={() => setExpertise(null)}
                title="Brandlab"
                quote="Identity is not decoration—it’s the operating system for trust and decision-making."
            />
            <QuoteModal
                open={expertise === "digital"}
                onClose={() => setExpertise(null)}
                title="Digital"
                quote="Software compounds. Clean architecture and tight feedback loops turn speed into advantage."
            />
            <QuoteModal
                open={expertise === "influence"}
                onClose={() => setExpertise(null)}
                title="Influence"
                quote="Distribution is strategy. The best stories win when they meet the right audience at the right time."
            />
        </div>
    );
};

export default OnePageWeskale;

/* ---- Optional: per-page SEO metadata ---- */
export const metadata = {
    title: "Weskale — Premium Identity, Measured Growth",
    description:
        "Weskale builds legacies, not just outputs. We blend identity clarity, high-performance digital, and scalable influence to turn ambition into sustained performance.",
    openGraph: {
        title: "Weskale — Premium Identity, Measured Growth",
        description: "Identity clarity. Technical excellence. Scalable influence. Weskale delivers end-to-end value.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Weskale — Premium Identity, Measured Growth",
        description: "Build legacies with Weskale: Brandlab, Digital, Influence.",
    },
};
