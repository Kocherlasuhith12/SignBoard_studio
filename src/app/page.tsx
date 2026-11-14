"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandIntroduction } from "@/components/sections/BrandIntroduction";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { IntroSequence } from "@/components/intro/IntroSequence";

export default function Home() {
  const [showCinematicMode, setShowCinematicMode] = useState(false);

  const handleExplore = () => {
    setShowCinematicMode(false);
    const target = document.querySelector("#about");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartProject = () => {
    setShowCinematicMode(false);
    const target = document.querySelector("#contact");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#EDEDED] overflow-x-hidden">
      {/* Full-Screen Cinematic Opening Experience (Triggered on demand or replayable) */}
      {showCinematicMode && (
        <IntroSequence
          onComplete={() => setShowCinematicMode(false)}
          onExplore={handleExplore}
          onStartProject={handleStartProject}
        />
      )}

      {/* Main Website Structure - Renders Immediately With Full Richness */}
      <Navbar onStartProjectClick={handleStartProject} />

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

      <Footer />
    </div>
  );
}
