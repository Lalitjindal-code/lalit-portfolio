"use client";

import { motion, Variants } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const textReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const Hero = () => {
  return (
    <section id="home" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Structural Minimal Grid */}
      <div className="absolute inset-0 premium-grid opacity-[0.15] mix-blend-screen pointer-events-none" />

      {/* Abstract SVG Mesh — reduced count on mobile via CSS */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-20 dark:md:opacity-30 mix-blend-screen flex items-center justify-center">
        <motion.svg
          viewBox="0 0 1000 1000"
          className="w-[180%] h-[180%] sm:w-[150%] sm:h-[150%] md:w-[120%] md:h-[120%] text-white"
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



      {/* Content Overlay */}
      <div className="container mx-auto px-5 sm:px-6 relative z-10 flex flex-col items-center text-center pointer-events-none">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-6 sm:mb-8 select-none"
        >
          <div className="overflow-hidden">
            <motion.h1
              custom={0} variants={textReveal} initial="hidden" animate="visible"
              className="text-white mix-blend-difference"
            >
              Engineering
            </motion.h1>
          </div>
          <div className="overflow-hidden relative">
            <svg width="0" height="0">
              <defs>
                <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#666" />
                </linearGradient>
              </defs>
            </svg>
            <motion.h1
              custom={1} variants={textReveal} initial="hidden" animate="visible"
              className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground mix-blend-difference"
            >
              Excellence.
            </motion.h1>
          </div>
        </motion.div>

        <motion.div className="overflow-hidden max-w-2xl mx-auto mix-blend-difference px-2">
          <motion.p
            custom={3} variants={textReveal} initial="hidden" animate="visible"
            className="text-base sm:text-lg md:text-2xl text-white font-light leading-relaxed"
          >
            Senior Frontend Architect & UI/UX Designer crafting premium, high-performance web applications with editorial precision.
          </motion.p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 sm:mt-16 pointer-events-auto"
        >
          <a href="#projects" className="group relative inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-500 backdrop-blur-md active:scale-95">
            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-white">Explore Work</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
