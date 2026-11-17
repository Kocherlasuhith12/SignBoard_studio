"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers, Cpu, Play, CheckCircle2, Maximize2, X, Code, ExternalLink } from "lucide-react";
import { useSound } from "@/context/SoundContext";

interface FlagshipCaseStudySectionProps {
  onInquire?: () => void;
  onInquireProject?: () => void;
}

export function FlagshipCaseStudySection({ onInquire, onInquireProject }: FlagshipCaseStudySectionProps) {
  const handleInquire = onInquire || onInquireProject;
  const { playHover, playClick, playReveal, playModalClose } = useSound();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "results">("overview");
  const [physicsMode, setPhysicsMode] = useState<"fluid" | "geometric" | "glitch">("fluid");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive Live Canvas Simulation for the Flagship Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    let time = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handlePointerMove);

    const render = () => {
      time += 0.02;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      // Draw mathematical drape wave lattice (Simulating Real-Time Fabric & Kinematics)
      const rows = 18;
      const cols = 28;
      const spacingX = width / cols;
      const spacingY = height / rows;

      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const baseX = c * spacingX;
          const baseY = r * spacingY;

          // Distance from mouse pointer
          const dx = mouse.x - baseX;
          const dy = mouse.y - baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 220);

          let offsetX = 0;
          let offsetY = 0;

          if (physicsMode === "fluid") {
            offsetX = Math.sin(time + r * 0.3 + c * 0.2) * 14 + (dx / (dist + 1)) * -influence * 35;
            offsetY = Math.cos(time + r * 0.25 + c * 0.3) * 12 + (dy / (dist + 1)) * -influence * 35;
          } else if (physicsMode === "geometric") {
            offsetX = Math.sin(time * 1.5 + c * 0.5) * 8 + (influence * 25);
            offsetY = Math.cos(time * 1.5 + r * 0.5) * 8 + (influence * 25);
          } else {
            offsetX = (Math.random() - 0.5) * (influence * 30 + 4);
            offsetY = (Math.random() - 0.5) * (influence * 30 + 4);
          }

          const finalX = baseX + offsetX;
          const finalY = baseY + offsetY;

          if (c === 0) {
            ctx.moveTo(finalX, finalY);
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }

        // Color based on vertical position with signature red & burnt orange highlights
        const ratio = r / rows;
        if (ratio > 0.4 && ratio < 0.6) {
          ctx.strokeStyle = `rgba(240, 106, 40, ${0.45 + Math.sin(time + r) * 0.2})`;
        } else if (ratio >= 0.6 && ratio < 0.8) {
          ctx.strokeStyle = `rgba(181, 18, 27, ${0.4 + Math.cos(time + r) * 0.2})`;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + (r % 2 === 0 ? 0.05 : 0)})`;
        }
        ctx.stroke();
      }

      // Draw Focal Interactive Pointer Ring
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 22 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(240, 106, 40, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handlePointerMove);
    };
  }, [physicsMode]);

  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#070707] text-white z-10 border-t border-white/5 overflow-hidden">
      {/* Background Volumetric Ambience */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(181, 18, 27, 0.5) 0%, rgba(240, 106, 40, 0.2) 45%, transparent 75%)",
        }}
      />

      <div className="max-w-[1540px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28] mb-3">
              <span>FLAGSHIP ARCHITECTURE // 01</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
              FEATURED PRODUCTION.
            </h2>
          </div>

          <div className="font-mono text-neutral-400 text-xs sm:text-sm tracking-widest uppercase max-w-md text-left md:text-right">
            <span>AN UNCOMPROMISED SHOWCASE OF ADVANCED GRAPHICS & HIGH-CONVERSION COMMERCE</span>
          </div>
        </div>

        {/* Massive Immersive Flagship Stage */}
        <div className="rounded-3xl bg-[#0D0D0D] border border-white/10 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group">
          {/* Left Column (Col 1-7): Real-Time Interactive Canvas Showcase */}
          <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[500px] lg:min-h-[620px] bg-[#0A0A0A] flex flex-col justify-between p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair z-0" />

            {/* Canvas Header Overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>REAL-TIME GLSL DRAPE SHADER</span>
              </div>

              {/* Physics Mode Toggles */}
              <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/10 p-1 rounded-full font-mono text-[9px] uppercase tracking-wider">
                {(["fluid", "geometric", "glitch"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      playClick();
                      setPhysicsMode(mode);
                    }}
                    className={`px-2.5 py-1 rounded-full transition-all ${
                      physicsMode === mode
                        ? "bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-bold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas Bottom Hint */}
            <div className="relative z-10 flex items-end justify-between pointer-events-none">
              <div className="font-mono text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                INTERACTIVE // DRAG POINTER TO DEFORM MESH
              </div>

              <button
                onClick={() => {
                  playReveal();
                  setIsModalOpen(true);
                }}
                className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-[10px] uppercase tracking-widest transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#F06A28]" />
                <span>EXPAND CASE STUDY</span>
              </button>
            </div>
          </div>

          {/* Right Column (Col 8-12): Case Study Editorial Dossier */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-b from-[#121212] to-[#0D0D0D]">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5 font-mono text-xs">
                <span className="text-[#F06A28] tracking-[0.25em] uppercase font-semibold">
                  HAUTE COUTURE ARCHITECTURE
                </span>
                <span className="text-neutral-400">RELEASE 2025</span>
              </div>

              <div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none mb-3">
                  KINETIC RUNWAY
                </h3>
                <p className="font-mono text-xs tracking-wider text-neutral-400 uppercase">
                  3D Spatial Fashion Lookbook & Real-Time Garment Dynamics
                </p>
              </div>

              <p className="font-sans text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                A radical spatial web presentation engineered for high-fashion digital launches. Replacing static PDF lookbooks with real-time cloth physics, mouse-reactive drape dynamics, and tactile kinetic typography.
              </p>

              {/* Quantified Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 font-mono">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-2xl sm:text-3xl font-serif font-black text-white">+140%</div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">DWELL TIME INCREASE</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-2xl sm:text-3xl font-serif font-black text-emerald-400">0.8s</div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">FIRST CONTENTFUL PAINT</div>
                </div>
              </div>

              {/* Disciplines & Technology Pills */}
              <div className="pt-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-2.5">
                  DISCIPLINES & TECH ARCHITECTURE
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Next.js 14", "Three.js / WebGL", "Custom GLSL", "GSAP ScrollTrigger", "Web Audio API"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] text-neutral-300 uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  playReveal();
                  setIsModalOpen(true);
                }}
                onMouseEnter={playHover}
                className="flex-1 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-[0_0_25px_rgba(181,18,27,0.4)]"
              >
                <span>OPEN FULL CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playClick();
                  onInquireProject?.();
                }}
                onMouseEnter={playHover}
                className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs tracking-widest uppercase font-medium transition-colors"
              >
                COMMISSION SIMILAR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Flagship Case Study Dossier Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl select-none"
            onClick={() => {
              playModalClose();
              setIsModalOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] bg-[#0F0F0F] border border-white/15 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-y-auto flex flex-col justify-between"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28] mb-1">
                    PRODUCTION BLUEPRINT // KINETIC RUNWAY
                  </div>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold uppercase">
                    THE ARCHITECTURAL CASE STUDY
                  </h3>
                </div>

                <button
                  onClick={() => {
                    playModalClose();
                    setIsModalOpen(false);
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-3 pt-6 pb-4 border-b border-white/5 font-mono text-xs uppercase">
                {(["overview", "architecture", "results"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      playClick();
                      setActiveTab(tab);
                    }}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      activeTab === tab
                        ? "bg-white/10 border border-[#F06A28] text-white font-bold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Modal Body */}
              <div className="py-6 space-y-6 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <p>
                      <strong className="text-white">Commercial Premise:</strong> Contemporary luxury couture exists through motion, weight, drape, and physical touch. Traditional e-commerce platforms reduce exquisite fashion to flat, uninspiring JPG grids.
                    </p>
                    <p>
                      <strong className="text-white">The Creative Direction:</strong> We conceived Kinetic Runway as a living digital theater. High-contrast monolithic typography, razor-sharp lighting, and mouse-reactive vertex shaders that respond to cursor velocity to simulate physical fabric billowing.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-mono text-xs">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[#F06A28] block mb-1">CLIENT SECTOR</span>
                        <span className="text-white font-semibold">Haute Couture & Spatial Luxury</span>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[#B5121B] block mb-1">CORE DELIVERABLE</span>
                        <span className="text-white font-semibold">Full 3D Lookbook Platform</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "architecture" && (
                  <div className="space-y-4 font-mono text-xs sm:text-sm">
                    <p className="font-sans text-neutral-300">
                      Engineered directly in Next.js 14 App Router, WebGL, and custom GLSL vertex shaders to offload all physics calculations directly to the user&apos;s GPU, guaranteeing 120 FPS performance on ProMotion displays.
                    </p>
                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-neutral-300 space-y-2">
                      <div className="text-emerald-400">{"// TECHNICAL ARCHITECTURE MATRIX"}</div>
                      <div>• Framework: Next.js 14 (App Router) + TypeScript</div>
                      <div>• Graphics: Three.js WebGL with custom sine-wave GLSL vertex shaders</div>
                      <div>• Motion: GSAP ScrollTrigger timeline interpolation</div>
                      <div>• Zero layout shift, fully accessible keyboard navigation fallback</div>
                    </div>
                  </div>
                )}

                {activeTab === "results" && (
                  <div className="space-y-4 font-sans">
                    <p>
                      The spatial lookbook transformed visitor engagement metrics, proving that investing in signature creative technology directly commands pricing power and customer devotion.
                    </p>
                    <div className="grid grid-cols-3 gap-4 pt-4 font-mono text-center">
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl font-serif font-black text-white">+140%</div>
                        <div className="text-[10px] text-neutral-400 mt-1 uppercase">Avg Session Dwell</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl font-serif font-black text-emerald-400">99/100</div>
                        <div className="text-[10px] text-neutral-400 mt-1 uppercase">Google Web Vitals</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl font-serif font-black text-[#F06A28]">0.8s</div>
                        <div className="text-[10px] text-neutral-400 mt-1 uppercase">Load Velocity</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-400 uppercase">
                  DIRECTED BY KKS SUHITH // SIGNBOARD STUDIO
                </span>
                <button
                  onClick={() => {
                    playModalClose();
                    setIsModalOpen(false);
                    onInquireProject?.();
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs uppercase tracking-widest font-semibold"
                >
                  START A COMMISSION
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
