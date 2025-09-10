"use client";

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
  // New: variant
  variant?: "purple" | "blue" | "green";
}

const variantMap = {
  purple: {
    bg: "bg-[#171322]",
    border: "border-purple-700",
    ring: "ring-2 ring-purple-700/20",
    shadow: "shadow-purple-900/30",
  },
  blue: {
    bg: "bg-[#151825]",
    border: "border-blue-700",
    ring: "ring-2 ring-blue-700/20",
    shadow: "shadow-blue-900/30",
  },
  green: {
    bg: "bg-[#132017]",
    border: "border-green-700",
    ring: "ring-2 ring-green-700/20",
    shadow: "shadow-green-900/30",
  },
};

function DisplayCard({
                       className,
                       icon = <Sparkles className="size-4 text-blue-300" />,
                       title = "Featured",
                       description = "Discover amazing content",
                       date = "Just now",
                       iconClassName,
                       titleClassName,
                       variant = "blue",
                     }: DisplayCardProps) {
  const style = variantMap[variant];

  return (
      <div
          className={cn(
              // stacking effect w/ stacking utility from your cards
              "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-2xl border-2 px-5 py-4 transition-all duration-700 shadow-xl backdrop-blur-sm hover:border-white/30 hover:scale-[1.03]",
              style.bg,
              style.border,
              style.shadow,
              style.ring,
              className
          )}
      >
        <div className="flex items-center gap-2">
        <span
            className={cn(
                "inline-block rounded-full bg-white/10 p-2 shadow",
                iconClassName
            )}
        >
          {icon}
        </span>
          <p className={cn("text-lg font-semibold", titleClassName)}>{title}</p>
        </div>
        <p className="text-base text-white/90">{description}</p>
        <p className="text-xs text-white/50">{date}</p>
      </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  // Default demo cards if none provided
  const defaultCards: DisplayCardProps[] = [
    {
      variant: "purple",
      title: "ID Studio",
      icon: <Sparkles className="size-4 text-purple-300" />,
      description: "Brand identity & visual systems",
      date: "Creative Excellence",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      variant: "blue",
      title: "Weskale Digital",
      icon: <Sparkles className="size-4 text-blue-300" />,
      description: "Digital platforms & experiences",
      date: "Technical Excellence",
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      variant: "green",
      title: "Weskale Influence",
      icon: <Sparkles className="size-4 text-green-300" />,
      description: "Growth & market positioning",
      date: "Scalable Impact",
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  // Use provided or default cards
  const displayCards = cards || defaultCards;

  return (
      <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
        {displayCards.map((cardProps, index) => (
            <DisplayCard key={index} {...cardProps} />
        ))}
      </div>
  );
}
