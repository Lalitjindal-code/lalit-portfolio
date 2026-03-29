"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export const FilmGrain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;
    const FPS = 8;
    const interval = 1000 / FPS;

    const resize = () => {
      canvas.width = window.innerWidth * 0.5;
      canvas.height = window.innerHeight * 0.5;
    };

    const renderGrain = (timestamp: number) => {
      animationId = requestAnimationFrame(renderGrain);

      const delta = timestamp - lastTime;
      if (delta < interval) return;
      lastTime = timestamp - (delta % interval);

      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = resolvedTheme === "dark" ? 25 : 10; // Subtler in light mode
      }

      ctx.putImageData(imageData, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(renderGrain);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[90] pointer-events-none opacity-60 dark:opacity-60 mix-blend-overlay"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
};
