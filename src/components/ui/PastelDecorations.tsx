"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const shapes = [
  // Stars
  { type: "star", x: "8%", y: "15%", size: 20, delay: 0, duration: 6 },
  { type: "star", x: "85%", y: "25%", size: 16, delay: 1.5, duration: 7 },
  { type: "star", x: "70%", y: "75%", size: 18, delay: 3, duration: 5 },
  { type: "star", x: "15%", y: "70%", size: 14, delay: 2, duration: 8 },
  // Hearts
  { type: "heart", x: "92%", y: "45%", size: 16, delay: 0.5, duration: 7 },
  { type: "heart", x: "5%", y: "50%", size: 14, delay: 4, duration: 6 },
  // Sparkles
  { type: "sparkle", x: "45%", y: "8%", size: 12, delay: 1, duration: 5 },
  { type: "sparkle", x: "30%", y: "90%", size: 10, delay: 2.5, duration: 6 },
  { type: "sparkle", x: "60%", y: "85%", size: 14, delay: 3.5, duration: 7 },
  // Clouds
  { type: "cloud", x: "20%", y: "20%", size: 32, delay: 0, duration: 12 },
  { type: "cloud", x: "75%", y: "10%", size: 28, delay: 4, duration: 10 },
];

const StarSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" 
      fill="currentColor" opacity="0.4" />
  </svg>
);

const HeartSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
      fill="currentColor" opacity="0.35" />
  </svg>
);

const SparkleSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" 
      fill="currentColor" opacity="0.3" />
  </svg>
);

const CloudSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 64 38" fill="none">
    <ellipse cx="32" cy="24" rx="20" ry="14" fill="currentColor" opacity="0.15" />
    <ellipse cx="20" cy="20" rx="14" ry="12" fill="currentColor" opacity="0.12" />
    <ellipse cx="44" cy="22" rx="12" ry="10" fill="currentColor" opacity="0.12" />
    <ellipse cx="28" cy="14" rx="10" ry="8" fill="currentColor" opacity="0.1" />
  </svg>
);

const shapeMap: Record<string, React.FC<{ size: number }>> = {
  star: StarSVG,
  heart: HeartSVG,
  sparkle: SparkleSVG,
  cloud: CloudSVG,
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
        return (
          <motion.div
            key={i}
            className="absolute text-purple-300/60"
            style={{ left: shape.x, top: shape.y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.1, 0.8],
              y: [0, -15, 0],
              rotate: [0, shape.type === "star" ? 15 : 5, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut",
            }}
          >
            <ShapeComponent size={shape.size} />
          </motion.div>
        );
      })}
    </div>
  );
};
