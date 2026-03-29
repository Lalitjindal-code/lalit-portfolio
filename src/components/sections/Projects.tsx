"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "E-Commerce Reimagined",
    problem: "Legacy architecture causing slow load times and 40% bounce rate at checkout.",
    solution: "Migrated to Next.js App Router with Zustand state management, increasing conversion by 25%.",
    tech: ["Next.js", "Zustand", "TailwindCSS", "Stripe"],
    link: "#",
    year: "2025",
    lightAccent: "from-purple-100/50 via-purple-50/30 to-transparent",
  },
  {
    title: "Financial Dashboard UI",
    problem: "Complex data visualization was leading to user fatigue and high error rates.",
    solution: "Crafted a minimal, high-contrast dashboard with D3.js and accessible Shadcn UI components.",
    tech: ["React", "D3.js", "Radix UI", "Framer Motion"],
    link: "#",
    year: "2024",
    lightAccent: "from-sky-100/50 via-sky-50/30 to-transparent",
  },
  {
    title: "AI Diagnostic Tool",
    problem: "Engineers struggled to analyze system logs quickly causing high MTTR.",
    solution: "Built a highly-concurrent Log interface using WebSockets and abstract data visualization.",
    tech: ["WebSockets", "React", "Node.js", "Redis"],
    link: "#",
    year: "2024",
    lightAccent: "from-rose-100/50 via-rose-50/30 to-transparent",
  },
  {
    title: "Neo-Editorial Portfolio",
    problem: "Generic portfolios fail to stand out to elite tech recruiters.",
    solution: "Designed and engineered an award-winning minimal portfolio with advanced micro-interactions.",
    tech: ["Next.js", "Tailwind", "Motion", "Zod"],
    link: "#",
    year: "2026",
    lightAccent: "from-amber-100/50 via-amber-50/30 to-transparent",
  }
];

export const Projects = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <section id="projects" className="py-20 sm:py-32 md:py-48 relative bg-background overflow-hidden">
      {/* Light mode floating accent */}
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-[10%] left-[40%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(196,167,231,0.1) 0%, transparent 60%)" }}
            animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[0%] right-[10%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(156,207,216,0.08) 0%, transparent 60%)" }}
            animate={{ scale: [1, 1.12, 1], x: [0, 15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </div>
      )}

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
                <div className={`h-full transition-all duration-700 ease-out rounded-2xl sm:rounded-[24px] overflow-hidden relative gpu
                  ${isDark
                    ? "bg-foreground/[0.02] border border-foreground/10 hover:bg-foreground/[0.04] hover:border-foreground/20 backdrop-blur-sm shadow-2xl"
                    : "bg-background border border-foreground/[0.06] hover:border-foreground/10 shadow-sm hover:shadow-xl"
                  }
                  active:scale-[0.98]
                `}>
                  {/* Hover glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]
                    ${isDark
                      ? "bg-gradient-to-br from-foreground/5 to-transparent"
                      : `bg-gradient-to-br ${project.lightAccent}`
                    }
                  `} />
                  
                  <div className="p-5 sm:p-8 md:p-12 flex flex-col h-full justify-between relative z-10">
                    <div>
                      <div className="flex justify-between items-start mb-5 sm:mb-8">
                        <span className="text-sm font-mono text-muted-foreground/70">{project.year}</span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                          ${isDark
                            ? "bg-foreground/5 border border-foreground/5 group-hover:bg-foreground group-hover:text-background"
                            : "bg-foreground/[0.03] border border-foreground/[0.08] group-hover:bg-foreground group-hover:text-background"
                          }
                        `}>
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
                        <div key={t} className={`px-3 py-1.5 rounded-md font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors duration-500
                          ${isDark
                            ? "bg-foreground/5 border border-foreground/5 group-hover:border-foreground/10 group-hover:text-foreground"
                            : "bg-foreground/[0.03] border border-foreground/[0.06] group-hover:border-foreground/10 group-hover:text-foreground"
                          }
                        `}>
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
