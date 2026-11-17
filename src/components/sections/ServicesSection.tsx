"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Video, Camera, Sparkles, Check, ArrowRight, Terminal, Sliders, Play, Layers, Maximize2, X, ShieldCheck, Compass, Cpu, Zap, ArrowUpRight } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export function ServicesSection({ onServiceInquire }: { onServiceInquire?: (serviceName: string) => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeModalService, setActiveModalService] = useState<any | null>(null);
  const { playHover, playClick, playReveal, playModalClose, playTabSwitch } = useSound();

  // Interactive controls for live visual playgrounds
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [colorGrade, setColorGrade] = useState<"cinematic" | "editorial" | "noir">("cinematic");
  const [activeAiNode, setActiveAiNode] = useState(2);

  const services = [
    {
      id: "web-architecture",
      number: "01",
      title: "Flagship Web Architecture",
      category: "CORE DISCIPLINE // CODE",
      accent: "#B5121B",
      tagline: "Ultra-performant digital flagships engineered for category leaders.",
      statement:
        "We engineer custom digital platforms combining editorial art direction with production Next.js architecture. Zero templates. Every interface is sculpted with TypeScript, WebGL shaders, and hardware-accelerated motion.",
      deliverables: [
        "Bespoke Web Design & Architecture",
        "Next.js 14, TypeScript & React Production",
        "WebGL & Three.js Shader Experiences",
        "Kinetic Micro-Interactions & Physics",
        "Core Web Vitals & 100/100 Lighthouse Optimization",
      ],
      techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Three.js / WebGL", "GSAP"],
    },
    {
      id: "ai-systems",
      number: "02",
      title: "AI & Intelligent Systems",
      category: "INTELLIGENCE // WORKFLOWS",
      accent: "#F06A28",
      tagline: "Autonomous multi-agent pipelines and generative interfaces for scale.",
      statement:
        "AI is transforming commercial capability. We architect custom generative automation pipelines, neural search interfaces, and intelligent multi-model workflows powered by modern LLM APIs.",
      deliverables: [
        "Autonomous Agent Architecture & Pipelines",
        "Custom Generative UI & Visualizations",
        "Vector Search & Latent Retrieval Systems",
        "Enterprise Multi-Model LLM Integration",
        "Internal Workflow Automation Tools",
      ],
      techStack: ["Gemini 1.5 Pro / Flash", "Python", "Vector Databases", "LangChain", "Next.js"],
    },
    {
      id: "motion-design",
      number: "03",
      title: "Motion Design & Visual Storytelling",
      category: "KINETICS // NARRATIVE",
      accent: "#E51E28",
      tagline: "Thumb-stopping cinematic films that seize human attention.",
      statement:
        "Attention is the scarcest currency in modern commerce. We produce high-velocity brand films, 3D kinetic typography, and multi-format reels that stop thumbs and embed your brand deeply into memory.",
      deliverables: [
        "Cinematic Brand Narrative Films",
        "Kinetic 3D Typography Sequences",
        "High-Impact Commercial Reels (9:16 & 16:9)",
        "Product 3D Motion Teasers",
        "Tactile Sound Design & Audio Mastering",
      ],
      techStack: ["After Effects", "Premiere Pro", "Blender", "DaVinci Resolve", "Cinema 4D"],
    },
    {
      id: "creative-direction",
      number: "04",
      title: "Photography & Creative Direction",
      category: "ART DIRECTION // VISUAL",
      accent: "#F06A28",
      tagline: "High-contrast editorial art direction and commanding visual systems.",
      statement:
        "Every world-class brand requires an unmistakable visual signature. We orchestrate comprehensive art direction, commercial photography, editorial styling, and meticulous chiaroscuro grading.",
      deliverables: [
        "Comprehensive Brand Art Direction",
        "Commercial Product Photography",
        "Lifestyle & Architectural Stills",
        "Bespoke Color Space & Grading Profiles",
        "Campaign Visual Assets & Guidelines",
      ],
      techStack: ["Sony Alpha 7R V", "Profoto Strobes", "Capture One Pro", "Photoshop"],
    },
  ];

  const currentService = services[activeTab];

  // Bespoke Interactive Demonstration Component
  const ServiceDemonstration = ({ id }: { id: string }) => {
    switch (id) {
      case "web-architecture":
        return (
          <div className="w-full h-full min-h-[320px] sm:min-h-[380px] bg-[#0A0A0A] rounded-2xl border border-white/10 p-6 flex flex-col justify-between font-mono text-xs relative overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-neutral-400 text-[10px] ml-2">CORE WEB VITALS MONITOR</span>
              </div>
              <span className="text-emerald-400 text-[10px] font-bold">100 / 100 HEALTH</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-auto py-4">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-neutral-500 text-[10px]">LCP (LOAD)</div>
                <div className="text-white text-base font-bold mt-0.5">0.6s</div>
                <div className="text-emerald-400 text-[9px] mt-1">FAST</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-neutral-500 text-[10px]">FID (INPUT)</div>
                <div className="text-white text-base font-bold mt-0.5">0ms</div>
                <div className="text-emerald-400 text-[9px] mt-1">ZERO DELAY</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 col-span-2 sm:col-span-1">
                <div className="text-neutral-500 text-[10px]">CLS (SHIFT)</div>
                <div className="text-white text-base font-bold mt-0.5">0.000</div>
                <div className="text-emerald-400 text-[9px] mt-1">NO SHIFT</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-3 border-t border-white/5">
              <span>STACK: NEXT.JS 14 / TS / WEBGL</span>
              <span className="text-[#F06A28]">PRODUCTION GRADE</span>
            </div>
          </div>
        );

      case "ai-systems":
        return (
          <div className="w-full h-full min-h-[320px] sm:min-h-[380px] bg-[#0A0A0A] rounded-2xl border border-white/10 p-6 flex flex-col justify-between font-mono text-xs relative select-none">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] uppercase text-[#F06A28]">MULTI-AGENT TOPOLOGY</span>
              <span className="text-[10px] text-neutral-400">LATENT STREAM ACTIVE</span>
            </div>

            {/* Interactive Node Graph Simulator */}
            <div className="grid grid-cols-3 gap-3 my-auto py-4">
              {[
                { name: "REASONING ORCHESTRATOR", status: "ONLINE", speed: "14ms" },
                { name: "MULTIMODAL INGESTION", status: "PROCESSING", speed: "22ms" },
                { name: "VECTOR RETRIEVAL 1536-D", status: "CACHED", speed: "4ms" },
              ].map((node, i) => (
                <button
                  key={node.name}
                  onClick={() => {
                    playClick();
                    setActiveAiNode(i);
                  }}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    activeAiNode === i
                      ? "bg-white/10 border-[#F06A28] text-white shadow-[0_0_20px_rgba(240,106,40,0.2)]"
                      : "bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/20"
                  }`}
                >
                  <div className="text-[9px] text-[#F06A28] font-bold">NODE 0{i + 1}</div>
                  <div className="text-[11px] font-semibold text-white mt-1 leading-tight">{node.name}</div>
                  <div className="text-[9px] text-emerald-400 mt-2">{node.speed} • {node.status}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-3 border-t border-white/5">
              <span>PIPELINE: GEMINI API ARCHITECTURE</span>
              <span className="text-emerald-400">TOUCH NODE TO INSPECT</span>
            </div>
          </div>
        );

      case "motion-design":
        return (
          <div className="w-full h-full min-h-[320px] sm:min-h-[380px] bg-[#0A0A0A] rounded-2xl border border-white/10 p-6 flex flex-col justify-between font-mono text-xs select-none">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] uppercase text-[#B5121B]">KINETIC TIMELINE CONTROLLER</span>
              <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-full text-[9px]">
                {(["16:9", "9:16", "1:1"] as const).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => {
                      playClick();
                      setAspectRatio(ratio);
                    }}
                    className={`px-2 py-0.5 rounded-full transition-all ${
                      aspectRatio === ratio ? "bg-[#B5121B] text-white font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Kinetic Video Frame Simulator */}
            <div className="my-auto flex items-center justify-center py-4">
              <div
                className={`transition-all duration-500 rounded-xl bg-gradient-to-br from-[#1A0A0B] to-[#0A0A0A] border border-white/15 flex flex-col items-center justify-center p-6 text-center ${
                  aspectRatio === "16:9" ? "w-64 h-36" : aspectRatio === "9:16" ? "w-36 h-60" : "w-44 h-44"
                }`}
              >
                <Play className="w-8 h-8 text-[#F06A28] mb-2 animate-pulse" />
                <span className="text-[10px] text-white font-bold tracking-widest uppercase">
                  {aspectRatio} COMMERCIAL
                </span>
                <span className="text-[8px] text-neutral-400 mt-0.5">120 FPS PROMOTION</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-3 border-t border-white/5">
              <span>COLOR SPACE: ACES / REC.709</span>
              <span className="text-[#F06A28]">TOUCH ASPECT RATIO</span>
            </div>
          </div>
        );

      case "creative-direction":
        return (
          <div className="w-full h-full min-h-[320px] sm:min-h-[380px] bg-[#0A0A0A] rounded-2xl border border-white/10 p-6 flex flex-col justify-between font-mono text-xs select-none">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] uppercase text-[#F06A28]">EDITORIAL ART DIRECTION PROFILES</span>
              <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-full text-[9px]">
                {(["cinematic", "editorial", "noir"] as const).map((grade) => (
                  <button
                    key={grade}
                    onClick={() => {
                      playClick();
                      setColorGrade(grade);
                    }}
                    className={`px-2 py-0.5 rounded-full transition-all ${
                      colorGrade === grade ? "bg-[#F06A28] text-white font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette Preview */}
            <div className="my-auto py-4 space-y-3">
              <div className="grid grid-cols-4 gap-2 h-14 rounded-xl overflow-hidden border border-white/10 p-1 bg-black">
                <div className={`rounded transition-colors duration-500 ${colorGrade === "cinematic" ? "bg-[#B5121B]" : colorGrade === "editorial" ? "bg-[#D41924]" : "bg-[#222222]"}`} />
                <div className={`rounded transition-colors duration-500 ${colorGrade === "cinematic" ? "bg-[#F06A28]" : colorGrade === "editorial" ? "bg-[#FF7D3C]" : "bg-[#444444]"}`} />
                <div className={`rounded transition-colors duration-500 ${colorGrade === "cinematic" ? "bg-[#111111]" : colorGrade === "editorial" ? "bg-[#F5F5F5]" : "bg-[#111111]"}`} />
                <div className={`rounded transition-colors duration-500 ${colorGrade === "cinematic" ? "bg-[#070707]" : colorGrade === "editorial" ? "bg-[#0A0A0A]" : "bg-[#000000]"}`} />
              </div>
              <div className="text-[10px] text-neutral-300 text-center uppercase tracking-widest font-mono">
                {colorGrade.toUpperCase()} CHIAROSCURO PROFILE // SONY A7R V
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-3 border-t border-white/5">
              <span>DYNAMIC RANGE: 15+ STOPS</span>
              <span className="text-[#F06A28]">TOUCH GRADE TO TOGGLE</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="services" className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#070707] text-white z-10 border-t border-white/5">
      <div className="max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28] mb-3">
              <span>CAPABILITIES // SECTION 03</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
              CORE DISCIPLINES.
            </h2>
          </div>

          <div className="font-mono text-neutral-400 text-xs sm:text-sm tracking-widest uppercase max-w-md text-left md:text-right">
            <span>FOUR SPECIALIZED PRACTICES DELIVERED WITH UNCOMPROMISED ARTISTRY AND TECHNICAL RIGOR</span>
          </div>
        </div>

        {/* 4-Discipline Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {services.map((serv, idx) => (
            <button
              key={serv.id}
              onClick={() => {
                playTabSwitch();
                setActiveTab(idx);
              }}
              className={`p-5 rounded-2xl border text-left transition-all ${
                activeTab === idx
                  ? "bg-[#141414] border-white/30 text-white shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                  : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white hover:border-white/15"
              }`}
            >
              <div className="font-mono text-[10px] text-[#F06A28] font-bold mb-1">
                {serv.number} {"//"} {serv.category}
              </div>
              <div className="font-serif text-lg sm:text-xl font-bold uppercase text-white leading-tight">
                {serv.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Discipline Detailed Presentation Stage */}
        <div className="rounded-3xl bg-[#0D0D0D] border border-white/10 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (Col 1-6): Philosophy, Deliverables & Inquire CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] text-[#F06A28] uppercase tracking-widest font-semibold">
              {currentService.category}
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
              {currentService.title}
            </h3>

            <p className="font-sans text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
              {currentService.statement}
            </p>

            {/* Deliverables Checklist */}
            <div className="pt-4 border-t border-white/5 space-y-2.5">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">
                CORE DELIVERABLES & OUTCOMES
              </div>
              {currentService.deliverables.map((deliv, i) => (
                <div key={i} className="flex items-center gap-3 font-mono text-xs text-neutral-300">
                  <Check className="w-4 h-4 text-[#F06A28] shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-6">
              <button
                onClick={() => {
                  playClick();
                  onServiceInquire?.(currentService.title);
                }}
                onMouseEnter={playHover}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs tracking-widest uppercase font-semibold flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-[0_0_25px_rgba(181,18,27,0.4)]"
              >
                <span>INQUIRE ABOUT {currentService.title}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column (Col 7-12): Bespoke Interactive Demonstration Widget */}
          <div className="lg:col-span-6">
            <ServiceDemonstration id={currentService.id} />
          </div>
        </div>
      </div>
    </section>
  );
}
