"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, Zap, Sparkles } from "lucide-react";
import { calculateRizz, RizzScore } from "@/lib/rizz";

export default function DecodeSection() {
  const [name, setName] = useState("");
  const [score, setScore] = useState<RizzScore | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const features = [
    {
      icon: <Search className="w-8 h-8 text-purple-400" />,
      title: "Data Analysis",
      description:
        "Deep scanning of your communication patterns, body language, and presence.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: "Instant Feedback",
      description:
        "Real-time charisma optimization suggestions for any social interaction.",
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: "Privately Secured",
      description:
        "Your data remains locally stored and anonymized. Secure by design.",
    },
  ];

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setIsScanning(true);
    setScore(null);

    // Simulated scan duration
    setTimeout(() => {
      setScore(calculateRizz(name));
      setIsScanning(false);
    }, 2000);
  };

  return (
    <section className="py-24 px-4 bg-[#140533]/50 relative overflow-hidden backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          DECODE THE UNSEEN
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto">
          We leverage advanced machine learning models to identify high-conversion
          social cues and charisma markers, giving you an unfair advantage.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-20">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl">
          <h3 className="text-xl font-bold mb-6 text-center text-purple-300">
            TRY THE ANALYZER (BETA)
          </h3>
          <form onSubmit={handleScan} className="flex gap-4">
            <input
              type="text"
              placeholder="Enter your name/alias"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none"
            />
            <button
              disabled={isScanning}
              className="px-6 py-4 bg-purple-600 rounded-xl font-bold hover:bg-purple-500 transition-colors disabled:opacity-50"
            >
              {isScanning ? "Scanning..." : "Scan"}
            </button>
          </form>

          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 overflow-hidden"
              >
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-purple-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
                <p className="text-xs text-purple-400 mt-2 text-center uppercase tracking-widest animate-pulse">
                  Analyzing Communication Vectors...
                </p>
              </motion.div>
            )}

            {score && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center"
              >
                <div className="text-4xl font-black text-purple-400 mb-2">
                  {Math.round(score.total)}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-purple-300/60 mb-4 font-bold">
                  OVERALL RIZZ SCORE
                </div>
                <div className="text-xl font-bold italic mb-4">
                  "{score.archetype}"
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-lg font-bold">{score.charisma}</div>
                    <div className="text-[10px] text-white/30 truncate">CHARISMA</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-lg font-bold">{score.verbal}</div>
                    <div className="text-[10px] text-white/30 truncate">VERBAL</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-lg font-bold">{score.presence}</div>
                    <div className="text-[10px] text-white/30 truncate">PRESENCE</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group cursor-default"
          >
            <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
            <p className="text-white/40 leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
