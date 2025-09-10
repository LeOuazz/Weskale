"use client";
import React, { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  details?: string;
  color?: "purple" | "blue" | "green";
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

const colorVariants = {
  purple: {
    bg: "bg-purple-900/70",
    ring: "ring-purple-500/40",
    text: "text-purple-300",
    shadow: "shadow-purple-900/40",
  },
  blue: {
    bg: "bg-blue-900/70",
    ring: "ring-blue-500/40",
    text: "text-blue-300",
    shadow: "shadow-blue-900/40",
  },
  green: {
    bg: "bg-green-900/70",
    ring: "ring-green-500/40",
    text: "text-green-300",
    shadow: "shadow-green-900/40",
  },
};

// Use this for your main hero cards section:
export default function DisplayCards({ cards }: DisplayCardsProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  // Card size: Make them bold & larger (responsive)
  const cardWidth = "w-[25rem] max-w-[92vw] min-h-[230px] md:w-[27rem] md:min-h-[260px] xl:w-[30rem] xl:min-h-[320px]";

  // Desktop stacking offsets (spread/fan look)
  const desktopStack = [
    "left-0 bottom-0 z-10",
    "left-20 bottom-9 z-20",
    "left-40 bottom-18 z-30",
  ];

  // Animation (stagger, fly in & scale)
  const cardVariants = (delay: number) => ({
    hidden: { opacity: 0, y: 70, scale: 0.93 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.75,
        type: "spring",
        stiffness: 110,
        damping: 18,
      },
    },
  });

  return (
      <div
          ref={ref}
          className="relative flex items-end justify-center h-[380px] md:h-[370px] xl:h-[400px] select-none"
      >
        {/* Mobile: vertical stack, bigger */}
        <div className="flex flex-col gap-8 md:hidden w-full">
          {cards?.map((card, idx) => {
            const color = card.color ?? "purple";
            return (
                <motion.div
                    key={idx}
                    className={cn(
                        "relative w-full rounded-3xl border-2 border-white/10 bg-black/90 backdrop-blur-lg shadow-2xl cursor-pointer px-6 py-7",
                        cardWidth,
                        colorVariants[color].shadow,
                        openIdx === idx ? `ring-2 ${colorVariants[color].ring}` : "hover:ring-1 hover:ring-white/20",
                        openIdx === idx ? "z-40 scale-105" : "hover:scale-101"
                    )}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={cardVariants(idx * 0.18)}
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <CardContent card={card} open={openIdx === idx} />
                </motion.div>
            );
          })}
        </div>
        {/* Desktop: stacked, animated, fanned */}
        <div className="hidden md:block relative w-[600px] xl:w-[740px] h-[320px]">
          {cards?.map((card, idx) => {
            const color = card.color ?? "purple";
            return (
                <motion.div
                    key={idx}
                    className={cn(
                        "absolute transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] rounded-3xl cursor-pointer",
                        cardWidth,
                        colorVariants[color].shadow,
                        desktopStack[idx],
                        openIdx === idx ? `ring-2 ${colorVariants[color].ring} z-40 scale-105` : "hover:scale-101",
                        openIdx !== null && openIdx !== idx ? "blur-[2.5px] grayscale-[55%] opacity-70 z-0" : ""
                    )}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={cardVariants(idx * 0.21)}
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    style={{
                      left: `calc(${idx * 5.7}rem)`,
                      bottom: `${idx * 2.2}rem`,
                    }}
                >
                  <CardContent card={card} open={openIdx === idx} />
                </motion.div>
            );
          })}
        </div>
      </div>
  );
}

function CardContent({
                       card,
                       open,
                     }: {
  card: DisplayCardProps;
  open: boolean;
}) {
  const color = card.color ?? "purple";
  return (
      <div className="relative flex flex-col justify-between w-full rounded-2xl px-3 sm:px-4 pt-4 pb-3 min-h-[140px] transition">
        <div className="flex items-center gap-4 mb-3">
        <span
            className={cn(
                "inline-block rounded-full p-2 bg-opacity-60 shadow",
                colorVariants[color].bg
            )}
        >
          {card.icon ?? <Sparkles className="size-6 text-blue-200" />}
        </span>
          <span
              className={cn(
                  "font-semibold text-xl xl:text-2xl",
                  colorVariants[color].text,
                  card.titleClassName
              )}
          >
          {card.title ?? "Featured"}
        </span>
        </div>
        <div className="text-lg xl:text-xl font-medium text-white/85 mb-1">
          {card.description ?? "Discover amazing content"}
        </div>
        <div className="mt-1 text-sm text-white/35">
          {card.date ?? "Just now"}
        </div>
        <AnimatePresence>
          {open && (
              <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.26 }}
                  className={cn(
                      "mt-7 p-5 rounded-2xl shadow-inner text-white/95 border border-white/10 backdrop-blur-lg text-base xl:text-lg font-normal",
                      colorVariants[color].bg
                  )}
              >
                {card.details ??
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."}
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}

