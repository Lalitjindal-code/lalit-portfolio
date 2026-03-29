"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles, Star } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const handleToggle = useCallback(() => {
    if (isTransitioning) return;

    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    // Get button position for circular reveal origin
    const btn = buttonRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      document.documentElement.style.setProperty("--tx", `${x}px`);
      document.documentElement.style.setProperty("--ty", `${y}px`);
    }

    setIsTransitioning(true);

    // Create overlay for smooth circular reveal
    const overlay = document.createElement("div");
    overlay.className = "theme-transition-overlay theme-reveal-anim";
    overlay.style.backgroundColor = nextTheme === "dark" ? "#000" : "#f8f5f0";
    document.body.appendChild(overlay);

    // Switch theme at the midpoint
    setTimeout(() => setTheme(nextTheme), 200);

    // Cleanup
    setTimeout(() => {
      overlay.remove();
      setIsTransitioning(false);
    }, 800);
  }, [resolvedTheme, setTheme, isTransitioning]);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleToggle}
      className={`relative w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300 overflow-hidden group
        ${isDark
          ? "border-foreground/10 hover:border-foreground/30"
          : "border-foreground/[0.08] hover:border-foreground/20 hover:bg-foreground/[0.03]"
        }
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      data-cursor="Theme"
    >
      {/* Sparkle burst on hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Sparkles className="w-3 h-3 absolute top-0.5 right-0.5 text-yellow-400/50" />
        ) : (
          <Star className="w-3 h-3 absolute top-0.5 right-0.5 text-purple-400/40" />
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <Moon className="w-4 h-4 text-foreground/70" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <Sun className="w-4 h-4 text-foreground/70" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
