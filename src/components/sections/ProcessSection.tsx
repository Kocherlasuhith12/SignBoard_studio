"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Palette, Code, Rocket, CheckCircle2, ChevronRight, X, Maximize2, ArrowRight } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const { playHover, playClick, playTabSwitch } = useSound();

  const steps = [
    {
      number: "01",
      title: "DISCOVER",
      duration: "WEEK 01",
      tagline: "Unearthing the core commercial moat and competitive positioning.",
      icon: Search,
      overview:
        "We immerse deeply in your business economics, market positioning, target audience psychology, and competitive gaps. We don't ask what features you want; we identify what makes your brand impossible to ignore.",
      deliverables: [
        "Brand DNA & Commercial Moat Audit",
        "Audience Archetype & Conversion Mapping",
        "Competitive Visual Landscape Matrix",
        "Technical Architecture Scope & KPI Benchmarks",
      ],
      blueprintSpec: "INPUT // BUSINESS ECONOMICS & COMPETITIVE TRUTH",
    },
    {
      number: "02",
      title: "STRATEGY",
      duration: "WEEK 02",
      tagline: "Architecting the visual blueprint and narrative system.",
      icon: Compass,
      overview:
        "Before writing a line of code or designing a single frame, we formulate the holistic creative and technical roadmap. We define the typographic hierarchy, color space, motion language, and conversion pathways.",
      deliverables: [
        "Creative Direction & Chiaroscuro Guidelines",
        "Information Architecture & User Journeys",
        "Typography & Color Matrix Definition",
        "Motion Interaction & Physics Specifications",
      ],
      blueprintSpec: "BLUEPRINT // NARRATIVE FRAMEWORK & INTERACTION RULES",
    },
    {
      number: "03",
      title: "DESIGN",
      duration: "WEEKS 03–04",
      tagline: "High-fidelity spatial design, 3D explorations, and kinetic motion.",
      icon: Palette,
      overview:
        "We craft bespoke visual assets, high-contrast layouts, interactive prototypes, and custom motion sequences. Every design is built with editorial refinement, extreme negative space balance, and tactile responsiveness.",
      deliverables: [
        "Full-Fidelity Responsive Design Systems",
        "Interactive GSAP Motion Prototypes",
        "3D WebGL Asset & Shader Pre-visualizations",
        "Editorial Photography & Content Grading",
      ],
      blueprintSpec: "AESTHETICS // BESPOKE TYPOGRAPHY & SPATIAL HIERARCHY",
    },
    {
      number: "04",
      title: "ENGINEER",
      duration: "WEEKS 05–06",
      tagline: "Production-grade Next.js engineering with surgical precision.",
      icon: Code,
      overview:
        "Code is sculpted directly into a production-grade Next.js, TypeScript, and Tailwind repository. We implement smooth scroll mechanics, WebGL canvases, micro-interactions, responsive breakpoints, and rigorous Core Web Vitals optimization.",
      deliverables: [
        "Semantic Next.js 14 App Router Codebase",
        "Custom GSAP & WebGL Particle Interactivity",
        "Hardware-Accelerated Web Audio API Engine",
        "100/100 Core Web Vitals Optimization",
      ],
      blueprintSpec: "COMPILATION // TYPE-SAFE ARCHITECTURE & SHADER LOGIC",
    },
    {
      number: "05",
      title: "LAUNCH",
      duration: "WEEK 07",
      tagline: "Zero-downtime deployment, global CDN distribution, and continuous scale.",
      icon: Rocket,
      overview:
        "We conduct rigorous cross-browser testing across 12+ device viewports, stress-test rendering loops, audit accessibility, and deploy to ultra-fast global edge CDNs for instantaneous international load times.",
      deliverables: [
        "Global Edge CDN Static Distribution",
        "DNS, SSL & Automated Deployment Pipelines",
        "Search Console & Structured Metadata Indexing",
        "Post-Launch Performance Monitoring & Warranty",
      ],
      blueprintSpec: "DEPLOYMENT // GLOBAL EDGE CDN & PERFECTION AUDIT",
    },
  ];

  const currentStep = steps[activeStep];

  return (
    <section id="process" className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#070707] text-white z-10 border-t border-white/5">
      <div className="max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28] mb-3">
              <span>WORKFLOW // SECTION 05</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
              STUDIO PROCESS.
            </h2>
          </div>

          <div className="font-mono text-neutral-400 text-xs sm:text-sm tracking-widest uppercase max-w-md text-left md:text-right">
            <span>DISCOVER → STRATEGY → DESIGN → ENGINEER → LAUNCH</span>
          </div>
        </div>

        {/* 5-Phase Linear Visual Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-12">
          {steps.map((st, i) => (
            <button
              key={st.number}
              onClick={() => {
                playTabSwitch();
                setActiveStep(i);
              }}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all ${
                activeStep === i
                  ? "bg-[#141414] border-white/30 text-white shadow-[0_0_25px_rgba(0,0,0,0.8)]"
                  : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white hover:border-white/15"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-[#F06A28] font-bold mb-1">
                <span>{st.number}</span>
                <span className="text-neutral-500 text-[9px]">{st.duration}</span>
              </div>
              <div className="font-serif text-base sm:text-lg font-bold uppercase tracking-tight text-white">
                {st.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Phase Architectural Stage */}
        <div className="rounded-3xl bg-[#0D0D0D] border border-white/10 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (Col 1-7): Detailed Process Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[#F06A28] uppercase font-bold tracking-widest">
                PHASE {currentStep.number} {"//"} {currentStep.duration}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400 uppercase tracking-wider">{currentStep.blueprintSpec}</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
              {currentStep.title}
            </h3>

            <p className="font-mono text-sm text-[#F06A28] uppercase tracking-wider">
              {currentStep.tagline}
            </p>

            <p className="font-sans text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
              {currentStep.overview}
            </p>

            {/* Deliverables Checklist */}
            <div className="pt-4 border-t border-white/5 space-y-2.5">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">
                PHASE DELIVERABLES
              </div>
              {currentStep.deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-mono text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#F06A28] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Col 8-12): Architectural Blueprint Card */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[#080808] border border-white/10 space-y-5 font-mono text-xs relative select-none">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest">SPECIFICATION BLUEPRINT</span>
              <span className="text-[#F06A28] text-[10px] font-bold">100% RIGOR</span>
            </div>

            <div className="space-y-3 font-mono text-xs text-neutral-300">
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-neutral-500">PHASE CODE</span>
                <span className="text-white font-bold">{currentStep.number}_ALPHA</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-neutral-500">EXPECTED TIMELINE</span>
                <span className="text-[#F06A28] font-bold">{currentStep.duration}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-neutral-500">EXECUTION LEAD</span>
                <span className="text-white">KKS Suhith (Direct)</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-neutral-500">CLIENT VISIBILITY</span>
                <span className="text-emerald-400">Weekly Real-Time Demos</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-neutral-400 leading-relaxed font-sans">
              Every phase is executed with total transparency. Clients receive direct access to staging repositories, live Figma canvases, and weekly video walkthroughs.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
