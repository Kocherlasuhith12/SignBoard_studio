"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Code, CheckCircle, ShieldAlert, Cpu, Layers, Sparkles } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  conceptBadge: string;
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
}

export function SelectedWorkSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const { playHover, playClick, playReveal, playModalClose, playTabSwitch } = useSound();

  const projects: Project[] = [
    {
      id: "kinetic-runway",
      title: "KINETIC RUNWAY",
      subtitle: "3D Spatial Fashion Lookbook & Real-Time Garment Dynamics",
      conceptBadge: "STUDIO CONCEPT ARCHIVE",
      category: "web",
      categoryLabel: "WEB & MOTION ARCHITECTURE",
      year: "2025",
      overview:
        "A radical digital runway and interactive spatial lookbook exploring real-time garment physics, mouse-reactive cloth drape, and kinetic typography for high-fashion digital presentations.",
      problem:
        "Traditional luxury lookbooks are static PDF-style grids that fail to convey the physical weight, drape, movement, and tactile luxury of contemporary couture on digital devices.",
      creativeDirection:
        "Monochromatic brutalism with signature crimson (#B5121B) lighting accents, high-contrast typography, and fluid camera transitions that simulate physical runway front-row perspectives.",
      architecture:
        "Next.js 14 App Router paired with Three.js / WebGL. Custom GLSL vertex shaders compute cloth wave deformation directly on the GPU without main-thread UI jank.",
      servicesInvolved: [
        "Flagship Web Architecture",
        "Creative Motion Design",
        "Art Direction & Visual Systems",
      ],
      technologies: ["Next.js", "Three.js / WebGL", "GLSL Shaders", "GSAP ScrollTrigger", "Tailwind CSS"],
      deliverables: [
        "Interactive 3D Lookbook Engine",
        "Custom GLSL Cloth Shader Pipeline",
        "Responsive Touch Gesture Navigation",
        "Modular Component Design System",
      ],
      visualHighlights: [
        "Real-time cloth physics in WebGL browser canvas",
        "Kinetic mouse-reactive drape distortion",
        "Hardware-accelerated mobile performance & gesture tuning",
      ],
    },
    {
      id: "aura-cognitive-labs",
      title: "AURA COGNITIVE LABS",
      subtitle: "Generative Neural Intelligence & Multi-Model Research Console",
      conceptBadge: "STUDIO CONCEPT ARCHIVE",
      category: "ai",
      categoryLabel: "AI & INTERACTION INTERFACE",
      year: "2025",
      overview:
        "An executive research portal and interactive neural visualizer developed to represent autonomous agent topologies, latent reasoning vectors, and live inference streams.",
      problem:
        "Complex multi-agent AI architectures and high-dimensional latent reasoning paths are notoriously difficult to communicate to executive decision-makers and non-technical stakeholders.",
      creativeDirection:
        "Deep cosmic void minimalism, burnt orange (#F06A28) luminescent data lines, ultra-fine coordinate grids, and fluid force-directed graph physics.",
      architecture:
        "Next.js 14 client shell with Canvas 2D / WebGL acceleration for rendering multi-node graphs with zero frame drops during heavy data manipulation.",
      servicesInvolved: [
        "AI Workflow & Generative Integration",
        "Flagship Web Architecture",
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
      conceptBadge: "STUDIO CONCEPT ARCHIVE",
      category: "web",
      categoryLabel: "WEB & AUDIO ARCHITECTURE",
      year: "2024",
      overview:
        "An immersive hardware e-commerce and frequency synthesis web experience engineered for bespoke studio audio monitors, reference acoustics, and precision sound baffles.",
      problem:
        "Selling high-end acoustic equipment online is hampered by the inability of traditional flat e-commerce layouts to communicate physical frequency response and spatial soundstage.",
      creativeDirection:
        "Tactile titanium surfaces, real-time procedural oscilloscope visualizers, deep sub-bass ambient glow, and razor-sharp typographic discipline.",
      architecture:
        "Built with Web Audio API for harmonic waveform synthesis linked directly to SVG and Canvas path updates, coordinated through Framer Motion and Next.js.",
      servicesInvolved: [
        "Flagship Web Architecture",
        "Creative Motion Design",
      ],
      technologies: ["Web Audio API", "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
      deliverables: [
        "Procedural Frequency Visualizer Canvas",
        "Interactive Acoustic Baffle Configuration Tool",
        "Custom Synthesizer Audio Preview Module",
        "Bespoke Sound-Responsive UI Feedback System",
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
      conceptBadge: "STUDIO CONCEPT ARCHIVE",
      category: "creative",
      categoryLabel: "ART DIRECTION & EDITORIAL WEB",
      year: "2024",
      overview:
        "A monumental, asymmetrical editorial portfolio for an avant-garde architectural collective celebrated for brutalist structures, sculpted concrete masses, and raw spatial light.",
      problem:
        "Standard horizontal-scrolling architecture portfolios look identical and fail to convey the gravitas, concrete materiality, and shadow drama of brutalist physical structures.",
      creativeDirection:
        "Monolithic editorial layout, heavy serif headline weights balanced by immense negative space, chiaroscuro shadow contrasts, and synchronized elevation schematics.",
      architecture:
        "Static pre-rendered Next.js architecture with smooth scroll mechanics, responsive image art direction, and dynamic CSS grid layouts.",
      servicesInvolved: [
        "Art Direction & Editorial Visual System",
        "Flagship Web Architecture",
      ],
      technologies: ["Next.js", "Tailwind CSS", "GSAP ScrollTrigger", "TypeScript"],
      deliverables: [
        "Editorial Digital Monograph Architecture",
        "Interactive Architectural Elevation Blueprint Overlays",
        "Typography & Grid Design System",
        "High-Resolution Photographic Showcase Gallery",
      ],
      visualHighlights: [
        "Architectural elevation blueprint overlays",
        "Smooth multi-axis parallax depth",
        "Zero-distraction editorial minimalism",
      ],
    },
    {
      id: "velocity-motion",
      title: "VELOCITY MOTION",
      subtitle: "Aerodynamic Kinetic Study & High-Performance Visual Production",
      conceptBadge: "STUDIO CONCEPT ARCHIVE",
      category: "motion",
      categoryLabel: "MOTION CONTENT & BRAND FILM",
      year: "2024",
      overview:
        "A high-octane kinetic motion reel and dynamic typography campaign capturing aerodynamic performance, instant torque, and electric acceleration.",
      problem:
        "Automotive digital marketing frequently leans on cliché beauty shots without transmitting the tactile visceral speed, aerodynamic downforce, and telemetry precision of modern hyper-cars.",
      creativeDirection:
        "Asphalt blacks, burnt orange brake rotor glow (#F06A28), precision chronograph telemetry dials, and frame-locked kinetic typography.",
      architecture:
        "Video post-production and motion graphics created with After Effects and Blender, wrapped in an interactive Next.js scrub-wheel telemetry frame.",
      servicesInvolved: [
        "Creative Motion Design & Brand Film",
        "Art Direction & Visual Systems",
      ],
      technologies: ["After Effects", "Blender 3D", "Next.js", "Tailwind CSS", "DaVinci Resolve"],
      deliverables: [
        "Cinematic 4K Brand Film & Kinetic Teasers",
        "Interactive Telemetry Speed Dial Component",
        "Multi-Format Social Cutdowns (9:16 & 16:9)",
        "Precision Spatial Sound Design Track",
      ],
      visualHighlights: [
        "Frame-accurate video scrub mechanics",
        "Burnt orange aerodynamic telemetry vector overlay",
        "Custom kinetic typography synchronized to audio cuts",
      ],
    },
  ];

  const categories = [
    { id: "all", label: "ALL WORKS" },
    { id: "web", label: "WEB ARCHITECTURE" },
    { id: "motion", label: "MOTION CONTENT" },
    { id: "creative", label: "ART DIRECTION" },
    { id: "ai", label: "AI WORKFLOWS" },
  ];

  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  const openProjectModal = (project: Project) => {
    playReveal();
    setActiveModalProject(project);
    document.body.style.overflow = "hidden";
  };

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
      case "kinetic-runway":
        return (
          <div className="w-full h-full bg-[#0D0D0D] relative flex items-center justify-center overflow-hidden p-6 select-none">
            {/* Coordinate Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            
            {/* Ambient Lighting Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#B5121B]/30 rounded-full blur-3xl pointer-events-none" />

            {/* Wireframe Spatial Geometry */}
            <svg viewBox="0 0 320 200" className="w-full h-full relative z-10 opacity-85 group-hover:scale-105 transition-transform duration-700">
              <defs>
                <linearGradient id="krGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B5121B" />
                  <stop offset="100%" stopColor="#F06A28" />
                </linearGradient>
              </defs>
              <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" fill="none">
                <ellipse cx="160" cy="100" rx="110" ry="40" />
                <ellipse cx="160" cy="100" rx="85" ry="30" />
                <ellipse cx="160" cy="100" rx="60" ry="20" />
                <line x1="50" y1="100" x2="270" y2="100" />
                <line x1="160" y1="30" x2="160" y2="170" />
              </g>
              {/* Dynamic Mesh Curves */}
              <path
                d="M 60 120 Q 110 50 160 110 T 260 80"
                fill="none"
                stroke="url(#krGrad)"
                strokeWidth="2"
              />
              <path
                d="M 70 140 Q 130 70 170 130 T 250 100"
                fill="none"
                stroke="rgba(240, 106, 40, 0.6)"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              {/* Coordinate Crosshairs */}
              <circle cx="160" cy="110" r="4" fill="#B5121B" />
              <circle cx="170" cy="130" r="3" fill="#F06A28" />
            </svg>

            {/* Technical Metadata Stamp */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-neutral-400 z-10">
              <span>COORD: [X: 142.8 | Y: 89.4]</span>
              <span className="text-[#B5121B] font-semibold">GLSL CLOTH SIMULATION</span>
            </div>
          </div>
        );

      case "aura-cognitive-labs":
        return (
          <div className="w-full h-full bg-[#0C0B0A] relative flex items-center justify-center overflow-hidden p-6 select-none">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#F06A28]/25 rounded-full blur-3xl pointer-events-none" />

            <svg viewBox="0 0 320 200" className="w-full h-full relative z-10 opacity-85 group-hover:scale-105 transition-transform duration-700">
              <defs>
                <linearGradient id="auraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F06A28" />
                  <stop offset="100%" stopColor="#FF853E" />
                </linearGradient>
              </defs>
              {/* Force Directed Graph Edges */}
              <g stroke="rgba(240,106,40,0.3)" strokeWidth="0.8">
                <line x1="80" y1="60" x2="160" y2="100" />
                <line x1="80" y1="140" x2="160" y2="100" />
                <line x1="160" y1="100" x2="240" y2="70" />
                <line x1="160" y1="100" x2="250" y2="135" />
                <line x1="80" y1="60" x2="120" y2="40" />
                <line x1="240" y1="70" x2="280" y2="60" />
                <line x1="250" y1="135" x2="290" y2="150" />
              </g>
              {/* Nodes */}
              <circle cx="160" cy="100" r="10" fill="url(#auraGrad)" />
              <circle cx="160" cy="100" r="18" fill="none" stroke="rgba(240,106,40,0.4)" strokeDasharray="3 3" />
              <circle cx="80" cy="60" r="6" fill="#B5121B" />
              <circle cx="80" cy="140" r="6" fill="#B5121B" />
              <circle cx="240" cy="70" r="7" fill="#F06A28" />
              <circle cx="250" cy="135" r="7" fill="#F06A28" />
              <circle cx="120" cy="40" r="4" fill="rgba(255,255,255,0.6)" />
              <circle cx="280" cy="60" r="4" fill="rgba(255,255,255,0.6)" />
              <circle cx="290" cy="150" r="4" fill="rgba(255,255,255,0.6)" />
            </svg>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-neutral-400 z-10">
              <span>LATENT CLUSTERS: 10,000 NODES</span>
              <span className="text-[#F06A28] font-semibold">TENSOR TOPOLOGY GRAPH</span>
            </div>
          </div>
        );

      case "archetype-sound":
        return (
          <div className="w-full h-full bg-[#0B0D0F] relative flex items-center justify-center overflow-hidden p-6 select-none">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <svg viewBox="0 0 320 200" className="w-full h-full relative z-10 opacity-85 group-hover:scale-105 transition-transform duration-700">
              {/* Acoustic Concentric Baffle Rings */}
              <g stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none">
                <circle cx="160" cy="100" r="70" />
                <circle cx="160" cy="100" r="50" />
                <circle cx="160" cy="100" r="30" />
                <circle cx="160" cy="100" r="14" fill="#B5121B" />
              </g>
              {/* Procedural Waveform */}
              <path
                d="M 40 100 Q 70 40 100 100 T 160 100 T 220 100 T 280 100"
                fill="none"
                stroke="#EDEDED"
                strokeWidth="1.5"
              />
              <path
                d="M 40 100 Q 70 160 100 100 T 160 100 T 220 100 T 280 100"
                fill="none"
                stroke="rgba(181, 18, 27, 0.7)"
                strokeWidth="1.2"
                strokeDasharray="2 3"
              />
            </svg>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-neutral-400 z-10">
              <span>FREQUENCY: 432 Hz // -12dB</span>
              <span className="text-white font-semibold">WEB AUDIO SYNTHESIS</span>
            </div>
          </div>
        );

      case "obsidian-architects":
        return (
          <div className="w-full h-full bg-[#0A0A0A] relative flex items-center justify-center overflow-hidden p-6 select-none">
            <div className="absolute inset-0 bg-grid-pattern opacity-25" />

            <svg viewBox="0 0 320 200" className="w-full h-full relative z-10 opacity-85 group-hover:scale-105 transition-transform duration-700">
              {/* Brutalist Monolithic Isometric Prism */}
              <g stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                {/* Front face */}
                <polygon points="120,70 180,40 180,140 120,170" fill="rgba(30,30,30,0.8)" />
                {/* Top face */}
                <polygon points="120,70 180,40 230,65 170,95" fill="rgba(50,50,50,0.9)" />
                {/* Right face with dramatic chiaroscuro */}
                <polygon points="170,95 230,65 230,165 170,195" fill="rgba(15,15,15,0.95)" stroke="#B5121B" strokeWidth="1" />
              </g>
              {/* Architectural Coordinate Lines */}
              <line x1="80" y1="170" x2="260" y2="170" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
              <line x1="180" y1="20" x2="180" y2="185" stroke="rgba(240,106,40,0.4)" strokeWidth="0.8" />
            </svg>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-neutral-400 z-10">
              <span>ELEVATION: +38.4m // NORTH AXIS</span>
              <span className="text-neutral-300 font-semibold">BRUTALIST MONOLITH</span>
            </div>
          </div>
        );

      case "velocity-motion":
        return (
          <div className="w-full h-full bg-[#0A0808] relative flex items-center justify-center overflow-hidden p-6 select-none">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#F06A28]/20 rounded-full blur-3xl pointer-events-none" />

            <svg viewBox="0 0 320 200" className="w-full h-full relative z-10 opacity-85 group-hover:scale-105 transition-transform duration-700">
              <defs>
                <linearGradient id="velGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B5121B" stopOpacity="0" />
                  <stop offset="60%" stopColor="#F06A28" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                </linearGradient>
              </defs>
              {/* Aerodynamic Streamlines */}
              <path d="M 40 60 C 120 60 160 85 280 85" fill="none" stroke="url(#velGrad)" strokeWidth="2.5" />
              <path d="M 50 85 C 130 85 180 110 290 110" fill="none" stroke="url(#velGrad)" strokeWidth="3" />
              <path d="M 60 110 C 140 110 190 135 270 135" fill="none" stroke="url(#velGrad)" strokeWidth="1.8" />
              {/* Telemetry Chronograph dial */}
              <circle cx="240" cy="110" r="32" fill="none" stroke="rgba(240,106,40,0.4)" strokeWidth="1" strokeDasharray="5 3" />
              <circle cx="240" cy="110" r="4" fill="#F06A28" />
            </svg>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-neutral-400 z-10">
              <span>TELEMETRY: 0-100 KM/H 2.1S</span>
              <span className="text-[#F06A28] font-semibold">AERODYNAMIC KINETIC REEL</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-neutral-900 flex items-center justify-center font-mono text-xs text-neutral-400">
            STUDIO ARCHIVE VISUAL
          </div>
        );
    }
  };

  return (
    <section id="work" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#090909] text-white z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28]">
                SECTION D // SELECTED WORK
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
              STUDIO ARCHIVE.
            </h2>
          </div>

          <p className="font-sans text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md font-light">
            Bespoke concept works engineered by Signboard Studio to demonstrate advanced WebGL interaction, motion kinetics, and high-performance frontend architecture.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playTabSwitch();
                setSelectedFilter(cat.id);
              }}
              onMouseEnter={playHover}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedFilter === cat.id
                  ? "bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-bold shadow-md"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid: Unified 16:10 Thumbnail Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openProjectModal(project)}
                onMouseEnter={playHover}
                className="group relative flex flex-col rounded-3xl bg-[#0F0F0F] border border-white/10 hover:border-[#F06A28]/50 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_10px_30px_rgba(240,106,40,0.15)]"
                data-cursor-text="VIEW"
              >
                {/* Unified 16:10 Thumbnail Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black border-b border-white/10">
                  <ProjectVisual id={project.id} />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                    <span className="font-mono text-[9px] tracking-widest px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-orange-400 font-semibold uppercase">
                      {project.conceptBadge}
                    </span>

                    <span className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-neutral-300 border border-white/10 uppercase">
                      {project.year}
                    </span>
                  </div>

                  {/* Quick View Button */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#B5121B] group-hover:border-[#F06A28] group-hover:scale-110 transition-all duration-300 z-20">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Project Metadata */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="font-mono text-[10px] text-[#F06A28] uppercase tracking-widest mb-1.5 font-semibold">
                      {project.categoryLabel}
                    </div>

                    <h3 className="font-serif text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#F06A28] transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="font-sans text-neutral-300 text-xs sm:text-sm leading-relaxed font-light line-clamp-2">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Specification Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-10 my-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F06A28] font-semibold uppercase">
                      {activeModalProject.conceptBadge}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      {activeModalProject.year} &mdash; {activeModalProject.categoryLabel}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                    {activeModalProject.title}
                  </h2>
                  <p className="font-sans text-neutral-300 text-sm mt-1">
                    {activeModalProject.subtitle}
                  </p>
                </div>

                <button
                  onClick={closeProjectModal}
                  onMouseEnter={playHover}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Artwork Viewport (16:9 Aspect Ratio) */}
              <div className="w-full aspect-[16/9] max-h-72 rounded-2xl overflow-hidden border border-white/10 mb-8 bg-black">
                <ProjectVisual id={activeModalProject.id} />
              </div>

              {/* Honest Concept Disclaimer Notice */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 mb-8 flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-[#F06A28] shrink-0 mt-0.5" />
                <p className="font-mono text-xs text-neutral-300 leading-relaxed">
                  <strong>STUDIO SPECIFICATION NOTICE:</strong> This project is an original conceptual architecture produced by Signboard Studio to validate WebGL shader interaction, motion dynamics, and frontend systems. No client names or performance statistics are fabricated.
                </p>
              </div>

              {/* Case Study Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Column 1: Problem, Solution & Creative Direction */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#F06A28] mb-2 font-semibold">
                      01 // THE CHALLENGE
                    </h3>
                    <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
                      {activeModalProject.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#B5121B] mb-2 font-semibold">
                      02 // CREATIVE DIRECTION
                    </h3>
                    <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
                      {activeModalProject.creativeDirection}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white mb-2 font-semibold">
                      03 // SYSTEM ARCHITECTURE
                    </h3>
                    <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
                      {activeModalProject.architecture}
                    </p>
                  </div>
                </div>

                {/* Column 2: Deliverables & Tech Stack */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#F06A28] mb-3 font-semibold">
                      SERVICES APPLIED
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProject.servicesInvolved.map((serv) => (
                        <span
                          key={serv}
                          className="font-mono text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-200"
                        >
                          {serv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#B5121B] mb-3 font-semibold">
                      ENGINEERING TOOLS
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400 mb-3 font-semibold">
                      CONCRETE DELIVERABLES
                    </h3>
                    <div className="space-y-2">
                      {activeModalProject.deliverables.map((del) => (
                        <div key={del} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-200">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-xs text-neutral-400">
                  Ready to architect a project with this level of craft?
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={closeProjectModal}
                    onMouseEnter={playHover}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs uppercase tracking-wider text-neutral-300 transition-colors"
                  >
                    Close Specification
                  </button>

                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      closeProjectModal();
                      const contact = document.querySelector("#contact");
                      contact?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(181,18,27,0.4)]"
                  >
                    <span>Commission Project</span>
                    <ArrowUpRight className="w-4 h-4" />
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
