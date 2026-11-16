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
import { CinematicParticleIntro } from "@/components/intro/CinematicParticleIntro";

export default function Home() {
  const [introDismissed, setIntroDismissed] = useState<boolean>(false);

  const handleExplore = () => {
    setIntroDismissed(true);
    const target = document.querySelector("#about");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartProject = () => {
    setIntroDismissed(true);
    const target = document.querySelector("#contact");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#EDEDED] overflow-x-hidden">
      {/* Full-Screen Cinematic Opening Particle Experience: Shows when window opens, slowly disappears as you scroll down */}
      {!introDismissed && (
        <CinematicParticleIntro onComplete={() => setIntroDismissed(true)} />
      )}

      {/* Main Website Structure - 100% Present and Accessible to Search Engines and Screen Readers */}
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
