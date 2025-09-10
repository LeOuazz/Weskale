'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SmoothBackgroundTransitionProps {
    children: React.ReactNode;
}

export default function SmoothBackgroundTransition({ children }: SmoothBackgroundTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroBackgroundRef = useRef<HTMLDivElement>(null);
    const vortexBackgroundRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !heroBackgroundRef.current || !vortexBackgroundRef.current) return;

        // Set initial states
        gsap.set(vortexBackgroundRef.current, {
            opacity: 0,
            scale: 1.1,
            filter: 'blur(20px)'
        });

        // Create scroll-triggered transition
        gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.5, // Smooth scrubbing
                onUpdate: (self) => {
                    const progress = self.progress;

                    // Fade out hero background
                    gsap.set(heroBackgroundRef.current, {
                        opacity: 1 - progress,
                        scale: 1 + progress * 0.1,
                        filter: `blur(${progress * 10}px)`
                    });

                    // Fade in vortex background
                    gsap.set(vortexBackgroundRef.current, {
                        opacity: progress,
                        scale: 1.1 - progress * 0.1,
                        filter: `blur(${(1 - progress) * 20}px)`
                    });
                }
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative min-h-[200vh]">
            {/* Hero Background Layer */}
            <div
                ref={heroBackgroundRef}
                className="fixed inset-0 w-full h-full -z-20"
            >
                <div className="bg-black absolute inset-0 w-full h-full" />
            </div>

            {/* Vortex Background Layer */}
            <div
                ref={vortexBackgroundRef}
                className="fixed inset-0 w-full h-full -z-10"
            >
                <div className="bg-black absolute inset-0 w-full h-full" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Transition overlay for extra smoothness */}
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/20 -z-5" />
        </div>
    );
}