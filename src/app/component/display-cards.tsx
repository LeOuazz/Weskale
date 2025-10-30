
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  color?: keyof typeof colorVariants;
  icon?: React.ReactNode;
  title?: string;
  titleClassName?: string;
  description?: string;
  date?: string;
  details?: string;
  withButton?: boolean; // ✅ nouvelle prop
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

const colorVariants = {
  purple: {
    bg: "bg-purple-900/70",
    ring: "ring-purple-500/30",
    text: "text-purple-300",
    shadow: "shadow-purple-900/30",
  },
  blue: {
    bg: "bg-blue-900/70",
    ring: "ring-blue-500/30",
    text: "text-blue-300",
    shadow: "shadow-blue-900/30",
  },
  green: {
    bg: "bg-green-900/70",
    ring: "ring-green-500/30",
    text: "text-green-300",
    shadow: "shadow-green-900/30",
  },
};

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const desktopPositions = [
    "left-0 bottom-0 z-10",
    "left-14 bottom-8 z-20",
    "left-28 bottom-16 z-30",
  ];

  return (
    <div className="relative w-full flex items-end justify-center min-h-[250px] md:min-h-[250px] max-w-2xl mx-auto select-none">
      {/* Mobile */}
      <div className="flex flex-col gap-6 md:hidden w-full">
        {cards?.map((card, idx) => {
          const color = card.color ?? "purple";
          return (
            <motion.div
              key={idx}
              className={cn(
                "relative w-full rounded-2xl border-2 border-white/10 bg-black/80 backdrop-blur-lg shadow-lg cursor-pointer px-5 py-6 transition-all duration-300 flex flex-col",
                colorVariants[color].shadow,
                openIdx === idx ? `ring-2 ${colorVariants[color].ring}` : "",
                openIdx === idx ? "z-40 scale-105" : "hover:scale-102"
              )}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, type: "spring", stiffness: 140 }}
            >
              <CardContent card={card} open={openIdx === idx} />
            </motion.div>
          );
        })}
      </div>

      {/* Desktop */}
      <div className="hidden md:block relative w-[420px] min-h-[240px]">
        {cards?.map((card, idx) => {
          const color = card.color ?? "purple";
          return (
            <motion.div
              key={idx}
              className={cn(
                "absolute transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] w-[18rem] shadow-xl rounded-2xl cursor-pointer flex flex-col",
                colorVariants[color].shadow,
                desktopPositions[idx],
                openIdx === idx
                  ? `ring-2 ${colorVariants[color].ring} z-40 scale-105`
                  : "hover:scale-102",
                openIdx !== null && openIdx !== idx
                  ? "blur-[2px] grayscale-[60%] opacity-70 z-0"
                  : ""
              )}
              style={{
                left: `${idx * 3.5}rem`,
                bottom: `${idx * 1.7}rem`,
              }}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{
                opacity: 1,
                y: openIdx === idx ? -16 : 0,
                scale: openIdx === idx ? 1.08 : 1,
              }}
              transition={{ duration: 0.45, type: "spring", stiffness: 120 }}
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
    <div className="relative flex flex-col justify-between w-full rounded-2xl px-4 py-4 min-h-[200px] bg-gradient-to-br from-white/5 via-black/70 to-black/80 backdrop-blur-md transition">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className={cn("inline-block rounded-full p-1", colorVariants[color].bg)}>
          {card.icon ?? <Sparkles className="size-5 text-blue-200" />}
        </span>
        <span
          className={cn(
            "font-semibold text-lg",
            colorVariants[color].text,
            card.titleClassName
          )}
        >
          {card.title ?? "Featured"}
        </span>
      </div>

      {/* Description */}
      <div className="text-base font-medium text-white/80">
        {card.description ?? "Discover amazing content"}
      </div>

      {/* Date */}
      <div className="mt-2 text-xs text-white/40">
        {card.date ?? "Just now"}
      </div>

      {/* Bouton aligné en bas si demandé */}
      {card.withButton && (
        <button className="mt-auto rounded-xl border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10 transition">
          Discuss this solution →
        </button>
      )}

      {/* Details (expand) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "mt-5 p-4 rounded-xl shadow-inner text-white/90 border border-white/10",
              colorVariants[color].bg
            )}
          >
            <div className="text-sm">
              {card.details ??
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


