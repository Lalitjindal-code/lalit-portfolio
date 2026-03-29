"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

const pillars = [
  {
    id: "philosophy",
    title: "Philosophy",
    content: "I believe that the best software feels inevitable. It shouldn't just work flawlessly; it should feel as natural as breathing. I focus on removing friction—both in the user interface and in the architecture behind it.",
    color: "#3B82F6",
    lightColor: "from-purple-200/40 to-sky-200/30",
    shape: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-24 sm:h-24 md:w-48 md:h-48 opacity-20">
        <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "engineering",
    title: "Engineering",
    content: "My background in deep technical disciplines allows me to build UI that isn't just a facade, but a robust system. Concurrency, state machines, and render cycle optimization are tools I use to solve real product challenges.",
    color: "#8B5CF6",
    lightColor: "from-violet-200/40 to-rose-200/30",
    shape: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-24 sm:h-24 md:w-48 md:h-48 opacity-20">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "design",
    title: "Design",
    content: "Trained in editorial and minimalist design principles. I prioritize typography, whitespace, and a stringent color palette over flashy distractions. Every element on the screen must justify its existence.",
    color: "#10B981",
    lightColor: "from-emerald-200/40 to-teal-200/30",
    shape: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-24 sm:h-24 md:w-48 md:h-48 opacity-20">
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }
];

// Light mode pastel background
const PastelBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute top-[10%] right-[5%] w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(196,167,231,0.15) 0%, transparent 70%)" }}
      animate={{ scale: [1, 1.1, 1], x: [0, 15, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-[20%] left-[0%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(156,207,216,0.12) 0%, transparent 70%)" }}
      animate={{ scale: [1, 1.15, 1], y: [0, -10, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    />
    {/* Floating geometric accents */}
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute top-[5%] left-[10%] w-10 h-10 sm:w-16 sm:h-16 text-purple-300/15"
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
    </motion.svg>
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute bottom-[10%] right-[12%] w-8 h-8 sm:w-12 sm:h-12 text-rose-300/15"
      animate={{ rotate: [0, 180, 360], y: [0, -8, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="20" y="20" width="60" height="60" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 50 50)" />
    </motion.svg>
  </div>
);

export const About = () => {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const [torchPos, setTorchPos] = useState({ x: -1000, y: -1000 });
  const aboutRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === "dark";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect();
        setTorchPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="relative py-20 sm:py-32 md:py-48 bg-background overflow-hidden"
    >
      {/* Theme-conditional background */}
      {isDark ? (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
          <svg width="100%" height="100%">
            <pattern id="topo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q 25 25 50 50 T 100 50" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M0 70 Q 25 45 50 70 T 100 70" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M0 90 Q 25 65 50 90 T 100 90" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#topo)" />
          </svg>
        </div>
      ) : (
        <PastelBackground />
      )}

      <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10 flex flex-col gap-16 sm:gap-24 md:gap-32">
        
        {/* Flashlight Mask */}
        <div className="relative group">
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <span className="h-px w-8 bg-muted-foreground/50" />
            <span className="uppercase tracking-widest text-xs font-mono text-muted-foreground">02 / About</span>
          </div>

          <h2 className="mb-6 max-w-5xl leading-tight">
            The Journey.
          </h2>

          <div className="relative">
            {/* Ghost text */}
            <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light leading-[1.3] text-foreground/5 dark:text-foreground/10 select-none">
              Bridging the gap between deep technical engineering and high-end aesthetic design. The best software feels inevitable, executing complex logic behind an effortless interface.
            </p>
            
            {/* Flashlight — desktop only */}
            <motion.div
              className="absolute inset-0 pointer-events-none hidden md:block"
              style={{
                WebkitMaskImage: `radial-gradient(400px circle at ${torchPos.x}px ${torchPos.y - 120}px, black 10%, transparent 100%)`,
                maskImage: `radial-gradient(400px circle at ${torchPos.x}px ${torchPos.y - 120}px, black 10%, transparent 100%)`
              }}
            >
              <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light leading-[1.3] text-foreground">
                Bridging the gap between deep technical engineering and high-end aesthetic design. The best software feels inevitable, executing complex logic behind an effortless interface.
              </p>
            </motion.div>

            {/* Mobile fallback */}
            <p className="text-xl sm:text-2xl font-light leading-[1.3] text-foreground/70 mt-6 md:hidden">
              Bridging the gap between deep technical engineering and high-end aesthetic design. The best software feels inevitable, executing complex logic behind an effortless interface.
            </p>
          </div>
        </div>

        {/* Pillar Cards */}
        <div className="flex flex-col md:flex-row w-full h-auto md:h-[500px] lg:h-[600px] gap-3 sm:gap-4">
          {pillars.map((pillar) => {
            const isHovered = hoveredPillar === pillar.id;
            const isOtherHovered = hoveredPillar !== null && !isHovered;
            
            return (
              <motion.div
                key={pillar.id}
                onHoverStart={() => setHoveredPillar(pillar.id)}
                onHoverEnd={() => setHoveredPillar(null)}
                onClick={() => setHoveredPillar(isHovered ? null : pillar.id)}
                className={`relative flex flex-col border rounded-2xl sm:rounded-[2rem] overflow-hidden p-6 sm:p-8 md:p-12 cursor-pointer transition-all duration-700 gpu
                  ${isDark 
                    ? "border-foreground/10 bg-foreground/[0.02] backdrop-blur-md" 
                    : "border-foreground/[0.06] bg-background shadow-sm hover:shadow-lg"
                  }
                  ${!hoveredPillar ? "md:flex-1" : isHovered ? "md:flex-[3]" : "md:flex-[0.5]"}
                `}
                animate={{
                  opacity: isOtherHovered ? 0.3 : 1,
                  filter: isOtherHovered ? "blur(4px)" : "blur(0px)",
                }}
              >
                {/* Light mode: soft gradient wash on hover */}
                {!isDark && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${pillar.lightColor} pointer-events-none rounded-[2rem]`}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* Identifier */}
                <div className="relative z-10 text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3 sm:mb-4">
                  [ {pillar.id} ]
                </div>

                {/* Title */}
                <h3 
                  className={`relative z-10 text-2xl sm:text-3xl font-medium tracking-tight mb-4 sm:mb-6 transition-all duration-700
                    ${isOtherHovered ? "text-foreground/20" : "text-foreground"}
                    ${isHovered ? "md:text-4xl lg:text-5xl" : ""}
                  `}
                >
                  {pillar.title}
                </h3>

                {/* Description */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered || !hoveredPillar ? 1 : 0,
                    height: isHovered || !hoveredPillar ? "auto" : "0px",
                  }}
                  className="overflow-hidden relative z-10"
                >
                  <p className="text-muted-foreground font-light text-base sm:text-lg md:text-xl leading-[1.6] max-w-lg mt-2 sm:mt-4">
                    {pillar.content}
                  </p>
                </motion.div>

                {/* Dynamic SVG Shape */}
                <motion.div 
                  className="absolute bottom-[-10%] right-[-10%] pointer-events-none"
                  initial={{ rotate: 0, scale: 0.8 }}
                  animate={{ 
                    rotate: isHovered ? 90 : 0,
                    scale: isHovered ? 1.5 : 0.8,
                    color: isHovered ? pillar.color : isDark ? "#ffffff" : "#d1d5db"
                  }}
                  transition={{ duration: 1, ease: "backOut" }}
                >
                  {pillar.shape}
                </motion.div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
