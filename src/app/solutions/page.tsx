"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    ArrowRight, Building2, Globe, TrendingUp, MessageSquare, Calendar, Mail, X, Palette, Code2, BarChart3
} from "lucide-react";

// === Animation variants ===
const fadeInView = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
    viewport: { once: true, amount: 0.15 },
});
const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.12 } },
};

// === Contact Modal ===
const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.93, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.93, opacity: 0 }}
                    className="bg-neutral-900 border border-white/15 rounded-2xl p-8 max-w-md w-full relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h3 className="text-xl font-semibold text-white mb-6">Get in Touch</h3>
                    <div className="space-y-4">
                        <a
                            href="https://calendly.com/contact-weskaleagency/30min?month=2025-09"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                                <Calendar className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Book a Meeting</p>
                                <p className="text-white/60 text-sm">Schedule a 30-minute consultation</p>
                            </div>
                        </a>
                        <a
                            href="mailto:contact@weskaleagency.com"
                            className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                                <Mail className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Email Us</p>
                                <p className="text-white/60 text-sm">contact@weskaleagency.com</p>
                            </div>
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// === Glassy Stack Cards ===
const stackVariants = [
    {
        bg: "bg-gradient-to-br from-[#271135]/80 to-[#160b27]/90",
        border: "border-purple-900",
        shadow: "shadow-[0_8px_32px_0_rgba(150,80,255,0.18)]",
        icon: <Palette className="w-6 h-6 text-purple-300" />,
        title: "ID Studio",
        desc: "Brand identity & visual systems",
        date: "Creative Excellence",
    },
    {
        bg: "bg-gradient-to-br from-[#131c2e]/80 to-[#0c1221]/90",
        border: "border-blue-900",
        shadow: "shadow-[0_8px_32px_0_rgba(80,170,255,0.14)]",
        icon: <Code2 className="w-6 h-6 text-blue-300" />,
        title: "Weskale Digital",
        desc: "Digital platforms & experiences",
        date: "Technical Excellence",
    },
    {
        bg: "bg-gradient-to-br from-[#13221b]/80 to-[#0d1a14]/90",
        border: "border-green-900",
        shadow: "shadow-[0_8px_32px_0_rgba(40,180,130,0.15)]",
        icon: <BarChart3 className="w-6 h-6 text-green-300" />,
        title: "Weskale Influence",
        desc: "Growth & market positioning",
        date: "Scalable Impact",
    }
];

