"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandIntroduction } from "@/components/sections/BrandIntroduction";
import { FlagshipCaseStudySection } from "@/components/sections/FlagshipCaseStudySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { CinematicParticleIntro } from "@/components/intro/CinematicParticleIntro";

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. WebGL Graceful Fallback Detection
    const hasWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (c.getContext("webgl2") || c.getContext("webgl"))
        );
      } catch {
        return false;
      }
    })();

    if (!hasWebGL) {
      return;
    }

    // 2. Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // 3. Play once per browser session by default
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
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    setShowIntro(true);
  }, []);

  const handleExplore = () => {
    handleIntroComplete();
    const target = document.querySelector("#about");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartProject = () => {
    handleIntroComplete();
    const target = document.querySelector("#contact");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#EDEDED] overflow-x-hidden">
      {/* Full-Screen GPU Cinematic Particle Opening Experience (Three.js + WebGL + GSAP) */}
      {showIntro && (
        <CinematicParticleIntro onComplete={handleIntroComplete} />
      )}

      {/* Main Website Structure - 100% Preserved & Immediately Accessible to Search Engines and Screen Readers */}
      <Navbar onStartProjectClick={handleStartProject} />

      <HeroSection
        onExploreClick={handleExplore}
        onStartProjectClick={handleStartProject}
      />

      <BrandIntroduction />

      <FlagshipCaseStudySection onInquire={handleStartProject} />

      <SelectedWorkSection />

      <ServicesSection onServiceInquire={handleStartProject} />

      <FounderSection onDirectConnect={handleStartProject} />

      <ProcessSection />

      <ContactSection />

      <Footer onReplayIntro={handleReplayIntro} />
    </div>
  );
}
