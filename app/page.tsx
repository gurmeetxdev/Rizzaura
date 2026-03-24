"use client"

import { useState } from "react"
import Hero from "@/components/Hero"
import HowItWorks from "@/components/HowItWorks"
import UpgradeForm from "@/components/UpgradeForm"
import Footer from "@/components/Footer"
import CosmicBackground from "@/components/CosmicBackground"
import PremiumGate from "@/components/PremiumGate"
import VideoStage from "@/components/VideoStage"
import ResultPage from "@/components/ResultPage"
import { AnimatePresence, motion } from "framer-motion"

export default function Page() {
  const [stage, setStage] = useState<"gate" | "video" | "landing">("gate")

  return (
    <main className="relative min-h-screen bg-[#09031A] text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === "gate" && (
          <motion.div
            key="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <PremiumGate onEnter={() => setStage("video")} />
          </motion.div>
        )}
        
        {stage === "video" && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VideoStage onEnd={() => setStage("landing")} />
          </motion.div>
        )}

        {stage === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <ResultPage />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
