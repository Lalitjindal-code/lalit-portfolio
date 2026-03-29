"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const skillsData = [
  {
    category: "Architecture",
    color: "#3B82F6",
    items: ["Next.js App Router", "React Server Components", "TypeScript", "State Machines", "Node.js", "GraphQL"]
  },
  {
    category: "Design Systems",
    color: "#8B5CF6",
    items: ["Tailwind CSS v4", "Figma Auto-Layout", "Design Tokens", "Typography Scaling", "Radix UI", "Accessibility"]
  },
  {
    category: "High-Performance",
    color: "#10B981",
    items: ["Framer Motion", "GSAP", "WebGL", "Three.js", "React Three Fiber", "WebSockets"]
  }
];

export const Skills = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section 
      id="skills"
      ref={containerRef}
      className="py-20 sm:py-32 md:py-48 bg-background relative overflow-hidden group"
    >
      {/* Interactive Spotlight Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 hidden md:block"
        animate={{
          background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.03), transparent 40%)`
        }}
      />

      {/* Dot Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 flex items-center justify-center">
         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dot-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-grid)" />
         </svg>
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10 flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-24">
        
        {/* Left Concept Pillar */}
        <div className="md:w-1/3 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <span className="h-px w-8 bg-muted-foreground/50" />
              <span className="uppercase tracking-widest text-xs font-mono text-muted-foreground">03 / Capabilities</span>
            </div>
            <h2 className="font-semibold tracking-[-0.03em] leading-tight mb-4 sm:mb-8">
              Technical <br/> Ecosystem.
            </h2>
            <p className="text-muted-foreground font-light max-w-sm hidden sm:block">
              An interactive constellation of technologies. Hover over categories to alter focus, and drag nodes to interact with the environment.
            </p>
          </motion.div>
        </div>

        {/* Right Interactive Area */}
        <div className="md:w-2/3 flex flex-col gap-3 sm:gap-4 md:gap-6">
          {skillsData.map((group) => {
            const isHovered = hoveredCategory === group.category;
            const isOtherHovered = hoveredCategory !== null && !isHovered;

            return (
              <motion.div
                key={group.category}
                onHoverStart={() => setHoveredCategory(group.category)}
                onHoverEnd={() => setHoveredCategory(null)}
                onClick={() => setHoveredCategory(isHovered ? null : group.category)}
                animate={{
                  height: isHovered ? "auto" : isMobile ? "auto" : "120px",
                  opacity: isOtherHovered ? 0.3 : 1,
                  filter: isOtherHovered ? "blur(4px)" : "blur(0px)",
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col border border-foreground/10 rounded-2xl sm:rounded-3xl bg-foreground/[0.02] backdrop-blur-md overflow-hidden p-5 sm:p-8 md:p-10 transform-gpu cursor-pointer"
              >
                {/* Dynamic Category SVG backdrop */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none z-0 hidden md:block"
                  animate={{
                     opacity: isHovered ? 0.1 : 0
                  }}
                  transition={{ duration: 1 }}
                >
                  <svg width="100%" height="100%" preserveAspectRatio="none">
                    <line x1="0" y1="100%" x2="100%" y2="0" stroke={group.color} strokeWidth="1" strokeDasharray="10 10" />
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke={group.color} strokeWidth="1" strokeDasharray="10 10" />
                  </svg>
                </motion.div>

                {/* Header */}
                <div className="relative z-10 flex justify-between items-center w-full mb-2 sm:mb-4">
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-medium tracking-tight text-foreground transition-colors">
                    {group.category}
                  </h3>
                  <motion.div 
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isHovered ? 90 : 0 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 text-sm sm:text-base shrink-0"
                  >
                    +
                  </motion.div>
                </div>

                {/* Draggable Chips */}
                <motion.div 
                  className="relative z-10 pt-3 sm:pt-6 flex flex-wrap gap-2 sm:gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered || isMobile ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {group.items.map((skill) => (
                    <motion.div
                      key={skill}
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0.2}
                      whileHover={{ scale: 1.05, borderColor: group.color, color: "#fff" }}
                      whileTap={{ scale: 0.95 }}
                      whileDrag={{ scale: 1.1, zIndex: 50, boxShadow: "0px 10px 30px rgba(0,0,0,0.5)" }}
                      className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-foreground/10 bg-foreground/5 text-muted-foreground font-mono text-xs sm:text-sm tracking-wide cursor-grab active:cursor-grabbing hover:bg-foreground/10 transition-colors backdrop-blur-xl"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
