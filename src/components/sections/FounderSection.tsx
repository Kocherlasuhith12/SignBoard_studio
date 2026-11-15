"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Shield, CheckCircle2, ArrowRight, Sparkles, Layers, Cpu, Award, Play } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import { FounderVideoShowcase } from "@/components/founder/FounderVideoShowcase";

const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function FounderSection({ onDirectConnect }: { onDirectConnect?: () => void }) {
  const [activeTab, setActiveTab] = useState<"philosophy" | "background" | "stack" | "reel">("philosophy");
  const { playHover, playClick } = useSound();

  const skills = [
    { name: "Full-Stack Web Architecture", level: "Production", category: "Code" },
    { name: "Next.js 14 / TypeScript / Tailwind", level: "Advanced", category: "Code" },
    { name: "Creative Motion Design & GSAP", level: "Production", category: "Motion" },
    { name: "Art Direction & Brand Photography", level: "Editorial", category: "Creative" },
    { name: "AI Agent & Generative Pipelines", level: "Cutting Edge", category: "AI" },
    { name: "Digital Strategy & Conversion UX", level: "Strategic", category: "Strategy" },
  ];

  return (
    <section id="founder" className="relative py-32 px-6 sm:px-8 bg-[#090909] text-white z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28]">
                SECTION E // FOUNDER & VISION
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
              FOUNDER-LED RIGOR.
            </h2>
          </div>
          <p className="font-mono text-neutral-400 text-xs sm:text-sm tracking-widest uppercase max-w-sm">
            NO JUNIOR DELEGATION. EVERY COMMISSION PERSONALLY DIRECTED AND ARCHITECTED BY KKS SUHITH.
          </p>
        </div>

        {/* Founder Profile Card & Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Profile Card */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#141414] to-[#0D0D0D] border border-white/10 flex flex-col justify-between relative overflow-hidden">
            {/* Top Identity Tag */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#F06A28]" />
                  AUTHENTICATED PROFILE
                </span>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold uppercase">
                  ACTIVE FOUNDER
                </span>
              </div>

              {/* Founder Avatar / Authentic Portrait Visual */}
              <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden mb-6 border border-white/15 bg-[#0D0D0D] flex flex-col justify-end p-6 group shadow-2xl">
                {/* Authentic Founder Portrait */}
                <div
                  className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${assetPrefix}/images/suhith.jpg)`,
                    backgroundPosition: "center 18%",
                  }}
                />
                
                {/* Refined Cinematic Vignette & Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/50 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="mb-1">
                    <span className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                      KKS SUHITH
                    </span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-[#F06A28] uppercase tracking-widest font-semibold mb-2 drop-shadow-sm">
                    FOUNDER & CREATIVE DIRECTOR
                  </div>
                  <div className="font-sans text-xs text-neutral-300">
                    Full-Stack Engineer / Motion Designer / Creative Technologist
                  </div>
                </div>
              </div>

              {/* Key Credentials Badges */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="text-neutral-400 text-[10px] uppercase">PRACTICE</div>
                  <div className="text-white font-semibold mt-0.5">End-to-End Craft</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="text-neutral-400 text-[10px] uppercase">EXPERTISE</div>
                  <div className="text-white font-semibold mt-0.5">Next.js & Motion</div>
                </motion.div>
              </div>
            </div>

            {/* Direct Connect & AI Video Reel CTA */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  playClick();
                  setActiveTab("reel");
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-[0_0_25px_rgba(181,18,27,0.45)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>WATCH AI REEL: WHO AM I</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  if (onDirectConnect) {
                    onDirectConnect();
                  } else {
                    const contact = document.querySelector("#contact");
                    contact?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                onMouseEnter={playHover}
                className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 transition-all group"
              >
                <span>INITIATE FOUNDER DIALOGUE</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#F06A28]" />
              </button>
            </div>
          </div>

          {/* Right Column: Narrative & Technical Depth Tabs */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-[#111111] border border-white/10 flex flex-col justify-between">
            <div>
              {/* Interactive Tab Switcher */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-white/10 mb-8">
                {(
                  [
                    { id: "philosophy", label: "01 // PHILOSOPHY" },
                    { id: "background", label: "02 // BACKGROUND" },
                    { id: "stack", label: "03 // SKILL MATRIX" },
                    { id: "reel", label: "04 // AI VIDEO: WHO AM I" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playClick();
                      setActiveTab(tab.id);
                    }}
                    onMouseEnter={playHover}
                    className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? "bg-[#B5121B] text-white font-bold shadow-[0_0_15px_rgba(181,18,27,0.4)]"
                        : "bg-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {tab.id === "reel" && <Sparkles className="w-3.5 h-3.5 text-[#F06A28]" />}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab 1: The Core Philosophy */}
              {activeTab === "philosophy" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <blockquote className="font-serif text-xl sm:text-2xl text-neutral-100 italic leading-relaxed border-l-2 border-[#B5121B] pl-6 py-1">
                    &ldquo;Code is the modern chisel; aesthetic vision is the soul. A company that merely exists is easily forgotten. A company engineered with emotional resonance and surgical precision commands the market.&rdquo;
                  </blockquote>

                  <p className="font-sans text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
                    KKS Suhith founded Signboard Studio out of a persistent frustration with modern agency bloat: bloated management hierarchies, recycled Figma templates, and cookie-cutter Webflow clones that all look and sound identical.
                  </p>

                  <p className="font-sans text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
                    By collapsing the barrier between creative direction, cinematic motion, and production software engineering, Signboard offers clients a unified digital powerhouse where the person conceiving the vision is the one architecting it.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-[#F06A28] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-mono text-xs font-bold text-white uppercase">UNIFIED VISION</div>
                        <div className="font-sans text-xs text-neutral-400 mt-1">Zero miscommunication between designers and engineers.</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Cpu className="w-5 h-5 text-[#B5121B] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-mono text-xs font-bold text-white uppercase">DEEP TECHNICAL ACCURACY</div>
                        <div className="font-sans text-xs text-neutral-400 mt-1">Built directly with production Next.js and WebGL.</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Development & Creative Background */}
              {activeTab === "background" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <p className="font-sans text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
                    With an intensive background in modern JavaScript frameworks, full-stack systems architecture, and cutting-edge frontend graphics, KKS Suhith brings an engineer’s rigor to brand identity and digital storytelling.
                  </p>

                  <div className="space-y-4 pt-2">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="font-mono text-xs text-[#F06A28] uppercase font-bold mb-1">
                        FOUNDATIONAL DISCIPLINES
                      </div>
                      <p className="font-sans text-sm text-neutral-300">
                        Bridging high-performance web development (Next.js, TypeScript, Node.js) with commercial art direction, video post-production, and generative AI research.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="font-mono text-xs text-[#B5121B] uppercase font-bold mb-1">
                        SOLVING COMMERCIAL BOTTLENECK
                      </div>
                      <p className="font-sans text-sm text-neutral-300">
                        Focusing on measurable business impact: high conversion fidelity, stable edge delivery, sub-second interaction speed, and magnetic brand stickiness.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Detailed Verified Skill Matrix */}
              {activeTab === "stack" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ y: -3, borderColor: "rgba(240,106,40,0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                            {skill.category}
                          </span>
                          <span className="font-mono text-[10px] text-[#F06A28] font-bold uppercase">
                            {skill.level}
                          </span>
                        </div>
                        <div className="font-sans text-sm font-semibold text-white">{skill.name}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab 4: AI Video Story: Who Am I */}
              {activeTab === "reel" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <FounderVideoShowcase onStartProject={onDirectConnect} />
                </motion.div>
              )}
            </div>

            {/* Bottom Statement */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-neutral-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                VERIFIED PROFESSIONAL INFORMATION
              </span>
              <span>NO ARTIFICIAL CREDENTIALS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

