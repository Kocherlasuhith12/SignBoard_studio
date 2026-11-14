"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "action" | "text">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("[data-cursor], a, button, input, textarea, [role='button']");
      if (interactive) {
        const customText = interactive.getAttribute("data-cursor-text");
        const customVariant = interactive.getAttribute("data-cursor");

        if (customText) {
          setCursorText(customText);
          setCursorVariant("action");
        } else if (customVariant === "drag") {
          setCursorText("DRAG");
          setCursorVariant("action");
        } else if (customVariant === "view") {
          setCursorText("VIEW");
          setCursorVariant("action");
        } else {
          setCursorText("");
          setCursorVariant("hover");
        }
      } else {
        setCursorText("");
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorVariant === "action" ? 0 : 5,
          height: cursorVariant === "action" ? 0 : 5,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Outer Magnetic Ring / Action Label */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center font-mono font-bold tracking-widest text-center select-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "action" ? 84 : cursorVariant === "hover" ? 48 : 26,
          height: cursorVariant === "action" ? 84 : cursorVariant === "hover" ? 48 : 26,
          backgroundColor:
            cursorVariant === "action"
              ? "rgba(181, 18, 27, 0.9)"
              : cursorVariant === "hover"
              ? "rgba(240, 106, 40, 0.15)"
              : "rgba(255, 255, 255, 0.03)",
          borderColor:
            cursorVariant === "action"
              ? "#F06A28"
              : cursorVariant === "hover"
              ? "rgba(240, 106, 40, 0.6)"
              : "rgba(255, 255, 255, 0.25)",
          borderWidth: cursorVariant === "action" ? 1.5 : 1,
          scale: 1,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 25 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] text-white tracking-[0.2em] uppercase font-bold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

