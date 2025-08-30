"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Mail } from "lucide-react";

type FloatingOrbProps = { className?: string; delay?: number; duration?: number };

const FloatingOrb: React.FC<FloatingOrbProps> = ({ className = "", delay = 0, duration = 16 }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
            opacity: 1,
            y: [0, -20, 0],
            x: [0, 10, 0],
            filter: ["blur(60px)", "blur(80px)", "blur(60px)"],
        }}
        transition={{ duration, ease: "easeInOut", repeat: Infinity, delay }}
        className={className}
    />
);

const Grain: React.FC = () => (
    <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-soft-light"
        style={{
            backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
        }}
    />
);

const GlowDivider: React.FC = () => (
    <div className="relative mx-auto mt-10 w-full max-w-4xl">
        <div className="absolute inset-0 -z-10 blur-2xl">
            <div className="h-24 w-full bg-gradient-to-r from-blue-700/40 via-violet-600/50 to-fuchsia-600/40 opacity-50" />
        </div>
        <motion.hr
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-px border-0 bg-gradient-to-r from-blue-400/50 via-violet-400/60 to-fuchsia-400/50"
        />
    </div>
);

const BrandMark: React.FC = () => (
    <div className="flex items-center gap-3">

        <span className="text-xl font-semibold tracking-wide text-white">Weskale Agency</span>
    </div>
);

const ComingSoonWeskale: React.FC = () => {
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
            <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-700/20 blur-[120px]" />
            <div className="absolute top-[-10rem] right-[-6rem] h-[420px] w-[420px] rounded-full bg-violet-700/25 blur-[120px]" />
            <div className="absolute bottom-[-10rem] left-1/3 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-fuchsia-700/20 blur-[110px]" />

            <FloatingOrb className="absolute left-12 top-24 h-40 w-40 rounded-full bg-blue-500/20" delay={0.4} duration={18} />
            <FloatingOrb className="absolute right-24 top-40 h-56 w-56 rounded-full bg-violet-500/20" delay={0.8} duration={20} />
            <FloatingOrb className="absolute bottom-24 left-1/4 h-52 w-52 -translate-x-1/2 rounded-full bg-fuchsia-500/20" delay={1.2} duration={22} />

            <Grain />

            <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
                <BrandMark />
                <div className="flex items-center gap-5 text-sm text-white/70">


                    <a href="#notify" className="rounded-full bg-white/5 px-4 py-2 font-medium text-white/90 backdrop-blur-md transition hover:bg-white/10">
                        Get notified
                    </a>
                </div>
            </header>

            <main className="relative z-10 mx-auto grid w-full max-w-7xl place-items-center px-6 pt-12 pb-20 md:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                >
                    <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400" />
                        <span>Site under construction</span>
                    </div>

                    <h1 className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                        Measured creativity.
                        <span className="block text-white/70">Calculated impact.</span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
                        We’re building a premium, performance-driven experience: a dark interface, soft blue-violet halos,
                        and motion engineered to convert. Built by Weskale ID-Brandlab, Weskale Digital, and Weskale Influence.
                    </p>

                    <GlowDivider />

                    <motion.form
                        id="notify"
                        onSubmit={(e) => e.preventDefault()}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                        className="mx-auto mt-10 flex w-full max-w-xl items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-2 px-2 text-white/70">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">Be first to know</span>
                        </div>
                        <input
                            type="email"
                            required
                            placeholder="Your work email"
                            className="peer w-full rounded-xl bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 outline-none"
                        />
                        <button
                            type="submit"
                            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-700 px-4 py-3 text-sm font-medium text-white shadow-[0_0_30px_-10px_rgba(99,102,241,0.65)] transition hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.9)]"
                        >
                            Notify me
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </button>
                    </motion.form>

                    <p className="mx-auto mt-4 max-w-xl text-xs text-white/50">
                        No newsletter. A single alert on launch day.
                    </p>
                </motion.div>
            </main>

            <footer className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10">
                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row">
                    <div className="flex items-center gap-2">
                        <span>© {year} IMY HOLDING INVESTMENTS LTD Ltd.</span>
                        <span className="hidden md:inline">— Site in progress.</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="https://www.instagram.com/weskaleagency" className="hover:text-white/90" aria-label="Instagram">
                            <Instagram className="h-4 w-4" />
                        </a>
                        <a href="https://www.linkedin.com/company/weskale-agency/posts/?feedView=all" className="hover:text-white/90" aria-label="LinkedIn">
                            <Linkedin className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </footer>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-600/10 via-violet-500/10 to-transparent blur-2xl" />
        </div>
    );
};

export default ComingSoonWeskale;
