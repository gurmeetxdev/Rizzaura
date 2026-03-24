"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  decay: number
  isStar: boolean
  rotation: number
  rotSpeed: number
  gravity: number
}

const COLORS = [
  "#ffd700",
  "#ffaa00",
  "#ff8c00",
  "#ff6eb4",
  "#ff3d9a",
  "#ffecf5",
  "#ffe066",
  "#ffffff",
  "#ffcc44",
]

export default function SparkleCursor() {
  const cursorRef = useRef<SVGSVGElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const supportsCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const cursor = cursorRef.current
    const canvas = canvasRef.current

    if (!supportsCursor || !cursor || !canvas) {
      return
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      return
    }

    const root = document.documentElement
    root.classList.add("custom-cursor-enabled")

    const particles: Particle[] = []
    let animationFrame = 0
    let lastX = -999
    let lastY = -999

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawStar = (
      x: number,
      y: number,
      radius: number,
      color: string,
      alpha: number,
      rotation: number,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.shadowColor = color
      ctx.shadowBlur = 7
      ctx.beginPath()
      for (let i = 0; i < 4; i += 1) {
        const outerAngle = (i / 4) * Math.PI * 2
        const innerAngle = outerAngle + Math.PI / 4
        ctx.lineTo(Math.cos(outerAngle) * radius, Math.sin(outerAngle) * radius)
        ctx.lineTo(
          Math.cos(innerAngle) * radius * 0.38,
          Math.sin(innerAngle) * radius * 0.38,
        )
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const drawDot = (x: number, y: number, radius: number, color: string, alpha: number) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.shadowColor = color
      ctx.shadowBlur = 9
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const spawnSparkle = (x: number, y: number) => {
      if (Math.hypot(x - lastX, y - lastY) < 5) {
        return
      }

      lastX = x
      lastY = y

      const count = Math.floor(Math.random() * 3) + 1

      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 2 + 0.5
        const isStar = Math.random() > 0.45

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.4,
          size: Math.random() * 3.5 + 1.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 1,
          decay: Math.random() * 0.025 + 0.018,
          isStar,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.18,
          gravity: 0.045,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += particle.gravity
        particle.alpha -= particle.decay
        particle.rotation += particle.rotSpeed

        if (particle.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        if (particle.isStar) {
          drawStar(
            particle.x,
            particle.y,
            particle.size * 1.5,
            particle.color,
            particle.alpha,
            particle.rotation,
          )
        } else {
          drawDot(particle.x, particle.y, particle.size, particle.color, particle.alpha)
        }
      }

      animationFrame = window.requestAnimationFrame(animate)
    }

    const handleMove = (event: MouseEvent) => {
      cursor.style.opacity = "1"
      cursor.style.transform = `translate(${event.clientX - 4}px, ${event.clientY - 2}px)`
      spawnSparkle(event.clientX, event.clientY)
    }

    const handleMouseDown = () => cursor.classList.add("clicking")
    const handleMouseUp = () => cursor.classList.remove("clicking")
    const hideCursor = () => {
      cursor.style.opacity = "0"
      cursor.classList.remove("clicking")
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("blur", hideCursor)
    document.addEventListener("mousemove", handleMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", hideCursor)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      root.classList.remove("custom-cursor-enabled")
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("blur", hideCursor)
      document.removeEventListener("mousemove", handleMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", hideCursor)
    }
  }, [])

  return (
    <>
      <svg
        ref={cursorRef}
        className="custom-cursor"
        viewBox="0 0 36 44"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="cursor-shadow">
            <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodColor="rgba(0,0,0,0.5)" />
          </filter>
        </defs>
        <g filter="url(#cursor-shadow)">
          <path
            d="M4 2 L4 32 L11 25 L16 38 L20 36 L15 23 L24 23 Z"
            fill="white"
            stroke="#ddd"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </g>
        <g transform="translate(19, 1)">
          <path
            d="M8 4 C8 2, 6 0, 4 0 C2 0, 0 2, 0 4 C0 6, 4 10, 8 13 C12 10, 16 6, 16 4 C16 2, 14 0, 12 0 C10 0, 8 2, 8 4 Z"
            transform="scale(0.75)"
            fill="#ff6eb4"
            stroke="#ff3d9a"
            strokeWidth="0.8"
          />
          <path
            d="M6 1 L6.4 2.4 L7.8 2.4 L6.7 3.2 L7.1 4.6 L6 3.8 L4.9 4.6 L5.3 3.2 L4.2 2.4 L5.6 2.4 Z"
            transform="scale(0.5) translate(4, -1)"
            fill="white"
            opacity="0.9"
          />
        </g>
      </svg>
      <canvas ref={canvasRef} className="sparkle-canvas" aria-hidden="true" />
    </>
  )
}
