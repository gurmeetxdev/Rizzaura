"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const hooks = [
  "💘 Enter Rizz Mode",
  "🧠 AI just audited your flirting skills",
  "🕶 Smooth Operator mode available",
  "📉 Stop getting ghosted",
  "✨ Upgrade your aura",
  "🚨 Dry texter alert",
]

type RizzBarProps = {
  onEnter?: () => void
}

export default function RizzBar({ onEnter = () => {} }: RizzBarProps) {
  const [hook, setHook] = useState("")

  useEffect(() => {
    const random = hooks[Math.floor(Math.random() * hooks.length)]
    setHook(random)
  }, [])

  return (
    <div className="flex flex-col items-center pointer-events-auto">
      <div className="group relative flex flex-col items-center rounded-[2.5rem] border border-white/10 bg-white/5 p-12 backdrop-blur-2xl transition-all duration-500 hover:border-pink-500/30">
        {/* Animated Glow Backdrop */}
        <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-pink-500/20 to-purple-600/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-lg md:text-xl font-medium text-white/90 mb-12 tracking-wide"
        >
          {hook}
        </motion.p>

        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(236, 72, 153, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="relative px-12 py-5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white text-xl font-bold shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            ✨ Dive In <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite]" />
        </motion.button>
      </div>
    </div>
  )
}
