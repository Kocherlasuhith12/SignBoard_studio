"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Palette, Code, Rocket, CheckCircle2, ChevronRight, X, Maximize2, ArrowRight } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeModalStep, setActiveModalStep] = useState<any | null>(null);
  const { playHover, playClick, playReveal, playModalClose, playTabSwitch } = useSound();

  const handleOpenStepModal = (st: any) => {
    playReveal();
    setActiveModalStep(st);
    document.body.style.overflow = "hidden";
  };

  const handleCloseStepModal = () => {
    playModalClose();
    setActiveModalStep(null);
    document.body.style.overflow = "unset";
  };

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
        "Code is sculpted directly into a production-grade Next.js, TypeScript, and Tailwind repository. We implement smooth scroll mechanics, WebGL canvases, micro-interactions, responsive breakpoints, and rigorous Core Web Vitals optimization.",
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
        "We coordinate flawless global deployment on modern edge infrastructure, configure production analytics, conduct comprehensive accessibility audits, and ensure your team is fully equipped for ongoing evolution.",
      deliverables: [
        "Global Edge CDN Deployment",
        "WCAG 2.1 AA Accessibility & Performance Audits",
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
                <motion.button
                  key={step.number}
                  onClick={() => {
                    playTabSwitch();
                    setActiveStep(idx);
                  }}
                  onMouseEnter={playHover}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 relative group flex flex-col justify-between ${isActive
                    ? "bg-[#161616] border-[#F06A28] shadow-[0_0_25px_rgba(240,106,40,0.3)]"
                    : "bg-[#111111] border-white/10 hover:border-white/20"
                    }`}
                  data-cursor-text="STEP"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`font-mono text-xs font-bold tracking-widest ${isActive ? "text-[#F06A28]" : "text-neutral-400"
                          }`}
                      >
                        {step.number}
                      </span>
                      <div
                        className={`p-1.5 rounded-md ${isActive ? "bg-[#F06A28]/20 text-[#F06A28]" : "bg-white/5 text-neutral-400"
                          }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="font-serif text-lg font-bold uppercase tracking-tight text-white mb-0.5">
                      {step.title}
                    </div>
                    <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider mb-2">
                      {step.duration}
                    </div>
                  </div>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenStepModal(step);
                    }}
                    className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-neutral-400 group-hover:text-[#F06A28] transition-colors w-full"
                  >
                    <span>EXPAND</span>
                    <span className="text-xs">↗</span>
                  </div>
                </motion.button>
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

              {/* Action and Navigation buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleOpenStepModal(current)}
                  onMouseEnter={playHover}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#F06A28]" />
                  <span>VIEW FULL PHASE BLUEPRINT</span>
                </button>

                {activeStep < steps.length - 1 ? (
                  <button
                    onClick={() => {
                      playTabSwitch();
                      setActiveStep(activeStep + 1);
                    }}
                    onMouseEnter={playHover}
                    className="flex items-center gap-2 font-mono text-xs text-neutral-300 hover:text-white uppercase tracking-widest transition-colors py-2.5"
                  >
                    <span>PROCEED TO PHASE {steps[activeStep + 1].number} ({steps[activeStep + 1].title})</span>
                    <ChevronRight className="w-4 h-4 text-[#F06A28]" />
                  </button>
                ) : (
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest flex items-center gap-2 py-2.5">
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
                {current.deliverables.map((item: string) => (
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

      {/* Pop Blueprint Modal for Process Step */}
      <AnimatePresence>
        {activeModalStep && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={handleCloseStepModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-10 my-8 shadow-2xl max-h-[90vh] overflow-y-auto text-white"
            >
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#B5121B]/20 border border-[#B5121B]/40 text-[#F06A28] font-bold">
                      PHASE {activeModalStep.number} BLUEPRINT
                    </span>
                    <span className="text-neutral-400">
                      {activeModalStep.duration}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                    {activeModalStep.title} &mdash; METHODOLOGY
                  </h2>
                </div>

                <button
                  onClick={handleCloseStepModal}
                  onMouseEnter={playHover}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tagline Callout */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 mb-8 font-mono text-sm sm:text-base text-[#F06A28] leading-relaxed">
                {activeModalStep.tagline}
              </div>

              {/* Modal Content Sections */}
              <div className="space-y-6 mb-8 text-neutral-300 text-sm sm:text-base font-sans">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#F06A28] mb-2 font-semibold">
                    01 // EXECUTIVE DISCIPLINE OVERVIEW
                  </h3>
                  <p className="leading-relaxed font-light text-neutral-300">
                    {activeModalStep.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#B5121B] mb-3 font-semibold">
                    02 // VERIFIABLE PRODUCTION DELIVERABLES
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalStep.deliverables.map((item: string) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-neutral-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#F06A28] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-xs text-neutral-400">
                  Ready to initiate this phase?
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCloseStepModal}
                    onMouseEnter={playHover}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs uppercase tracking-wider text-neutral-300 transition-colors"
                  >
                    Close Blueprint
                  </button>

                  <button
                    onClick={() => {
                      handleCloseStepModal();
                      const contact = document.querySelector("#contact");
                      contact?.scrollIntoView({ behavior: "smooth" });
                    }}
                    onMouseEnter={playHover}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-md"
                  >
                    <span>Initiate Project</span>
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

