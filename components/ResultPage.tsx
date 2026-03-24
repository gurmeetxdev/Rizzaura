"use client"

import { useEffect, useRef } from "react"
import HowItWorks from "@/components/HowItWorks"
import StorySection from "@/components/StorySection"
import FinalCTA from "@/components/FinalCTA"

export default function ResultPage() {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null)
  const ambCanvasRef = useRef<HTMLCanvasElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const starClusterRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── CURSOR LOGIC ──
    const cur = cursorRef.current
    const curR = cursorRingRef.current
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (cur) {
        cur.style.left = `${mx}px`
        cur.style.top = `${my}px`
      }
    }

    const animateCursor = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      if (curR) {
        curR.style.left = `${rx}px`
        curR.style.top = `${ry}px`
      }
      requestAnimationFrame(animateCursor)
    }

    window.addEventListener("mousemove", handleMouseMove)
    const cursorAnim = requestAnimationFrame(animateCursor)

    // ── BG STARS CANVAS ──
    const bgC = bgCanvasRef.current
    if (!bgC) return
    const bgX = bgC.getContext("2d")
    if (!bgX) return

    let W: number, H: number
    const resize = () => {
      W = bgC.width = window.innerWidth
      H = bgC.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 2,
      a: 0.3 + Math.random() * 0.7,
      sp: 0.0003 + Math.random() * 0.0007,
      ph: Math.random() * Math.PI * 2,
      col: Math.random() > 0.65 ? `hsl(${275 + Math.random() * 55}, 68%, 78%)` : null
    }))

    let shots: any[] = []
    let bgT = 0

    const spawnS = () => {
      if (Math.random() > 0.008) return
      shots.push({
        x: Math.random() * W * 0.7,
        y: Math.random() * H * 0.35,
        len: 80 + Math.random() * 130,
        spd: 10 + Math.random() * 11,
        ang: Math.PI / 5 + (Math.random() - 0.5) * 0.45,
        a: 1,
        prog: 0
      })
    }

    const drawBg = () => {
      bgX.clearRect(0, 0, W, H)
      stars.forEach(s => {
        const a = s.a * (0.55 + 0.45 * Math.sin(s.ph + bgT * s.sp * 60))
        bgX.beginPath()
        bgX.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
        bgX.fillStyle = s.col ? `hsla(${s.col.match(/\d+/)?.[0]}, 68%, 78%, ${a})` : `rgba(255, 255, 255, ${a})`
        bgX.fill()
      })
      spawnS()
      shots = shots.filter(s => s.a > 0.02)
      shots.forEach(s => {
        s.prog += s.spd
        s.a -= 0.015
        const x2 = s.x + Math.cos(s.ang) * s.prog, y2 = s.y + Math.sin(s.ang) * s.prog
        const x1 = x2 - Math.cos(s.ang) * s.len, y1 = y2 - Math.sin(s.ang) * s.len
        const g = bgX.createLinearGradient(x1, y1, x2, y2)
        g.addColorStop(0, "rgba(255, 255, 255, 0)")
        g.addColorStop(0.7, `rgba(255, 210, 255, ${s.a * 0.45})`)
        g.addColorStop(1, `rgba(255, 255, 255, ${s.a})`)
        bgX.beginPath()
        bgX.moveTo(x1, y1)
        bgX.lineTo(x2, y2)
        bgX.strokeStyle = g
        bgX.lineWidth = 1.5
        bgX.stroke()
      })
      bgT++
      requestAnimationFrame(drawBg)
    }
    const bgFrame = requestAnimationFrame(drawBg)

    // ── AMBIENT CANVAS ──
    const ambC = ambCanvasRef.current
    if (!ambC) return
    const ambX = ambC.getContext("2d")
    if (!ambX) return

    const PCOLS = ["rgba(255,77,141,", "rgba(168,85,247,", "rgba(250,204,21,", "rgba(192,132,252,", "rgba(255,255,255,"]

    const mist = Array.from({ length: 18 }, (_, i) => ({
      x: (i / 18) * window.innerWidth + Math.random() * 80 - 40,
      y: window.innerHeight + Math.random() * 200,
      r: 60 + Math.random() * 100,
      vy: 0.15 + Math.random() * 0.25,
      a: 0,
      maxA: 0.06 + Math.random() * 0.08,
      col: Math.random() > 0.5 ? "rgba(168,85,247," : "rgba(255,77,141,",
      phase: Math.random() * Math.PI * 2
    }))

    const sparks2 = Array.from({ length: 70 }, () => mkSpark(true))
    function mkSpark(rnd: boolean) {
      return {
        x: Math.random() * window.innerWidth,
        y: rnd ? Math.random() * window.innerHeight : window.innerHeight + 5,
        r: 0.5 + Math.random() * 2.5,
        vx: (Math.random() - 0.5) * 0.45,
        vy: 0.18 + Math.random() * 0.65,
        a: 0.2 + Math.random() * 0.7,
        col: PCOLS[Math.floor(Math.random() * PCOLS.length)],
        life: rnd ? Math.random() : 0,
        maxLife: 0.55 + Math.random() * 0.45
      }
    }

    const glowOrbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 80 + Math.random() * 120,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.1,
      a: 0.025 + Math.random() * 0.03,
      col: i % 2 === 0 ? "rgba(168,85,247," : "rgba(255,77,141,",
      ph: Math.random() * Math.PI * 2
    }))

    const orbDots = [
      { t: 0, spd: 0.0075, r: 9, col: "#FF4D8D", gc: "rgba(255,77,141,.65)", trail: 20 },
      { t: Math.PI, spd: 0.0075, r: 6.5, col: "#C084FC", gc: "rgba(192,132,252,.55)", trail: 16 },
      { t: Math.PI * 0.5, spd: 0.005, r: 5.5, col: "#FACC15", gc: "rgba(250,204,21,.6)", trail: 14 },
      { t: Math.PI * 1.7, spd: 0.005, r: 4, col: "#FF8FAB", gc: "rgba(255,143,171,.4)", trail: 12 },
    ]

    const aRings: any[] = []
    let aTimer = 0
    function spawnRing(cx: number, cy: number, rw: number, rh: number) {
      aRings.push({ cx, cy, rw, rh, r: 0, a: 0.5, spd: 1.6 })
    }

    function getBrandLoc() {
      const el = brandRef.current
      if (!el) return { cx: window.innerWidth / 2, cy: window.innerHeight / 2, rw: 380, rh: 75 }
      const rect = el.getBoundingClientRect()
      return { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2, rw: rect.width * 0.54, rh: rect.height * 0.6 }
    }

    let ambT = 0
    const drawAmb = () => {
      ambX.clearRect(0, 0, window.innerWidth, window.innerHeight)
      const bc = getBrandLoc()

      glowOrbs.forEach(o => {
        o.x += o.vx; o.y += o.vy
        if (o.x < -o.r || o.x > window.innerWidth + o.r) o.vx *= -1
        if (o.y < -o.r || o.y > window.innerHeight + o.r) o.vy *= -1
        const pulse = o.a * (0.7 + 0.3 * Math.sin(ambT * 0.02 + o.ph))
        const g = ambX.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r)
        g.addColorStop(0, o.col + pulse + ")")
        g.addColorStop(1, o.col + "0)")
        ambX.beginPath(); ambX.arc(o.x, o.y, o.r, 0, Math.PI * 2)
        ambX.fillStyle = g; ambX.fill()
      })

      mist.forEach(m => {
        m.y -= m.vy; m.a = Math.min(m.maxA, m.a + 0.0005)
        if (m.y + m.r < -50) { m.y = window.innerHeight + m.r + Math.random() * 100; m.x = Math.random() * window.innerWidth; m.a = 0; }
        const pulse = m.a * (0.7 + 0.3 * Math.sin(ambT * 0.015 + m.phase))
        const g = ambX.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r)
        g.addColorStop(0, m.col + pulse + ")")
        g.addColorStop(1, m.col + "0)")
        ambX.beginPath(); ambX.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ambX.fillStyle = g; ambX.fill()
      })

      aTimer++
      if (aTimer % 95 === 0) spawnRing(bc.cx, bc.cy, bc.rw, bc.rh)
      for (let i = aRings.length - 1; i >= 0; i--) {
        const ar = aRings[i]; ar.r += ar.spd; ar.a -= 0.0038
        if (ar.a <= 0) { aRings.splice(i, 1); continue; }
        ambX.save()
        ambX.beginPath()
        ambX.ellipse(ar.cx, ar.cy, bc.rw + ar.r, bc.rh + ar.r * 0.42, 0, 0, Math.PI * 2)
        ambX.strokeStyle = `rgba(192,132,252,${ar.a})`
        ambX.lineWidth = 0.9; ambX.stroke()
        ambX.restore()
      }

      orbDots.forEach(od => {
        od.t += od.spd
        const ox = bc.cx + Math.cos(od.t) * bc.rw
        const oy = bc.cy + Math.sin(od.t) * bc.rh * 0.52
        const depth = 0.4 + 0.6 * ((Math.sin(od.t) * 0.5) + 0.5)
        for (let k = od.trail; k > 0; k--) {
          const ta = od.t - k * od.spd * 1.4
          const tx = bc.cx + Math.cos(ta) * bc.rw
          const ty = bc.cy + Math.sin(ta) * bc.rh * 0.52
          ambX.beginPath(); ambX.arc(tx, ty, od.r * (k / od.trail) * 0.65, 0, Math.PI * 2)
          ambX.fillStyle = od.col; ambX.globalAlpha = depth * (k / od.trail) * 0.22
          ambX.fill()
        }
        ambX.globalAlpha = depth
        ambX.beginPath(); ambX.arc(ox, oy, od.r, 0, Math.PI * 2)
        ambX.fillStyle = od.col; ambX.shadowBlur = 20; ambX.shadowColor = od.gc
        ambX.fill()
        ambX.shadowBlur = 0; ambX.globalAlpha = 1
      })

      sparks2.forEach((p, i) => {
        p.x += p.vx; p.y -= p.vy; p.life += 0.004
        if (p.y < -6 || p.life > p.maxLife) Object.assign(sparks2[i], mkSpark(false))
        const a = Math.sin((p.life / p.maxLife) * Math.PI) * p.a
        ambX.beginPath(); ambX.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ambX.fillStyle = p.col + a + ")"; ambX.fill()
      })

      if (ambT % 5 === 0 && Math.random() > 0.55) {
        const sx = Math.random() * window.innerWidth, sy = Math.random() * window.innerHeight, ss = 1 + Math.random() * 2.5
        ambX.save(); ambX.globalAlpha = Math.random() * 0.4 + 0.1
        ambX.strokeStyle = "rgba(255,255,255,.85)"; ambX.lineWidth = 0.8
        ambX.beginPath(); ambX.moveTo(sx - ss, sy); ambX.lineTo(sx + ss, sy)
        ambX.moveTo(sx, sy - ss); ambX.lineTo(sx, sy + ss); ambX.stroke(); ambX.restore()
      }

      ambT++
      requestAnimationFrame(drawAmb)
    }
    const ambFrame = requestAnimationFrame(drawAmb)

    // ── STAR SPARKS AROUND LOGO ──
    const starContainer = starClusterRef.current
    if (!starContainer) return
    const spArr = Array.from({ length: 13 }, (_, i) => {
      const el = document.createElement("div")
      const sz = 1.5 + Math.random() * 3
      const cols = ["#FACC15", "#FEF08A", "#fff", "#FF4D8D", "#C084FC"]
      const c = cols[Math.floor(Math.random() * cols.length)]
      el.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;background:${c};box-shadow:0 0 ${sz * 3}px ${c};pointer-events:none;top:50%;left:50%;transform-origin:0 0;`
      starContainer.appendChild(el)
      return { el, ang: (i / 13) * Math.PI * 2, rad: 26 + Math.random() * 20, spd: 0.009 + Math.random() * 0.011, ph: Math.random() * Math.PI * 2 }
    })
    
    let st = 0
    const animateSparks = () => {
      spArr.forEach(s => {
        s.ang += s.spd
        const r = s.rad + Math.sin(st * 0.04 + s.ph) * 9
        const x = Math.cos(s.ang) * r, y = Math.sin(s.ang) * r * 0.5
        const sc = 0.45 + 0.55 * Math.abs(Math.sin(s.ang))
        s.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${sc})`
        s.el.style.opacity = (0.35 + 0.65 * Math.abs(Math.sin(s.ang * 0.7))).toString()
      })
      st++
      requestAnimationFrame(animateSparks)
    }
    const sparkFrame = requestAnimationFrame(animateSparks)

    // ── CLEANUP ──
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(cursorAnim)
      cancelAnimationFrame(bgFrame)
      cancelAnimationFrame(ambFrame)
      cancelAnimationFrame(sparkFrame)
    }
  }, [])

  // ── CLICK BURST ──
  const handleClick = (e: React.MouseEvent) => {
    const colors = ["#FF4D8D", "#FACC15", "#A855F7", "#fff", "#C084FC", "#FF8FAB"]
    colors.forEach((col, i) => {
      for (let j = 0; j < 2; j++) {
        const b = document.createElement("div")
        const ang = ((i * 2 + j) / 12) * Math.PI * 2, d = 45 + Math.random() * 55, sz = 2 + Math.random() * 5
        b.style.cssText = `position:fixed;width:${sz}px;height:${sz}px;border-radius:50%;background:${col};box-shadow:0 0 ${sz * 4}px ${col};left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform .65s ease-out,opacity .65s ease-out;`
        document.body.appendChild(b)
        requestAnimationFrame(() => {
          b.style.transform = `translate(calc(-50% + ${Math.cos(ang) * d}px),calc(-50% + ${Math.sin(ang) * d}px)) scale(0)`
          b.style.opacity = "0"
        })
        setTimeout(() => b.remove(), 750)
      }
    })
  }

  // ── BRAND TILT ──
  const handleBrandMouseMove = (e: React.MouseEvent) => {
    const el = brandRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2)
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2)
    el.style.transform = `perspective(900px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) translateZ(8px)`
    el.style.transition = "transform .1s"
  }

  const handleBrandMouseLeave = () => {
    const el = brandRef.current
    if (el) {
      el.style.transform = "none"
      el.style.transition = "transform .5s ease"
    }
  }

  return (
    <div 
      className="relative min-h-screen bg-[#09031A] font-['Syne',sans-serif] cursor-none select-none"
      onClick={handleClick}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        
        .syne { font-family: 'Syne', sans-serif; }
        .dm-sans { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeUp {
          animation: fadeUp 0.9s both;
        }

        @keyframes oeRot {
          from { transform: rotateX(68deg) rotate(0deg); }
          to { transform: rotateX(68deg) rotate(360deg); }
        }

        @keyframes brPulse {
          0%, 100% { filter: drop-shadow(0 0 18px rgba(255, 34, 114, 0.45)); }
          50% { filter: drop-shadow(0 0 48px rgba(255, 34, 114, 0.95)) drop-shadow(0 0 90px rgba(255, 34, 114, 0.3)); }
        }

        @keyframes baPulse {
          0%, 100% { filter: drop-shadow(0 0 18px rgba(153, 51, 240, 0.45)); }
          50% { filter: drop-shadow(0 0 48px rgba(153, 51, 240, 0.95)) drop-shadow(0 0 80px rgba(153, 51, 240, 0.28)); }
        }

        @keyframes bgShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes sStar {
          0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 8px #FACC15) drop-shadow(0 0 20px rgba(250,204,21,0.5)); }
          20% { transform: scale(1.4) rotate(18deg); filter: drop-shadow(0 0 20px #FACC15) drop-shadow(0 0 45px rgba(250,204,21,.8)); }
          45% { transform: scale(.85) rotate(-10deg); filter: drop-shadow(0 0 4px #FACC15); }
          70% { transform: scale(1.25) rotate(12deg); filter: drop-shadow(0 0 16px #FACC15) drop-shadow(0 0 35px rgba(250,204,21,.6)); }
        }

        @keyframes sGlow {
          0%, 100% { transform: scale(1); opacity: .55; }
          50% { transform: scale(1.5); opacity: 1; }
        }

        @keyframes saR {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.22); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes sbR {
          0% { transform: rotate(0deg) scale(1.05); }
          50% { transform: rotate(-180deg) scale(.8); }
          100% { transform: rotate(-360deg) scale(1.05); }
        }

        @keyframes c2Shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes bFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes bSweep {
          from { transform: translateX(-100%); }
          to { transform: translateX(210%); }
        }

        @keyframes bdPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 8px #FF4D8D; }
          50% { transform: scale(1.55); box-shadow: 0 0 16px #FF4D8D, 0 0 28px rgba(255,77,141,0.5); }
        }
      `}</style>

      {/* CUSTOM CURSOR */}
      <div 
        ref={cursorRef}
        className="fixed w-[10px] h-[10px] bg-[#FF4D8D] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen shadow-[0_0_14px_#FF4D8D,0_0_32px_rgba(255,77,141,0.5)]" 
      />
      <div 
        ref={cursorRingRef}
        className="fixed w-[34px] h-[34px] border-[1.5px] border-[#FF4D8D]/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2" 
      />

      {/* CANVASES */}
      <canvas ref={bgCanvasRef} className="fixed inset-0 z-0" />
      <canvas ref={ambCanvasRef} className="fixed inset-0 z-[2] pointer-events-none" />

      {/* NEBULAS */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-60">
        <div 
          className="absolute w-[800px] h-[600px] -top-[150px] -left-[200px] animate-[nd1_14s_ease-in-out_infinite_alternate]"
          style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.15) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute w-[600px] h-[450px] top-[52%] -right-[120px] animate-[nd2_17s_ease-in-out_infinite_alternate]"
          style={{ background: 'radial-gradient(ellipse, rgba(255,77,141,0.12) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute w-[900px] h-[400px] bottom-[5%] left-[5%] animate-[nd3_11s_ease-in-out_infinite_alternate]"
          style={{ background: 'radial-gradient(ellipse, rgba(76,29,149,0.2) 0%, transparent 70%)' }}
        />
      </div>

      <main className="relative z-10 h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
        
        {/* TAGLINE */}
        <p className="tagline syne font-medium text-[clamp(20px,2.8vw,40px)] text-[#DCC8FF]/80 tracking-tight text-center leading-[1.3] mb-5 animate-fadeUp [animation-delay:0.1s]">
          modern love needs modern&nbsp;
          <span className="font-bold bg-gradient-to-r from-[#FDE68A] via-[#FACC15] to-[#F59E0B] bg-clip-text text-transparent">magic</span>
          <span className="inline-block text-[#FACC15] ml-1 text-[1em] animate-[sStar_2.5s_ease-in-out_infinite] [filter:drop-shadow(0_0_8px_#FACC15)_drop-shadow(0_0_20px_rgba(250,204,21,0.6))]">✦</span>
        </p>

        {/* BRAND WRAPPER */}
        <div 
          className="relative flex items-center justify-center mb-2 animate-fadeUp [animation-delay:0.3s]"
          onMouseMove={handleBrandMouseMove}
          onMouseLeave={handleBrandMouseLeave}
        >
          {/* ORBIT SVG */}
          <svg className="absolute w-[clamp(440px,65vw,880px)] h-[clamp(140px,18vw,250px)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none" viewBox="0 0 920 270">
            <defs>
              <linearGradient id="og1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF4D8D" stopOpacity="0" />
                <stop offset="25%" stopColor="#FF4D8D" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#A855F7" stopOpacity="0.7" />
                <stop offset="82%" stopColor="#A855F7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#FF4D8D" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="og2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C084FC" stopOpacity="0" />
                <stop offset="38%" stopColor="#C084FC" stopOpacity="0.55" />
                <stop offset="68%" stopColor="#FACC15" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
              </linearGradient>
            </defs>
            <ellipse 
              className="fill-none stroke-[url(#og1)] stroke-[1.4px] [stroke-dasharray:10_6] [transform-origin:50%_50%] animate-[oeRot_8s_linear_infinite] [filter:drop-shadow(0_0_5px_rgba(255,77,141,0.45))]" 
              cx="460" cy="135" rx="430" ry="108" 
            />
            <ellipse 
              className="fill-none stroke-[url(#og2)] stroke-[0.9px] [stroke-dasharray:5_9] [transform-origin:50%_50%] animate-[oeRot_13s_linear_infinite_reverse] opacity-[0.55] [filter:drop-shadow(0_0_4px_rgba(192,132,252,0.35))]" 
              cx="460" cy="135" rx="375" ry="84" 
            />
          </svg>

          {/* BRAND TEXT - Made slightly smaller as requested */}
          <div ref={brandRef} className="brand syne font-extrabold text-[clamp(60px,11vw,140px)] leading-none flex items-center relative z-[2] select-none">
            <span className="bg-gradient-to-br from-[#FF2272] via-[#FF7BAE] to-[#FF2272] bg-clip-text text-transparent bg-[length:200%_200%] animate-[brPulse_3.8s_ease-in-out_infinite,bgShift_7s_linear_infinite]">Rizz</span>
            <span className="bg-gradient-to-br from-[#9933F0] via-[#C084FC] to-[#7C3AED] bg-clip-text text-transparent bg-[length:200%_200%] animate-[baPulse_3.8s_ease-in-out_infinite_0.55s,bgShift_7s_linear_infinite_0.55s]">aura</span>
            
            {/* STAR CLUSTER */}
            <div ref={starClusterRef} className="relative ml-1 w-[clamp(45px,5vw,75px)] h-[clamp(45px,5vw,75px)] flex-shrink-0">
              <div className="absolute inset-[-45%] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.4)_0%,rgba(250,204,21,0.08)_45%,transparent_70%)] animate-[sGlow_2s_ease-in-out_infinite]" />
              <svg className="absolute inset-0 w-full h-full animate-[saR_7s_linear_infinite] [filter:drop-shadow(0_0_9px_#FACC15)_drop-shadow(0_0_22px_rgba(250,204,21,0.55))]" viewBox="0 0 100 100">
                <path d="M50 4 L55 42 L90 38 L60 57 L70 93 L50 70 L30 93 L40 57 L10 38 L45 42 Z" fill="#FACC15" opacity="0.94" />
                <path d="M50 20 L53 46 L76 44 L58 55 L64 78 L50 62 L36 78 L42 55 L24 44 L47 46 Z" fill="#FEF08A" opacity="0.62" />
              </svg>
              <svg className="absolute inset-0 w-full h-full animate-[sbR_4.5s_linear_infinite] opacity-70 [filter:drop-shadow(0_0_5px_#fff)]" viewBox="0 0 100 100">
                <path d="M50 8 L55 45 L92 50 L55 55 L50 92 L45 55 L8 50 L45 45 Z" fill="white" />
              </svg>
            </div>
          </div>
        </div>

        {/* BOTTOM COPY */}
        <div className="flex flex-col items-center gap-1 mt-6 animate-fadeUp [animation-delay:0.52s]">
          <p className="syne text-[clamp(16px,2vw,30px)] font-medium text-[#D2B9FF]/75 tracking-[0.05em] text-center">No rizz?&nbsp;&nbsp;No aura?</p>
          <p className="syne text-[clamp(24px,3.5vw,52px)] font-extrabold tracking-tight text-center bg-gradient-to-r from-[#FF4D8D] via-[#FF90B3] to-[#FF4D8D] bg-clip-text text-transparent bg-[length:200%_100%] animate-[c2Shimmer_2.8s_ease-in-out_infinite] [filter:drop-shadow(0_0_20px_rgba(255,77,141,0.38))]">
            We got you
          </p>
        </div>

        {/* BADGE + Scroll arrow */}
        <div className="mt-7 inline-flex items-center gap-2 group px-5 py-2.5 rounded-full bg-white/[0.048] border border-white/10 backdrop-blur-[18px] dm-sans text-[clamp(11px,1vw,14px)] text-[#DCC8FF]/72 tracking-[0.035em] animate-fadeUp [animation-delay:0.78s] animate-[bFloat_5s_ease-in-out_infinite_1.8s] hover:border-[#FF4D8D]/38 hover:bg-[#FF4D8D]/0.065 transition-all duration-300 relative overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF4D8D]/0.08 to-transparent -translate-x-full group-hover:animate-[bSweep_3.4s_ease-in-out_infinite_0.5s]" />
          <div className="w-2 h-2 rounded-full bg-[#FF4D8D] animate-[bdPulse_2s_ease-in-out_infinite] flex-shrink-0" />
          Even Cupid uses Rizzaura
        </div>

        {/* Scroll Down Indicator */}
        <a
          href="#how-it-works"
          className="mt-14 flex flex-col items-center gap-2 text-white/25 hover:text-white/60 transition-colors duration-300 animate-fadeUp [animation-delay:1.1s]"
        >
          <span className="text-xs tracking-[0.3em] font-['DM_Sans',sans-serif] uppercase">scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent animate-[scrollLine_1.8s_ease-in-out_infinite]" />
          <span className="text-lg animate-bounce">↓</span>
        </a>

      </main>

      {/* HOW IT WORKS SECTION */}
      <HowItWorks />

      {/* HOW RIZZAURA WORKS — Story Cards */}
      <StorySection />

      {/* FINAL CTA */}
      <FinalCTA />

    </div>
  )
}
