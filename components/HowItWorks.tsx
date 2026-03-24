"use client"

import { useState, useEffect, useRef } from "react"

// ── CONSTANTS ──────────────────────────────────────────────────────────────

const MODES = [
  { emoji: "💀", label: "Ghosted",        color: "#6B7280", glow: "rgba(107,114,128,0.5)",  score: [0, 2] },
  { emoji: "🥶", label: "Friendzoned",    color: "#60A5FA", glow: "rgba(96,165,250,0.5)",   score: [3, 4] },
  { emoji: "🤨", label: "Dry Interest",   color: "#FBBF24", glow: "rgba(251,191,36,0.5)",   score: [5, 6] },
  { emoji: "😏", label: "Flirty Zone",    color: "#F472B6", glow: "rgba(244,114,182,0.5)",  score: [7, 8] },
  { emoji: "🔥", label: "She's Hooked",   color: "#FF4D8D", glow: "rgba(255,77,141,0.8)",   score: [9, 10] },
]

const ROASTS = [
  "Bro… she replied 'haha' after your paragraph. That's not flirting. That's sympathy.",
  "You sent 4 texts. She sent one emoji. Respectfully — you are losing.",
  "She said 'I'll see'. That means she already saw someone else.",
  "You used a 😊 emoji. She used a 😊 back. This is the chat equivalent of a firm handshake.",
  "That 'k' she sent? That wasn't a typo. That was a message.",
  "My friend, typing 'haha yeah' is not rizz. That's wallpaper.",
  "She left you on read for 4 hours and you called it 'she's probably busy'. bro.",
  "You just became a safe space for her trauma dumps. Not a lover. A therapist.",
]

const SAVAGE_LINES = [
  "My aura was rated {score}/10. Rizzaura called it — {label}. @ me next time.",
  "Got roasted by AI and somehow still more self-aware than before. Rizzaura hits different.",
  "Rizzaura gave me {score}/10. She gave me nothing. One of us is honest.",
  "AI said I'm {label}. She said nothing. The AI is more communicative.",
]

const REPLIES = [
  { mode: "🧃 Safe Mode",    color: "#60A5FA", glow: "rgba(96,165,250,0.3)",   text: "Haha yeah, that's actually a vibe. We should try it sometime 👀" },
  { mode: "😏 Flirty Mode",  color: "#F472B6", glow: "rgba(244,114,182,0.3)", text: "You always say that right before something interesting happens…" },
  { mode: "🔥 Savage Mode",  color: "#FF4D8D", glow: "rgba(255,77,141,0.3)",  text: "I mean, I'd say you're wrong… but I'd rather let you figure it out." },
  { mode: "🧠 Smart Mode",   color: "#A78BFA", glow: "rgba(167,139,250,0.3)", text: "That's a curious take. I wonder what made you think that 🤔" },
]

const LOADER_TEXTS = [
  "Analyzing emotional damage…",
  "Detecting dryness levels…",
  "Scanning flirting intent…",
  "Cross-referencing aura database…",
  "Calculating desperation index…",
  "Consulting the rizz oracle…",
]

function getMeterColor(score: number) {
  if (score <= 2) return "#6B7280"
  if (score <= 4) return "#60A5FA"
  if (score <= 6) return "#FBBF24"
  if (score <= 8) return "#F472B6"
  return "#FF4D8D"
}

function getMeterLabel(score: number) {
  if (score <= 2) return "Social Disaster"
  if (score <= 4) return "Dry Texter"
  if (score <= 6) return "Trying"
  if (score <= 8) return "Smooth"
  return "Dangerous"
}

function getAuraLabel(score: number) {
  if (score <= 2) return "Social Disaster"
  if (score <= 4) return "Dry Texter"
  if (score <= 6) return "Trying Hard"
  if (score <= 8) return "Certified Smooth"
  return "Certified Dangerous"
}

// ── ParticleBurst ───────────────────────────────────────────────────────────
function ParticleBurst({ active }: { active: boolean }) {
  if (!active) return null
  const particles = Array.from({ length: 20 })
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {particles.map((_, i) => {
        const angle = (i / 20) * 360
        const distance = 40 + Math.random() * 80
        const size = 3 + Math.random() * 5
        const colors = ["#FF4D8D", "#A855F7", "#FACC15", "#60A5FA", "#fff"]
        const color = colors[Math.floor(Math.random() * colors.length)]
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: size, height: size,
              background: color,
              boxShadow: `0 0 ${size * 2}px ${color}`,
              animation: `burst${i % 4} 0.8s ease-out forwards`,
              "--dx": `${Math.cos(angle * Math.PI / 180) * distance}px`,
              "--dy": `${Math.sin(angle * Math.PI / 180) * distance}px`,
            } as React.CSSProperties}
          />
        )
      })}
    </div>
  )
}

