"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface SoundContextType {
  isMuted: boolean;
  toggleSound: () => void;
  unmute: () => void;
  playHover: () => void;
  playClick: () => void;
  playReveal: () => void;
  playModalClose: () => void;
  playTabSwitch: () => void;
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
  playModalClose: () => {},
  playTabSwitch: () => {},
  playSuccess: () => {},
  playLogoSound: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Preloaded audio element refs for instantaneous zero-latency playback
  const logoAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const modalOpenAudioRef = useRef<HTMLAudioElement | null>(null);
  const modalCloseAudioRef = useRef<HTMLAudioElement | null>(null);
  const tabAudioRef = useRef<HTMLAudioElement | null>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);

  // Preload audio elements
  useEffect(() => {
    if (typeof window === "undefined") return;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

    const loadSound = (file: string, volume: number) => {
      try {
        const a = new Audio(`${basePath}/audio/${file}`);
        a.volume = volume;
        a.preload = "auto";
        return a;
      } catch {
        return null;
      }
    };

    logoAudioRef.current = loadSound("logo-chime.wav", 1.0);
    clickAudioRef.current = loadSound("click.wav", 0.9);
    hoverAudioRef.current = loadSound("hover.wav", 0.45);
    modalOpenAudioRef.current = loadSound("modal-open.wav", 0.85);
    modalCloseAudioRef.current = loadSound("modal-close.wav", 0.6);
    tabAudioRef.current = loadSound("tab-switch.wav", 0.8);
    successAudioRef.current = loadSound("success.wav", 0.95);
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
      if (clickAudioRef.current) {
        clickAudioRef.current.currentTime = 0;
        clickAudioRef.current.play().catch(() => {});
      }
    }
  };

  // Helper to play an audio element with fallback cloning if overlapping
  const playAudioElement = useCallback((audioRef: React.RefObject<HTMLAudioElement | null>, fallbackVolume = 0.8) => {
    if (isMuted) return;
    try {
      const el = audioRef.current;
      if (el) {
        if (el.paused || el.ended) {
          el.currentTime = 0;
          el.play().catch(() => {});
        } else {
          // Clone for polyphonic overlaps
          const clone = el.cloneNode() as HTMLAudioElement;
          clone.volume = el.volume || fallbackVolume;
          clone.play().catch(() => {});
        }
      }
    } catch {
      // Audio play error handled
    }
  }, [isMuted]);

  const playHover = useCallback(() => {
    playAudioElement(hoverAudioRef, 0.45);
  }, [playAudioElement]);

  const playClick = useCallback(() => {
    playAudioElement(clickAudioRef, 0.9);
  }, [playAudioElement]);

  const playReveal = useCallback(() => {
    playAudioElement(modalOpenAudioRef, 0.85);
  }, [playAudioElement]);

  const playModalClose = useCallback(() => {
    playAudioElement(modalCloseAudioRef, 0.6);
  }, [playAudioElement]);

  const playTabSwitch = useCallback(() => {
    playAudioElement(tabAudioRef, 0.8);
  }, [playAudioElement]);

  const playSuccess = useCallback(() => {
    playAudioElement(successAudioRef, 0.95);
  }, [playAudioElement]);

  // Signature Signboard Studio Emblem Resonance Audio
  const playLogoSound = useCallback(() => {
    // Logo touch plays with priority
    playAudioElement(logoAudioRef, 1.0);

    // Also trigger synthesized sub-impact via Web Audio
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const triggerSynth = () => {
        const now = ctx.currentTime;
        const strikeOsc = ctx.createOscillator();
        const strikeGain = ctx.createGain();
        strikeOsc.type = "sine";
        strikeOsc.frequency.setValueAtTime(140, now);
        strikeOsc.frequency.exponentialRampToValueAtTime(45, now + 0.16);
        strikeGain.gain.setValueAtTime(0.2, now);
        strikeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        strikeOsc.connect(strikeGain);
        strikeGain.connect(ctx.destination);
        strikeOsc.start(now);
        strikeOsc.stop(now + 0.18);
      };

      if (ctx.state === "suspended") {
        ctx.resume().then(triggerSynth).catch(() => {});
      } else {
        triggerSynth();
      }
    } catch {
      // Audio error ignored
    }
  }, [getAudioContext, playAudioElement]);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleSound,
        unmute,
        playHover,
        playClick,
        playReveal,
        playModalClose,
        playTabSwitch,
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
