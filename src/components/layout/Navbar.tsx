"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Projects", href: "#projects", num: "01" },
  { name: "About", href: "#about", num: "02" },
  { name: "Skills", href: "#skills", num: "03" },
  { name: "Contact", href: "#contact", num: "04" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className={cn(
          "container mx-auto px-5 sm:px-6 md:px-12 flex items-center justify-between transition-all duration-500",
          scrolled 
            ? cn(
                "backdrop-blur-2xl border rounded-full max-w-[90%] sm:max-w-3xl py-3 px-6 sm:px-8",
                isDark
                  ? "bg-background/60 border-foreground/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  : "bg-background/70 border-foreground/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              )
            : "max-w-7xl py-2"
        )}>
          <Link href="/" className="text-lg font-semibold tracking-tighter relative group">
            <span className="relative z-10">L</span>
            <span className="text-muted-foreground relative z-10">.</span>
            <span className="absolute -inset-2 rounded-lg bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className={cn(
                        "absolute inset-0 rounded-full border",
                        isDark
                          ? "bg-foreground/10 border-foreground/10"
                          : "bg-foreground/[0.05] border-foreground/[0.08] shadow-sm"
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">{link.num}</span>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <div className="w-px h-5 bg-foreground/10" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono text-muted-foreground">Open</span>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Light mode: subtle orb in mobile menu */}
            {!isDark && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(196,167,231,0.1) 0%, transparent 60%)" }} />
                <div className="absolute bottom-[15%] left-[5%] w-[250px] h-[250px] rounded-full" style={{ background: "radial-gradient(circle, rgba(235,188,186,0.08) 0%, transparent 60%)" }} />
              </div>
            )}

            <nav className="flex flex-col items-center gap-2 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-4 sm:gap-6 py-3 sm:py-4"
                  >
                    <span className="text-sm font-mono text-muted-foreground/40 w-8">{link.num}</span>
                    <span className="text-4xl sm:text-5xl font-light tracking-tight text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 flex items-center gap-3 text-xs font-mono text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for new projects
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
