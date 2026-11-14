"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import { SignboardMonogram } from "@/components/ui/SignboardLogo";

interface IntroSequenceProps {
  onComplete: () => void;
  onExplore: () => void;
  onStartProject: () => void;
}

export function IntroSequence({
  onComplete,
  onExplore,
  onStartProject,
}: IntroSequenceProps) {
  const [stage, setStage] = useState<"monogram" | "wordmark" | "headline" | "ready">("monogram");
  const [skipped, setSkipped] = useState(false);
  const { playReveal, playClick, playHover } = useSound();

  useEffect(() => {
    // Rapid, snappy stage progression so visitor is never blocked or waiting
    const t1 = setTimeout(() => {
      setStage("wordmark");
      playReveal();
    }, 600);

    const t2 = setTimeout(() => {
      setStage("headline");
    }, 1200);

    const t3 = setTimeout(() => {
      setStage("ready");
    }, 1800);

    // Any key press (like Escape, Space, Enter) or mouse wheel skips intro immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleSkip();
      }
    };

    const handleWheel = () => {
      handleSkip();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [playReveal]);

  const handleSkip = () => {
    setSkipped(true);
    playClick();
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  const handleExplore = () => {
    playClick();
    onExplore();
    onComplete();
  };

  const handleStartProject = () => {
    playClick();
    onStartProject();
    onComplete();
  };

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between items-center bg-[#070707] text-white px-6 py-8 overflow-hidden select-none"
        >
          {/* Subtle Ambient Red/Orange Lighting Bloom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: stage === "monogram" ? 0.45 : stage === "wordmark" ? 0.65 : 0.85,
              scale: stage === "ready" ? 1.25 : 1,
            }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full pointer-events-none blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(181,18,27,0.35) 0%, rgba(240,106,40,0.18) 40%, rgba(7,7,7,0) 70%)",
            }}
          />

          {/* Top Bar: Brand Monogram & Skip / Audio Controls */}
          <div className="w-full max-w-7xl flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-[0.3em] flex items-center gap-2">
                SIGNBOARD STUDIO — INITIATIVE
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleSkip}
                onMouseEnter={playHover}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-neutral-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all uppercase"
              >
                SKIP INTRO [ESC]
              </button>
            </div>
          </div>

          {/* Centerpiece: The Official Signboard S Monogram & Headline Reveal */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-5xl text-center relative z-20 my-auto">
            {/* SVG Animated Official Signboard Emblem */}
            <motion.div
              layout
              className="relative mb-8 sm:mb-10"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 relative flex items-center justify-center">
                <SignboardMonogram className="w-28 h-28 sm:w-36 sm:h-36" glow animated />
              </div>
            </motion.div>

            {/* Wordmark Reveal Matching Official Branding */}
            <AnimatePresence>
              {(stage === "wordmark" || stage === "headline" || stage === "ready") && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center mb-6"
                >
                  <h2 className="font-serif font-black tracking-[0.32em] text-3xl sm:text-5xl uppercase text-white flex items-center gap-2">
                    SIGNBOARD
                  </h2>
                  <p className="font-mono text-xs sm:text-sm tracking-[0.45em] text-[#F06A28] uppercase mt-2 font-semibold">
                    CREATIVE DIGITAL STUDIO
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Headline and Supporting Text */}
            <AnimatePresence>
              {(stage === "headline" || stage === "ready") && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-4xl"
                >
                  <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-100 uppercase leading-[1.08] mb-6">
                    WE MAKE BUSINESSES{" "}
                    <span className="bg-gradient-to-r from-[#B5121B] via-[#E62E25] to-[#F06A28] bg-clip-text text-transparent italic font-serif">
                      IMPOSSIBLE
                    </span>{" "}
                    TO IGNORE.
                  </h1>

                  <p className="font-sans text-neutral-300 text-base sm:text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
                    Creative digital experiences. Powerful visual storytelling. Intelligent solutions.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive CTAs */}
            <AnimatePresence>
              {stage === "ready" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 z-30"
                >
                  {/* Primary CTA */}
                  <button
                    onClick={handleExplore}
                    onMouseEnter={playHover}
                    className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs sm:text-sm tracking-[0.25em] font-semibold uppercase flex items-center gap-3 overflow-hidden shadow-[0_0_35px_rgba(181,18,27,0.5)] hover:shadow-[0_0_50px_rgba(240,106,40,0.7)] transition-all duration-300 hover:scale-105 active:scale-95"
                    data-cursor-text="ENTER"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-orange-200 animate-pulse" />
                      EXPLORE OUR WORLD
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>

                  {/* Secondary CTA */}
                  <button
                    onClick={handleStartProject}
                    onMouseEnter={playHover}
                    className="px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#F06A28]/60 text-white font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                    data-cursor-text="START"
                  >
                    START A PROJECT
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Bar: Status & Telemetry */}
          <div className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between text-neutral-400 font-mono text-[11px] tracking-widest uppercase gap-3 z-20">
            <div className="flex items-center gap-2">
              <span>STATUS: ACCEPTING HIGH-IMPACT COMMISSIONS</span>
            </div>
            <div className="flex items-center gap-6">
              <span>LAT: 17.3850° N / LON: 78.4867° E</span>
              <span className="text-neutral-300">EST. 2024</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

