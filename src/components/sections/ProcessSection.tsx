"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Palette, Code, Rocket, CheckCircle2, ChevronRight } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const { playHover, playClick } = useSound();

  const steps = [
    {
      number: "01",
      title: "Discover",
      tagline: "Unearthing the core commercial truth and competitive positioning.",
      icon: Search,
      duration: "Week 01",
      description:
        "We immerse ourselves deeply in your business economics, market positioning, target audience psychology, and competitive gaps. We don't ask what features you want; we identify what makes your brand impossible to ignore.",
      deliverables: [
        "Brand DNA & Positioning Audit",
        "Audience Archetype Research",
        "Competitive Visual Landscape Analysis",
        "Technical Architecture Scope & KPI Matrix",
      ],
    },
    {
      number: "02",
      title: "Strategy",
      tagline: "Architecting the visual blueprint and narrative system.",
      icon: Compass,
      duration: "Week 02",
      description:
        "Before writing a line of code or designing a single frame, we formulate the holistic creative and technical roadmap. We define the typographic hierarchy, color psychology, motion language, and conversion pathways.",
      deliverables: [
        "Creative Direction & Moodboard Systems",
        "Information Architecture & User Journeys",
        "Typography & Color Matrix Definition",
        "Motion Interaction Guidelines",
      ],
    },
    {
      number: "03",
      title: "Create",
      tagline: "High-fidelity visual design, 3D explorations, and kinetic motion.",
      icon: Palette,
      duration: "Weeks 03–04",
      description:
        "We craft bespoke visual assets, high-contrast layouts, interactive prototypes, and custom motion sequences. Every design is built with editorial refinement, extreme negative space balance, and tactile responsiveness.",
      deliverables: [
        "Full-Fidelity Responsive Design Systems",
        "Interactive GSAP Motion Prototypes",
        "3D WebGL Asset & Shader Pre-visualizations",
        "Editorial Photography & Content Grading",
      ],
    },
    {
      number: "04",
      title: "Develop",
      tagline: "Production-grade Next.js engineering with surgical precision.",
      icon: Code,
      duration: "Weeks 05–06",
      description:
        "Code is sculpted directly into a production-grade Next.js, TypeScript, and Tailwind repository. We implement smooth scroll mechanics, WebGL canvases, micro-interactions, responsive breakpoints, and strict 100/100 Core Web Vitals.",
      deliverables: [
        "Semantic, Modular Next.js & React Codebase",
        "Custom GSAP & Framer Motion Interactivity",
        "Responsive Testing Across 12+ Breakpoints",
        "Core Web Vitals & Technical SEO Optimization",
      ],
    },
    {
      number: "05",
      title: "Launch",
      tagline: "Zero-downtime deployment, global CDN distribution, and continuous scale.",
      icon: Rocket,
      duration: "Week 07",
      description:
        "We coordinate flawless global deployment on edge infrastructure (Vercel / Cloudflare), configure production analytics, conduct comprehensive accessibility audits, and ensure your team is fully equipped for ongoing evolution.",
      deliverables: [
        "Global Edge CDN Deployment",
        "Lighthouse & Accessibility (WCAG) Compliance",
        "Analytics, Event Tracking & Domain Hardening",
        "Post-Launch Support & Evolution Retainer",
      ],
    },
  ];

  const current = steps[activeStep];

  return (
    <section id="process" className="relative py-32 px-6 sm:px-8 bg-[#0B0B0B] text-white z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28]">
                SECTION F // METHODOLOGY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
              OUR PROCESS.
            </h2>
          </div>
          <p className="font-mono text-neutral-400 text-xs sm:text-sm tracking-widest uppercase max-w-sm">
            FROM INITIAL INQUIRY TO GLOBAL LAUNCH. A TIME-TESTED 5-PHASE EXECUTION ENGINE.
          </p>
        </div>

        {/* Horizontal Process Stepper */}
        <div className="relative mb-14">
          {/* Connecting Track Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.number}
                  onClick={() => {
                    playClick();
                    setActiveStep(idx);
                  }}
                  onMouseEnter={playHover}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 relative group ${
                    isActive
                      ? "bg-[#161616] border-[#F06A28] shadow-[0_0_25px_rgba(240,106,40,0.3)]"
                      : "bg-[#111111] border-white/10 hover:border-white/20"
                  }`}
                  data-cursor-text="STEP"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`font-mono text-xs font-bold tracking-widest ${
                        isActive ? "text-[#F06A28]" : "text-neutral-400"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div
                      className={`p-1.5 rounded-md ${
                        isActive ? "bg-[#F06A28]/20 text-[#F06A28]" : "bg-white/5 text-neutral-400"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="font-serif text-lg font-bold uppercase tracking-tight text-white mb-0.5">
                    {step.title}
                  </div>
                  <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                    {step.duration}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Deep-Dive Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-12 rounded-3xl bg-[#121212] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Step Overview */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-[#B5121B] px-3 py-1 rounded-full bg-[#B5121B]/15 border border-[#B5121B]/30 uppercase">
                  PHASE {current.number}
                </span>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  ESTIMATED TIMELINE: {current.duration}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-3">
                {current.number} &mdash; {current.title}
              </h3>

              <p className="font-mono text-sm sm:text-base text-[#F06A28] mb-6 font-medium">
                {current.tagline}
              </p>

              <p className="font-sans text-neutral-300 text-base sm:text-lg leading-relaxed font-light mb-8">
                {current.description}
              </p>

              {/* Navigation to next step */}
              <div className="flex items-center gap-4">
                {activeStep < steps.length - 1 ? (
                  <button
                    onClick={() => {
                      playClick();
                      setActiveStep(activeStep + 1);
                    }}
                    onMouseEnter={playHover}
                    className="flex items-center gap-2 font-mono text-xs text-neutral-300 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    <span>PROCEED TO PHASE {steps[activeStep + 1].number} ({steps[activeStep + 1].title})</span>
                    <ChevronRight className="w-4 h-4 text-[#F06A28]" />
                  </button>
                ) : (
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    PROJECT DEPLOYED & CELEBRATED
                  </span>
                )}
              </div>
            </div>

            {/* Step Deliverables */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#161616] border border-white/5">
              <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-[0.25em] mb-6 flex items-center justify-between">
                <span>PHASE DELIVERABLES</span>
                <span className="text-[#F06A28] font-bold">VERIFIABLE</span>
              </h4>

              <div className="space-y-4">
                {current.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#F06A28] shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-neutral-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

