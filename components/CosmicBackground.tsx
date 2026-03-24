"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 40 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 2 + Math.random() * 4,
  opacity: 0.2 + Math.random() * 0.8,
  duration: 8 + Math.random() * 10,
  delay: Math.random() * 6,
}));

export default function CosmicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),_transparent_28%),linear-gradient(180deg,_rgba(10,2,26,0.92),_rgba(17,5,38,0.9)_45%,_rgba(0,0,0,1))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(236,72,153,0.12),_transparent_25%),radial-gradient(circle_at_80%_30%,_rgba(168,85,247,0.1),_transparent_30%),radial-gradient(circle_at_50%_80%,_rgba(59,130,246,0.08),_transparent_32%)]" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-pink-400 shadow-[0_0_16px_rgba(244,114,182,0.8)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: particle.opacity * 0.45, y: 0 }}
          animate={{ y: ["0%", "100%"], opacity: [particle.opacity * 0.35, particle.opacity, particle.opacity * 0.3] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_38%,_rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
