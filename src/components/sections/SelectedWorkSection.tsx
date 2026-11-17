"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Code, CheckCircle, ShieldAlert, Cpu, Layers, Sparkles, Filter, Terminal, Compass, Eye, ExternalLink } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  classification: "real" | "concept";
  badgeText: string;
  category: "web" | "motion" | "creative" | "ai";
  categoryLabel: string;
  year: string;
  overview: string;
  problem: string;
  creativeDirection: string;
  architecture: string;
  servicesInvolved: string[];
  technologies: string[];
  deliverables: string[];
  visualHighlights: string[];
  liveUrl?: string;
}

export function SelectedWorkSection() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "real" | "concept">("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const { playHover, playClick, playReveal, playModalClose, playTabSwitch } = useSound();

  const projects: Project[] = [
    // 1. REAL PRODUCTIONS & LIVE ARCHITECTURE
    {
      id: "signboard-platform",
      title: "SIGNBOARD STUDIO PLATFORM",
      subtitle: "Full-Stack Creative Tech Atelier & GPU WebGL Kinematics Engine",
      classification: "real",
      badgeText: "PRODUCTION // LIVE SYSTEM",
      category: "web",
      categoryLabel: "FLAGSHIP DIGITAL PLATFORM",
      year: "2025",
      overview:
        "The living digital flagship for Signboard Studio. Engineered as an uncompromised showcase of GPU WebGL particle kinematics, zero-latency Web Audio API synthesis, and production Next.js 14 edge architecture.",
      problem:
        "Most digital studio websites rely on off-the-shelf templates, bloated libraries, and heavy third-party video loops that cripple mobile performance and load times.",
      creativeDirection:
        "Void obsidian minimalism, signature crimson (#B5121B) and burnt solar orange (#F06A28) luminescent accents, editorial Cormorant Garamond headings, and surgical JetBrains Mono telemetry.",
      architecture:
        "Next.js 14 App Router, Three.js custom GLSL shader particle engine, typed Float32Array coordinate buffers, Web Audio API pre-decoded memory caching, and Tailwind CSS tokens.",
      servicesInvolved: [
        "Flagship Web Architecture",
        "Creative Motion Design",
        "Custom GLSL Shaders",
        "Acoustic Audio Engineering",
      ],
      technologies: ["Next.js 14", "TypeScript", "Three.js", "Web Audio API", "GSAP", "Tailwind CSS"],
      deliverables: [
        "12,000-Particle WebGL Morph Engine",
        "Hardware-Accelerated 0ms Audio Engine",
        "Static Export Pipeline for GitHub Pages",
        "Bespoke Responsive Layout Choreography",
      ],
      visualHighlights: [
        "Real-time particle convergence into architectural emblem",
        "Interactive 432Hz acoustic harmonic chime feedback",
        "100/100 Core Web Vitals across mobile and desktop",
      ],
      liveUrl: "https://kocherlasuhith12.github.io/SignBoard_studio/",
    },
    {
      id: "suhith-identity",
      title: "SUHITH EXECUTIVE IDENTITY",
      subtitle: "Founder-Led Personal Brand Architecture & Digital System",
      classification: "real",
      badgeText: "COMMISSION // LIVE IDENTITY",
      category: "creative",
      categoryLabel: "BRAND & EXECUTIVE PORTFOLIO",
      year: "2024",
      overview:
        "A comprehensive digital brand architecture and interactive portfolio system designed for founder and creative director KKS Suhith, unifying software engineering rigor with cinematic art direction.",
      problem:
        "Founder profiles are typically fragmented across disparate social networks, lacking an authoritative centralized digital system that demonstrates multi-disciplinary mastery.",
      creativeDirection:
        "High-contrast editorial typography, deep monochrome with fiery crimson accents, verified credentials dossier, and direct executive commission dispatch.",
      architecture:
        "Next.js App Router, modular React components, FormSubmit encrypted email routing, and hardware-accelerated video reels.",
      servicesInvolved: [
        "Art Direction & Editorial Systems",
        "Full-Stack Web Engineering",
        "Brand Strategy & Positioning",
      ],
      technologies: ["Next.js", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
      deliverables: [
        "Executive Identity System",
        "Verified Credentials Dossier",
        "Direct Client Commission Gateway",
        "Responsive Mobile Architecture",
      ],
      visualHighlights: [
        "Editorial portrait composition with cinematic lighting",
        "Direct verified contact routing with spam protection",
        "Seamless section navigation and tactile feedback",
      ],
    },

    // 2. STUDIO R&D CONCEPTS & EXPERIMENTAL PROTOTYPES
    {
      id: "aura-cognitive-labs",
      title: "AURA COGNITIVE LABS",
      subtitle: "Generative Neural Intelligence & Multi-Model Research Console",
      classification: "concept",
      badgeText: "STUDIO R&D // CONCEPT PROTOTYPE",
      category: "ai",
      categoryLabel: "AI & INTERACTION INTERFACE",
      year: "2025",
      overview:
        "An experimental research portal and interactive neural visualizer designed to represent autonomous agent topologies, latent reasoning vectors, and live inference streams.",
      problem:
        "Complex multi-agent AI architectures and high-dimensional latent reasoning paths are notoriously difficult to communicate to executive decision-makers.",
      creativeDirection:
        "Deep cosmic void minimalism, burnt orange (#F06A28) luminescent data lines, ultra-fine coordinate grids, and fluid force-directed graph physics.",
      architecture:
        "Next.js 14 client shell with Canvas 2D / WebGL acceleration for rendering multi-node graphs with zero frame drops during heavy data manipulation.",
      servicesInvolved: [
        "AI Workflow & Generative Integration",
        "Flagship Web Architecture",
        "Data Visualization UI",
      ],
      technologies: ["Next.js", "TypeScript", "Canvas 2D / WebGL", "Gemini API", "Vector Math"],
      deliverables: [
        "Interactive 10,000-Node Neural Topology Canvas",
        "Dynamic Query Cluster Simulation",
        "Executive Strategy Dashboard",
        "Live Latent Vector Visualizer",
      ],
      visualHighlights: [
        "Force-directed mathematical particle graph",
        "Interactive node cluster expansion and inspection",
        "Sub-16ms smooth render loop across all breakpoints",
      ],
    },
    {
      id: "archetype-sound",
      title: "ARCHETYPE SOUND",
      subtitle: "High-Fidelity Acoustic Systems & Waveform Synthesis Experience",
      classification: "concept",
      badgeText: "STUDIO R&D // CONCEPT PROTOTYPE",
      category: "web",
      categoryLabel: "WEB & AUDIO ARCHITECTURE",
      year: "2024",
      overview:
        "An immersive hardware e-commerce and frequency synthesis web experience engineered for bespoke studio audio monitors, reference acoustics, and precision sound baffles.",
      problem:
        "Selling high-end acoustic equipment online is hampered by the inability of traditional flat e-commerce layouts to communicate physical frequency response.",
      creativeDirection:
        "Tactile titanium surfaces, real-time procedural oscilloscope visualizers, deep sub-bass ambient glow, and razor-sharp typographic discipline.",
      architecture:
        "Built with Web Audio API for harmonic waveform synthesis linked directly to SVG and Canvas path updates, coordinated through Framer Motion and Next.js.",
      servicesInvolved: [
        "Flagship Web Architecture",
        "Creative Motion Design",
        "Synthesizer Interface Design",
      ],
      technologies: ["Web Audio API", "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
      deliverables: [
        "Procedural Frequency Visualizer Canvas",
        "Interactive Acoustic Baffle Configuration Tool",
        "Custom Synthesizer Audio Preview Module",
        "Sound-Responsive UI Feedback System",
      ],
      visualHighlights: [
        "Real-time procedural sine and frequency visualizer",
        "3D exploded acoustic cabinet view",
        "Audio feedback synchronized with micro-interactions",
      ],
    },
    {
      id: "obsidian-architects",
      title: "OBSIDIAN ARCHITECTS",
      subtitle: "Monumental Spatial Design & Monolithic Concrete Portfolio",
      classification: "concept",
      badgeText: "STUDIO R&D // CONCEPT PROTOTYPE",
      category: "creative",
      categoryLabel: "ART DIRECTION & EDITORIAL WEB",
      year: "2024",
      overview:
        "A monumental brutalist digital presentation for an avant-garde architectural firm, celebrating raw monolithic textures, geometric shadows, and structural silence.",
      problem:
        "Standard architectural portfolios rely on cluttered gallery sliders that undermine the solemnity, scale, and material gravitas of monumental structures.",
      creativeDirection:
        "Architectural coordinate grids, high-contrast chiaroscuro photography, asymmetric column spans, and heavy typographic presence.",
      architecture:
        "SSR Next.js layout with optimized image pipelines, custom scroll triggers, and fluid CSS grid composition.",
      servicesInvolved: [
        "Art Direction & Editorial Systems",
        "Bespoke Web Design",
        "Architectural Layout Curation",
      ],
      technologies: ["Next.js", "Tailwind CSS", "GSAP ScrollTrigger", "Framer Motion"],
      deliverables: [
        "Monolithic Architecture Archive",
        "Precision Dimension Blueprint Viewer",
        "Material Texture Sample Inspector",
        "Editorial Typography Master Hierarchy",
      ],
      visualHighlights: [
        "Chiaroscuro shadow gradients mimicking sunlight on raw concrete",
        "Architectural blueprint grid coordinates",
        "Asymmetrical column typography layout",
      ],
    },
    {
      id: "titan-horology",
      title: "TITAN PRECISION TIMEPIECES",
      subtitle: "Micro-Mechanical Horology & Kinetic Chronograph Engineering",
      classification: "concept",
      badgeText: "STUDIO R&D // CONCEPT PROTOTYPE",
      category: "motion",
      categoryLabel: "MOTION CONTENT & 3D KINETICS",
      year: "2024",
      overview:
        "A luxury chronograph digital launch experience highlighting microscopic tourbillon escapements, gear-train mechanics, and kinetic countdown typography.",
      problem:
        "Horological craftsmanship requires tactile appreciation of microscopic gearing, jewels, and escapement movements that static photography fails to capture.",
      creativeDirection:
        "Deep brushed anthracite metal, fiery crimson indicator needles, laser-etched scale rings, and synchronous mechanical ticking physics.",
      architecture:
        "Interactive Canvas 2D rotating gear train synchronized with high-precision timestamp loops and physics-based momentum damping.",
      servicesInvolved: [
        "Creative Motion Design",
        "3D Kinetic Typography",
        "Interactive Hardware Simulation",
      ],
      technologies: ["Canvas 2D", "Next.js", "TypeScript", "GSAP Timeline", "Tailwind CSS"],
      deliverables: [
        "Interactive Caliber Gear-Train Canvas",
        "High-Precision Chronometer Stopwatch Module",
        "Exploded Micro-Mechanical Component Viewer",
        "Tactile Haptic-Style Click Audio Feedback",
      ],
      visualHighlights: [
        "Live procedural rotating concentric gear wheels",
        "Micro-metric scale typography and dial markings",
        "Mechanical tactile audio clicks on interaction",
      ],
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === "all") return true;
    return p.classification === selectedFilter;
  });

  const closeProjectModal = () => {
    playModalClose();
    setActiveModalProject(null);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset";
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModalProject) {
        closeProjectModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModalProject]);

  // Bespoke Project Visual Artwork Component
  const ProjectVisual = ({ id }: { id: string }) => {
    switch (id) {
      case "signboard-platform":
        return (
          <div className="w-full h-full bg-[#0A0A0A] relative flex items-center justify-center overflow-hidden p-6 select-none">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B5121B] to-[#F06A28] flex items-center justify-center shadow-[0_0_35px_rgba(181,18,27,0.5)] mb-3">
                <span className="font-serif font-black text-white text-4xl">S</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-400 tracking-[0.3em] uppercase">
                WEBGL KINEMATICS ENGINE
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-neutral-500">
              <span>12,000 PARTICLES</span>
              <span className="text-emerald-400">0MS LATENCY</span>
            </div>
          </div>
        );

      case "suhith-identity":
        return (
          <div className="w-full h-full bg-[#0D0D0D] relative flex items-center justify-center overflow-hidden p-6 select-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/suhith.jpg)` }}
            />
            <div className="relative z-20 text-center">
              <span className="font-serif text-2xl font-bold uppercase tracking-tight text-white block">
                KKS SUHITH
              </span>
              <span className="font-mono text-[10px] text-[#F06A28] uppercase tracking-widest font-semibold mt-1 block">
                CREATIVE DIRECTION
              </span>
            </div>
          </div>
        );

      case "aura-cognitive-labs":
        return (
          <div className="w-full h-full bg-[#080808] relative flex items-center justify-center overflow-hidden p-6 select-none">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            {/* Procedural Neural Orbit */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-[#F06A28]/40 flex items-center justify-center animate-spin" style={{ animationDuration: "25s" }}>
                <div className="w-20 h-20 rounded-full border border-[#B5121B]/60 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#F06A28] shadow-[0_0_15px_#F06A28]" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-neutral-500">
              <span>LATENT VECTOR 1536-D</span>
              <span className="text-[#F06A28]">AUTONOMOUS AGENTS</span>
            </div>
          </div>
        );

      case "archetype-sound":
        return (
          <div className="w-full h-full bg-[#0A0A0A] relative flex items-center justify-center overflow-hidden p-6 select-none">
            <div className="relative z-10 w-full max-w-[200px] flex items-end justify-center gap-1.5 h-20">
              {[35, 65, 95, 45, 80, 100, 60, 30, 75, 40, 90, 50, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-[#B5121B] to-[#F06A28] rounded-full"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-neutral-500">
              <span>FREQUENCY 432 HZ</span>
              <span>WEB AUDIO API</span>
            </div>
          </div>
        );

      case "obsidian-architects":
        return (
          <div className="w-full h-full bg-[#0C0C0C] relative flex items-center justify-center overflow-hidden p-6 select-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 border border-white/20 rotate-45 flex items-center justify-center">
                <div className="w-24 h-24 border border-[#B5121B]/40" />
              </div>
            </div>
            <div className="relative z-10 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-300">
              MONUMENTAL SCALE
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-neutral-500">
              <span>BRUTALIST ARCHIVE</span>
              <span>GRID COORD 04</span>
            </div>
          </div>
        );

      case "titan-horology":
        return (
          <div className="w-full h-full bg-[#080808] relative flex items-center justify-center overflow-hidden p-6 select-none">
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border-2 border-white/15 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-dashed border-[#F06A28]/60 flex items-center justify-center">
                  <div className="w-1 h-10 bg-[#B5121B] rounded-full origin-bottom rotate-45" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-neutral-500">
              <span>CALIBER 01 / TOURBILLON</span>
              <span className="text-white">CHRONOMETER</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-500 font-mono text-xs">
            CONCEPT
          </div>
        );
    }
  };

  return (
    <section id="work" className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#070707] text-white z-10 border-t border-white/5">
      <div className="max-w-[1540px] mx-auto">
        {/* Section Header & Architectural Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28] mb-3">
              <span>PORTFOLIO // SECTION 02</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
              SELECTED WORK.
            </h2>
          </div>

          {/* Classification Filter Tabs: All, Real Implementations, Studio Concepts */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider">
            <button
              onClick={() => {
                playTabSwitch();
                setSelectedFilter("all");
              }}
              className={`px-4 py-2 rounded-full border transition-all ${
                selectedFilter === "all"
                  ? "bg-white text-black font-bold border-white"
                  : "bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              ALL WORKS ({projects.length})
            </button>

            <button
              onClick={() => {
                playTabSwitch();
                setSelectedFilter("real");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                selectedFilter === "real"
                  ? "bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/50"
                  : "bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>LIVE PRODUCTIONS (2)</span>
            </button>

            <button
              onClick={() => {
                playTabSwitch();
                setSelectedFilter("concept");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                selectedFilter === "concept"
                  ? "bg-[#F06A28]/20 text-orange-300 font-bold border-[#F06A28]/50"
                  : "bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F06A28]" />
              <span>STUDIO R&D CONCEPTS (4)</span>
            </button>
          </div>
        </div>

        {/* Asymmetrical Editorial Portfolio Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {filteredProjects.map((project, idx) => {
            // Asymmetrical layout calculation: alternate between wide spans (col-span-7 / col-span-5)
            const isWide = idx % 3 === 0;
            const spanClass = isWide ? "md:col-span-7" : idx % 3 === 1 ? "md:col-span-5" : "md:col-span-12 lg:col-span-6";

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => {
                  playReveal();
                  setActiveModalProject(project);
                }}
                className={`${spanClass} group cursor-pointer flex flex-col justify-between p-7 sm:p-9 rounded-3xl bg-[#0D0D0D] border border-white/10 hover:border-white/25 transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,0,0,0.8)]`}
              >
                <div>
                  {/* Top Metadata Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5 font-mono text-[11px] mb-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider text-[10px] ${
                        project.classification === "real"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-[#F06A28]/10 text-[#F06A28] border border-[#F06A28]/20"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${project.classification === "real" ? "bg-emerald-400" : "bg-[#F06A28]"}`} />
                      {project.badgeText}
                    </span>

                    <span className="text-neutral-500 tracking-widest">{project.year}</span>
                  </div>

                  {/* Artwork Showcase Box */}
                  <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-white/10 relative">
                    <ProjectVisual id={project.id} />
                  </div>

                  {/* Typographic Title & Overview */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-[#F06A28] transition-colors mb-2 flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h3>

                  <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-4">
                    {project.subtitle}
                  </p>

                  <p className="font-sans text-neutral-300 text-sm font-light leading-relaxed line-clamp-3">
                    {project.overview}
                  </p>
                </div>

                {/* Footer Tech Stack Pills */}
                <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/5 font-mono text-[10px] text-neutral-400 uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 font-mono text-[10px] text-neutral-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Case Study Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] bg-[#0E0E0E] border border-white/15 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-y-auto flex flex-col justify-between"
            >
              <div>
                {/* Modal Header */}
                <div className="flex items-start justify-between pb-6 border-b border-white/10 gap-4">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-semibold uppercase tracking-wider mb-2 ${
                        activeModalProject.classification === "real"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-[#F06A28]/10 text-[#F06A28] border border-[#F06A28]/20"
                      }`}
                    >
                      {activeModalProject.badgeText}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                      {activeModalProject.title}
                    </h3>
                    <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mt-1">
                      {activeModalProject.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={closeProjectModal}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Classification Explicit Notice */}
                {activeModalProject.classification === "concept" ? (
                  <div className="my-5 p-3.5 rounded-xl bg-orange-950/40 border border-orange-500/30 text-orange-200 font-mono text-xs flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#F06A28] shrink-0" />
                    <span>
                      STUDIO R&D EXPLORATION: This project represents an internal architectural prototype exploring speculative digital interactions, not a client commission.
                    </span>
                  </div>
                ) : (
                  <div className="my-5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 font-mono text-xs flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      PRODUCTION DEPLOYMENT: Verified live digital architecture engineered by Signboard Studio.
                    </span>
                  </div>
                )}

                {/* Modal Visual Area */}
                <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 mb-8">
                  <ProjectVisual id={activeModalProject.id} />
                </div>

                {/* Detailed Sections */}
                <div className="space-y-6 font-sans text-neutral-300 text-sm sm:text-base leading-relaxed">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-2 font-semibold">
                      THE COMMERCIAL PROBLEM
                    </h4>
                    <p className="font-light">{activeModalProject.problem}</p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#F06A28] mb-2 font-semibold">
                      CREATIVE DIRECTION & ARCHITECTURE
                    </h4>
                    <p className="font-light">{activeModalProject.creativeDirection}</p>
                    <p className="font-mono text-xs text-neutral-400 bg-white/[0.02] p-4 rounded-xl border border-white/5 mt-3">
                      {activeModalProject.architecture}
                    </p>
                  </div>

                  {/* Deliverables & Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5 font-mono text-xs">
                    <div>
                      <h4 className="text-white uppercase tracking-wider mb-2">KEY DELIVERABLES</h4>
                      <ul className="space-y-1.5 text-neutral-400">
                        {activeModalProject.deliverables.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#F06A28]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-white uppercase tracking-wider mb-2">TECH ARCHITECTURE</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeModalProject.technologies.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded bg-white/[0.04] text-neutral-300 border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-500 uppercase">
                  ARCHIVE ENTRY // {activeModalProject.year}
                </span>

                {activeModalProject.liveUrl ? (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs uppercase tracking-widest font-semibold"
                  >
                    <span>OPEN LIVE PLATFORM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={closeProjectModal}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-widest font-medium"
                  >
                    CLOSE DOSSIER
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
