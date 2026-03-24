"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

const WITTY_HOOKS = [
  "your rizz needs a checkup 💀",
  "dry texter alert detected 🚨",
  "your chats are giving npc 😭",
  "rizz depleted, recharging... 📉",
  "upgrade your aura before they ghost 💅",
  "audit your flirting skills rn 🧠",
  "stop typing 'lol' for everything 🔥",
  "you have 0.2 rizz points remaining 🚨",
  "smooth operator mode disabled 🕶️",
]

export default function PremiumGate({ onEnter }: { onEnter: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const skullRef = useRef<HTMLSpanElement>(null)
  const [hook, setHook] = useState(WITTY_HOOKS[0])

  // Magnetic/Interactive Effects for Card
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  // Reactive Skull Logic
  const skullX = useMotionValue(0)
  const skullY = useMotionValue(0)
  const skullSpringX = useSpring(skullX, { stiffness: 1000, damping: 20 })
  const skullSpringY = useSpring(skullY, { stiffness: 1000, damping: 20 })

  // Magnetic Button Logic
  const btnX = useMotionValue(0)
  const btnY = useMotionValue(0)
  const btnSpringX = useSpring(btnX, { stiffness: 600, damping: 20 })
  const btnSpringY = useSpring(btnY, { stiffness: 600, damping: 20 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)

    // Skull Proximity (Repel Effect)
    if (skullRef.current) {
      const sRect = skullRef.current.getBoundingClientRect()
      const sX = sRect.left + sRect.width / 2
      const sY = sRect.top + sRect.height / 2
      const dX = event.clientX - sX
      const dY = event.clientY - sY
      const dist = Math.sqrt(dX * dX + dY * dY)
      
      if (dist < 150) {
        const force = (150 - dist) * 0.8
        const angle = Math.atan2(dY, dX)
        skullX.set(-Math.cos(angle) * force)
        skullY.set(-Math.sin(angle) * force)
      } else {
        skullX.set(0)
        skullY.set(0)
      }
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    skullX.set(0)
    skullY.set(0)
  }

  const handleBtnMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = event.clientX - centerX
    const distanceY = event.clientY - centerY
    btnX.set(distanceX * 0.35)
    btnY.set(distanceY * 0.35)
  }

  const handleBtnMouseLeave = () => {
    btnX.set(0)
    btnY.set(0)
  }

  useEffect(() => {
    setHook(WITTY_HOOKS[Math.floor(Math.random() * WITTY_HOOKS.length)])
    
    const EMOJIS = ["💬", "🔥", "💅", "😭", "✨", "💀", "🫦", "👀", "💘", "🎯"]
    const layer = document.getElementById("emoji-layer")

    const spawnEmoji = () => {
      if (!layer) return
      const el = document.createElement("span")
      el.className = "flying-emoji"
      el.innerText = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      el.style.left = `${Math.random() * 100}%`
      el.style.fontSize = `${18 + Math.random() * 28}px`
      el.style.setProperty("--dur", `${7 + Math.random() * 9}s`)
      el.style.setProperty("--delay", `${Math.random() * 6}s`)
      el.style.setProperty("--rot", `${(Math.random() - 0.5) * 60}deg`)
      layer.appendChild(el)
      window.setTimeout(() => el.remove(), 15000)
    }

    const interval = window.setInterval(spawnEmoji, 1200)
    return () => {
      window.clearInterval(interval)
      layer?.replaceChildren()
    }
  }, [])

  const extractEmoji = (text: string) => {
    const match = text.match(/💀|🚨|😭|📉|💅|🧠|🔥|🚨|🕶️/)
    return match ? match[0] : "💀"
  }

  const cleanText = (text: string) => {
    return text.replace(/💀|🚨|😭|📉|💅|🧠|🔥|🚨|🕶️/, "").trim()
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#07030f] overflow-hidden">
      <div className="bg-mesh" />
      <div className="grain" />
      <div id="emoji-layer" />

      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="card text-center relative pointer-events-auto"
      >
        <div className="alert-row">
          <span className="alert-icon">🚨</span>
          <div className="alert-text">dry texter alert</div>
        </div>

        <h1 className="sub-label flex items-center justify-center gap-3">
          {cleanText(hook)}
          <motion.span
            ref={skullRef}
            style={{ x: skullSpringX, y: skullSpringY, display: "inline-block" }}
            whileHover={{ scale: 1.4, rotate: [0, 15, -15, 0] }}
            className="text-4xl md:text-5xl cursor-pointer"
          >
            {extractEmoji(hook)}
          </motion.span>
        </h1>

        <div className="relative group mt-12">
          <motion.button
            onClick={onEnter}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
            style={{ x: btnSpringX, y: btnSpringY }}
            whileHover={{ 
              scale: 1.15,
              rotate: -2.5,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.9 }}
            className="cta-btn relative z-10 overflow-hidden"
          >
            <div className="cta-inner">
              <motion.span 
                animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="cta-emoji"
              >
                ✨
              </motion.span>
              <motion.span 
                className="cta-text font-bold tracking-tight"
                whileHover={{ x: [0, -1, 1, -1, 1, 0], transition: { repeat: Infinity, duration: 0.1 } }}
              >
                analyse my rizz
              </motion.span>
              <span className="cta-arrow ml-2">→</span>
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-indigo-500/50 blur-2xl opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.button>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-transparent blur-3xl animate-pulse" />
          </div>
        </div>

        <p className="hint mt-12 opacity-60">
          powered by <span className="font-extrabold text-pink-400">rizzaura</span> · 100% unhinged ai
        </p>
      </motion.div>
    </div>
  )
}
