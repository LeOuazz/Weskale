"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2, Globe, TrendingUp, Users, MessageSquare, Calendar, Mail, X, Palette, Code2, BarChart3 } from "lucide-react";
import DisplayCards from "@/app/component/display-cards";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Animation variants
const fadeInView = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
    viewport: { once: true, amount: 0.2 },
});

const staggerContainer = {
    initial: {},
    whileInView: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Contact Modal Component
const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-neutral-900 border border-white/20 rounded-2xl p-8 max-w-md w-full relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
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

export default function SolutionsPage() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const router = useRouter();

    // Solutions data for display cards
    const solutionsCards = [
        {
            icon: <Palette className="size-4 text-purple-300" />,
            title: "ID Studio",
            description: "Brand identity & visual systems",
            date: "Creative Excellence",
            iconClassName: "text-purple-500",
            titleClassName: "text-purple-500",
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            icon: <Code2 className="size-4 text-blue-300" />,
            title: "Weskale Digital",
            description: "Digital platforms & experiences",
            date: "Technical Excellence",
            iconClassName: "text-blue-500",
            titleClassName: "text-blue-500",
            className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            icon: <BarChart3 className="size-4 text-green-300" />,
            title: "Weskale Influence",
            description: "Growth & market positioning",
            date: "Scalable Impact",
            iconClassName: "text-green-500",
            titleClassName: "text-green-500",
            className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
        },
    ];

    // Process steps data
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

    // Detailed solution data
    const detailedSolutions = [
        {
            title: "ID Studio",
            subtitle: "Brand Identity & Visual Systems",
            description: "We craft distinctive brand identities that resonate with your target audience and stand out in competitive markets. Every element is designed to communicate your values and drive recognition.",
            features: ["Brand Strategy & Positioning", "Logo & Visual Identity Design", "Comprehensive Brand Guidelines", "Marketing Collateral & Assets"],
            color: "purple",
            icon: <Palette className="w-6 h-6" />,
            gradient: "from-purple-500/20 to-pink-500/20"
        },
        {
            title: "Weskale Digital",
            subtitle: "Digital Platforms & Experiences",
            description: "Custom digital solutions that combine cutting-edge technology with intuitive user experiences. We build scalable platforms that grow with your business.",
            features: ["Custom Web Development", "Mobile Applications", "E-commerce Platforms", "Digital Strategy & Consulting"],
            color: "blue",
            icon: <Code2 className="w-6 h-6" />,
            gradient: "from-blue-500/20 to-cyan-500/20"
        },
        {
            title: "Weskale Influence",
            subtitle: "Growth & Market Positioning",
            description: "Strategic growth initiatives that build lasting market presence and sustainable competitive advantages. We help you influence your market and scale your impact.",
            features: ["Growth Strategy Development", "Market Analysis & Research", "Content Strategy & Creation", "Performance Analytics & Optimization"],
            color: "green",
            icon: <BarChart3 className="w-6 h-6" />,
            gradient: "from-green-500/20 to-emerald-500/20"
        }
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[120px]" />
                <div className="absolute top-[-10rem] right-[-6rem] h-[420px] w-[420px] rounded-full bg-purple-700/25 blur-[120px]" />
                <div className="absolute bottom-[-10rem] left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-pink-700/20 blur-[110px]" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
                    <button onClick={() => router.push('/')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Image src="/WESKALE.svg" alt="Weskale Logo" width={120} height={40} priority className="h-9 w-auto" />
                        <span className="text-xl font-semibold tracking-wide text-white">Weskale Agency</span>
                    </button>

                    <nav className="hidden gap-6 text-sm text-white/80 md:flex">
                        <button onClick={() => router.push('/')} className="rounded-md px-3 py-2 transition hover:text-white hover:bg-white/5">
                            Home
                        </button>
                        <button onClick={() => scrollToSection("solutions")} className="rounded-md px-3 py-2 transition hover:text-white hover:bg-white/5">
                            Solutions
                        </button>
                        <button onClick={() => scrollToSection("process")} className="rounded-md px-3 py-2 transition hover:text-white hover:bg-white/5">
                            Process
                        </button>
                        <button onClick={() => scrollToSection("contact")} className="rounded-md px-3 py-2 transition hover:text-white hover:bg-white/5">
                            Contact
                        </button>
                    </nav>

                    <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90 hover:scale-105"
                    >
                        Book a meeting <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-24 px-6">
                <div className="mx-auto max-w-6xl text-center">
                    <motion.div {...fadeInView(0)}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
                            <span className="text-sm text-white/80">Complete solution portfolio</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Solutions</span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Three pillars of excellence designed to transform your business from foundation to scale
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Solutions Showcase */}
            <section id="solutions" className="relative py-20 px-6">
                <div className="mx-auto max-w-6xl">
                    <motion.div {...fadeInView(0)} className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Complete Solutions Portfolio
                        </h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            From brand identity to digital excellence and scalable growth strategies
                        </p>
                    </motion.div>

                    <motion.div {...fadeInView(0.2)} className="flex justify-center mb-20">
                        <DisplayCards cards={solutionsCards} />
                    </motion.div>

                    {/* Detailed Solutions Grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8 mb-20"
                    >
                        {detailedSolutions.map((solution, index) => (
                            <motion.div
                                key={solution.title}
                                variants={fadeInView(0)}
                                className={`group bg-gradient-to-br ${solution.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 hover:scale-105`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-2 rounded-lg bg-${solution.color}-500/20`}>
                                        {solution.icon}
                                    </div>
                                    <div className={`px-3 py-1 rounded-full bg-${solution.color}-500/20 border border-${solution.color}-500/30`}>
                                        <span className={`text-${solution.color}-400 text-sm font-medium`}>{solution.title}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold mb-4">{solution.subtitle}</h3>
                                <p className="text-white/70 mb-6 leading-relaxed">{solution.description}</p>

                                <ul className="space-y-3">
                                    {solution.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-white/80">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-${solution.color}-400 flex-shrink-0`}></div>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
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
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                variants={fadeInView(0)}
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

            {/* CTA Section */}
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

            {/* Footer */}
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