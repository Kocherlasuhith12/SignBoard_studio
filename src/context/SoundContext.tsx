"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface SoundContextType {
  isMuted: boolean;
  toggleSound: () => void;
  unmute: () => void;
  playHover: () => void;
  playClick: () => void;
  playReveal: () => void;
  playSuccess: () => void;
  playLogoSound: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleSound: () => {},
  unmute: () => {},
  playHover: () => {},
  playClick: () => {},
  playReveal: () => {},
  playSuccess: () => {},
  playLogoSound: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const logoAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);

  // Preload audio elements
  useEffect(() => {
    if (typeof window === "undefined") return;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

    try {
      logoAudioRef.current = new Audio(`${basePath}/audio/logo-chime.wav`);
      logoAudioRef.current.volume = 1.0;
      logoAudioRef.current.preload = "auto";

      clickAudioRef.current = new Audio(`${basePath}/audio/click.wav`);
      clickAudioRef.current.volume = 0.85;
      clickAudioRef.current.preload = "auto";

      hoverAudioRef.current = new Audio(`${basePath}/audio/hover.wav`);
      hoverAudioRef.current.volume = 0.55;
      hoverAudioRef.current.preload = "auto";
    } catch {
      // Audio preload error ignored
    }
  }, []);

  // Initialize Web Audio Context on demand with resume handling
  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const unmute = useCallback(() => {
    setIsMuted(false);
    getAudioContext();
  }, [getAudioContext]);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      getAudioContext();
      setTimeout(() => playSuccessTone(), 50);
    }
  };

  const playHover = useCallback(() => {
    if (isMuted) return;
    try {
      if (hoverAudioRef.current) {
        hoverAudioRef.current.currentTime = 0;
        hoverAudioRef.current.play().catch(() => {});
      }

      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio error ignored
    }
  }, [isMuted, getAudioContext]);

  const playClick = useCallback(() => {
    if (isMuted) return;
    try {
      if (clickAudioRef.current) {
        clickAudioRef.current.currentTime = 0;
        clickAudioRef.current.play().catch(() => {});
      }

      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(280, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio error ignored
    }
  }, [isMuted, getAudioContext]);

  const playReveal = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio error ignored
    }
  }, [isMuted, getAudioContext]);

  const playSuccessTone = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      [330, 440, 660].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.2);
      });
    } catch {
      // Audio error ignored
    }
  }, [getAudioContext]);

  const playSuccess = useCallback(() => {
    if (isMuted) return;
    playSuccessTone();
  }, [isMuted, playSuccessTone]);

  // Signature Signboard Studio Emblem Resonance Audio
  const playLogoSound = useCallback(() => {
    try {
      // 1. Play synthesized WAV chime (instant across all browsers)
      if (logoAudioRef.current) {
        logoAudioRef.current.currentTime = 0;
        logoAudioRef.current.play().catch(() => {});
      }

      // 2. Play Web Audio synth chords
      const ctx = getAudioContext();
      if (!ctx) return;

      const triggerSynth = () => {
        const now = ctx.currentTime;

        // Sub-bass physical signboard mounting strike
        const strikeOsc = ctx.createOscillator();
        const strikeGain = ctx.createGain();
        strikeOsc.type = "sine";
        strikeOsc.frequency.setValueAtTime(160, now);
        strikeOsc.frequency.exponentialRampToValueAtTime(52, now + 0.15);

        strikeGain.gain.setValueAtTime(0.18, now);
        strikeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

        strikeOsc.connect(strikeGain);
        strikeGain.connect(ctx.destination);
        strikeOsc.start(now);
        strikeOsc.stop(now + 0.18);

        // Harmonic Chimes [A3, E4, A4, C#5, E5, A5]
        const notes = [220, 329.6, 440, 554.4, 659.2, 880];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          const startTime = now + idx * 0.02;
          const duration = 0.65 + idx * 0.05;

          osc.frequency.setValueAtTime(freq, startTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.008, startTime + duration);

          const volume = 0.1 / (idx * 0.5 + 1);
          gain.gain.setValueAtTime(0.0001, startTime);
          gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.00001, startTime + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + duration);
        });
      };

      if (ctx.state === "suspended") {
        ctx.resume().then(triggerSynth).catch(() => {});
      } else {
        triggerSynth();
      }
    } catch {
      // Audio error ignored
    }
  }, [getAudioContext]);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleSound,
        unmute,
        playHover,
        playClick,
        playReveal,
        playSuccess,
        playLogoSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
