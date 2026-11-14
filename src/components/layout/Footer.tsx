"use client";

import React from "react";
import { ArrowUp, Instagram, Github, Linkedin, Twitter } from "lucide-react";
import { SignboardLogo } from "@/components/ui/SignboardLogo";
import { useSound } from "@/context/SoundContext";

export function Footer() {
  const { playHover, playClick } = useSound();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Studio", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Selected Work", href: "#work" },
    { label: "Founder", href: "#founder" },
    { label: "Our Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kocherlakoteswarasuhithsravanbabu/",
      icon: Linkedin,
      handle: "KKS Suhith",
    },
    {
      label: "GitHub",
      href: "https://github.com/Kocherlasuhith12",
      icon: Github,
      handle: "@Kocherlasuhith12",
    },
    {
      label: "X / Twitter",
      href: "https://x.com/KksSuhith",
      icon: Twitter,
      handle: "@KksSuhith",
    },
  ];

  return (
    <footer className="relative bg-[#060606] text-white pt-24 pb-12 px-6 sm:px-8 border-t border-white/10 overflow-hidden z-10">
      {/* Background Subtle Monogram Watermark */}
      <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 pointer-events-none opacity-[0.03] select-none">
        <span className="font-serif text-[40rem] font-black leading-none text-white">S</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Identity & Compact Statement */}
          <div className="lg:col-span-6 space-y-6">
            <SignboardLogo size="lg" glow />

            <p className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed max-w-lg font-light">
              Signboard Studio is an independent founder-led creative digital studio at the intersection of artistic distinction and high-performance technology. We build digital worlds that make businesses impossible to ignore.
            </p>

            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
              <span>HYDERABAD / GLOBAL / AVAILABLE FOR NEW COMMISSIONS</span>
            </div>
          </div>

          {/* Directory Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#F06A28] font-semibold">
              INDEX // DIRECTORY
            </div>

            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onMouseEnter={playHover}
                    onClick={(e) => {
                      e.preventDefault();
                      playClick();
                      const el = document.querySelector(item.href);
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="font-mono text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Channels & Back to Top */}
          <div className="lg:col-span-3 space-y-6 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#B5121B] font-semibold mb-4">
                CHANNELS // CONNECT
              </div>

              <div className="space-y-3">
                {socialLinks.map((soc) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
                    >
                      <Icon className="w-4 h-4 text-neutral-400 group-hover:text-[#F06A28] transition-colors" />
                      <span className="font-mono text-xs tracking-wider uppercase">{soc.label}</span>
                      <span className="font-mono text-[10px] text-neutral-400 group-hover:text-neutral-400">
                        {soc.handle}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Back to Top Magnetic Trigger */}
            <button
              onClick={scrollToTop}
              onMouseEnter={playHover}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-xs font-mono tracking-widest uppercase text-neutral-300 hover:text-white transition-all w-fit group"
              data-cursor-text="TOP"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-neutral-400 font-mono text-xs tracking-wider gap-4">
          <div>
            &copy; {new Date().getFullYear()} SIGNBOARD STUDIO. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span>FOUNDER-LED DIGITAL ARTISTRY</span>
            <span className="text-neutral-400">/</span>
            <span>HYDERABAD, INDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

