"use client";

import React from "react";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <img
        src="/rizzaura_bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs uppercase tracking-widest text-white/70">
            Powered by Rizzaura AI
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-500 mb-6 leading-tight">
          DECODE YOUR <br />
          <span className="italic">RIZZPOTENTIAL</span>
        </h1>

        <p className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
          The world's first cinematic Rizz engine. Analyze your social data, unlock hidden charisma, and command any room with precision.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold flex items-center gap-2 shadow-2xl shadow-purple-500/20 transition-all border border-purple-400/30"
          >
            Start Analyzing <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-xl rounded-2xl font-bold border border-white/20 transition-all"
          >
            Watch Demo
          </motion.button>
        </div>
      </motion.div>
      
      {/* Cinematic Glitch Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
    </section>
  );
}
