"use client";

import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-32 md:py-48 bg-white/[0.01]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 sticky top-32"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-8 bg-muted-foreground/50" />
              <span className="uppercase tracking-widest text-xs font-mono text-muted-foreground">02 / About</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-6">The Journey</h2>
            <p className="text-lg text-muted-foreground max-w-sm font-light leading-relaxed">
              Bridging the gap between deep technical engineering and high-end aesthetic design.
            </p>
          </motion.div>
          
          <div className="lg:col-span-8 lg:col-start-6 space-y-16">
            {[
              {
                title: "Philosophy",
                content: "I believe that the best software feels inevitable. It shouldn't just work flawlessly; it should feel as natural as breathing. I focus on removing friction—both in the user interface and in the architecture behind it."
              },
              {
                title: "Engineering",
                content: "My background in deep technical disciplines allows me to build UI that isn't just a facade, but a robust system. Concurrency, state machines, and render cycle optimization are tools I use to solve real product challenges."
              },
              {
                title: "Design",
                content: "Trained in editorial and minimalist design principles. I prioritize typography, whitespace, and a stringent color palette over flashy distractions. Every element on the screen must justify its existence."
              }
            ].map((block, idx) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-white/10 pt-10"
              >
                <h3 className="text-2xl font-semibold tracking-tight mb-6">{block.title}</h3>
                <p className="text-lg md:text-xl text-muted-foreground font-light leading-[1.8]">
                  {block.content}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
