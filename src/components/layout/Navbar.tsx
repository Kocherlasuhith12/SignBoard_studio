"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { SignboardLogo } from "@/components/ui/SignboardLogo";
import { useSound } from "@/context/SoundContext";

export function Navbar({ onStartProjectClick }: { onStartProjectClick?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const { playHover, playClick } = useSound();

  // Studio live clock (IST - Indian Standard Time UTC+5:30)
  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "STUDIO", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "WORK", href: "#work" },
    { label: "FOUNDER", href: "#founder" },
    { label: "PROCESS", href: "#process" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3.5 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/5 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo with magnetic hover effect */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            onMouseEnter={playHover}
            className="group flex items-center cursor-pointer"
            data-cursor-text="STUDIO"
          >
            <SignboardLogo size={isScrolled ? "sm" : "md"} animated />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-[0.2em] uppercase text-neutral-400">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                onMouseEnter={playHover}
                className="relative py-1 hover:text-white transition-colors duration-200 group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#B5121B] to-[#F06A28] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Area: Time, Sound & Action CTA */}
          <div className="hidden sm:flex items-center gap-5">
            {/* Live Studio Ticker */}
            <div className="hidden xl:flex items-center gap-2 font-mono text-[11px] text-neutral-400 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-full">
              <span>HYDERABAD {mounted && currentTime ? currentTime : "05:00:00"} IST</span>
            </div>

            {/* Start Project CTA */}
            <button
              onClick={() => {
                playClick();
                if (onStartProjectClick) {
                  onStartProjectClick();
                } else {
                  handleNavClick("#contact");
                }
              }}
              onMouseEnter={playHover}
              className="group relative px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs tracking-widest uppercase font-semibold flex items-center gap-2 overflow-hidden shadow-[0_0_20px_rgba(181,18,27,0.4)] hover:shadow-[0_0_30px_rgba(240,106,40,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
              data-cursor-text="START"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2.5 rounded-full bg-white/10 border border-white/15 text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#070707]/98 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-10 px-8 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="font-mono text-xs text-[#F06A28] tracking-[0.3em] uppercase">
                INDEX / DIRECTORY
              </span>
              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="font-serif text-3xl sm:text-4xl text-neutral-200 hover:text-white uppercase flex items-center justify-between group py-2 border-b border-white/5"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-[#F06A28] transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                  if (onStartProjectClick) {
                    onStartProjectClick();
                  } else {
                    handleNavClick("#contact");
                  }
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-sm tracking-widest uppercase font-semibold text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>START A PROJECT</span>
              </button>

              <div className="flex items-center justify-between text-neutral-400 font-mono text-xs">
                <span>HYDERABAD IST {currentTime}</span>
                <span>@signboard_studio</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

