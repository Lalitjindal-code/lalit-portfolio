"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX,
        background: isDark
          ? "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.1) 100%)"
          : "linear-gradient(90deg, rgba(168,130,200,0.2) 0%, rgba(168,130,200,0.8) 50%, rgba(168,130,200,0.2) 100%)",
        boxShadow: isDark
          ? "0 0 20px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)"
          : "0 0 20px rgba(168,130,200,0.3), 0 0 60px rgba(168,130,200,0.1)",
      }}
    />
  );
};
