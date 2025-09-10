"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React from "react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  variant?: "purple" | "blue" | "green";
  active?: boolean;
  z?: number; // used for stacking order
}

const variantMap = {
  purple: {
    bg: "bg-[#19122a]/90",
    border: "border-purple-800",
    glow: "shadow-[0_8px_32px_0_rgba(129,54,232,0.16)]",
    ring: "ring-1 ring-purple-600/20",
    accent: "from-purple-700/40 to-purple-900/80",
    icon: "text-purple-300",
  },
  blue: {
    bg: "bg-[#13182c]/90",
    border: "border-blue-800",
    glow: "shadow-[0_8px_32px_0_rgba(56,178,255,0.14)]",
    ring: "ring-1 ring-blue-600/20",
    accent: "from-blue-700/40 to-blue-900/80",
    icon: "text-blue-300",
  },
  green: {
    bg: "bg-[#11251b]/90",
    border: "border-green-800",
    glow: "shadow-[0_8px_32px_0_rgba(52,211,153,0.14)]",
    ring: "ring-1 ring-green-600/20",
    accent: "from-green-700/40 to-green-900/80",
    icon: "text-green-300",
  },
};

const cardVariants = {
  offscreen: { opacity: 0, y: 40, scale: 0.95 },
  onscreen: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.1 * i,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function DisplayCard({
                       icon = <Sparkles className="size-4" />,
                       title = "Featured",
                       description = "Discover amazing content",
                       date = "Just now",
                       className,
                       variant = "blue",
                       z = 0,
                       active = false,
                       iconClassName,
                       titleClassName,
                     }: DisplayCardProps) {
  const style = variantMap[variant];
  // Subtle colored glass morph with accent border & shadow
  return (
      <motion.div
          className={cn(
              "relative flex flex-col justify-between min-h-32 w-[20rem] sm:w-[22rem] p-5 rounded-2xl border bg-gradient-to-br text-white backdrop-blur-md transition-all duration-700 select-none cursor-pointer",
              style.bg,
              style.border,
              style.glow,
              style.ring,
              active && "z-30 scale-105 shadow-lg border-2 border-white/20",
              className
          )}
          style={{
            zIndex: 10 + z,
            boxShadow: active
                ? "0 4px 44px 0 rgba(156,163,175,0.25), 0 0 0 4px rgba(255,255,255,0.05)"
                : undefined,
            transform: `translateY(${z * 20}px) translateX(${z * 24}px)`,
            opacity: active ? 1 : 0.8 - z * 0.07,
            filter: active ? "none" : "grayscale(40%) blur(0.5px)",
          }}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 48px 0 rgba(180,180,255,0.25)" }}
      >
        <div className="flex items-center gap-2 mb-2">
        <span
            className={cn(
                "inline-flex items-center justify-center rounded-full bg-white/10 p-2 shadow",
                style.icon,
                iconClassName
            )}
        >
          {icon}
        </span>
          <span className={cn("text-base font-semibold", titleClassName)}>{title}</span>
        </div>
        <div className="flex-1 text-base font-medium leading-snug">{description}</div>
        <div className="mt-2 text-xs text-white/50">{date}</div>
      </motion.div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  // Demo fallback
  const defaultCards: DisplayCardProps[] = [
    {
      variant: "purple",
      icon: <Sparkles className="size-4 text-purple-300" />,
      title: "ID Studio",
      description: "Brand identity & visual systems",
      date: "Creative Excellence",
    },
    {
      variant: "blue",
      icon: <Sparkles className="size-4 text-blue-300" />,
      title: "Weskale Digital",
      description: "Digital platforms & experiences",
      date: "Technical Excellence",
    },
    {
      variant: "green",
      icon: <Sparkles className="size-4 text-green-300" />,
      title: "Weskale Influence",
      description: "Growth & market positioning",
      date: "Scalable Impact",
    },
  ];

  const stackCards = cards || defaultCards;

  // Highlight the top card, others are stacked, darker, blurred, desaturated
  return (
      <div className="relative flex flex-row items-center justify-center min-h-[190px] sm:min-h-[210px] w-full max-w-[660px] mx-auto">
        {stackCards.map((card, i) => (
            <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.5 }}
                className="absolute"
                style={{ left: 0, top: 0 }}
            >
              <DisplayCard {...card} z={stackCards.length - i - 1} active={i === stackCards.length - 1} />
            </motion.div>
        ))}
      </div>
  );
}