function GlassStackCards() {
    return (
        <div className="relative min-h-[180px] w-full flex justify-center items-end">
            {stackVariants.map((c, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, transition: { delay: 0.16 * i, duration: 0.6 } }}
                    viewport={{ once: true, amount: 0.7 }}
                    className={`absolute left-0 right-0 mx-auto 
            ${i === 2 ? "z-30 scale-105" : i === 1 ? "z-20 -translate-x-8 scale-100 blur-[1.5px] opacity-90" : "z-10 -translate-x-16 scale-95 blur-[2px] opacity-80"} 
            transition-all duration-500`}
                    style={{ bottom: `${i * 22}px`, width: "clamp(16rem,38vw,22rem)" }}
                >
                    <div className={`${c.bg} ${c.border} ${c.shadow} 
            flex flex-col gap-2 rounded-2xl border p-6 backdrop-blur-lg min-h-[130px]`}>
                        <div className="flex items-center gap-3 mb-1">{c.icon}
                            <span className="text-base font-semibold">{c.title}</span>
                        </div>
                        <div className="text-base font-medium">{c.desc}</div>
                        <div className="mt-2 text-xs text-white/40">{c.date}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// === Main Page ===
export default function SolutionsPage() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const router = useRouter();

    const detailedSolutions = [
        {
            title: "ID Studio",
            subtitle: "Brand Identity & Visual Systems",
            description: "We craft distinctive brand identities that resonate with your target audience and stand out in competitive markets. Every element is designed to communicate your values and drive recognition.",
            features: [
                "Brand Strategy & Positioning", "Logo & Visual Identity Design", "Comprehensive Brand Guidelines", "Marketing Collateral & Assets"
            ],
            color: "purple",
            icon: <Palette className="w-6 h-6" />,
            gradient: "from-[#351C59]/90 to-[#201031]/95",
        },
        {
            title: "Weskale Digital",
            subtitle: "Digital Platforms & Experiences",
            description: "Custom digital solutions that combine cutting-edge technology with intuitive user experiences. We build scalable platforms that grow with your business.",
            features: [
                "Custom Web Development", "Mobile Applications", "E-commerce Platforms", "Digital Strategy & Consulting"
            ],
            color: "blue",
            icon: <Code2 className="w-6 h-6" />,
            gradient: "from-[#122049]/90 to-[#151b31]/95",
        },
        {
            title: "Weskale Influence",
            subtitle: "Growth & Market Positioning",
            description: "Strategic growth initiatives that build lasting market presence and sustainable competitive advantages. We help you influence your market and scale your impact.",
            features: [
                "Growth Strategy Development", "Market Analysis & Research", "Content Strategy & Creation", "Performance Analytics & Optimization"
            ],
            color: "green",
            icon: <BarChart3 className="w-6 h-6" />,
            gradient: "from-[#18372c]/90 to-[#13221b]/95",
        }
    ];

    const processSteps = [
        {
            step: "01",
            title: "Discovery & Audit",
            description: "We analyze your current position, market landscape, and growth opportunities to create a strategic foundation.",
            icon: <MessageSquare className="w-8 h-8 text-blue-400" />,
        },
        {
            step: "02",
            title: "Strategy Development",
            description: "Custom roadmap creation that aligns your brand identity, technical requirements, and growth objectives.",
            icon: <Building2 className="w-8 h-8 text-purple-400" />,
        },
        {
            step: "03",
            title: "Implementation",
            description: "Seamless execution across all touchpoints - from brand assets to digital platforms and growth systems.",
            icon: <Globe className="w-8 h-8 text-pink-400" />,
        },
        {
            step: "04",
            title: "Scale & Optimize",
            description: "Continuous refinement and scaling of your solutions based on performance data and market feedback.",
            icon: <TrendingUp className="w-8 h-8 text-green-400" />,
        },
    ];

    // Navigation smooth scroll
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* BG */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute -top-44 -left-36 h-[540px] w-[540px] rounded-full bg-blue-500/20 blur-[130px]" />
                <div className="absolute top-[-12rem] right-[-8rem] h-[430px] w-[430px] rounded-full bg-purple-700/25 blur-[110px]" />
                <div className="absolute bottom-[-9rem] left-1/2 h-[370px] w-[370px] -translate-x-1/2 rounded-full bg-green-900/23 blur-[100px]" />
            </div>

            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-md">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
                    <button onClick={() => router.push('/')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Image src="/WESKALE.svg" alt="Weskale Logo" width={120} height={40} priority className="h-9 w-auto" />
                        <span className="text-xl font-semibold tracking-wide text-white">Weskale Agency</span>
                    </button>
                    <nav className="hidden gap-6 text-sm text-white/80 md:flex">
                        <button onClick={() => router.push('/')} className="rounded-md px-3 py-2 transition hover:text-white hover:bg-white/5">Home</button>
                        <button onClick={() => scrollToSection("solutions")} className="rounded-md px-3 py-2 transition hover:text-white hover:bg-white/5">Solutions</button>
                        <button onClick={() => scrollToSection("process")} className="rounded-md px-3 py-2 transition hover:text-white hover:bg-white/5">Process</button>
                        <button onClick={() => scrollToSection("contact")} className="rounded-md px-3 py-2 transition hover:text-white hover:bg-white/5">Contact</button>
                    </nav>
                    <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90 hover:scale-105"
                    >
                        Book a meeting <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </header>

            {/* HERO */}
            <section className="relative py-24 px-6 z-10">
                <div className="mx-auto max-w-6xl text-center">
                    <motion.div {...fadeInView(0)}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
                            <span className="text-sm text-white/80">Complete solution portfolio</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-green-400">Solutions</span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Three pillars of excellence designed to transform your business from foundation to scale
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* STACKED CARDS */}
            <section id="solutions" className="relative py-20 px-6 z-10">
                <div className="mx-auto max-w-6xl">
                    <motion.div {...fadeInView(0)} className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Complete Solutions Portfolio</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            From brand identity to digital excellence and scalable growth strategies
                        </p>
                    </motion.div>
                    <motion.div {...fadeInView(0.14)} className="flex justify-center mb-24">
                        <GlassStackCards />
                    </motion.div>
                    {/* Detailed Solutions Grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8 mb-24"
                    >
                        {detailedSolutions.map((sol, idx) => (
                            <motion.div
                                key={sol.title}
                                variants={fadeInView(0.03 * idx)}
                                className={`group bg-gradient-to-br ${sol.gradient} border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 hover:scale-105 shadow-md`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-2 rounded-lg bg-${sol.color}-500/20`}>{sol.icon}</div>
                                    <div className={`px-3 py-1 rounded-full bg-${sol.color}-700/10 border border-${sol.color}-500/25`}>
                                        <span className={`text-${sol.color}-400 text-sm font-medium`}>{sol.title}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-4">{sol.subtitle}</h3>
                                <p className="text-white/75 mb-6 leading-relaxed">{sol.description}</p>
                                <ul className="space-y-3">
                                    {sol.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-white/85">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-${sol.color}-400 flex-shrink-0`} />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* PROCESS */}
            <section id="process" className="relative py-20 px-6 bg-gradient-to-b from-transparent via-white/5 to-transparent">
                <div className="mx-auto max-w-6xl">
                    <motion.div {...fadeInView(0)} className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Our 4-Step <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Process</span>
                        </h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            A proven methodology that transforms your vision into measurable results
                        </p>
                    </motion.div>
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                    >
                        {processSteps.map((step, idx) => (
                            <motion.div
                                key={step.step}
                                variants={fadeInView(0.03 * idx)}
                                className="text-center group"
                            >
                                <div className="mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border border-white/20 rounded-2xl mb-4 group-hover:bg-white/20 transition-colors">
                                        {step.icon}
                                    </div>
                                    <div className="text-3xl font-bold text-white/40 mb-2">{step.step}</div>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                <p className="text-white/70 leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section id="contact" className="relative py-20 px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div {...fadeInView(0)}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Let us discuss how our solutions can drive your growth and create lasting impact in your market.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                onClick={() => setIsContactModalOpen(true)}
                                className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
                            >
                                <Calendar className="w-5 h-5" />
                                Book a Meeting
                            </button>
                            <a
                                href="mailto:contact@weskaleagency.com"
                                className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                            >
                                <Mail className="w-5 h-5" />
                                Send Email
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/10 py-12 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <button onClick={() => router.push('/')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <Image src="/WESKALE.svg" alt="Weskale Logo" width={120} height={40} className="h-9 w-auto" />
                            <span className="text-xl font-semibold tracking-wide text-white">Weskale Agency</span>
                        </button>
                        <div className="flex items-center gap-6 text-sm text-white/60">
                            <span>© 2025 Weskale Agency. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>

            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </div>
    );
}
