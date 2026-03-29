"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

const socialLinks = [
  { 
    name: "Twitter / X", 
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  { 
    name: "LinkedIn", 
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  { 
    name: "GitHub", 
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
];

const footerNavLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background border-t border-foreground/5">
      {/* Grand CTA Banner */}
      <div className="container mx-auto px-5 sm:px-6 md:px-12 py-16 sm:py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 sm:gap-12 mb-12 sm:mb-20 md:mb-32"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-semibold tracking-[-0.04em] leading-[0.85]">
            Have a vision? <br />
            <span className="text-muted-foreground">Let's ship it.</span>
          </h2>
          <MagneticWrapper strength={0.3}>
            <a 
              href="#contact"
              className="group inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 sm:py-5 rounded-full border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-500 text-base sm:text-lg font-medium shrink-0 active:scale-95 w-full sm:w-auto justify-center"
            >
              Start a project
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </MagneticWrapper>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-foreground/10 mb-10 sm:mb-16" />

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="text-2xl font-semibold tracking-tighter w-fit">
              L<span className="text-muted-foreground">.</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Engineering premium digital experiences with obsessive attention to craft, performance, and design detail.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 md:col-start-6">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">Navigation</p>
            <nav className="flex flex-col gap-3">
              {footerNavLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Socials */}
          <div className="md:col-span-3 md:col-start-10">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">Connect</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit"
                >
                  <span className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center group-hover:border-foreground/30 group-hover:bg-foreground/5 transition-all duration-300">
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Final Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-foreground/5">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Lalit Jindal. Engineered with precision.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top
            <div className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center group-hover:border-foreground/30 group-hover:-translate-y-1 transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
