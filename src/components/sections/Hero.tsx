"use client";

import { motion, Variants } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const textReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.12,
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

// Floating geometric shapes for light mode aesthetic
const FloatingShapes = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Large gradient orb — top right */}
    <motion.div
      className="absolute -top-[20%] -right-[15%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(196,167,231,0.25) 0%, rgba(235,188,186,0.15) 40%, transparent 70%)",
      }}
      animate={{ 
        scale: [1, 1.15, 1],
        x: [0, 20, 0],
        y: [0, -10, 0],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Soft blue orb — bottom left */}
    <motion.div
      className="absolute -bottom-[25%] -left-[20%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(156,207,216,0.2) 0%, rgba(196,167,231,0.1) 40%, transparent 70%)",
      }}
      animate={{ 
        scale: [1, 1.1, 1],
        x: [0, -15, 0],
        y: [0, 15, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />

    {/* Geometric ring — center-left */}
    <motion.svg
      viewBox="0 0 200 200"
      className="absolute top-[15%] left-[5%] w-24 h-24 sm:w-40 sm:h-40 text-purple-300/20"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="12 8" />
      <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 10" />
    </motion.svg>

    {/* Floating diamond — right */}
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute top-[60%] right-[8%] w-12 h-12 sm:w-20 sm:h-20 text-rose-300/25"
      animate={{ 
        rotate: [0, 90, 180, 270, 360],
        y: [0, -20, 0, 20, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="15" y="15" width="70" height="70" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 50 50)" />
    </motion.svg>

    {/* Tiny floating dots */}
    {[
      { x: "20%", y: "30%", delay: 0, color: "bg-purple-300/30" },
      { x: "75%", y: "20%", delay: 1, color: "bg-rose-300/25" },
      { x: "85%", y: "65%", delay: 2, color: "bg-sky-300/25" },
      { x: "10%", y: "75%", delay: 3, color: "bg-amber-300/20" },
      { x: "55%", y: "80%", delay: 1.5, color: "bg-purple-300/20" },
    ].map((dot, i) => (
      <motion.div
        key={i}
        className={`absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full ${dot.color}`}
        style={{ left: dot.x, top: dot.y }}
        animate={{
          y: [0, -12, 0],
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
      />
    ))}

    {/* Abstract triangle */}
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute bottom-[15%] left-[15%] w-10 h-10 sm:w-16 sm:h-16 text-sky-300/20"
      animate={{ rotate: [0, 120, 240, 360], scale: [1, 1.1, 1, 0.9, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    >
      <polygon points="50,10 90,85 10,85" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </motion.svg>
  </div>
);

// Dark mode: editorial line mesh
const DarkMesh = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen flex items-center justify-center">
    <motion.svg
      viewBox="0 0 1000 1000"
      className="w-[180%] h-[180%] sm:w-[150%] sm:h-[150%] md:w-[120%] md:h-[120%] text-foreground"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.ellipse
          key={i}
          cx="500"
          cy="500"
          rx={150 + i * 15}
          ry={300 + i * 5}
          initial={{ rotate: i * 5 }}
          animate={{
            rotate: [i * 5, i * 5 + 10, i * 5],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 10 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          strokeDasharray="4 8"
        />
      ))}
    </motion.svg>
  </div>
);

export const Hero = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <section id="home" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Grid */}
      <div className="absolute inset-0 premium-grid opacity-[0.08] dark:opacity-[0.15] pointer-events-none" />

      {/* Background: conditional per theme */}
      {isDark ? <DarkMesh /> : <FloatingShapes />}

      {/* Content */}
      <div className="container mx-auto px-5 sm:px-6 relative z-10 flex flex-col items-center text-center pointer-events-none">

        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-mono tracking-widest uppercase text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Available for projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-6 sm:mb-8 select-none"
        >
          <div className="overflow-hidden">
            <motion.h1
              custom={0} variants={textReveal} initial="hidden" animate="visible"
              className="text-foreground"
            >
              Engineering
            </motion.h1>
          </div>
          <div className="overflow-hidden relative">
            <motion.h1
              custom={1} variants={textReveal} initial="hidden" animate="visible"
              className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground dark:from-foreground dark:via-foreground/90 dark:to-muted-foreground"
            >
              Excellence.
            </motion.h1>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div className="overflow-hidden max-w-2xl mx-auto px-2">
          <motion.p
            custom={3} variants={textReveal} initial="hidden" animate="visible"
            className="text-base sm:text-lg md:text-2xl text-muted-foreground font-light leading-relaxed"
          >
            Frontend Architect & UI/UX Designer crafting premium, high-performance web applications with editorial precision.
          </motion.p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 sm:mt-16 pointer-events-auto"
        >
          <MagneticWrapper strength={0.4}>
            <a href="#projects" className="group relative inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-foreground/5 border border-foreground/15 hover:bg-foreground/10 hover:border-foreground/30 transition-all duration-500 backdrop-blur-md active:scale-95 shadow-sm hover:shadow-md dark:shadow-none">
              <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-foreground">Explore Work</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-foreground text-background flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </a>
          </MagneticWrapper>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-foreground/20 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ height: ["20%", "50%", "20%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 bg-foreground/40 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
