'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Vortex } from './vortex';
import { ArrowRight, Users, Zap, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface JoinNetworkProps {
    title?: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    ctaHref?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    stats?: Array<{ number: string; label: string; icon: React.ReactNode }>;
}

export default function JoinNetworkSection({
                                               title = "Join Our Network",
                                               subtitle = "Where Vision Meets Execution",
                                               description = "Connect with industry leaders, innovative brands, and forward-thinking entrepreneurs who are shaping the future. Be part of a community that turns ambition into measurable impact.",
                                               ctaText = "Get Started Today",
                                               ctaHref = "#contact",
                                               secondaryCtaText = "Learn More",
                                               secondaryCtaHref = "#about",
                                               stats = [
                                                   { number: "500+", label: "Projects Delivered", icon: <Zap className="h-5 w-5" /> },
                                                   { number: "50+", label: "Global Partners", icon: <Globe className="h-5 w-5" /> },
                                                   { number: "98%", label: "Client Satisfaction", icon: <Users className="h-5 w-5" /> }
                                               ]
                                           }: JoinNetworkProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // Set initial states
        const elements = [titleRef.current, subtitleRef.current, descriptionRef.current, ctaRef.current];
        gsap.set(elements.filter(Boolean), {
            y: 50,
            opacity: 0
        });

        if (statsRef.current) {
            gsap.set(statsRef.current.children, {
                y: 30,
                opacity: 0
            });
        }

        // Create scroll-triggered timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                end: 'bottom 30%',
            }
        });

        // Split text animation for title
        if (titleRef.current) {
            const titleSplit = new SplitText(titleRef.current, {
                type: 'lines',
                wordsClass: 'lines'
            });

            gsap.set(titleSplit.lines, {
                y: 30,
                opacity: 0
            });

            tl.to(titleSplit.lines, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }

        // Animate subtitle
        tl.to(subtitleRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.4');

        // Animate description
        tl.to(descriptionRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3');

        // Animate CTAs
        tl.to(ctaRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.2');

        // Animate stats
        if (statsRef.current) {
            tl.to(statsRef.current.children, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out'
            }, '-=0.3');
        }

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center">
            {/* Vortex Background - positioned as background layer */}
            <div className="absolute inset-0 -z-10">
                <Vortex
                    backgroundColor="#000000"
                    rangeY={600}
                    particleCount={400}
                    baseHue={240}
                    baseSpeed={0.05}
                    rangeSpeed={1.2}
                    baseRadius={1.5}
                    rangeRadius={2}
                    containerClassName="w-full h-full"
                    className=""
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
                {/* Main Content */}
                <div className="mb-16">
                    <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
                        Join Our Network
                    </h2>

                    <h3
                        ref={subtitleRef}
                        className="text-xl md:text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-8"
                    >
                        {subtitle}
                    </h3>

                    <p
                        ref={descriptionRef}
                        className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-12"
                    >
                        {description}
                    </p>

                    {/* CTA Buttons */}
                    <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <a
                            href={ctaHref}
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
                        >
                            {ctaText}
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href={secondaryCtaHref}
                            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-full font-light transition-all duration-300 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm"
                        >
                            {secondaryCtaText}
                        </a>
                    </div>
                </div>

                {/* Stats */}
                <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group relative"
                        >
                            {/* Glowing border effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                                <div className="flex items-center justify-center mb-3 text-white/60 group-hover:text-white/80 transition-colors">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-light text-white mb-2 group-hover:scale-105 transition-transform">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-white/60 font-light">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom decoration */}
                <div className="mt-16 flex items-center justify-center gap-2">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/40" />
                    <div className="h-1 w-1 rounded-full bg-white/40" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/40" />
                </div>
            </div>
        </section>
    );
}