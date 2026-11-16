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
  // Start with audio active (browsers suspend until first interaction, which getAudioContext handles)
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context on demand with resume handling
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
      audioCtxRef.current.resume();
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
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio error ignored
    }
  }, [isMuted, getAudioContext]);

  const playClick = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(240, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
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
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
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
        gain.gain.setValueAtTime(0.03, ctx.currentTime + i * 0.08);
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
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Tactile Signboard Mounting Strike (warm physical sub-bass drop)
      const strikeOsc = ctx.createOscillator();
      const strikeGain = ctx.createGain();
      strikeOsc.type = "sine";
      strikeOsc.frequency.setValueAtTime(160, now);
      strikeOsc.frequency.exponentialRampToValueAtTime(52, now + 0.14);

      strikeGain.gain.setValueAtTime(0.09, now);
      strikeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      strikeOsc.connect(strikeGain);
      strikeGain.connect(ctx.destination);
      strikeOsc.start(now);
      strikeOsc.stop(now + 0.16);

      // 2. Harmonic Brand Chime Arpeggio: [A3: 220Hz, E4: 330Hz, A4: 440Hz, C#5: 554Hz, E5: 660Hz, A5: 880Hz]
      const notes = [220, 330, 440, 554, 660, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        const startTime = now + idx * 0.022;
        const duration = 0.55 + idx * 0.05;

        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.008, startTime + duration);

        const volume = (0.045 / (idx * 0.6 + 1));
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.00001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
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

