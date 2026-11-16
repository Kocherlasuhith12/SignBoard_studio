"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Video, Camera, Sparkles, Check, ArrowRight, Terminal, Sliders, Play, Layers, Maximize2, X, ShieldCheck } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export function ServicesSection({ onServiceInquire }: { onServiceInquire?: (serviceName: string) => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeModalService, setActiveModalService] = useState<any | null>(null);
  const { playHover, playClick, playReveal, playModalClose, playTabSwitch } = useSound();

  const handleOpenServiceModal = (serv: any) => {
    playReveal();
    setActiveModalService(serv);
    document.body.style.overflow = "hidden";
  };

  const handleCloseServiceModal = () => {
    playModalClose();
    setActiveModalService(null);
    document.body.style.overflow = "unset";
  };

  // Interactive state for playground demos
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [colorGrade, setColorGrade] = useState<"cinematic" | "editorial" | "noir">("cinematic");
  const [aiNodeActive, setAiNodeActive] = useState<number>(1);

  const services = [
    {
      id: "web-dev",
      number: "01",
      title: "Flagship Web Architecture",
      shortTitle: "Primary // Web Architecture",
      isPrimary: true,
      icon: Code,
      accent: "#B5121B",
      tagline: "High-performance digital experiences engineered for category leadership.",
      description:
        "Our flagship discipline. We engineer custom digital platforms that combine editorial art direction with production-grade Next.js architecture. Built with TypeScript, Tailwind CSS, and hardware-accelerated motion, every interface is optimized for rapid load, intuitive conversion, and lasting brand resonance.",
      deliverables: [
        "Bespoke Web Design & Architecture",
        "Next.js, TypeScript & React Production",
        "WebGL & Three.js Interactive Experiences",
        "Kinetic Micro-Interactions & Motion",
        "Headless CMS & Scalable Content Workflows",
        "Core Web Vitals & Technical SEO Optimization",
      ],
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js", "GitHub Pages / Vercel"],
    },
    {
      id: "motion",
      number: "02",
      title: "Video Editing & Motion Content",
      shortTitle: "Motion Content",
      icon: Video,
      accent: "#F06A28",
      tagline: "Cinematic visual narratives designed to seize and hold human attention.",
      description:
        "Attention is the scarcest currency in modern commerce. We produce high-octane video edits, dynamic motion graphics, 3D kinetic typography, and multi-format reels that stop thumbs and embed your brand deeply into cultural memory.",
      deliverables: [
        "Cinematic Brand Narrative Films",
        "Kinetic 3D Typography & Motion Graphics",
        "High-Impact Commercial Reels (9:16 & 16:9)",
        "Product 3D Motion Teasers",
        "Sound Design & Audio Mastering",
        "Dynamic Campaign Video Frameworks",
      ],
      techStack: ["Premiere Pro", "After Effects", "Blender", "DaVinci Resolve", "Cinema 4D"],
    },
    {
      id: "photography",
      number: "03",
      title: "Photography & Visual Creative",
      shortTitle: "Visual Creative",
      icon: Camera,
      accent: "#D41924",
      tagline: "High-contrast editorial art direction and commanding visual aesthetics.",
      description:
        "Every world-class brand requires an unmistakable visual signature. We orchestrate comprehensive art direction, commercial photography, editorial styling, and meticulous color grading that elevates products into coveted luxury artifacts.",
      deliverables: [
        "Editorial Brand Art Direction",
        "Commercial Product Photography",
        "Lifestyle & Architectural Stills",
        "Bespoke Visual Style Guidelines",
        "High-End Retouching & Color Grading",
        "Multi-Platform Campaign Visual Assets",
      ],
      techStack: ["Sony Alpha 7R V", "Profoto Lighting", "Capture One Pro", "Photoshop"],
    },
    {
      id: "ai-solutions",
      number: "04",
      title: "AI-Powered Digital Solutions",
      shortTitle: "AI Systems",
      icon: Sparkles,
      accent: "#F06A28",
      tagline: "Autonomous intelligence pipelines and generative systems for scale.",
      description:
        "We engineer bespoke AI agents, generative visual systems, and automated studio workflows. From custom LLM architectures to generative design tooling, we empower ambitious brands to operate with 10x creative leverage.",
      deliverables: [
        "Custom Agentic AI Workflows",
        "Generative Visual & Asset Pipelines",
        "Intelligent Brand Knowledge Systems",
        "Dynamic Content Personalization",
        "Automated Creative Asset Distribution",
        "Conversational Digital Concierge Solutions",
      ],
      techStack: ["Gemini API", "OpenAI / Claude", "Python", "LangChain", "Vector DBs"],
    },
  ];

  const currentService = services[activeTab];

  return (
    <section id="services" className="relative py-32 px-6 sm:px-8 bg-[#0B0B0B] text-white z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28]">
                SECTION C // CAPABILITIES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
              CORE DISCIPLINES.
            </h2>
          </div>
          <div className="max-w-md space-y-1.5">
            <span className="font-mono text-[10px] text-[#F06A28] uppercase tracking-widest font-semibold block">
              PRIMARY ARCHITECTURE + THREE SPECIALIZED CRAFTS
            </span>
            <p className="font-sans text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
              Engineered for founder-led companies, design-forward brands, and ambitious technology ventures.
            </p>
          </div>
        </div>

        {/* Service Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeTab === index;
            return (
              <motion.button
                key={service.id}
                onClick={() => {
                  playTabSwitch();
                  setActiveTab(index);
                }}
                onMouseEnter={playHover}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={`p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${isActive
                  ? "bg-[#161616] border-white/20 shadow-[0_0_30px_rgba(181,18,27,0.25)]"
                  : "bg-[#111111]/70 border-white/5 hover:border-white/15 hover:bg-[#141414]"
                  }`}
                data-cursor-text="SELECT"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B5121B] to-[#F06A28]"
                  />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-xs font-bold tracking-widest ${isActive ? "text-[#F06A28]" : "text-neutral-400"
                          }`}
                      >
                        {service.number}
                      </span>
                      {(service as any).isPrimary && (
                        <span className="font-mono text-[9px] text-white px-2 py-0.5 rounded-full bg-[#B5121B]/40 border border-[#B5121B]/60 font-semibold uppercase">
                          PRIMARY
                        </span>
                      )}
                    </div>
                    <div
                      className={`p-2 rounded-lg ${isActive ? "bg-white/10 text-white" : "bg-white/5 text-neutral-400 group-hover:text-white"
                        } transition-colors`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="font-serif text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-1">
                    {service.shortTitle}
                  </div>
                  <div className="font-mono text-[10px] text-neutral-400 tracking-wider uppercase mb-3">
                    {service.techStack[0]} / {service.techStack[1]}
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenServiceModal(service);
                  }}
                  className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-neutral-400 group-hover:text-[#F06A28] transition-colors w-full"
                >
                  <span>EXPAND DOSSIER</span>
                  <span className="text-xs">↗</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Service Showcase - Dual Column Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Column: Deep Overview & Deliverables */}
            <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-[#121212] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs font-bold text-[#B5121B] px-3 py-1 rounded-full bg-[#B5121B]/10 border border-[#B5121B]/20 uppercase">
                    SERVICE {currentService.number}
                  </span>
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                    END-TO-END EXECUTION
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                  {currentService.title}
                </h3>

                <p className="font-mono text-sm sm:text-base text-[#F06A28] font-medium mb-6">
                  {currentService.tagline}
                </p>

                <p className="font-sans text-neutral-300 text-base sm:text-lg leading-relaxed font-light mb-10">
                  {currentService.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="mb-10">
                  <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-[0.25em] mb-4">
                    KEY DELIVERABLES & OUTCOMES
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentService.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#F06A28] shrink-0 mt-0.5" />
                        <span className="font-sans text-sm text-neutral-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons & Tech Stack Badges */}
              <div>
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {currentService.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleOpenServiceModal(currentService)}
                      onMouseEnter={playHover}
                      className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#F06A28]" />
                      <span>EXPAND DOSSIER</span>
                    </button>

                    <button
                      onClick={() => {
                        playClick();
                        if (onServiceInquire) {
                          onServiceInquire(currentService.title);
                        } else {
                          const contact = document.querySelector("#contact");
                          contact?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      onMouseEnter={playHover}
                      className="group px-6 py-3 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs tracking-widest uppercase font-semibold flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(181,18,27,0.3)]"
                      data-cursor-text="INQUIRE"
                    >
                      <span>COMMISSION SERVICE</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Interactive Experience Simulator */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#141414] border border-white/10 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  INTERACTIVE LAB // SIMULATION
                </span>
                <span className="font-mono text-[10px] text-neutral-400 uppercase">
                  ACTIVE PREVIEW
                </span>
              </div>

              {/* Dynamic Interactive Panel depending on active tab */}
              <div className="flex-1 flex flex-col justify-center items-center py-6">
                {/* 1. Web Architecture Interactive Sandbox */}
                {activeTab === 0 && (
                  <div className="w-full space-y-4">
                    <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-neutral-300">
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-neutral-400 text-[10px]">
                        <span>app/page.tsx — Next.js 14 App Router</span>
                        <span className="text-emerald-400">HARDWARE ACCELERATED</span>
                      </div>
                      <div className="text-emerald-400 font-semibold mb-1">&gt; export default function Experience()</div>
                      <div className="text-neutral-400 pl-4 mb-1">&#123; return &lt;Canvas camera=&#123;&#123; fov: 45 &#125;&#125;&gt;</div>
                      <div className="text-orange-300 pl-8 mb-1">&lt;SignboardArchitecturalMesh /&gt;</div>
                      <div className="text-red-400 pl-8 mb-1">&lt;DynamicLightingEngine color=&quot;#B5121B&quot; /&gt;</div>
                      <div className="text-neutral-400 pl-4">&#125;</div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 text-center">
                        <div className="font-mono text-xs font-bold text-emerald-400 uppercase">Edge Static</div>
                        <div className="font-mono text-[9px] text-neutral-400 uppercase mt-0.5">Pre-rendered</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 text-center">
                        <div className="font-mono text-xs font-bold text-[#F06A28] uppercase">Zero Lag</div>
                        <div className="font-mono text-[9px] text-neutral-400 uppercase mt-0.5">Native Cursor</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 text-center">
                        <div className="font-mono text-xs font-bold text-white uppercase">Optimized</div>
                        <div className="font-mono text-[9px] text-neutral-400 uppercase mt-0.5">Tree-Shaken</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Motion Content Interactive Timeline */}
                {activeTab === 1 && (
                  <div className="w-full space-y-6">
                    {/* Visual Frame Simulator */}
                    <div className="flex justify-center">
                      <div
                        className={`transition-all duration-500 rounded-xl bg-gradient-to-br from-[#B5121B]/40 to-[#F06A28]/20 border border-white/20 flex flex-col items-center justify-center p-4 relative overflow-hidden ${aspectRatio === "16:9"
                          ? "w-full h-44"
                          : aspectRatio === "9:16"
                            ? "w-36 h-56"
                            : "w-44 h-44"
                          }`}
                      >
                        <Play className="w-10 h-10 text-white/90 animate-pulse mb-2" />
                        <span className="font-mono text-xs uppercase text-white font-semibold tracking-widest">
                          {aspectRatio} REEL
                        </span>
                        <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-1/2 h-full bg-[#F06A28]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Aspect Ratio Switcher */}
                    <div className="flex items-center justify-center gap-2">
                      {(["16:9", "9:16", "1:1"] as const).map((ratio) => (
                        <button
                          key={ratio}
                          onClick={() => {
                            playClick();
                            setAspectRatio(ratio);
                          }}
                          className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${aspectRatio === ratio
                            ? "bg-[#F06A28] text-white font-bold"
                            : "bg-white/5 text-neutral-400 hover:text-white"
                            }`}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Photography Lighting Grade Studio */}
                {activeTab === 2 && (
                  <div className="w-full space-y-6">
                    <div
                      className={`w-full h-48 rounded-xl border border-white/20 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-700 ${colorGrade === "cinematic"
                        ? "bg-gradient-to-tr from-[#1a0808] via-[#2d120a] to-[#421717]"
                        : colorGrade === "editorial"
                          ? "bg-gradient-to-tr from-[#0a0a0a] via-[#1c1c1c] to-[#3a3a3a]"
                          : "bg-gradient-to-tr from-[#000000] via-[#0f0f0f] to-[#1e0a0a]"
                        }`}
                    >
                      <Camera className="w-10 h-10 text-white/80 mb-2" />
                      <span className="font-serif text-lg font-bold uppercase tracking-wider text-white">
                        {colorGrade.toUpperCase()} GRADE
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400 tracking-widest mt-1">
                        50MM F/1.2 / ISO 100 / 1/250S
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      {(["cinematic", "editorial", "noir"] as const).map((grade) => (
                        <button
                          key={grade}
                          onClick={() => {
                            playClick();
                            setColorGrade(grade);
                          }}
                          className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${colorGrade === grade
                            ? "bg-[#B5121B] text-white font-bold"
                            : "bg-white/5 text-neutral-400 hover:text-white"
                            }`}
                        >
                          {grade}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. AI Solutions Neural Network Simulator */}
                {activeTab === 3 && (
                  <div className="w-full space-y-4">
                    <div className="p-4 rounded-xl bg-black/70 border border-white/10">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2 mb-3 border-b border-white/10">
                        <span>NEURAL WORKFLOW PIPELINE</span>
                        <span className="text-emerald-400">LATENCY 14MS</span>
                      </div>

                      <div className="space-y-2">
                        {[
                          { id: 1, title: "Brand Voice Embedding", status: "Active" },
                          { id: 2, title: "Dynamic Visual Generator", status: "Ready" },
                          { id: 3, title: "Automated Content Dispatch", status: "Queued" },
                        ].map((node) => (
                          <div
                            key={node.id}
                            onClick={() => {
                              playClick();
                              setAiNodeActive(node.id);
                            }}
                            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${aiNodeActive === node.id
                              ? "bg-[#B5121B]/20 border-[#F06A28] text-white"
                              : "bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/20"
                              }`}
                          >
                            <span className="font-mono text-xs font-medium">{node.title}</span>
                            <span
                              className={`font-mono text-[10px] px-2 py-0.5 rounded ${aiNodeActive === node.id
                                ? "bg-[#F06A28] text-white"
                                : "bg-white/5 text-neutral-400"
                                }`}
                            >
                              {node.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footnote */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#F06A28]" />
                  TAILORED ARCHITECTURE
                </span>
                <span>NO PREMADE PATTERNS</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Service Detailed Dossier Popup Modal */}
      <AnimatePresence>
        {activeModalService && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={handleCloseServiceModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-10 my-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#B5121B]/20 border border-[#B5121B]/40 text-[#F06A28] font-semibold uppercase">
                      DISCIPLINE {activeModalService.number}
                    </span>
                    {activeModalService.isPrimary && (
                      <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold uppercase">
                        PRIMARY FLAGSHIP
                      </span>
                    )}
                    <span className="text-neutral-400">STUDIO CAPABILITY DOSSIER</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                    {activeModalService.title}
                  </h2>
                </div>

                <button
                  onClick={handleCloseServiceModal}
                  onMouseEnter={playHover}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tagline Callout */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 mb-8 font-mono text-sm sm:text-base text-[#F06A28] leading-relaxed">
                {activeModalService.tagline}
              </div>

              {/* Comprehensive Service Breakdown */}
              <div className="space-y-6 mb-8 text-neutral-300 text-sm sm:text-base font-sans">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#F06A28] mb-2 font-semibold">
                    01 // EXECUTIVE DISCIPLINE OVERVIEW
                  </h3>
                  <p className="leading-relaxed font-light text-neutral-300">
                    {activeModalService.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#B5121B] mb-3 font-semibold">
                    02 // VERIFIED PRODUCTION DELIVERABLES
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalService.deliverables.map((item: string) => (
                      <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-neutral-200">
                        <Check className="w-4 h-4 text-[#F06A28] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white mb-3 font-semibold">
                    03 // PRODUCTION TOOLS & ENGINE
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeModalService.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-xs text-neutral-400">
                  Ready to commission this discipline?
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCloseServiceModal}
                    onMouseEnter={playHover}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs uppercase tracking-wider text-neutral-300 transition-colors"
                  >
                    Close Dossier
                  </button>

                  <button
                    onClick={() => {
                      handleCloseServiceModal();
                      if (onServiceInquire) {
                        onServiceInquire(activeModalService.title);
                      } else {
                        const contact = document.querySelector("#contact");
                        contact?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-md"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

