"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, Layers, ShieldCheck, Zap, Compass, Play } from "lucide-react";
import { SignboardMonogram } from "@/components/ui/SignboardLogo";
import { useSound } from "@/context/SoundContext";

interface HeroSectionProps {
  onExploreClick: () => void;
  onStartProjectClick: () => void;
}

export function HeroSection({ onExploreClick, onStartProjectClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { playHover, playClick } = useSound();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.65], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.65], [1, 0.96]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[94vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden z-10 select-none"
    >
      {/* Background Architectural Grid & Precision Crosshairs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Dynamic Mouse-Responsive Ambient Light Core */}
      <div
        className="absolute w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full blur-[160px] pointer-events-none opacity-20 transition-all duration-700 ease-out"
        style={{
          left: `${mousePos.x || 50}%`,
          top: `${mousePos.y || 45}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(181, 18, 27, 0.55) 0%, rgba(240, 106, 40, 0.25) 40%, rgba(7, 7, 7, 0) 70%)",
        }}
      />

      {/* Top Editorial Horizon Metadata */}
      <div className="relative z-10 w-full max-w-[1540px] mx-auto flex items-center justify-between text-neutral-400 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase border-b border-white/5 pb-4 sm:pb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#B5121B] animate-pulse" />
          <span className="text-white font-semibold">SIGNBOARD STUDIO</span>
          <span className="text-neutral-600 hidden sm:inline">/</span>
          <span className="text-neutral-400 hidden sm:inline">EDITION V2.0</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-neutral-400">
          <span className="hidden md:inline">DIGITAL ARCHITECTURE • KINETIC MOTION • ART DIRECTION</span>
          <span className="text-[#F06A28] font-semibold">HYDERABAD / GLOBAL</span>
        </div>
      </div>

      {/* Main Asymmetrical Editorial Stage */}
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 w-full max-w-[1540px] mx-auto my-auto py-8 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
      >
        {/* Left Column (Col 1-8): Authoritative Master Headline */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#F06A28] mb-5 sm:mb-6">
            <span>DISCIPLINED CREATIVE TECHNOLOGY</span>
          </div>

          <h1 className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-bold text-white uppercase tracking-tight leading-[0.94] mb-6 sm:mb-8">
            WE MAKE <br />
            BUSINESSES <br />
            <span className="relative inline-block my-1">
              <span className="bg-gradient-to-r from-[#B5121B] via-[#E82823] to-[#F06A28] bg-clip-text text-transparent italic font-serif pr-2">
                IMPOSSIBLE
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="absolute -bottom-1.5 left-0 right-2 h-[2px] bg-gradient-to-r from-[#B5121B] to-[#F06A28] origin-left"
              />
            </span>{" "}
            <br />
            TO IGNORE.
          </h1>

          <p className="font-sans text-neutral-300 text-base sm:text-lg md:text-xl font-light tracking-wide max-w-2xl leading-relaxed mb-8 sm:mb-10">
            An independent creative technology atelier sculpting high-performance web architecture, cinematic motion design, and intelligent software systems for category-defining brands.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <button
              onClick={() => {
                playClick();
                onStartProjectClick();
              }}
              onMouseEnter={playHover}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs sm:text-sm tracking-[0.22em] font-semibold uppercase flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(181,18,27,0.45)] hover:shadow-[0_0_50px_rgba(240,106,40,0.65)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              data-cursor-text="COMMISSION"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-200" />
                START A COMMISSION
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <button
              onClick={() => {
                playClick();
                onExploreClick();
              }}
              onMouseEnter={playHover}
              className="px-8 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-white/35 text-white font-mono text-xs sm:text-sm tracking-[0.22em] uppercase font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
              data-cursor-text="EXPLORE"
            >
              <span>EXPLORE WORK</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Right Column (Col 9-12): Architectural Emblem Anchor & Studio Telemetry */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-8">
          {/* Interactive Architectural Signboard Emblem Anchor */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#121212]/90 to-[#0A0A0A]/90 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden w-full max-w-md group">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#F06A28]">
                ARCHITECTURAL SEAL
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>

            <div className="flex flex-col items-center justify-center py-4">
              <div className="mb-4">
                <SignboardMonogram className="w-28 h-28 sm:w-32 sm:h-32" glow animated />
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 text-center py-1 px-3 rounded-full bg-white/[0.03] border border-white/5">
                TOUCH EMBLEM FOR ACOUSTIC CHIME
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 space-y-3 font-mono text-xs text-neutral-300">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 text-[10px]">PHILOSOPHY</span>
                <span className="text-white font-medium">Bespoke By Nature</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 text-[10px]">SPEED INDEX</span>
                <span className="text-emerald-400 font-medium">99 / 100 Web Vitals</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 text-[10px]">FOUNDER LEAD</span>
                <span className="text-neutral-300 font-medium">KKS Suhith</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Architectural Telemetry & Scroll Prompt */}
      <div className="relative z-10 w-full max-w-[1540px] mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] tracking-widest text-neutral-400 uppercase">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#F06A28]" />
            <span>LATENCY: 0MS WEB AUDIO</span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#B5121B]" />
            <span>CORE: NEXT.JS 14 / WEBGL</span>
          </div>
        </div>

        <button
          onClick={() => {
            playClick();
            onExploreClick();
          }}
          onMouseEnter={playHover}
          className="flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll to explore showcase"
        >
          <span>SCROLL TO DISCOVER ARCHIVE</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#F06A28] group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
