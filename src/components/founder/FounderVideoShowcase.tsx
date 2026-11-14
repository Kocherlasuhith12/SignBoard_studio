"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import wordsData from "./words_timing.json";
import sentencesData from "./subtitles_data.json";

interface TimedWord {
  word: string;
  sentenceIdx: number;
  start: number;
  end: number;
}

interface TimedSentence {
  text: string;
  start: number;
  end: number;
  duration: number;
}

const CHAPTERS = [
  { id: 0, title: "01 // INTRODUCTION", tag: "FOUNDER & CREATIVE DIRECTOR", accent: "#B5121B" },
  { id: 1, title: "02 // DISTINCTIVE UX", tag: "FUNCTION + DISTINCTION", accent: "#F06A28" },
  { id: 2, title: "03 // CODE & MOTION", tag: "NEXT.JS / GSAP / PHOTOGRAPHY", accent: "#B5121B" },
  { id: 3, title: "04 // AI WORKFLOWS", tag: "AGENTIC INTELLIGENCE", accent: "#F06A28" },
  { id: 4, title: "05 // STRATEGY", tag: "CONVERSION ARCHITECTURE", accent: "#B5121B" },
  { id: 5, title: "06 // PERFORMANCE", tag: "RESULTS THAT DELIVER", accent: "#F06A28" },
  { id: 6, title: "07 // PARTNERSHIP", tag: "LET'S BUILD MEANINGFUL WORK", accent: "#B5121B" },
];

