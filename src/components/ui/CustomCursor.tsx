"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === "dark";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.8 });

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 35 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 35 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");
    
    if (interactive) {
      setIsHovering(true);
      const label = interactive.getAttribute("data-cursor") || 
                    interactive.getAttribute("aria-label") || "";
      setHoverText(label);
    } else {
      setIsHovering(false);
      setHoverText("");
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseOver, isTouchDevice]);

  if (isTouchDevice) return null;

  // Theme-adaptive cursor colors
  const ringColor = isDark ? "text-white" : "text-[#6b5b8a]";      // purple-charcoal in light
  const dotColor = isDark ? "bg-white" : "bg-[#6b5b8a]";
  const textColor = isDark ? "text-white" : "text-[#6b5b8a]";
  const blendMode = isDark ? "mix-blend-difference" : "mix-blend-normal";

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className={`custom-cursor-ring fixed top-0 left-0 pointer-events-none z-[99] hidden md:flex items-center justify-center ${blendMode} gpu`}
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 80 : isClicking ? 32 : 48,
          height: isHovering ? 80 : isClicking ? 32 : 48,
          opacity: isVisible ? 1 : 0,
          borderRadius: "50%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className={`w-full h-full ${ringColor}`}
          fill="none" 
          stroke="currentColor"
        >
          <motion.circle 
            cx="50" cy="50" r="46"
            strokeWidth={isHovering ? 1 : 1.5}
            strokeDasharray={isHovering ? "8 6" : "0 0"}
            animate={{ rotate: isHovering ? 360 : 0 }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              strokeDasharray: { duration: 0.4 },
              strokeWidth: { duration: 0.3 }
            }}
            opacity={isHovering ? 0.8 : 0.4}
          />
        </svg>

        {hoverText && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute text-[9px] font-mono uppercase tracking-[0.15em] ${textColor} whitespace-nowrap`}
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className={`custom-cursor-dot fixed top-0 left-0 ${dotColor} rounded-full pointer-events-none z-[100] ${blendMode} hidden md:block gpu`}
        style={{
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 6 : isClicking ? 10 : 5,
          height: isHovering ? 6 : isClicking ? 10 : 5,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </>
  );
};
