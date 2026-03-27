"use client";

import { motion } from "framer-motion";

const skillsData = [
  {
    category: "Architecture",
    items: ["Next.js App Router", "React Server Components", "TypeScript", "State Machines", "Node.js", "GraphQL"]
  },
  {
    category: "Design Systems",
    items: ["Tailwind CSS v4", "Figma Auto-Layout", "Design Tokens", "Typography Scaling", "Radix UI", "Accessibility"]
  },
  {
    category: "High-Performance",
    items: ["Framer Motion", "GSAP", "WebGL", "Three.js", "React Three Fiber", "WebSockets"]
  }
];

export const Skills = () => {
  return (
    <section className="py-32 md:py-48 border-t border-white/5 bg-background relative overflow-hidden">
      {/* Subtle Aurora for Skills */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-muted-foreground/50" />
            <span className="uppercase tracking-widest text-xs font-mono text-muted-foreground">03 / Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-6">Core Competencies</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {skillsData.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-10 pb-4 border-b border-white/10">
                {group.category}
              </h3>
              <ul className="space-y-6">
                {group.items.map((skill) => (
                  <li key={skill} className="text-2xl md:text-3xl font-medium tracking-tight hover:text-white transition-colors duration-500 cursor-default text-muted-foreground">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
