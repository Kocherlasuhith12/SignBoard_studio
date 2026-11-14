"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles, Code, CheckCircle, ExternalLink, ShieldAlert, Cpu } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  conceptBadge: string;
  category: "web" | "motion" | "creative" | "ai";
  categoryLabel: string;
  year: string;
  image: string;
  overview: string;
  objective: string;
  creativeDirection: string;
  servicesInvolved: string[];
  technologies: string[];
  visualHighlights: string[];
}

export function SelectedWorkSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const { playHover, playClick, playReveal } = useSound();

  const projects: Project[] = [
    {
      id: "kinetic-runway",
      title: "KINETIC RUNWAY",
      subtitle: "Haute Couture & 3D Interactive Spatial Lookbook",
      conceptBadge: "CONCEPT WORK",
      category: "web",
      categoryLabel: "WEB & MOTION",
      year: "2025",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      overview:
        "A radical digital runway and interactive 3D spatial lookbook exploring real-time garment physics and kinetic cursor interaction for high-fashion digital presentations.",
      objective:
        "Eliminate the static friction of traditional luxury lookbooks by allowing users to interactively rotate garments, manipulate cloth simulation dynamics, and explore tactile editorial details.",
      creativeDirection:
        "High-contrast monochromatic brutalism with deep red (#B5121B) lighting accents, architectural typography, and seamless cinematic transitions.",
      servicesInvolved: [
        "Web Design & Development",
        "Video Editing & Motion Content",
        "Photography & Visual Creative",
      ],
      technologies: ["Next.js", "Three.js / WebGL", "GSAP ScrollTrigger", "Tailwind CSS", "GLSL Shaders"],
      visualHighlights: [
        "Real-time cloth physics in WebGL browser canvas",
        "Kinetic mouse-reactive drape distortion",
        "Zero-compromise 60 FPS mobile performance",
      ],
    },
    {
      id: "aura-cognitive-labs",
      title: "AURA COGNITIVE LABS",
      subtitle: "Generative Neural Intelligence & Research Interface",
      conceptBadge: "CONCEPT WORK",
      category: "ai",
      categoryLabel: "AI & WEB",
      year: "2025",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      overview:
        "An executive research portal and interactive neural node visualizer developed to represent autonomous agent topologies and multi-model latent reasoning spaces.",
      objective:
        "Translate abstract, multi-dimensional neural weights into an intuitive, visually mesmerizing graphical architecture suitable for senior executive stakeholders.",
      creativeDirection:
        "Dark sci-fi minimalism, amber-orange reactive illumination (#F06A28), ultra-fine grid structures, and fluid graph physics.",
      servicesInvolved: [
        "AI-Powered Digital Solutions",
        "Web Design & Development",
      ],
      technologies: ["Next.js", "TypeScript", "Canvas 2D / WebGL", "Gemini API", "Vector Math"],
      visualHighlights: [
        "Interactive 10,000-node particle galaxy",
        "Dynamic query cluster simulation",
        "Sub-15ms rendering latency",
      ],
    },
    {
      id: "archetype-sound",
      title: "ARCHETYPE SOUND",
      subtitle: "High-Fidelity Acoustic Systems & Audio Architecture",
      conceptBadge: "CONCEPT WORK",
      category: "web",
      categoryLabel: "WEB & AUDIO",
      year: "2024",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop",
      overview:
        "An immersive hardware e-commerce and frequency synthesis web experience for bespoke studio audio monitors and acoustic baffles.",
      objective:
        "Allow prospective listeners to visualize sound waves, resonance frequencies, and hardware driver materials before committing to bespoke acoustic engineering.",
      creativeDirection:
        "Tactile metallic surfaces, procedural audio visualizer, deep sub-bass lighting pulses, and razor-sharp typographic discipline.",
      servicesInvolved: [
        "Web Design & Development",
        "Video Editing & Motion Content",
      ],
      technologies: ["Web Audio API", "Next.js", "Framer Motion", "Three.js"],
      visualHighlights: [
        "Real-time procedural sine and frequency visualizer",
        "3D exploded acoustic cabinet view",
        "Haptic sound feedback across every click",
      ],
    },
    {
      id: "obsidian-architects",
      title: "OBSIDIAN ARCHITECTS",
      subtitle: "Monumental Spatial Design & Monolithic Concrete Portfolio",
      conceptBadge: "CONCEPT WORK",
      category: "creative",
      categoryLabel: "PHOTOGRAPHY & WEB",
      year: "2024",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      overview:
        "A monumental, asymmetrical editorial portfolio for an avant-garde architectural collective celebrated for brutalist structures and sculpted concrete masses.",
      objective:
        "Construct a digital space that embodies the physical weight, raw materiality, and contemplative shadows of brutalist architecture.",
      creativeDirection:
        "Monolithic grids, heavy typography balanced with immense negative space, chiaroscuro lighting, and fluid vertical/horizontal dual scroll.",
      servicesInvolved: [
        "Photography & Visual Creative",
        "Web Design & Development",
      ],
      technologies: ["Next.js", "Tailwind CSS", "GSAP ScrollTrigger", "Lenis Smooth Scroll"],
      visualHighlights: [
        "Architectural elevation blueprint overlays",
        "Smooth multi-axis parallax depth",
        "Zero-distraction editorial minimalism",
      ],
    },
    {
      id: "velocity-motion",
      title: "VELOCITY MOTION",
      subtitle: "Cinematic Automotive & High-Performance Visual Production",
      conceptBadge: "CONCEPT WORK",
      category: "motion",
      categoryLabel: "MOTION CONTENT",
      year: "2024",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
      overview:
        "A high-octane motion reel and kinetic typography campaign capturing the raw aerodynamic performance and electric acceleration of a modern hyper-car.",
      objective:
        "Transmit visceral speed and instant torque through rapid kinetic cuts, frame-locked typography, and precision spatial audio.",
      creativeDirection:
        "Deep asphalt blacks, burnt orange brake rotor glow (#F06A28), high-contrast motion blurs, and industrial typography.",
      servicesInvolved: [
        "Video Editing & Motion Content",
        "Creative Direction",
      ],
      technologies: ["After Effects", "Cinema 4D", "DaVinci Resolve", "Sound Synthesis"],
      visualHighlights: [
        "Dynamic speed-ramp transitions",
        "Multi-aspect ratio outputs (9:16 vertical + 16:9 cinematic)",
        "Integrated sound design & bass drops",
      ],
    },
  ];

  const filterTabs = [
    { id: "all", label: "ALL WORKS" },
    { id: "web", label: "WEB ARCHITECTURE" },
    { id: "motion", label: "MOTION CONTENT" },
    { id: "creative", label: "VISUAL CREATIVE" },
    { id: "ai", label: "AI SOLUTIONS" },
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
    playClick();
    setActiveModalProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="work" className="relative py-32 px-6 sm:px-8 bg-[#080808] text-white z-10 border-t border-white/5">
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
              PORTFOLIO ARCHIVE.
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 font-mono text-xs uppercase">
            <ShieldAlert className="w-3.5 h-3.5 text-[#F06A28]" />
            <span>AUTHENTIC DISCLOSURE: FICTIONAL WORK MARKED AS CONCEPT</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5 mb-14 pb-4 border-b border-white/10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClick();
                setSelectedFilter(tab.id);
              }}
              onMouseEnter={playHover}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                selectedFilter === tab.id
                  ? "bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-bold shadow-[0_0_20px_rgba(181,18,27,0.4)]"
                  : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
              data-cursor-text="FILTER"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => openProjectModal(project)}
                onMouseEnter={playHover}
                className="group relative flex flex-col rounded-3xl bg-[#111111] border border-white/10 hover:border-[#F06A28]/50 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                data-cursor-text="VIEW"
              >
                {/* Project Image & Visual Overlay */}
                <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-neutral-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  
                  {/* Subtle Gradient Veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-orange-400 font-semibold uppercase flex items-center gap-1.5">
                      {project.conceptBadge}
                    </span>

                    <span className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-neutral-300 border border-white/10 uppercase">
                      {project.year}
                    </span>
                  </div>

                  {/* Hover Quick Action Indicator */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#B5121B] group-hover:border-[#F06A28] group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Project Text Meta */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="font-mono text-xs text-[#F06A28] uppercase tracking-widest mb-1 font-semibold">
                      {project.categoryLabel}
                    </div>

                    <h3 className="font-serif text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#F06A28] transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="font-sans text-neutral-400 text-sm leading-relaxed font-light line-clamp-2">
                      {project.overview}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
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

      {/* Full-Screen Detailed Case Study Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#111111] border border-white/15 text-white shadow-2xl p-6 sm:p-10 my-auto"
            >
              {/* Close Button */}
              <button
                onClick={closeProjectModal}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-[#B5121B] border border-white/15 transition-all text-white z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-bold text-orange-400 px-3 py-1 rounded-full bg-[#F06A28]/15 border border-[#F06A28]/30 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {activeModalProject.conceptBadge}
                  </span>
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                    {activeModalProject.categoryLabel} / {activeModalProject.year}
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2">
                  {activeModalProject.title}
                </h2>
                <p className="font-mono text-sm sm:text-base text-neutral-300">
                  {activeModalProject.subtitle}
                </p>
              </div>

              {/* Large Image Showcase */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden mb-8 border border-white/10">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${activeModalProject.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80">
                  <span>SIGNBOARD STUDIO DESIGN SYSTEM</span>
                  <span>IMMERSIVE SHOWCASE</span>
                </div>
              </div>

              {/* Project Deep-Dive Content Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Column 1: Overview & Objectives */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#F06A28] mb-2 font-semibold">
                      01 // PROJECT OVERVIEW
                    </h3>
                    <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                      {activeModalProject.overview}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#B5121B] mb-2 font-semibold">
                      02 // OBJECTIVE & CHALLENGE
                    </h3>
                    <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                      {activeModalProject.objective}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white mb-2 font-semibold">
                      03 // CREATIVE DIRECTION
                    </h3>
                    <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                      {activeModalProject.creativeDirection}
                    </p>
                  </div>
                </div>

                {/* Column 2: Tech, Services & Visual Outcomes */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#F06A28] mb-3 font-semibold">
                      SERVICES INVOLVED
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
                      TECHNOLOGY APPLIED
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400 mb-3 font-semibold">
                      VISUAL & TECHNICAL RESULTS
                    </h3>
                    <div className="space-y-2">
                      {activeModalProject.visualHighlights.map((hl) => (
                        <div key={hl} className="flex items-center gap-2 text-sm text-neutral-200">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-xs text-neutral-400">
                  Ready to build something matching this caliber?
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={closeProjectModal}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs uppercase tracking-wider text-neutral-300 transition-colors"
                  >
                    CLOSE PREVIEW
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
                    <span>START A SIMILAR PROJECT</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

