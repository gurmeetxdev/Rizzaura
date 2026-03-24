"use client";

import React from "react";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Sparkles } from "lucide-react";

export default function Footer() {
  const socialIcons = [
    { icon: <Twitter className="w-5 h-5 mx-auto" />, link: "#" },
    { icon: <Github className="w-5 h-5 mx-auto" />, link: "#" },
    { icon: <Linkedin className="w-5 h-5 mx-auto" />, link: "#" },
  ];

  return (
    <footer className="py-24 px-4 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600 fill-purple-600" />
            <h2 className="text-3xl font-black italic tracking-widest text-white">
              RIZZ.
            </h2>
          </div>
          <p className="text-white/30 max-w-sm">
            Revolutionizing social charisma through AI-driven data analysis
            and real-world communication modeling.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm text-white/50">
          <ul className="space-y-4">
            <li className="font-bold text-white mb-6 uppercase tracking-widest">
              Resources
            </li>
            <li>Charisma AI</li>
            <li>Benchmarks</li>
            <li>Global Rizz</li>
          </ul>
          <ul className="space-y-4">
            <li className="font-bold text-white mb-6 uppercase tracking-widest">
              Company
            </li>
            <li>Team</li>
            <li>About</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-sm text-white/20">
          © 2026 RIZZAURA. All rights reserved.
        </p>
        <div className="flex gap-4">
          {socialIcons.map((s, i) => (
            <motion.a
              key={i}
              whileHover={{ y: -5, scale: 1.1 }}
              href={s.link}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all w-12 h-12 flex items-center justify-center"
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
