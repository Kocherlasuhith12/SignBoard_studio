"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Shield, CheckCircle2, ArrowRight, Sparkles, Layers, Cpu, Award, Play, Pause, Volume2, ArrowUpRight, ExternalLink } from "lucide-react";
import { useSound } from "@/context/SoundContext";

const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function FounderSection({ onDirectConnect }: { onDirectConnect?: () => void }) {
  const { playHover, playClick } = useSound();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudioNote = () => {
    playClick();
    if (!audioRef.current) {
      audioRef.current = new Audio(`${assetPrefix}/audio/suhith-intro.mp3`);
      audioRef.current.onended = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  };

  return (
    <section id="founder" className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#070707] text-white z-10 border-t border-white/5">
      <div className="max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28] mb-3">
              <span>EDITORIAL PROFILE // SECTION 04</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
              FOUNDER-LED CRAFT.
            </h2>
          </div>

          <div className="font-mono text-neutral-400 text-xs sm:text-sm tracking-widest uppercase max-w-md text-left md:text-right">
            <span>NO JUNIOR HAND-OFFS. EVERY COMMISSION PERSONALLY DIRECTED & ARCHITECTED BY KKS SUHITH.</span>
          </div>
        </div>

        {/* Magazine-Style Editorial Profile Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (Col 1-5): Authentic Founder Portrait */}
          <div className="lg:col-span-5 relative group">
            <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden border border-white/10 bg-[#0D0D0D] shadow-2xl flex flex-col justify-end p-8 sm:p-10">
              {/* High-Resolution Portrait */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url(${assetPrefix}/images/suhith.jpg)`,
                  backgroundPosition: "center 18%",
                }}
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/40 to-transparent z-10" />

              {/* Portrait Overlaid Typographic Identity */}
              <div className="relative z-20">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 font-mono text-[10px] text-[#F06A28] uppercase tracking-widest font-semibold mb-3">
                  FOUNDER & CREATIVE TECHNOLOGIST
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none mb-2">
                  KKS SUHITH
                </h3>

                <p className="font-mono text-xs text-neutral-300 tracking-wider uppercase mb-5">
                  HYDERABAD, INDIA / AVAILABLE GLOBALLY
                </p>

                {/* Optional Audio Note Trigger */}
                <button
                  onClick={toggleAudioNote}
                  onMouseEnter={playHover}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-neutral-200 hover:text-white transition-all"
                >
                  {isPlayingAudio ? (
                    <Pause className="w-3.5 h-3.5 text-[#F06A28]" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-[#F06A28] fill-current" />
                  )}
                  <span>{isPlayingAudio ? "PAUSE VOICE NOTE" : "LISTEN TO FOUNDER NOTE (0:30)"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Col 6-12): Personal Story, Philosophy & Credentials */}
          <div className="lg:col-span-7 space-y-8">
            {/* The Creative Philosophy Statement */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F06A28] font-semibold">
                CREATIVE PHILOSOPHY
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-light text-white leading-relaxed italic">
                &ldquo;True digital luxury is not found in complex templates or excessive ornamentation. It is born from surgical engineering, uncompromised typography, and the courage to make a business impossible to ignore.&rdquo;
              </p>
            </div>

            <p className="font-sans text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
              As a founder operating at the intersection of full-stack software architecture, motion design, and brand strategy, I eliminate the traditional disconnect between design agencies and technical developers. When you partner with Signboard Studio, the person conceptualizing your visual identity is the same person authoring your production shaders and Next.js architecture.
            </p>

            {/* Three Pillars of Rigor */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-white/5 space-y-2">
                <div className="text-[#B5121B] text-[10px] font-bold">01 // CODE</div>
                <div className="text-white font-bold text-sm">Full-Stack Rigor</div>
                <div className="text-neutral-400 font-sans text-xs leading-relaxed">
                  Next.js 14, TypeScript, GLSL shaders, and edge architectures tuned for 120 FPS.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-white/5 space-y-2">
                <div className="text-[#F06A28] text-[10px] font-bold">02 // MOTION</div>
                <div className="text-white font-bold text-sm">Cinematic Vision</div>
                <div className="text-neutral-400 font-sans text-xs leading-relaxed">
                  Editorial art direction, chiaroscuro styling, and kinetic brand films.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-white/5 space-y-2">
                <div className="text-emerald-400 text-[10px] font-bold">03 // AI</div>
                <div className="text-white font-bold text-sm">Applied Intelligence</div>
                <div className="text-neutral-400 font-sans text-xs leading-relaxed">
                  Multi-agent workflows, vector retrieval, and generative software systems.
                </div>
              </div>
            </div>

            {/* Direct Connect & Social Action */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                onClick={() => {
                  playClick();
                  onDirectConnect?.();
                }}
                onMouseEnter={playHover}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-[0_0_25px_rgba(181,18,27,0.4)]"
              >
                <span>CONNECT DIRECTLY WITH FOUNDER</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 font-mono text-xs text-neutral-400">
                <a
                  href="https://www.linkedin.com/in/kocherlakoteswarasuhithsravanbabu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LINKEDIN
                </a>
                <span>•</span>
                <a
                  href="https://github.com/Kocherlasuhith12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GITHUB
                </a>
                <span>•</span>
                <a
                  href="https://x.com/KksSuhith"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  X / TWITTER
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
