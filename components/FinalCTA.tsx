"use client"

import { useState, useEffect } from "react"

const PARTICLES = ["✨", "💫", "⚡", "🔮", "✦", "•", "★", "✦"]

export default function FinalCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    const el = document.getElementById("final-cta")
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="final-cta"
      className="relative w-full py-32 px-4 overflow-hidden flex flex-col items-center"
      style={{ background: "linear-gradient(to bottom, #09031A, #0a0220)" }}
    >
      {/* Background glow burst */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full animate-pulse"
          style={{ background: "radial-gradient(circle, rgba(255,77,141,0.08) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,77,141,0.04) 0%, transparent 60%)", animation: "pulse 3s ease-in-out infinite 1s" }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute opacity-20 animate-bounce select-none"
            style={{
              left: `${8 + i * 11.5}%`,
              top: `${15 + (i % 3) * 25}%`,
              fontSize: i % 3 === 0 ? "18px" : "11px",
              animationDuration: `${2.5 + i * 0.4}s`,
              animationDelay: `${i * 0.35}s`,
            }}
          >{p}</span>
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF4D8D]/20 bg-[#FF4D8D]/5 mb-8 text-sm text-[#FF4D8D] font-medium tracking-wider">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D8D] animate-pulse" />
          LIMITED EARLY ACCESS
        </div>

        {/* Headline */}
        <h2 className="font-['Syne',sans-serif] font-black text-[clamp(32px,6vw,72px)] text-white leading-[1.1] tracking-tight mb-6">
          Stop getting{" "}
          <span
            className="relative inline-block bg-gradient-to-r from-[#FF4D8D] to-[#FF8FAB] bg-clip-text text-transparent"
            style={{ animation: "textGlow 3s ease-in-out infinite" }}
          >
            ghosted.
          </span>
          <br />
          Start becoming{" "}
          <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#A855F7] bg-clip-text text-transparent bg-[length:200%_100%]"
            style={{ animation: "bgShift 4s ease-in-out infinite" }}>
            unforgettable.
          </span>
        </h2>

        {/* Subtext */}
        <p className="font-['DM_Sans',sans-serif] text-[clamp(15px,1.8vw,20px)] text-white/45 max-w-xl mx-auto leading-relaxed mb-12">
          Upgrade your aura. Upgrade your conversations.
          <br />The AI that judges first — so she doesn't have to.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="group relative px-8 py-4 rounded-2xl font-['Syne',sans-serif] font-bold text-white text-base tracking-wide transition-all duration-300 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FF4D8D, #A855F7)",
              boxShadow: "0 0 30px rgba(255,77,141,0.35)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"
              e.currentTarget.style.boxShadow = "0 0 50px rgba(255,77,141,0.6)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0) scale(1)"
              e.currentTarget.style.boxShadow = "0 0 30px rgba(255,77,141,0.35)"
            }}
          >
            <span className="relative z-10">✨ Join Beta</span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl" />
          </button>

          <button
            className="group px-8 py-4 rounded-2xl font-['Syne',sans-serif] font-bold text-white text-base tracking-wide transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(168,85,247,0.3)",
              backdropFilter: "blur(16px)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)"
              e.currentTarget.style.border = "1px solid rgba(168,85,247,0.7)"
              e.currentTarget.style.boxShadow = "0 0 30px rgba(168,85,247,0.3)"
              e.currentTarget.style.background = "rgba(168,85,247,0.1)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.border = "1px solid rgba(168,85,247,0.3)"
              e.currentTarget.style.boxShadow = "none"
              e.currentTarget.style.background = "rgba(255,255,255,0.05)"
            }}
          >
            🔥 Unlock Premium Replies
          </button>

          <button
            className="group px-8 py-4 rounded-2xl font-['Syne',sans-serif] font-bold text-base tracking-wide transition-all duration-300"
            style={{
              background: "rgba(250,204,21,0.08)",
              border: "1px solid rgba(250,204,21,0.25)",
              color: "#FACC15",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)"
              e.currentTarget.style.boxShadow = "0 0 30px rgba(250,204,21,0.25)"
              e.currentTarget.style.background = "rgba(250,204,21,0.15)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
              e.currentTarget.style.background = "rgba(250,204,21,0.08)"
            }}
          >
            ⭐ Upgrade Your Aura
          </button>
        </div>

        {/* Social proof */}
        <p className="mt-10 text-white/20 text-sm font-['DM_Sans',sans-serif]">
          Already judging the rizz of 10,000+ hopefuls. brutally.
        </p>
      </div>

      <style jsx global>{`
        @keyframes textGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255,77,141,0.4)); }
          50% { filter: drop-shadow(0 0 24px rgba(255,77,141,0.8)); }
        }
        @keyframes bgShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}
