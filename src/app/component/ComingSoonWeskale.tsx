"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

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
        <Image
            src="/WESKALE.svg" // ton logo dans /public
            alt="Weskale Logo"
            width={120}        // ajuste selon ta DA
            height={40}
            priority
            className="h-9 w-auto"
        />
        <span className="text-xl font-semibold tracking-wide text-white">
      Weskale Agency
    </span>
    </div>
);


const ComingSoonWeskale: React.FC = () => {
    const year = useMemo(() => new Date().getFullYear(), []);
    const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const email = String(data.get("email") || "").trim();

        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/notify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            setStatus(res.ok ? "ok" : "error");
            if (res.ok) form.reset();
        } catch {
            setStatus("error");
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
            {/* halos background */}
            <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-700/20 blur-[120px]" />
            <div className="absolute top-[-10rem] right-[-6rem] h-[420px] w-[420px] rounded-full bg-violet-700/25 blur-[120px]" />
            <div className="absolute bottom-[-10rem] left-1/3 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-fuchsia-700/20 blur-[110px]" />

            {/* animated orbs */}
            <FloatingOrb className="absolute left-12 top-24 h-40 w-40 rounded-full bg-blue-500/20" delay={0.4} duration={18} />
            <FloatingOrb className="absolute right-24 top-40 h-56 w-56 rounded-full bg-violet-500/20" delay={0.8} duration={20} />
            <FloatingOrb className="absolute bottom-24 left-1/4 h-52 w-52 -translate-x-1/2 rounded-full bg-fuchsia-500/20" delay={1.2} duration={22} />

            <Grain />

            {/* header */}
            <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
                <BrandMark />
                <div className="flex items-center gap-5 text-sm text-white/70">
                    <a
                        href="www.instagram.com/weskaleagency"
                        className="rounded-full bg-white/5 px-4 py-2 font-medium text-white/90 backdrop-blur-md transition hover:bg-white/10"
                    >
                        Get notified
                    </a>
                </div>
            </header>

            {/* main content */}
            <main className="relative z-10 mx-auto grid w-full max-w-7xl place-items-center px-6 pt-12 pb-20 md:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                >
                    {/* badge */}
                    <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400" />
                        <span>Website in progress</span>
                    </div>

                    {/* headline */}
                    <h1 className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                        Measured creativity.
                        <span className="block text-white/70">Calculated impact.</span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
                        Behind the scenes, precision is at work.
                        Soon, creativity will meet impact.
                    </p>

                    <GlowDivider />

                    {/* form */}


                    {/* feedback */}
                    {status === "ok" && (
                        <p className="mx-auto mt-4 max-w-xl text-xs text-emerald-400">
                            Thanks — we’ll notify you at launch.
                        </p>
                    )}
                    {status === "error" && (
                        <p className="mx-auto mt-4 max-w-xl text-xs text-red-400">
                            Oops, something went wrong. Try again.
                        </p>
                    )}

                </motion.div>
            </main>

            {/* footer */}
            <footer className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10">
                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row">
                    <div className="flex items-center gap-2">
                        <span>© {year} Weskale Agency</span>
                        <span className="hidden md:inline">— Site in progress.</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.instagram.com/weskaleagency"
                            className="hover:text-white/90"
                            aria-label="Instagram"
                        >
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
            </footer>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-600/10 via-violet-500/10 to-transparent blur-2xl" />
        </div>
    );
};

export default ComingSoonWeskale;
