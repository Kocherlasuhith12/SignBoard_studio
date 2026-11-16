"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Eye, Cpu, Flame, CheckCircle2, X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useSound } from "@/context/SoundContext";

interface ManifestoPoint {
  num: string;
  title: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  deepDive: string;
  strategicAdvantage: string;
  technicalStandard: string;
  deliverables: string[];
}

export function BrandIntroduction() {
  const [activeModalTenet, setActiveModalTenet] = useState<ManifestoPoint | null>(null);
  const { playHover, playClick, playReveal } = useSound();

  const manifestoPoints: ManifestoPoint[] = [
    {
      num: "01",
      title: "ARCHITECTURAL DISTINCTION",
      tag: "100% BESPOKE",
      icon: Compass,
      desc: "Zero cookie-cutter components or off-the-shelf themes. We sculpt bespoke visual systems engineered exclusively around your brand's unique commercial moat.",
      deepDive:
        "In a market inundated by identical pre-made templates and cookie-cutter frameworks, standard websites dilute brand value. We approach every digital surface as high-architecture: unique layout proportions, custom typography pairings, tailored color spaces, and bespoke spatial hierarchy.",
      strategicAdvantage:
        "Establishes immediate pricing power and authority. When prospective clients land on an experience that cannot be mistaken for any other company, your perceived value instantly rises above competitors.",
      technicalStandard:
        "Hand-sculpted Tailwind utility hierarchies, bespoke SVG geometry, modular component design tokens, and zero dependency on bloated third-party template marketplaces.",
      deliverables: [
        "Proprietary Digital Design System",
        "Custom Visual Geometry & Coordinates",
        "Responsive Breakpoint Choreography",
        "Zero-Bloat Production Component Library",
      ],
    },
    {
      num: "02",
      title: "KINETIC STORYTELLING",
      tag: "IMMERSIVE MOTION",
      icon: Flame,
      desc: "Motion is not decoration; it is punctuation. We employ GSAP motion design and fluid interaction to captivate attention and guide subconscious decision making.",
      deepDive:
        "Human attention responds dynamically to acceleration, physics, and weight. We choreograph interaction mechanics—from inertial scroll dampening to subtle hover gravity—ensuring that every movement feels grounded in physical reality rather than artificial gimmicks.",
      strategicAdvantage:
        "Dramatically increases on-site dwell time, decreases bounce rates, and directs user attention directly toward primary conversion funnels with effortless visual rhythm.",
      technicalStandard:
        "Hardware-accelerated CSS transforms and GSAP ScrollTrigger timelines tuned for 60Hz/120Hz displays, with strict respect for prefers-reduced-motion accessibility standards.",
      deliverables: [
        "Inertial Scroll Choreography",
        "Physics-Based Micro-Interactions",
        "Kinetic Typography Sequences",
        "Full Reduced-Motion Accessibility Layer",
      ],
    },
    {
      num: "03",
      title: "INTELLIGENT TECHNOLOGY",
      tag: "NEXT.JS & AI",
      icon: Cpu,
      desc: "High-performance Next.js architectures, WebGL environments, and AI-enabled workflows that load instantaneously and dominate search visibility.",
      deepDive:
        "True luxury is instant responsiveness. We combine modern Next.js static pre-rendering, modern asset compression, and edge caching with intelligent automation pipelines that transform how digital products scale.",
      strategicAdvantage:
        "Frictionless user flow: pages render instantaneously with zero cumulative layout shifts. High technical SEO health ensures superior search indexing and organic visibility.",
      technicalStandard:
        "Next.js App Router, TypeScript type safety, static export capability for edge CDNs, and custom generative AI workflows via modern LLM APIs.",
      deliverables: [
        "Production Next.js & React Repository",
        "Global Edge CDN Distribution",
        "Automated Content & Asset Pipelines",
        "Rigorous Core Web Vitals Optimization",
      ],
    },
    {
      num: "04",
      title: "RADICAL VISIBILITY",
      tag: "COMMAND ATTENTION",
      icon: Eye,
      desc: "In an ocean of generic digital commodities, our mission is simple: to make your business completely impossible to scroll past, forget, or ignore.",
      deepDive:
        "Attention is the scarcest currency in modern commerce. Being polite, generic, or safe is the fastest path to commercial obscurity. Signboard Studio crafts bold, unapologetic digital statements that turn casual browsers into devoted brand evangelists.",
      strategicAdvantage:
        "Instant brand recall. When stakeholders review three vendors, your memorable, cinematic presentation remains front-of-mind when investment decisions are finalized.",
      technicalStandard:
        "High-contrast editorial typography (Cormorant Garamond + Plus Jakarta Sans + JetBrains Mono), cinematic film-grain textures, and deep lighting atmospheres.",
      deliverables: [
        "Signature Editorial Brand Positioning",
        "Unmistakable Visual Identity Lockup",
        "High-Contrast Cinematic Web Presentation",
        "Comprehensive Brand Recall Strategy",
      ],
    },
  ];

  const handleOpenTenet = (point: ManifestoPoint) => {
    playReveal();
    setActiveModalTenet(point);
    document.body.style.overflow = "hidden";
  };

  const handleCloseTenet = () => {
    playClick();
    setActiveModalTenet(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#090909] text-white z-10 overflow-hidden">
      {/* Background radial gradient */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(181,18,27,0.7) 0%, rgba(240,106,40,0.4) 50%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8 pb-10 border-b border-white/10">
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
            <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              Signboard Studio is an independent founder-led creative digital studio. We engineer visual identities, high-impact web architectures, and cinematic motion content for companies determined to lead their category.
            </p>
          </div>
        </div>

        {/* Big Editorial Manifesto Statement */}
        <div className="mb-20 sm:mb-24 p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#121212] via-[#0E0E0E] to-[#140809] border border-white/10 relative overflow-hidden group">
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

        {/* 4 Interactive Tenet Cards — Click to Pop Detail Modal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {manifestoPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => handleOpenTenet(point)}
                onMouseEnter={playHover}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-8 sm:p-10 rounded-3xl bg-[#0F0F0F] hover:bg-[#141414] border border-white/10 hover:border-[#F06A28]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl"
                data-cursor-text="EXPAND"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-sm text-[#B5121B] font-bold tracking-widest">
                      {point.num}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 group-hover:border-[#F06A28]/40 group-hover:text-white transition-colors">
                      {point.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:bg-[#B5121B]/15 group-hover:border-[#B5121B]/40 transition-colors">
                      <Icon className="w-6 h-6 text-neutral-200 group-hover:text-[#F06A28] transition-colors" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#F06A28] transition-colors">
                      {point.title}
                    </h3>
                  </div>

                  <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                    {point.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-neutral-400 group-hover:text-[#F06A28] font-mono text-xs transition-colors">
                  <span className="font-semibold">VIEW FULL SPECIFICATION</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tenet Popup Modal with Complete Matter */}
      <AnimatePresence>
        {activeModalTenet && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={handleCloseTenet}
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
                      TENET {activeModalTenet.num} &mdash; {activeModalTenet.tag}
                    </span>
                    <span className="text-neutral-400">SIGNBOARD ETHOS SPECIFICATION</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                    {activeModalTenet.title}
                  </h2>
                </div>

                <button
                  onClick={handleCloseTenet}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Core Summary Callout */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 mb-8 font-serif text-lg sm:text-xl text-neutral-200 italic leading-relaxed">
                &ldquo;{activeModalTenet.desc}&rdquo;
              </div>

              {/* Detailed Specification Sections */}
              <div className="space-y-6 mb-8 text-neutral-300 text-sm sm:text-base font-sans">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#F06A28] mb-2 font-semibold">
                    01 // PHILOSOPHY & DEEP DIVE
                  </h3>
                  <p className="leading-relaxed font-light text-neutral-300">
                    {activeModalTenet.deepDive}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#B5121B] mb-2 font-semibold">
                    02 // STRATEGIC CLIENT ADVANTAGE
                  </h3>
                  <p className="leading-relaxed font-light text-neutral-300">
                    {activeModalTenet.strategicAdvantage}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white mb-2 font-semibold">
                    03 // PRODUCTION ENGINEERING STANDARD
                  </h3>
                  <p className="leading-relaxed font-light text-neutral-300">
                    {activeModalTenet.technicalStandard}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400 mb-3 font-semibold">
                    04 // TANGIBLE STUDIO DELIVERABLES
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans">
                    {activeModalTenet.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-xs text-neutral-400">
                  Ready to apply this standard to your brand?
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCloseTenet}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs uppercase tracking-wider text-neutral-300 transition-colors"
                  >
                    Close
                  </button>

                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCloseTenet();
                      const contact = document.querySelector("#contact");
                      contact?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-md"
                  >
                    <span>Commission Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
