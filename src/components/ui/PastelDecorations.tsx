"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const shapes = [
  // Stars — varied pastel colors
  { type: "star", x: "8%", y: "15%", size: 22, delay: 0, duration: 6, color: "text-purple-400/50" },
  { type: "star", x: "85%", y: "25%", size: 18, delay: 1.5, duration: 7, color: "text-amber-400/40" },
  { type: "star", x: "70%", y: "75%", size: 20, delay: 3, duration: 5, color: "text-rose-400/45" },
  { type: "star", x: "15%", y: "70%", size: 15, delay: 2, duration: 8, color: "text-sky-400/40" },
  // Hearts
  { type: "heart", x: "92%", y: "45%", size: 18, delay: 0.5, duration: 7, color: "text-rose-400/45" },
  { type: "heart", x: "5%", y: "50%", size: 15, delay: 4, duration: 6, color: "text-pink-400/40" },
  // Sparkles
  { type: "sparkle", x: "45%", y: "8%", size: 14, delay: 1, duration: 5, color: "text-amber-400/50" },
  { type: "sparkle", x: "30%", y: "90%", size: 12, delay: 2.5, duration: 6, color: "text-purple-400/45" },
  { type: "sparkle", x: "60%", y: "85%", size: 16, delay: 3.5, duration: 7, color: "text-sky-400/40" },
  // Clouds
  { type: "cloud", x: "20%", y: "20%", size: 36, delay: 0, duration: 12, color: "text-violet-300/25" },
  { type: "cloud", x: "75%", y: "10%", size: 30, delay: 4, duration: 10, color: "text-sky-300/20" },
  // Extra geometric accents
  { type: "ring", x: "50%", y: "50%", size: 20, delay: 1.5, duration: 9, color: "text-purple-400/30" },
  { type: "diamond", x: "88%", y: "70%", size: 16, delay: 2, duration: 8, color: "text-rose-300/30" },
  { type: "dot", x: "35%", y: "40%", size: 8, delay: 0.5, duration: 4, color: "text-amber-400/40" },
  { type: "dot", x: "65%", y: "30%", size: 6, delay: 3, duration: 5, color: "text-sky-400/35" },
  { type: "dot", x: "12%", y: "85%", size: 7, delay: 1, duration: 4.5, color: "text-purple-400/35" },
];

const StarSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" 
      fill="currentColor" opacity="0.5" />
  </svg>
);

const HeartSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
      fill="currentColor" opacity="0.45" />
  </svg>
);

const SparkleSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" 
      fill="currentColor" opacity="0.4" />
  </svg>
);

const CloudSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 64 38" fill="none">
    <ellipse cx="32" cy="24" rx="20" ry="14" fill="currentColor" opacity="0.2" />
    <ellipse cx="20" cy="20" rx="14" ry="12" fill="currentColor" opacity="0.15" />
    <ellipse cx="44" cy="22" rx="12" ry="10" fill="currentColor" opacity="0.15" />
    <ellipse cx="28" cy="14" rx="10" ry="8" fill="currentColor" opacity="0.12" />
  </svg>
);

const RingSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.5" />
  </svg>
);

const DiamondSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="20" y="20" width="60" height="60" rx="6" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 50 50)" opacity="0.4" />
  </svg>
);

const DotSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.5" />
  </svg>
);

const shapeMap: Record<string, React.FC<{ size: number }>> = {
  star: StarSVG,
  heart: HeartSVG,
  sparkle: SparkleSVG,
  cloud: CloudSVG,
  ring: RingSVG,
  diamond: DiamondSVG,
  dot: DotSVG,
};

export const PastelDecorations = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Only render in light mode
  if (!mounted || resolvedTheme === "dark") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden" aria-hidden="true">
      {shapes.map((shape, i) => {
        const ShapeComponent = shapeMap[shape.type];
        if (!ShapeComponent) return null;
        return (
          <motion.div
            key={i}
            className={`absolute ${shape.color}`}
            style={{ left: shape.x, top: shape.y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [0.85, 1.15, 0.85],
              y: [0, -12, 0],
              rotate: shape.type === "ring" ? [0, 360] : [0, shape.type === "star" ? 15 : 5, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut",
              ...(shape.type === "ring" ? { rotate: { duration: 20, repeat: Infinity, ease: "linear" } } : {}),
            }}
          >
            <ShapeComponent size={shape.size} />
          </motion.div>
        );
      })}
    </div>
  );
};
