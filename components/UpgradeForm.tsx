"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function UpgradeForm() {
  return (
    <section className="py-32 px-4 relative overflow-hidden bg-gradient-to-t from-black to-slate-950">
      <div className="max-w-4xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-12 md:p-20 backdrop-blur-3xl shadow-2xl shadow-purple-900/10">
        <h2 className="text-4xl md:text-6xl font-black mb-8 text-center bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-purple-400">
          UPGRADE YOUR REPUTATION.
        </h2>
        
        <p className="text-center text-white/50 mb-12 max-w-lg mx-auto leading-relaxed">
          Join the waitlist for the Premium Rizz Engine. Limited seats for beta access per quarter.
        </p>

        <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500/50 transition-all text-white placeholder-white/30"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-purple-500/20"
          >
            Apply Now <Send className="w-5 h-5" />
          </motion.button>
        </form>

        <p className="text-center mt-12 text-xs uppercase tracking-widest text-white/20">
          Secure. Fast. Charismatic.
        </p>
      </div>
    </section>
  );
}
