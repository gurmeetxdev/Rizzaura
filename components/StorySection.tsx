"use client"

import { useState, useEffect } from "react"

const CARDS = [
  {
    num: "01",
    icon: "💬",
    title: "Paste Chat",
    desc: "Drop in your conversation. Her message, your reply, and what she said back. Raw and unfiltered.",
    color: "#FF4D8D",
    glow: "rgba(255,77,141,0.25)",
    rotate: "-2deg",
    grad: "from-[#FF4D8D]/10 to-[#FF2272]/5",
    border: "rgba(255,77,141,0.2)",
  },
  {
    num: "02",
    icon: "🧠",
    title: "AI Emotion Engine",
    desc: "Our model reads tone, pacing, energy. It detects dryness, flirtiness, disinterest — even desperation.",
    color: "#A855F7",
    glow: "rgba(168,85,247,0.25)",
    rotate: "0.5deg",
    grad: "from-[#A855F7]/10 to-[#7C3AED]/5",
    border: "rgba(168,85,247,0.2)",
  },
  {
    num: "03",
    icon: "🔥",
    title: "Get Replies + Aura Boost",
    desc: "4 tailored reply modes, a brutal aura score, and the savage truth you needed to hear.",
    color: "#FACC15",
    glow: "rgba(250,204,21,0.25)",
    rotate: "1.5deg",
    grad: "from-[#FACC15]/10 to-[#F59E0B]/5",
    border: "rgba(250,204,21,0.2)",
  },
]

export default function StorySection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    const el = document.getElementById("story-section")
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="story-section"
      className="relative w-full py-28 px-4 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #09031A, #0c0428, #09031A)" }}
    >
      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#A855F7]/20 bg-[#A855F7]/5 mb-5 text-sm text-[#A855F7] font-medium tracking-wider">
            ✦ HOW IT WORKS
          </div>
          <h2 className="font-['Syne',sans-serif] font-extrabold text-[clamp(28px,5vw,60px)] text-white leading-tight tracking-tight">
            Three steps to{" "}
            <span className="bg-gradient-to-r from-[#FF4D8D] to-[#A855F7] bg-clip-text text-transparent">
              stop losing
            </span>
          </h2>
          <p className="mt-4 text-white/40 text-[clamp(14px,1.6vw,18px)] font-['DM_Sans',sans-serif] max-w-md mx-auto">
            No fluff. Just brutal, brilliant AI feedback.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map((c, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl p-7 transition-all duration-700 cursor-default`}
              style={{
                background: `linear-gradient(135deg, ${c.glow} 0%, rgba(15,5,40,0.9) 100%)`,
                border: `1px solid ${c.border}`,
                backdropFilter: "blur(20px)",
                transform: visible
                  ? `translateY(0) rotate(${c.rotate})`
                  : `translateY(40px) rotate(${c.rotate})`,
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 150}ms`,
                boxShadow: `0 4px 40px ${c.glow}`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.transform = `translateY(-8px) rotate(0deg)`
                el.style.boxShadow = `0 20px 60px ${c.glow}`
                el.style.border = `1px solid ${c.color}55`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.transform = `translateY(0) rotate(${c.rotate})`
                el.style.boxShadow = `0 4px 40px ${c.glow}`
                el.style.border = `1px solid ${c.border}`
              }}
            >
              {/* Card num */}
              <span className="absolute top-5 right-6 font-['Syne',sans-serif] font-black text-4xl opacity-10" style={{ color: c.color }}>
                {c.num}
              </span>

              {/* Icon */}
              <div className="text-4xl mb-5 inline-block animate-bounce" style={{ animationDuration: `${2.5 + i * 0.5}s`, animationDelay: `${i * 0.3}s` }}>
                {c.icon}
              </div>

              <h3 className="font-['Syne',sans-serif] font-bold text-xl text-white mb-3">{c.title}</h3>
              <p className="font-['DM_Sans',sans-serif] text-[15px] leading-relaxed" style={{ color: "rgba(210,190,255,0.6)" }}>
                {c.desc}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
