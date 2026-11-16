"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandIntroduction } from "@/components/sections/BrandIntroduction";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { CinematicParticleIntro } from "@/components/intro/CinematicParticleIntro";

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(false);

  // Check session storage and prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Run intro once per browser session by default
    const hasViewed = sessionStorage.getItem("signboard_intro_viewed");
    if (!hasViewed) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("signboard_intro_viewed", "true");
    }
    setShowIntro(false);
  }, []);

  const handleReplayIntro = useCallback(() => {
    setShowIntro(true);
  }, []);

  const handleExplore = () => {
    setShowIntro(false);
    const target = document.querySelector("#about");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartProject = () => {
    setShowIntro(false);
    const target = document.querySelector("#contact");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#EDEDED] overflow-x-hidden">
      {/* Cinematic Interactive Particle Intro Experience (WebGL + Three.js + GSAP) */}
      {showIntro && (
        <CinematicParticleIntro
          onComplete={handleIntroComplete}
          onExplore={handleExplore}
          onStartProject={handleStartProject}
        />
      )}

      {/* Main Website Structure - Rendered in DOM Immediately for SEO and Instant Accessibility */}
      <Navbar
        onStartProjectClick={handleStartProject}
        onReplayIntro={handleReplayIntro}
      />

      <HeroSection
        onExploreClick={handleExplore}
        onStartProjectClick={handleStartProject}
      />

      <BrandIntroduction />

      <ServicesSection onServiceInquire={handleStartProject} />

      <SelectedWorkSection />

      <FounderSection onDirectConnect={handleStartProject} />

      <ProcessSection />

      <ContactSection />

      <Footer onReplayIntro={handleReplayIntro} />
    </div>
  );
}