const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function FounderVideoShowcase({ onStartProject }: { onStartProject?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(56.4);
  const [isMuted, setIsMuted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const words: TimedWord[] = wordsData;
  const sentences: TimedSentence[] = sentencesData;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const seekTo = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = seconds;
    setCurrentTime(seconds);
    if (!isPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const restart = () => {
    seekTo(0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Find active sentence index
  const activeSentenceIdx = useMemo(() => {
    const idx = sentences.findIndex(
      (s) => currentTime >= s.start && currentTime <= s.end
    );
    return idx !== -1 ? idx : currentTime > sentences[sentences.length - 1].end ? sentences.length - 1 : 0;
  }, [currentTime, sentences]);

  const activeChapter = CHAPTERS[activeSentenceIdx] || CHAPTERS[0];

  // Filter words belonging to the active sentence
  const currentSentenceWords = useMemo(() => {
    return words.filter((w) => w.sentenceIdx === activeSentenceIdx);
  }, [words, activeSentenceIdx]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full rounded-3xl bg-[#0F0F0F] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
      {/* Hidden Audio Source */}
      <audio
        ref={audioRef}
        src={`${assetPrefix}/audio/suhith-intro.mp3`}
        preload="auto"
      />

      {/* Top Meta Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#F06A28] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            AI VOICE & KINETIC CAPTION REEL
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
            {isPlaying ? "VOICE SYNCHRONIZED" : "CLICK TO PLAY REEL"}
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
            title="Full Screen Cinema Mode"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/15 bg-black flex flex-col justify-between p-6 group">
        {/* Cinematic Portrait with Breathing Ken Burns Zoom when Playing */}
        <motion.div
          className="absolute inset-0 bg-cover transition-all ease-out"
          style={{
            backgroundImage: `url(${assetPrefix}/images/suhith.jpg)`,
            backgroundPosition: "center 18%",
          }}
          animate={
            isPlaying
              ? {
                  scale: [1, 1.04, 1.02, 1.05],
                  filter: ["brightness(1)", "brightness(1.08)", "brightness(1)"],
                }
              : { scale: 1, filter: "brightness(0.95)" }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ambient Red/Orange Volumetric Lighting Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            isPlaying ? "opacity-75" : "opacity-45"
          }`}
          style={{
            background:
              "radial-gradient(circle at 65% 25%, rgba(240,106,40,0.3) 0%, rgba(181,18,27,0.35) 45%, rgba(0,0,0,0.85) 90%)",
          }}
        />

        {/* Studio Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

        {/* Top Video HUD Display */}
        <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-neutral-300">
          <div className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying ? "bg-red-500 animate-pulse" : "bg-neutral-600"
              }`}
            />
            <span>{isPlaying ? "KINETIC AUDIO SYNC" : "STANDBY"}</span>
          </div>

          <div className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[#F06A28] font-bold">
            {activeChapter.title}
          </div>
        </div>

        {/* Center Play Button Overlay (visible when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-3">
            <button
              onClick={togglePlay}
              className="p-5 sm:p-6 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white shadow-[0_0_40px_rgba(181,18,27,0.8)] hover:scale-110 active:scale-95 transition-all duration-300 group/btn"
              aria-label="Play AI Voice Reel"
            >
              <Play className="w-8 h-8 fill-current ml-0.5 transition-transform group-hover/btn:scale-110" />
            </button>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 bg-black/60 px-3 py-1 rounded-full border border-white/10">
              PLAY WITH ASSISTED AI VOICE
            </span>
          </div>
        )}

        {/* Bottom Kinetic Subtitle Box with Real-Time Word Color Tracking */}
        <div className="relative z-10 mt-auto">
          {/* Real-time Dynamic Audio Visualizer Waves (animating when playing) */}
          {isPlaying && (
            <div className="flex items-center gap-1 mb-3">
              {[4, 12, 18, 8, 22, 14, 28, 16, 24, 10, 20, 6, 18, 12, 26, 14, 8, 20, 10, 16, 12, 22, 8, 18].map(
                (h, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-[#B5121B] to-[#F06A28] rounded-full"
                    animate={{
                      height: [h * 0.3, h * 1.35, h * 0.5],
                    }}
                    transition={{
                      duration: 0.3 + (i % 6) * 0.07,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />
                )
              )}
            </div>
          )}

          {/* Synchronized Kinetic Subtitle Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className="font-mono text-[10px] text-[#F06A28] font-bold uppercase tracking-wider">
                {activeChapter.tag}
              </span>
              <span className="font-mono text-[10px] text-neutral-400">
                SCENE {activeSentenceIdx + 1} / {sentences.length}
              </span>
            </div>

            {/* Word-by-Word Colored Karaoke Highlight Effect */}
            <div className="font-serif text-base sm:text-lg leading-relaxed flex flex-wrap items-center">
              {currentSentenceWords.map((item, idx) => {
                const isCurrent = currentTime >= item.start && currentTime < item.end;
                const isSpoken = currentTime >= item.end;

                return (
                  <span
                    key={`${item.word}-${idx}`}
                    onClick={() => seekTo(item.start)}
                    className={`cursor-pointer transition-all duration-150 inline-block mr-1.5 my-0.5 rounded px-1 select-none ${
                      isCurrent
                        ? "text-white font-bold bg-gradient-to-r from-[#B5121B] via-[#E82823] to-[#F06A28] shadow-[0_0_20px_rgba(240,106,40,0.8)] scale-110 -translate-y-0.5"
                        : isSpoken
                        ? "text-white font-medium"
                        : "text-neutral-500 font-normal hover:text-neutral-300"
                    }`}
                  >
                    {item.word}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Video Timeline & Scrub Bar */}
      <div className="mt-5 space-y-3">
        {/* Interactive Scrub Track */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            seekTo(clickPos * duration);
          }}
          className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer group/track"
        >
          <div
            className="h-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] transition-all duration-150 relative"
            style={{ width: `${progressPercent}%` }}
          >
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_#F06A28] opacity-0 group-hover/track:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Video Player Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(181,18,27,0.4)]"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={restart}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              title="Restart Reel"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <span className="font-mono text-xs text-neutral-300 tracking-wider">
              {Math.floor(currentTime / 60)}:
              {Math.floor(currentTime % 60)
                .toString()
                .padStart(2, "0")}{" "}
              / {Math.floor(duration / 60)}:
              {Math.floor(duration % 60)
                .toString()
                .padStart(2, "0")}
            </span>
          </div>

          {/* Quick Scene Selector Pills */}
          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto">
            {sentences.map((s, idx) => (
              <button
                key={idx}
                onClick={() => seekTo(s.start)}
                className={`font-mono text-[10px] px-2.5 py-1 rounded transition-all ${
                  activeSentenceIdx === idx
                    ? "bg-[#B5121B] text-white font-bold"
                    : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen Cinema Modal with Synchronized Text */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 text-white overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between w-full max-w-5xl mx-auto mb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#F06A28]">
                  CINEMA EXPERIENCE
                </span>
                <h3 className="font-serif text-2xl font-bold uppercase text-white">
                  KKS SUHITH // FOUNDER PROFILE REEL
                </h3>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#B5121B] font-mono text-xs uppercase tracking-wider text-white transition-colors"
              >
                CLOSE [ESC]
              </button>
            </div>

            {/* Modal Central Presentation */}
            <div
              className="relative w-full max-w-4xl max-h-[70vh] h-[550px] mx-auto rounded-3xl overflow-hidden border border-white/20 bg-black flex flex-col justify-end p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="absolute inset-0 bg-cover"
                style={{
                  backgroundImage: `url(${assetPrefix}/images/suhith.jpg)`,
                  backgroundPosition: "center 18%",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="relative z-10 max-w-3xl">
                <div className="font-mono text-xs text-[#F06A28] uppercase tracking-widest font-bold mb-2">
                  {activeChapter.title} &mdash; {activeChapter.tag}
                </div>

                {/* Cinema Mode Word Tracking */}
                <div className="font-serif text-xl sm:text-2xl leading-relaxed flex flex-wrap items-center mb-6">
                  {currentSentenceWords.map((item, idx) => {
                    const isCurrent = currentTime >= item.start && currentTime < item.end;
                    const isSpoken = currentTime >= item.end;

                    return (
                      <span
                        key={`modal-${item.word}-${idx}`}
                        onClick={() => seekTo(item.start)}
                        className={`cursor-pointer transition-all duration-150 inline-block mr-2 my-1 rounded px-1.5 ${
                          isCurrent
                            ? "text-white font-bold bg-gradient-to-r from-[#B5121B] via-[#E82823] to-[#F06A28] shadow-[0_0_25px_rgba(240,106,40,0.9)] scale-110 -translate-y-0.5"
                            : isSpoken
                            ? "text-white font-medium"
                            : "text-neutral-500 font-normal hover:text-neutral-300"
                        }`}
                      >
                        {item.word}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-mono text-xs tracking-widest uppercase font-semibold flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPlaying ? "PAUSE SPEECH" : "RESUME SPEECH"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      if (onStartProject) onStartProject();
                    }}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 font-mono text-xs uppercase tracking-widest text-white transition-colors flex items-center gap-2"
                  >
                    <span>LET'S BUILD TOGETHER</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="w-full max-w-5xl mx-auto flex items-center justify-between font-mono text-xs text-neutral-400 mt-6">
              <span>VOICE SYNTHESIS: NATURAL NEURAL ENGINE</span>
              <span>KKS SUHITH / SIGNBOARD STUDIO</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
