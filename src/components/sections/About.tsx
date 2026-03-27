"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const pillars = [
  {
    id: "philosophy",
    title: "Philosophy",
    content: "I believe that the best software feels inevitable. It shouldn't just work flawlessly; it should feel as natural as breathing. I focus on removing friction—both in the user interface and in the architecture behind it.",
    color: "#3B82F6",
    shape: (
      // Triangle
      <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-48 md:h-48 opacity-20">
        <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "engineering",
    title: "Engineering",
    content: "My background in deep technical disciplines allows me to build UI that isn't just a facade, but a robust system. Concurrency, state machines, and render cycle optimization are tools I use to solve real product challenges.",
    color: "#8B5CF6",
    shape: (
      // Square
      <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-48 md:h-48 opacity-20">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "design",
    title: "Design",
    content: "Trained in editorial and minimalist design principles. I prioritize typography, whitespace, and a stringent color palette over flashy distractions. Every element on the screen must justify its existence.",
    color: "#10B981",
    shape: (
      // Circle
      <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-48 md:h-48 opacity-20">
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }
];

export const About = () => {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const [torchPos, setTorchPos] = useState({ x: -1000, y: -1000 });
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect();
        setTorchPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="relative py-32 md:py-48 bg-background overflow-hidden"
    >
      {/* Background Topographic lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <svg width="100%" height="100%">
          <pattern id="topo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
             <path d="M0 50 Q 25 25 50 50 T 100 50" fill="none" stroke="#fff" strokeWidth="1" />
             <path d="M0 70 Q 25 45 50 70 T 100 70" fill="none" stroke="#fff" strokeWidth="1" />
             <path d="M0 90 Q 25 65 50 90 T 100 90" fill="none" stroke="#fff" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-32">
        
        {/* Superior Top Section: Flashlight Mask */}
        <div className="relative group">
          <div className="flex items-center gap-4 mb-12">
            <span className="h-px w-8 bg-muted-foreground/50" />
            <span className="uppercase tracking-widest text-xs font-mono text-muted-foreground">02 / About</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-[-0.03em] mb-6 max-w-5xl leading-tight">
            The Journey.
          </h2>

          <div className="relative cursor-crosshair">
            {/* Dark background text layer */}
            <p className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] text-white/5 md:text-white/10 select-none">
              Bridging the gap between deep technical engineering and high-end aesthetic design. The best software feels inevitable, executing complex logic behind an effortless interface.
            </p>
            
            {/* Illuminated Mask overlay revealing exactly the same text but pure white */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                WebkitMaskImage: `radial-gradient(400px circle at ${torchPos.x}px ${torchPos.y - 120}px, black 10%, transparent 100%)`,
                maskImage: `radial-gradient(400px circle at ${torchPos.x}px ${torchPos.y - 120}px, black 10%, transparent 100%)`
              }}
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] text-white">
                Bridging the gap between deep technical engineering and high-end aesthetic design. The best software feels inevitable, executing complex logic behind an effortless interface.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Expanding Accordion Pillars */}
        <div className="flex flex-col md:flex-row w-full h-auto md:h-[600px] gap-4">
          {pillars.map((pillar) => {
            const isHovered = hoveredPillar === pillar.id;
            const isOtherHovered = hoveredPillar !== null && !isHovered;
            
            return (
              <motion.div
                key={pillar.id}
                onHoverStart={() => setHoveredPillar(pillar.id)}
                onHoverEnd={() => setHoveredPillar(null)}
                // Mobile stacked layout vs horizontal flex on md+
                className={`relative flex flex-col border border-white/10 rounded-[2rem] bg-white/[0.02] backdrop-blur-md overflow-hidden p-8 md:p-12 cursor-pointer transition-all duration-700
                  ${!hoveredPillar ? "md:flex-1" : isHovered ? "md:flex-[3]" : "md:flex-[0.5]"}
                `}
                animate={{
                  opacity: isOtherHovered ? 0.3 : 1,
                  filter: isOtherHovered ? "blur(4px)" : "blur(0px)",
                }}
              >
                {/* Number / Identifier */}
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                  [ {pillar.id} ]
                </div>

                {/* Always-visible Title */}
                <h3 
                  className={`text-3xl font-medium tracking-tight mb-6 transition-all duration-700
                    ${isOtherHovered ? "text-white/20" : "text-white"}
                    ${isHovered ? "md:text-5xl" : ""}
                  `}
                >
                  {pillar.title}
                </h3>

                {/* Description Text (Fades in/out) */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered || !hoveredPillar ? 1 : 0,
                    height: isHovered || !hoveredPillar ? "auto" : "0px",
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground font-light text-xl leading-[1.6] max-w-lg mt-4">
                    {pillar.content}
                  </p>
                </motion.div>

                {/* Dynamic SVG Shape in Background */}
                <motion.div 
                  className="absolute bottom-[-10%] right-[-10%] pointer-events-none mix-blend-screen"
                  initial={{ rotate: 0, scale: 0.8 }}
                  animate={{ 
                    rotate: isHovered ? 90 : 0,
                    scale: isHovered ? 1.5 : 0.8,
                    color: isHovered ? pillar.color : "#ffffff"
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
