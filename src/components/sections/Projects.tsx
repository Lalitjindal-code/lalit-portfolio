"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Reimagined",
    problem: "Legacy architecture causing slow load times and 40% bounce rate at checkout.",
    solution: "Migrated to Next.js App Router with Zustand state management, increasing conversion by 25%.",
    tech: ["Next.js", "Zustand", "TailwindCSS", "Stripe"],
    link: "#",
    year: "2025"
  },
  {
    title: "Financial Dashboard UI",
    problem: "Complex data visualization was leading to user fatigue and high error rates.",
    solution: "Crafted a minimal, high-contrast dashboard with D3.js and accessible Shadcn UI components.",
    tech: ["React", "D3.js", "Radix UI", "Framer Motion"],
    link: "#",
    year: "2024"
  },
  {
    title: "AI Diagnostic Tool",
    problem: "Engineers struggled to analyze system logs quickly causing high MTTR.",
    solution: "Built a highly-concurrent Log interface using WebSockets and abstract data visualization.",
    tech: ["WebSockets", "React", "Node.js", "Redis"],
    link: "#",
    year: "2024"
  },
  {
    title: "Neo-Editorial Portfolio",
    problem: "Generic portfolios fail to stand out to elite tech recruiters.",
    solution: "Designed and engineered an award-winning minimal portfolio with advanced micro-interactions.",
    tech: ["Next.js", "Tailwind", "Motion", "Zod"],
    link: "#",
    year: "2026"
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 sm:py-32 md:py-48 relative">
      <div className="container mx-auto px-5 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20 md:mb-32 max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-muted-foreground/50" />
            <span className="uppercase tracking-widest text-xs font-mono text-muted-foreground">01 / Projects</span>
          </div>
          <h2 className="font-semibold tracking-[-0.03em] mb-4 sm:mb-6">Selected Work</h2>
          <p className="text-muted-foreground leading-relaxed font-light">
            A curation of complex problems solved through elegant architecture and rigorous engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <Link href={project.link} className="group block h-full">
                <div className="h-full bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-700 ease-out rounded-2xl sm:rounded-[24px] overflow-hidden relative backdrop-blur-sm shadow-2xl active:scale-[0.98] gpu">
                  {/* Subtle Hover Gradient Inject */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="p-5 sm:p-8 md:p-12 flex flex-col h-full justify-between relative z-10">
                    <div>
                      <div className="flex justify-between items-start mb-5 sm:mb-8">
                        <span className="text-sm font-mono text-muted-foreground/70">{project.year}</span>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-4xl font-semibold tracking-[-0.02em] mb-4 sm:mb-6 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-12">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground/50 mb-2 font-mono">Problem</p>
                          <p className="text-base text-muted-foreground leading-[1.6] font-light">{project.problem}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground/50 mb-2 font-mono">Solution</p>
                          <p className="text-base text-foreground leading-[1.6]">{project.solution}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((t) => (
                        <div key={t} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground group-hover:border-white/10 group-hover:text-foreground transition-colors duration-500">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
