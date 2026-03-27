"use client";

import { motion, Variants } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Environment } from "@react-three/drei";
import { ArrowDownRight } from "lucide-react";

// Proper Framer Motion Typing
const textReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Structural Minimal Grid */}
      <div className="absolute inset-0 premium-grid opacity-[0.15] mix-blend-screen pointer-events-none" />

      {/* 3D Glass / Liquid Metal Element */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={1.5} />
          <directionalLight position={[-2, -5, -2]} intensity={0.5} color="#3B82F6" />
          <Environment preset="city" />
          
          <Sphere visible args={[1, 128, 128]} scale={1.8}>
            <MeshDistortMaterial
              color="#111"
              attach="material"
              distort={0.5}
              speed={1.2}
              roughness={0.1}
              metalness={0.9}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </Sphere>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center pointer-events-none">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 select-none"
        >
          <div className="overflow-hidden">
            <motion.h1 
              custom={0} variants={textReveal} initial="hidden" animate="visible"
              className="text-white mix-blend-difference"
            >
              Engineering
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 
              custom={1} variants={textReveal} initial="hidden" animate="visible"
              className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground mix-blend-difference"
            >
              Excellence.
            </motion.h1>
          </div>
        </motion.div>

        <motion.div className="overflow-hidden max-w-2xl mx-auto mix-blend-difference">
          <motion.p
            custom={3} variants={textReveal} initial="hidden" animate="visible"
            className="text-xl md:text-2xl text-white font-light leading-relaxed"
          >
            Senior Frontend Architect & UI/UX Designer crafting premium, high-performance web applications with editorial precision.
          </motion.p>
        </motion.div>

        {/* Magnetic CTA / Interactive Element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 pointer-events-auto"
        >
          <a href="#projects" className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-500 backdrop-blur-md">
            <span className="text-sm font-medium tracking-wide uppercase text-white">Explore Work</span>
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
