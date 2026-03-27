"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Environment } from "@react-three/drei";

export default function HeroCanvas() {
  return (
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
  );
}
