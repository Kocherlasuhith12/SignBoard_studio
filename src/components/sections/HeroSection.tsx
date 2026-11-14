"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";
import { SignboardMonogram } from "@/components/ui/SignboardLogo";
import { useSound } from "@/context/SoundContext";

interface HeroSectionProps {
  onExploreClick: () => void;
  onStartProjectClick: () => void;
}

export function HeroSection({ onExploreClick, onStartProjectClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { playHover, playClick } = useSound();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between items-center pt-32 pb-14 px-6 sm:px-8 overflow-hidden z-10"
    >
      {/* Background Architectural Mesh & Subtle Lighting Spheres */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Red/Orange Centerstage Light Core */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] sm:w-[1000px] sm:h-[700px] rounded-full blur-[140px] pointer-events-none opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(181, 18, 27, 0.55) 0%, rgba(240, 106, 40, 0.28) 45%, rgba(10, 10, 10, 0) 75%)",
        }}
      />

      {/* Studio Header Tagline Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-10 flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8"
      >
        <span className="font-mono text-xs text-neutral-300 tracking-[0.25em] uppercase font-medium">
          PREMIUM CREATIVE DIGITAL STUDIO
        </span>
        <span className="text-neutral-500 text-xs">/</span>
        <span className="font-mono text-xs text-[#F06A28] tracking-widest font-semibold">
          HYDERABAD / GLOBAL
        </span>
      </motion.div>

      {/* Main Content Area: Monogram + Wordmark + Master Editorial Headline */}
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 max-w-6xl w-full text-center flex flex-col items-center my-auto"
      >
        {/* Animated Official Signboard S Monogram & Wordmark Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-col items-center"
        >
          {/* Official Signboard Emblem with Volumetric Glow & Pendulum Physics */}
          <div className="mb-4">
            <SignboardMonogram className="w-28 h-28 sm:w-36 sm:h-36" glow animated />
          </div>

          {/* Complete SIGNBOARD Wordmark Matching Official Branding */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-white text-2xl sm:text-3xl tracking-[0.35em] uppercase">
                SIGNBOARD
              </span>
            </div>
            <span className="font-mono text-neutral-400 font-semibold uppercase text-[10px] tracking-[0.45em] mt-1.5">
              CREATIVE DIGITAL STUDIO
            </span>
          </motion.div>
        </motion.div>

        {/* Master Headline: WE MAKE BUSINESSES IMPOSSIBLE TO IGNORE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white uppercase tracking-tight leading-[0.98] mb-8"
        >
          WE MAKE <br className="hidden sm:inline" />
          BUSINESSES{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#B5121B] via-[#E82823] to-[#F06A28] bg-clip-text text-transparent italic pr-2">
              IMPOSSIBLE
            </span>
            {/* Architectural accent underline */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 right-2 h-[3px] bg-gradient-to-r from-[#B5121B] to-[#F06A28] rounded-full origin-left"
            />
          </span>{" "}
          <br className="hidden md:inline" />
          TO IGNORE.
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-sans text-neutral-300 text-lg sm:text-2xl font-light tracking-wide max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Creative digital experiences. Powerful visual storytelling. Intelligent solutions.
        </motion.p>

        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 w-full sm:w-auto"
        >
          {/* Primary CTA: EXPLORE OUR WORLD */}
          <button
            onClick={() => {
              playClick();
              onExploreClick();
            }}
            onMouseEnter={playHover}
            className="w-full sm:w-auto group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs sm:text-sm tracking-[0.25em] font-semibold uppercase flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_35px_rgba(181,18,27,0.5)] hover:shadow-[0_0_55px_rgba(240,106,40,0.7)] transition-all duration-300 hover:scale-105 active:scale-95"
            data-cursor-text="EXPLORE"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-200" />
              EXPLORE OUR WORLD
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          {/* Secondary CTA: START A PROJECT */}
          <button
            onClick={() => {
              playClick();
              onStartProjectClick();
            }}
            onMouseEnter={playHover}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-[#F06A28]/60 text-white font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            data-cursor-text="START"
          >
            <span>START A PROJECT</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Hero Footnote / Interactive Studio Telemetry Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-10 w-full max-w-6xl mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* Core Pillars */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full md:w-auto text-left">
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-[#F06A28]" />
            <div>
              <div className="font-mono text-xs text-white font-semibold uppercase">HIGH SPEED</div>
              <div className="font-mono text-[10px] text-neutral-400">Next.js & WebGL</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-[#B5121B]" />
            <div>
              <div className="font-mono text-xs text-white font-semibold uppercase">BESPOKE</div>
              <div className="font-mono text-[10px] text-neutral-400">Zero Templates</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="font-mono text-xs text-white font-semibold uppercase">PROVEN</div>
              <div className="font-mono text-[10px] text-neutral-400">Founder Guided</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => {
            playClick();
            onExploreClick();
          }}
          onMouseEnter={playHover}
          className="group flex items-center gap-3 font-mono text-xs text-neutral-400 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
          data-cursor-text="SCROLL"
        >
          <span>SCROLL TO DISCOVER</span>
          <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#F06A28] group-hover:bg-[#F06A28]/10 transition-all">
            <ArrowDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