// ── ScanLine ────────────────────────────────────────────────────────────────
function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
      <div
        className="absolute left-0 right-0 h-[2px] opacity-60"
        style={{
          background: "linear-gradient(90deg, transparent, #FF4D8D, #A855F7, transparent)",
          animation: "scanLine 1.8s ease-in-out infinite",
          boxShadow: "0 0 12px #FF4D8D, 0 0 24px rgba(255,77,141,0.4)",
        }}
      />
    </div>
  )
}

// ── FloatingParticles ────────────────────────────────────────────────────────
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {["✨", "💫", "⚡", "🔮", "✦", "•", "✦", "•", "★", "✦"].map((char, i) => (
        <span
          key={i}
          className="absolute select-none animate-bounce opacity-[0.15]"
          style={{
            left: `${5 + i * 9.5}%`,
            top: `${10 + (i % 4) * 20}%`,
            fontSize: i % 3 === 0 ? "15px" : "9px",
            animationDuration: `${2.2 + i * 0.35}s`,
            animationDelay: `${i * 0.45}s`,
            color: ["#FF4D8D", "#A855F7", "#FACC15", "#60A5FA"][i % 4],
          }}
        >
          {char}
        </span>
      ))}
    </div>
  )
}

// ── MAIN ────────────────────────────────────────────────────────────────────
export default function HowItWorks() {
  const [step, setStep] = useState(1)
  const [inputs, setInputs] = useState({ s1: "", s2: "", s3: "" })
  const [phase, setPhase] = useState<"input" | "loading" | "result">("input")
  const [score, setScore] = useState(0)
  const [roast, setRoast] = useState("")
  const [meterFilled, setMeterFilled] = useState(false)
  const [loaderText, setLoaderText] = useState(LOADER_TEXTS[0])
  const [loaderPct, setLoaderPct] = useState(0)
  const [burstActive, setBurstActive] = useState(false)
  const [copied, setCopied] = useState(false)
  const textareaStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,77,141,0.12)",
    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2)",
  }
  const textareaFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.style.border = "1px solid rgba(255,77,141,0.5)"
    e.target.style.boxShadow = "0 0 20px rgba(255,77,141,0.12), inset 0 2px 8px rgba(0,0,0,0.2)"
  }
  const textareaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.style.border = "1px solid rgba(255,77,141,0.12)"
    e.target.style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.2)"
  }

  // AI Loader cycling
  useEffect(() => {
    if (phase !== "loading") return
    let idx = 0
    let pct = 0
    const textIv = setInterval(() => {
      idx = (idx + 1) % LOADER_TEXTS.length
      setLoaderText(LOADER_TEXTS[idx])
    }, 500)
    const pctIv = setInterval(() => {
      pct = Math.min(98, pct + Math.random() * 12)
      setLoaderPct(pct)
    }, 200)
    const done = setTimeout(() => {
      const s = Math.floor(Math.random() * 11)
      setScore(s)
      setRoast(ROASTS[Math.floor(Math.random() * ROASTS.length)])
      clearInterval(textIv)
      clearInterval(pctIv)
      setLoaderPct(100)
      setTimeout(() => {
        setPhase("result")
        setTimeout(() => setBurstActive(true), 200)
        setTimeout(() => setBurstActive(false), 1200)
      }, 300)
    }, 2600)
    return () => { clearInterval(textIv); clearInterval(pctIv); clearTimeout(done) }
  }, [phase])

  useEffect(() => {
    if (phase !== "result") return
    const t = setTimeout(() => setMeterFilled(true), 600)
    return () => clearTimeout(t)
  }, [phase])

  const currentMode = MODES.find(m => score >= m.score[0] && score <= m.score[1]) ?? MODES[0]

  const handleAnalyze = () => {
    setPhase("loading")
    setLoaderPct(0)
    setMeterFilled(false)
  }

  const handleReset = () => {
    setPhase("input")
    setStep(1)
    setInputs({ s1: "", s2: "", s3: "" })
    setMeterFilled(false)
    setBurstActive(false)
  }

  const savageLine = SAVAGE_LINES[Math.floor(Math.random() * SAVAGE_LINES.length)]
    .replace("{score}", score.toString())
    .replace("{label}", currentMode.label)

  const handleCopy = () => {
    navigator.clipboard.writeText(savageLine).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section
      id="how-it-works"
      className="relative min-h-screen w-full flex flex-col items-center justify-start py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #09031A, #0E0428, #09031A)" }}
    >
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)" }} />

      <FloatingParticles />

      {/* HEADER */}
      <div className="relative z-10 text-center mb-12 animate-[fadeUp_0.9s_both]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF4D8D]/20 bg-[#FF4D8D]/5 mb-5 text-sm text-[#FF4D8D] font-medium tracking-wider">
          🔮 BRUTALLY HONEST AI
        </div>
        <h2 className="font-['Syne',sans-serif] font-extrabold text-[clamp(30px,5.5vw,66px)] leading-tight tracking-tight text-white">
          Let AI judge your rizz
          <br />
          <span className="bg-gradient-to-r from-[#FF4D8D] via-[#C084FC] to-[#FF4D8D] bg-clip-text text-transparent bg-[length:200%_100%]"
            style={{ animation: "bgShift 3s ease-in-out infinite" }}>
            brutally.
          </span>
        </h2>
        <p className="mt-4 text-[rgba(210,180,255,0.55)] text-[clamp(14px,1.7vw,19px)] font-['DM_Sans',sans-serif] max-w-lg mx-auto leading-relaxed">
          Paste your chat → get roasted → get better replies → increase aura.
        </p>
      </div>

      {/* ── INPUT PHASE ── */}
      {phase === "input" && (
        <div
          className="relative z-10 w-full max-w-2xl animate-[fadeUp_0.6s_0.2s_both]"
          style={{
            background: "rgba(12,4,32,0.75)",
            border: "1px solid rgba(255,77,141,0.14)",
            borderRadius: "24px",
            backdropFilter: "blur(28px)",
            boxShadow: "0 0 60px rgba(168,85,247,0.07), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Step dots */}
          <div className="flex items-center justify-center gap-3 pt-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-500"
                  style={{
                    background: step >= n ? "linear-gradient(135deg, #FF4D8D, #A855F7)" : "rgba(255,255,255,0.05)",
                    border: step >= n ? "none" : "1px solid rgba(255,255,255,0.08)",
                    color: step >= n ? "#fff" : "rgba(255,255,255,0.25)",
                    boxShadow: step === n ? "0 0 20px rgba(255,77,141,0.55)" : "none",
                    transform: step === n ? "scale(1.18)" : "scale(1)",
                  }}
                >
                  {step > n ? "✓" : n}
                </div>
                {n < 3 && (
                  <div className="w-12 h-[1px] transition-all duration-700"
                    style={{ background: step > n ? "linear-gradient(90deg, #FF4D8D, #A855F7)" : "rgba(255,255,255,0.07)" }} />
                )}
              </div>
            ))}
          </div>

          <div className="p-8">
            {step === 1 && (
              <div className="space-y-5 animate-[fadeUp_0.4s_both]">
                <label className="block text-[#DCC8FF]/60 text-sm font-medium mb-2 font-['DM_Sans',sans-serif]">
                  Step 1 — Her message to you
                </label>
                <div className="relative">
                  <ScanLine />
                  <textarea
                    value={inputs.s1}
                    onChange={e => setInputs(p => ({ ...p, s1: e.target.value }))}
                    placeholder="Paste her message here…"
                    rows={4}
                    className="w-full resize-none rounded-xl p-4 text-white placeholder:text-white/15 font-['DM_Sans',sans-serif] text-sm focus:outline-none transition-all duration-300"
                    style={textareaStyle}
                    onFocus={textareaFocus}
                    onBlur={textareaBlur}
                  />
                </div>
                <button
                  disabled={!inputs.s1.trim()}
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 rounded-xl font-bold text-white font-['Syne',sans-serif] tracking-wide transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                  style={{
                    background: inputs.s1.trim() ? "linear-gradient(135deg, #FF4D8D, #A855F7)" : "rgba(255,255,255,0.05)",
                    boxShadow: inputs.s1.trim() ? "0 0 30px rgba(255,77,141,0.3)" : "none",
                  }}
                  onMouseEnter={e => inputs.s1.trim() && (e.currentTarget.style.boxShadow = "0 0 50px rgba(255,77,141,0.55)") }
                  onMouseLeave={e => inputs.s1.trim() && (e.currentTarget.style.boxShadow = "0 0 30px rgba(255,77,141,0.3)") }
                >
                  Next →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-[fadeUp_0.4s_both]">
                <label className="block text-[#DCC8FF]/60 text-sm font-medium mb-2 font-['DM_Sans',sans-serif]">
                  Step 2 — What you replied
                </label>
                <div className="relative">
                  <ScanLine />
                  <textarea
                    value={inputs.s2}
                    onChange={e => setInputs(p => ({ ...p, s2: e.target.value }))}
                    placeholder="Paste what you said back…"
                    rows={4}
                    className="w-full resize-none rounded-xl p-4 text-white placeholder:text-white/15 font-['DM_Sans',sans-serif] text-sm focus:outline-none transition-all duration-300"
                    style={textareaStyle}
                    onFocus={textareaFocus}
                    onBlur={textareaBlur}
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-semibold text-white/40 font-['DM_Sans',sans-serif] transition-all hover:text-white/70 hover:bg-white/5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    ← Back
                  </button>
                  <button
                    disabled={!inputs.s2.trim()}
                    onClick={() => setStep(3)}
                    className="flex-[2] py-3 rounded-xl font-bold text-white font-['Syne',sans-serif] tracking-wide transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                    style={{
                      background: inputs.s2.trim() ? "linear-gradient(135deg, #FF4D8D, #A855F7)" : "rgba(255,255,255,0.05)",
                      boxShadow: inputs.s2.trim() ? "0 0 30px rgba(255,77,141,0.3)" : "none",
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-[fadeUp_0.4s_both]">
                <label className="block text-[#DCC8FF]/60 text-sm font-medium mb-2 font-['DM_Sans',sans-serif]">
                  Step 3 — Her last message
                </label>
                <div className="relative">
                  <ScanLine />
                  <textarea
                    value={inputs.s3}
                    onChange={e => setInputs(p => ({ ...p, s3: e.target.value }))}
                    placeholder="What did she say last…"
                    rows={4}
                    className="w-full resize-none rounded-xl p-4 text-white placeholder:text-white/15 font-['DM_Sans',sans-serif] text-sm focus:outline-none transition-all duration-300"
                    style={textareaStyle}
                    onFocus={textareaFocus}
                    onBlur={textareaBlur}
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl font-semibold text-white/40 font-['DM_Sans',sans-serif] transition-all hover:text-white/70 hover:bg-white/5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    ← Back
                  </button>
                  <button
                    disabled={!inputs.s3.trim()}
                    onClick={handleAnalyze}
                    className="flex-[2] py-3.5 rounded-xl font-bold text-white font-['Syne',sans-serif] tracking-wide transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                    style={{
                      background: inputs.s3.trim() ? "linear-gradient(135deg, #FF2272, #FF4D8D, #A855F7)" : "rgba(255,255,255,0.05)",
                      boxShadow: inputs.s3.trim() ? "0 0 40px rgba(255,77,141,0.45)" : "none",
                      animation: inputs.s3.trim() ? "btnPulse 2s ease-in-out infinite" : "none",
                    }}
                  >
                    🔥 Analyze My Rizz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── LOADING PHASE ── */}
      {phase === "loading" && (
        <div className="relative z-10 w-full max-w-md text-center animate-[fadeUp_0.4s_both] flex flex-col items-center gap-7">
          {/* Rotating rings */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full" style={{
              border: "2px solid transparent",
              background: "linear-gradient(#09031A, #09031A) padding-box, linear-gradient(135deg, #FF4D8D, #A855F7, #FACC15) border-box",
              animation: "spin 1s linear infinite",
            }} />
            <div className="absolute inset-[6px] rounded-full" style={{
              border: "1.5px solid transparent",
              background: "linear-gradient(#09031A, #09031A) padding-box, linear-gradient(315deg, #A855F7, #FF4D8D) border-box",
              animation: "spin 1.6s linear infinite reverse",
              opacity: 0.6,
            }} />
            <span className="text-4xl z-10 animate-bounce">🔮</span>
          </div>

          {/* Progress bar */}
          <div className="w-full space-y-2">
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${loaderPct}%`,
                  background: "linear-gradient(90deg, #FF4D8D, #A855F7, #FACC15)",
                  boxShadow: "0 0 12px #FF4D8D",
                }} />
            </div>
            <div className="text-right text-xs font-['DM_Sans',sans-serif] text-white/25">{Math.round(loaderPct)}%</div>
          </div>

          {/* Typing text */}
          <p
            key={loaderText}
            className="font-['Syne',sans-serif] text-lg font-medium text-[#DCC8FF]/75"
            style={{ animation: "typeFade 0.4s ease both" }}
          >
            {loaderText}
          </p>

          {/* Emoji row */}
          <div className="flex gap-4 text-2xl">
            {["💀", "🥶", "😏", "🔥", "✨"].map((e, i) => (
              <span key={i} className="animate-bounce opacity-60" style={{ animationDelay: `${i * 0.18}s` }}>{e}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── RESULT PHASE ── */}
      {phase === "result" && (
        <div
          className="relative z-10 w-full max-w-2xl space-y-5"
          style={{ animation: "scaleIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both" }}
        >
          <ParticleBurst active={burstActive} />

          {/* ⭐ VIRAL SCORE HEADLINE */}
          <div
            className="rounded-2xl p-8 text-center relative overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at center, ${currentMode.glow} 0%, rgba(12,4,32,0.95) 70%)`,
              border: `1px solid ${currentMode.color}40`,
              boxShadow: `0 0 80px ${currentMode.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
              backdropFilter: "blur(28px)",
            }}
          >
            {/* Score headline */}
            <p className="font-['DM_Sans',sans-serif] text-xs font-medium tracking-[0.3em] text-white/30 mb-3 uppercase">
              Your Aura Score
            </p>
            <div className="flex items-end justify-center gap-3 mb-3">
              <span
                className="font-['Syne',sans-serif] font-black leading-none"
                style={{
                  fontSize: "clamp(72px,12vw,120px)",
                  color: currentMode.color,
                  textShadow: `0 0 40px ${currentMode.glow}`,
                  animation: "scaleIn 0.5s ease both",
                }}
              >
                {score}
              </span>
              <span className="font-['Syne',sans-serif] text-3xl text-white/20 mb-4">/10</span>
            </div>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-5xl animate-bounce">{currentMode.emoji}</span>
              <h3 className="font-['Syne',sans-serif] text-3xl font-black tracking-tight" style={{ color: currentMode.color }}>
                {currentMode.label}
              </h3>
            </div>
            <p className="font-['Syne',sans-serif] text-sm text-white/30 tracking-wider">
              — {getAuraLabel(score)} —
            </p>
          </div>

          {/* BRUTAL ROAST */}
          <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "rgba(12,4,32,0.8)",
              border: "1px solid rgba(255,77,141,0.12)",
              backdropFilter: "blur(24px)",
            }}
          >
            <p className="text-[10px] font-bold tracking-[0.28em] text-[#FF4D8D]/50 mb-3 font-['Syne',sans-serif]">🔥 BRUTAL OPINION</p>
            <p
              className="font-['DM_Sans',sans-serif] text-[clamp(15px,1.8vw,18px)] text-white/80 leading-relaxed"
              style={{ animation: "microShake 0.7s 0.3s ease both" }}
            >
              "{roast}"
            </p>
          </div>

          {/* AURA METER */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(12,4,32,0.8)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(24px)" }}
          >
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-[10px] font-bold tracking-[0.28em] text-white/25 font-['Syne',sans-serif] mb-1">📊 AURA METER</p>
                <p className="font-['Syne',sans-serif] text-xl font-bold" style={{ color: getMeterColor(score) }}>{getMeterLabel(score)}</p>
              </div>
              <p className="font-['Syne',sans-serif] font-black text-4xl" style={{ color: getMeterColor(score) }}>
                {score}<span className="text-white/20 text-2xl">/10</span>
              </p>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: meterFilled ? `${score * 10}%` : "0%",
                  background: `linear-gradient(90deg, ${getMeterColor(score)}, ${getMeterColor(score)}bb)`,
                  boxShadow: `0 0 20px ${getMeterColor(score)}, 0 0 8px ${getMeterColor(score)}`,
                  transition: "width 1.6s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-white/20 font-['DM_Sans',sans-serif]">
              <span>Social Disaster</span>
              <span>Dangerous</span>
            </div>
          </div>

          {/* REPLY CARDS */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.28em] text-white/25 font-['Syne',sans-serif] mb-4">🧠 SUGGESTED REPLIES</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REPLIES.map((r, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 cursor-pointer transition-all duration-300"
                  style={{
                    background: "rgba(12,4,32,0.75)",
                    border: `1px solid ${r.color}18`,
                    backdropFilter: "blur(16px)",
                    animation: `fadeUp 0.5s ${0.1 + i * 0.08}s both`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-5px)"
                    e.currentTarget.style.border = `1px solid ${r.color}50`
                    e.currentTarget.style.boxShadow = `0 12px 40px ${r.glow}`
                    e.currentTarget.style.background = `rgba(12,4,32,0.95)`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.border = `1px solid ${r.color}18`
                    e.currentTarget.style.boxShadow = "none"
                    e.currentTarget.style.background = "rgba(12,4,32,0.75)"
                  }}
                >
                  <p className="font-['Syne',sans-serif] text-xs font-bold mb-2" style={{ color: r.color }}>{r.mode}</p>
                  <p className="font-['DM_Sans',sans-serif] text-sm text-white/65 leading-relaxed">"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* VIRAL SHARE BLOCK */}
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: "linear-gradient(135deg, rgba(255,77,141,0.07), rgba(168,85,247,0.07))",
              border: "1px solid rgba(255,77,141,0.12)",
              backdropFilter: "blur(24px)",
            }}
          >
            <p className="text-[10px] font-bold tracking-[0.28em] text-white/25 font-['Syne',sans-serif]">📲 SHARE YOUR RESULT</p>

            {/* Savage quote */}
            <div className="rounded-xl p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="font-['DM_Sans',sans-serif] text-sm text-white/70 italic leading-relaxed">"{savageLine}"</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-['DM_Sans',sans-serif] transition-all duration-300"
                style={{
                  background: copied ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.06)",
                  border: copied ? "1px solid rgba(74,222,128,0.4)" : "1px solid rgba(255,255,255,0.1)",
                  color: copied ? "#4ADE80" : "rgba(255,255,255,0.7)",
                }}
              >
                {copied ? "✓ Copied!" : "📋 Copy Savage Line"}
              </button>

              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-['DM_Sans',sans-serif] transition-all duration-300"
                style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.25)", color: "#25D366" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,211,102,0.2)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(37,211,102,0.2)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,211,102,0.1)"; e.currentTarget.style.boxShadow = "none" }}
              >
                💬 WhatsApp Story
              </button>

              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-['DM_Sans',sans-serif] transition-all duration-300"
                style={{ background: "rgba(225,48,108,0.1)", border: "1px solid rgba(225,48,108,0.25)", color: "#E1306C" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(225,48,108,0.2)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(225,48,108,0.2)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(225,48,108,0.1)"; e.currentTarget.style.boxShadow = "none" }}
              >
                📸 Instagram Story
              </button>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="w-full py-4 rounded-2xl font-bold text-white font-['Syne',sans-serif] tracking-wide transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #FF4D8D, #A855F7)", boxShadow: "0 0 40px rgba(255,77,141,0.28)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(255,77,141,0.5)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(255,77,141,0.28)" }}
          >
            🔄 Analyze Another Chat
          </button>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.93) translateY(14px); filter: blur(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes typeFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes microShake {
          0%,100% { transform: translateX(0); }
          10%     { transform: translateX(-4px) rotate(-0.4deg); }
          30%     { transform: translateX(4px)  rotate(0.4deg);  }
          50%     { transform: translateX(-2px); }
          70%     { transform: translateX(2px);  }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes scanLine {
          0%   { top: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes btnPulse {
          0%,100% { box-shadow: 0 0 40px rgba(255,77,141,0.45); }
          50%     { box-shadow: 0 0 70px rgba(255,77,141,0.8); }
        }
        @keyframes bgShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes burst0 { to { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; } }
        @keyframes burst1 { to { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; } }
        @keyframes burst2 { to { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; } }
        @keyframes burst3 { to { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; } }
      `}</style>
    </section>
  )
}
