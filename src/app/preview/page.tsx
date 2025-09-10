'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero, { ShaderBackground } from "../component/neural-network-hero";
import JoinNetworkSection from "../component/join-network-section";
import { Vortex } from "../component/vortex";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PreviewPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroBackgroundRef = useRef<HTMLDivElement>(null);
    const vortexBackgroundRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !heroBackgroundRef.current || !vortexBackgroundRef.current) return;

        // Set initial states
        gsap.set(vortexBackgroundRef.current, {
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)'
        });

        // Create smooth transition between backgrounds
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            onUpdate: (self) => {
                const progress = self.progress;

                // Transition hero background
                gsap.set(heroBackgroundRef.current, {
                    opacity: Math.max(0, 1 - progress * 2), // Fade out faster
                    scale: 1 + progress * 0.05,
                    filter: `blur(${progress * 8}px)`
                });

                // Transition vortex background
                gsap.set(vortexBackgroundRef.current, {
                    opacity: Math.min(1, progress * 2), // Fade in faster
                    scale: 1.05 - progress * 0.05,
                    filter: `blur(${(1 - progress) * 10}px)`
                });
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative bg-black">
            {/* Fixed Background Layers */}
            <div
                ref={heroBackgroundRef}
                className="fixed inset-0 w-full h-full -z-20"
            >
                <ShaderBackground />
            </div>

            <div
                ref={vortexBackgroundRef}
                className="fixed inset-0 w-full h-full -z-10"
            >
                <Vortex
                    backgroundColor="#000000"
                    rangeY={800}
                    particleCount={500}
                    baseHue={240}
                    baseSpeed={0.03}
                    rangeSpeed={1.0}
                    baseRadius={1}
                    rangeRadius={2.5}
                    containerClassName="w-full h-full"
                />
            </div>

            {/* Content Sections */}
            <div className="relative z-10">
                {/* Hero Section */}
                <Hero
                    title="We build legacies, not just outputs."
                    description="Weskale blends identity clarity, technical excellence, and scalable influence to turn ambition into sustained performance."
                    badgeText="Measured creativity. Calculated impact."
                    badgeLabel="Weskale Agency"
                />

                {/* Join Network Section */}
                <JoinNetworkSection />
            </div>

            {/* Smooth transition overlay */}
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/5 to-transparent -z-5" />
        </div>
    );
}