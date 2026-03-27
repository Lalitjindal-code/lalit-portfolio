"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        <Link href="/" className="text-xl font-medium tracking-tighter">
          Lalit.<span className="text-muted-foreground">Dev</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-foreground transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
        {/* Mobile menu toggle could be added here, omitting for minimal layout focus right now */}
      </div>
    </motion.header>
  );
};
