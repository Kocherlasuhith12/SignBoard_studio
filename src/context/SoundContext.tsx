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

  // In-memory pre-decoded AudioBuffer cache for TRUE 0ms latency
  const audioBuffersRef = useRef<Map<string, AudioBuffer>>(new Map());

  // HTML5 Audio fallbacks for instant initial safety
  const fallbackAudiosRef = useRef<Map<string, HTMLAudioElement>>(new Map());

  // Get or initialize AudioContext
  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        // lowlatency latencyHint for hardware-accelerated instant response
        try {
          audioCtxRef.current = new AudioCtx({ latencyHint: "interactive" });
        } catch {
          audioCtxRef.current = new AudioCtx();
        }
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  // Pre-load and decode all audio buffers into RAM on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

    const soundFiles: Record<string, string> = {
      click: `${basePath}/audio/click.wav`,
      hover: `${basePath}/audio/hover.wav`,
      logo: `${basePath}/audio/logo-chime.wav`,
      reveal: `${basePath}/audio/modal-open.wav`,
      close: `${basePath}/audio/modal-close.wav`,
      tab: `${basePath}/audio/tab-switch.wav`,
      success: `${basePath}/audio/success.wav`,
    };

    // 1. Prime AudioContext on very first user gesture (pointerdown, keydown, touch)
    const primeAudioContext = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
    };

    window.addEventListener("pointerdown", primeAudioContext, { passive: true });
    window.addEventListener("keydown", primeAudioContext, { passive: true });
    window.addEventListener("touchstart", primeAudioContext, { passive: true });

    // 2. Pre-fetch and decode AudioBuffers
    Object.entries(soundFiles).forEach(async ([key, url]) => {
      try {
        // Prepare fallback HTMLAudioElement
        const fallbackAudio = new Audio(url);
        fallbackAudio.preload = "auto";
        fallbackAudiosRef.current.set(key, fallbackAudio);

        // Fetch ArrayBuffer and decode via Web Audio for 0ms latency
        const res = await fetch(url);
        const arrayBuf = await res.arrayBuffer();
        const ctx = getAudioContext();
        if (ctx) {
          ctx.decodeAudioData(
            arrayBuf,
            (decoded) => {
              audioBuffersRef.current.set(key, decoded);
            },
            () => {}
          );
        }
      } catch {
        // Ignore load errors
      }
    });

    return () => {
      window.removeEventListener("pointerdown", primeAudioContext);
      window.removeEventListener("keydown", primeAudioContext);
      window.removeEventListener("touchstart", primeAudioContext);
    };
  }, [getAudioContext]);

  // Master 0ms instant playback trigger using AudioBufferSourceNode
  const playInstantBuffer = useCallback(
    (name: string, volume = 0.9) => {
      if (isMuted) return;

      const ctx = getAudioContext();
      if (!ctx) return;

      const buffer = audioBuffersRef.current.get(name);

      if (buffer) {
        // Play directly on Web Audio hardware thread with 0ms latency
        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);

        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        if (ctx.state === "suspended") {
          ctx.resume().then(() => {
            source.start(0);
          }).catch(() => {});
        } else {
          source.start(0);
        }
      } else {
        // Fast fallback if buffer is still decoding
        const fallback = fallbackAudiosRef.current.get(name);
        if (fallback) {
          fallback.currentTime = 0;
          fallback.volume = Math.min(1.0, volume);
          fallback.play().catch(() => {});
        }
      }
    },
    [isMuted, getAudioContext]
  );

  const unmute = useCallback(() => {
    setIsMuted(false);
    getAudioContext();
  }, [getAudioContext]);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      getAudioContext();
      playInstantBuffer("click", 0.9);
    }
  };

  const playHover = useCallback(() => {
    playInstantBuffer("hover", 0.55);
  }, [playInstantBuffer]);

  const playClick = useCallback(() => {
    playInstantBuffer("click", 0.95);
  }, [playInstantBuffer]);

  const playReveal = useCallback(() => {
    playInstantBuffer("reveal", 0.9);
  }, [playInstantBuffer]);

  const playModalClose = useCallback(() => {
    playInstantBuffer("close", 0.7);
  }, [playInstantBuffer]);

  const playTabSwitch = useCallback(() => {
    playInstantBuffer("tab", 0.85);
  }, [playInstantBuffer]);

  const playSuccess = useCallback(() => {
    playInstantBuffer("success", 1.0);
  }, [playInstantBuffer]);

  // Signature Signboard Studio Emblem Resonance Audio
  const playLogoSound = useCallback(() => {
    playInstantBuffer("logo", 1.0);
  }, [playInstantBuffer]);

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
