"use client"
import { useEffect, useRef, useState } from "react"

export default function VideoStage({ onEnd }: { onEnd: () => void }) {
  const vidRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = vidRef.current
    if (!v) return

    // Mark as ready once enough data is buffered
    const onCanPlay = () => {
      setReady(true)
      // Try with sound first (user already clicked a button, so gesture exists)
      v.play().catch(() => {
        // Only mute as last resort for browsers that block ALL autoplay
        v.muted = true
        v.play().catch(console.warn)
      })
    }

    const onEnded = () => onEnd()

    v.addEventListener("canplaythrough", onCanPlay)
    v.addEventListener("ended", onEnded)

    // Trigger buffering immediately
    v.load()

    return () => {
      v.removeEventListener("canplaythrough", onCanPlay)
      v.removeEventListener("ended", onEnded)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[9998] bg-black">
      {/* Fade-in overlay while buffering */}
      {!ready && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-12 h-12 rounded-full border-2 border-[#FF4D8D]/30 border-t-[#FF4D8D]"
              style={{ animation: "spin 0.9s linear infinite" }}
            />
            <p className="text-white/40 text-sm font-['DM_Sans',sans-serif] tracking-widest uppercase">
              Loading…
            </p>
          </div>
          <style jsx global>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </div>
      )}

      <video
        ref={vidRef}
        src="/video_rizzaura.mp4"
        className="w-full h-full object-cover"
        preload="auto"
        playsInline
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.6s ease",
          // NO CSS animations on the video element — they cause jank
          willChange: "opacity",
        }}
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
    </div>
  )
}
