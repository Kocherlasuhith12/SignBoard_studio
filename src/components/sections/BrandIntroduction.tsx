"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Eye, Cpu, Flame, CheckCircle2 } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export function BrandIntroduction() {
  const { playHover } = useSound();

  const manifestoPoints = [
    {
      num: "01",
      title: "ARCHITECTURAL DISTINCTION",
      icon: Compass,
      desc: "Zero cookie-cutter components or off-the-shelf themes. We sculpt bespoke visual systems engineered exclusively around your brand's unique commercial moat.",
      tag: "100% BESPOKE",
    },
    {
      num: "02",
      title: "KINETIC STORYTELLING",
      icon: Flame,
      desc: "Motion is not decoration; it is punctuation. We employ GSAP motion design and fluid interaction to captivate attention and guide subconscious decision making.",
      tag: "IMMERSIVE MOTION",
    },
    {
      num: "03",
      title: "INTELLIGENT TECHNOLOGY",
      icon: Cpu,
      desc: "High-performance Next.js architectures, WebGL environments, and AI-enabled workflows that load instantaneously and dominate search visibility.",
      tag: "NEXT.JS & AI",
    },
    {
      num: "04",
      title: "RADICAL VISIBILITY",
      icon: Eye,
      desc: "In an ocean of generic digital commodities, our mission is simple: to make your business completely impossible to scroll past, forget, or ignore.",
      tag: "COMMAND ATTENTION",
    },
  ];

  return (
    <section id="about" className="relative py-32 px-6 sm:px-8 bg-[#090909] text-white z-10 overflow-hidden">
      {/* Background radial gradient */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(181,18,27,0.7) 0%, rgba(240,106,40,0.4) 50%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28]">
                SECTION B // BRAND ETHOS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white max-w-2xl">
              BUILT FOR BRANDS THAT REFUSE ORDINARY.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
              Signboard Studio is an independent founder-led creative digital studio. We engineer visual identities, high-impact web architectures, and cinematic motion content for companies determined to lead their category.
            </p>
          </div>
        </div>

        {/* Big Editorial Manifesto Statement */}
        <div className="mb-24 p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#121212] via-[#0E0E0E] to-[#140809] border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#B5121B] via-[#F06A28] to-transparent" />
          
          <div className="font-mono text-xs text-neutral-400 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
            <span>THE GUIDING PRINCIPLE</span>
            <span className="w-8 h-[1px] bg-neutral-700" />
          </div>

          <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal leading-snug text-neutral-100 max-w-4xl italic">
            &ldquo;Signboard should not look like a company that sells websites.{" "}
            <span className="font-semibold text-white not-italic bg-gradient-to-r from-white via-neutral-100 to-[#F06A28] bg-clip-text text-transparent">
              It must look like a creative world that businesses want to be part of.
            </span>&rdquo;
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-400 uppercase">
            <span className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-[#F06A28]" /> Founder-Led Art Direction
            </span>
            <span className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-[#B5121B]" /> Production-Grade Engineering
            </span>
            <span className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Global Standards
            </span>
          </div>
        </div>

        {/* 4 Interactive Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {manifestoPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={playHover}
                className="group relative p-8 sm:p-10 rounded-2xl bg-[#111111]/80 hover:bg-[#151515] border border-white/5 hover:border-[#F06A28]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-sm text-[#B5121B] font-bold tracking-widest">
                      {point.num}
                    </span>
                    <span className="font-mono text-[11px] tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 group-hover:border-[#F06A28]/30 group-hover:text-white transition-colors">
                      {point.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 group-hover:bg-[#B5121B]/15 group-hover:border-[#B5121B]/40 transition-colors">
                      <Icon className="w-6 h-6 text-neutral-200 group-hover:text-[#F06A28] transition-colors" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                      {point.title}
                    </h3>
                  </div>

                  <p className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
                    {point.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-neutral-400 group-hover:text-[#F06A28] font-mono text-xs transition-colors">
                  <span>DISCOVER SPECIFICATION</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

