"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "@/context/SoundContext";

interface SignboardLogoProps {
  className?: string;
  variant?: "full" | "monogram" | "wordmark" | "lockup";
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  animated?: boolean;
  glow?: boolean;
  interactiveSound?: boolean;
}

export function SignboardMonogram({
  className = "w-12 h-12",
  glow = false,
  animated = false,
  interactiveSound = true,
}: {
  className?: string;
  glow?: boolean;
  animated?: boolean;
  interactiveSound?: boolean;
}) {
  const { playLogoSound } = useSound();
  const [isSwinging, setIsSwinging] = useState(false);

  const triggerLogoTouch = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (interactiveSound) {
      playLogoSound();
      setIsSwinging(true);
      setTimeout(() => setIsSwinging(false), 900);
    }
  };

  return (
    <motion.div
      onClick={triggerLogoTouch}
      onTouchStart={triggerLogoTouch}
      onMouseEnter={() => {
        if (!isSwinging) {
          triggerLogoTouch();
        }
      }}
      className={`relative inline-flex items-center justify-center group cursor-pointer select-none ${className}`}
      animate={
        isSwinging
          ? {
              rotate: [0, -9, 8, -5, 3, -1, 0],
              scale: [1, 1.07, 0.98, 1],
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
      whileHover={{
        rotate: [0, -4, 4, -2, 0],
        transition: { duration: 0.8, ease: "easeInOut" },
      }}
      whileTap={{ scale: 0.94 }}
      style={{ transformOrigin: "top center" }}
      title="Touch Signboard Emblem for acoustic chime"
      data-cursor-text="CHIME"
    >
      {/* Visual Acoustic Ripple Shockwaves when touched */}
      {isSwinging && (
        <>
          <motion.div
            initial={{ scale: 0.7, opacity: 0.95 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-[#F06A28] pointer-events-none shadow-[0_0_20px_#F06A28]"
          />
          <motion.div
            initial={{ scale: 0.85, opacity: 0.8 }}
            animate={{ scale: 3.0, opacity: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-[#B5121B] pointer-events-none shadow-[0_0_25px_#B5121B]"
          />
          <motion.div
            initial={{ scale: 1.0, opacity: 0.6 }}
            animate={{ scale: 3.8, opacity: 0 }}
            transition={{ duration: 1.3, delay: 0.2, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-orange-400/40 pointer-events-none"
          />
        </>
      )}

      {/* Ambient Red/Orange Volumetric Glow */}
      {(glow || isSwinging) && (
        <motion.div
          animate={isSwinging ? { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] } : undefined}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 rounded-xl blur-xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle, rgba(181,18,27,0.85) 0%, rgba(240,106,40,0.5) 45%, transparent 70%)",
          }}
        />
      )}

      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 overflow-visible drop-shadow-[0_4px_16px_rgba(181,18,27,0.4)]"
      >
        <defs>
          <linearGradient id="sbRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9161F" />
            <stop offset="100%" stopColor="#9C0E15" />
          </linearGradient>
          <linearGradient id="sbOrangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F06A28" />
            <stop offset="100%" stopColor="#FF853E" />
          </linearGradient>
          <filter id="sbEmblemGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. TOP HANGING SIGNBOARD MOUNTING BRACKET */}
        {/* Horizontal Bracket Bar */}
        <motion.rect
          x="18"
          y="18"
          width="84"
          height="5.5"
          rx="1"
          fill="url(#sbRedGrad)"
          initial={animated ? { scaleX: 0 } : undefined}
          animate={animated ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        />

        {/* Left Suspension Hanging Peg */}
        <motion.rect
          x="30"
          y="23.5"
          width="5"
          height="8.5"
          fill="url(#sbRedGrad)"
          initial={animated ? { scaleY: 0 } : undefined}
          animate={animated ? { scaleY: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.2 }}
        />

        {/* Right Suspension Hanging Peg */}
        <motion.rect
          x="85"
          y="23.5"
          width="5"
          height="8.5"
          fill="url(#sbRedGrad)"
          initial={animated ? { scaleY: 0 } : undefined}
          animate={animated ? { scaleY: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.2 }}
        />

        {/* 2. THE ARCHITECTURAL GEOMETRIC 'S' SIGNBOARD */}
        {/* Top Horizontal Section of S with Downward Right Step */}
        <motion.path
          d="M 26 32 H 94 V 58 H 78 V 46 H 42 V 46 L 26 46 Z"
          fill="url(#sbRedGrad)"
          initial={animated ? { opacity: 0, y: -6 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* Central Diagonal Slanted Beam of the 'S' (with architectural beveled ends) */}
        <motion.path
          d="M 38 46 L 82 72 L 72 84 L 28 58 Z"
          fill="url(#sbRedGrad)"
          initial={animated ? { scale: 0.8, opacity: 0 } : undefined}
          animate={animated ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.7, delay: 0.4 }}
        />

        {/* Bottom Horizontal Section of S with Upward Left Step */}
        <motion.path
          d="M 26 74 H 42 V 86 H 78 V 98 H 26 V 74 Z"
          fill="url(#sbRedGrad)"
          initial={animated ? { opacity: 0, y: 6 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* 3. BURNT ORANGE HORIZONTAL ACCENT BARS */}
        {/* Upper Orange Accent Bar (in the top-right negative space) */}
        <motion.rect
          x="54"
          y="46"
          width="26"
          height="4.5"
          rx="1"
          fill="url(#sbOrangeGrad)"
          initial={animated ? { scaleX: 0, opacity: 0 } : undefined}
          animate={animated ? { scaleX: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="shadow-[0_0_10px_#F06A28]"
        />

        {/* Lower Orange Accent Bar (in the bottom-left negative space) */}
        <motion.rect
          x="40"
          y="79"
          width="26"
          height="4.5"
          rx="1"
          fill="url(#sbOrangeGrad)"
          initial={animated ? { scaleX: 0, opacity: 0 } : undefined}
          animate={animated ? { scaleX: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="shadow-[0_0_10px_#F06A28]"
        />
      </svg>
    </motion.div>
  );
}

export function SignboardLogo({
  className = "",
  variant = "full",
  size = "md",
  animated = false,
  glow = false,
  interactiveSound = true,
}: SignboardLogoProps) {
  const { playLogoSound } = useSound();
  const sizeMap = {
    sm: {
      monogram: "w-8 h-8",
      text: "text-base tracking-[0.22em]",
      sub: "text-[7.5px] tracking-[0.35em]",
    },
    md: {
      monogram: "w-10 h-10",
      text: "text-xl tracking-[0.25em]",
      sub: "text-[9px] tracking-[0.4em]",
    },
    lg: {
      monogram: "w-14 h-14",
      text: "text-2xl sm:text-3xl tracking-[0.28em]",
      sub: "text-[10px] tracking-[0.45em]",
    },
    xl: {
      monogram: "w-20 h-20",
      text: "text-3xl sm:text-4xl tracking-[0.3em]",
      sub: "text-xs tracking-[0.5em]",
    },
    hero: {
      monogram: "w-28 h-28 sm:w-36 sm:h-36",
      text: "text-4xl sm:text-6xl tracking-[0.35em]",
      sub: "text-xs sm:text-sm tracking-[0.55em]",
    },
  };

  const currentSize = sizeMap[size];

  if (variant === "monogram") {
    return (
      <SignboardMonogram
        className={`${currentSize.monogram} ${className}`}
        glow={glow}
        animated={animated}
        interactiveSound={interactiveSound}
      />
    );
  }

  const handleContainerTouch = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (interactiveSound) {
      playLogoSound();
    }
  };

  return (
    <div
      onClick={handleContainerTouch}
      className={`inline-flex items-center gap-3.5 select-none cursor-pointer group ${className}`}
      title="Touch Signboard Emblem for acoustic chime"
      data-cursor-text="RING"
    >
      {variant !== "wordmark" && (
        <SignboardMonogram
          className={currentSize.monogram}
          glow={glow}
          animated={animated}
          interactiveSound={interactiveSound}
        />
      )}

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-2">
          {/* Serif Typographic Wordmark Matching Brand Image 2 */}
          <span className={`font-serif font-black text-white ${currentSize.text} uppercase tracking-[0.28em] group-hover:text-[#F06A28] transition-colors duration-300`}>
            SIGNBOARD
          </span>
        </div>
        <span className={`font-mono text-neutral-400 font-semibold uppercase mt-0.5 ${currentSize.sub}`}>
          CREATIVE DIGITAL STUDIO
        </span>
      </div>
    </div>
  );
}
