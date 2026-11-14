"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Instagram, Mail, MapPin, Send, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    projectType: [] as string[],
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { playHover, playClick, playSuccess } = useSound();

  const projectTypes = [
    "Web Design & Development",
    "Video Editing & Motion Content",
    "Photography & Visual Creative",
    "AI-Powered Digital Solutions",
    "Full Studio Retainer",
  ];

  const budgetTiers = [
    "Under $5,000",
    "$5,000 – $15,000",
    "$15,000 – $35,000",
    "$35,000+",
  ];

  const toggleProjectType = (type: string) => {
    playClick();
    setFormData((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(type)
        ? prev.projectType.filter((t) => t !== type)
        : [...prev.projectType, type],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please complete your name, email, and a brief project overview.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);
    playClick();

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playSuccess();
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-32 px-6 sm:px-8 bg-[#070707] text-white z-10 border-t border-white/5">
      {/* Background Red/Orange Ambient Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(181, 18, 27, 0.6) 0%, rgba(240, 106, 40, 0.35) 45%, transparent 75%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28]">
              SECTION G // COMMISSION & INITIATION
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.02] mb-6">
            LET’S CREATE SOMETHING{" "}
            <span className="bg-gradient-to-r from-[#B5121B] via-[#E82823] to-[#F06A28] bg-clip-text text-transparent italic">
              THAT GETS REMEMBERED.
            </span>
          </h2>

          <p className="font-sans text-neutral-300 text-lg sm:text-xl font-light tracking-wide max-w-2xl leading-relaxed">
            We partner with visionary founders, category leaders, and ambitious brands worldwide. Tell us about your project or ambition.
          </p>
        </div>

        {/* Contact Grid: Form & Studio Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Area: The Interactive Commission Form */}
          <div className="lg:col-span-8 p-8 sm:p-12 rounded-3xl bg-[#111111] border border-white/10 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-16 text-center flex flex-col items-center justify-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] flex items-center justify-center text-white shadow-[0_0_40px_rgba(181,18,27,0.6)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                    INQUIRY TRANSMITTED.
                  </h3>

                  <p className="font-sans text-neutral-300 max-w-md mx-auto text-base leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. KKS Suhith and the Signboard Studio team have received your dispatch and will respond within 24 hours.
                  </p>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-xs text-neutral-400">
                    DISPATCH REF: #SB-{Math.floor(100000 + Math.random() * 900000)} / STATUS: QUEUED FOR DIRECT REVIEW
                  </div>

                  <button
                    onClick={() => {
                      playClick();
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        businessName: "",
                        projectType: [],
                        budget: "",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono uppercase tracking-widest text-neutral-200 transition-colors"
                  >
                    SEND ANOTHER DISPATCH
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm font-sans">
                      {errorMsg}
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-5 py-4 rounded-xl bg-black/60 border border-white/10 focus:border-[#F06A28] focus:outline-none text-white font-sans text-sm placeholder:text-neutral-600 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-5 py-4 rounded-xl bg-black/60 border border-white/10 focus:border-[#F06A28] focus:outline-none text-white font-sans text-sm placeholder:text-neutral-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Business Name */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                      BUSINESS / BRAND NAME
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Luminary Global or Stealth Startup"
                      className="w-full px-5 py-4 rounded-xl bg-black/60 border border-white/10 focus:border-[#F06A28] focus:outline-none text-white font-sans text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  {/* Project Type Multi-Select Pills */}
                  <div className="space-y-3">
                    <label className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                      PROJECT DISCIPLINE (SELECT ALL RELEVANT)
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {projectTypes.map((type) => {
                        const isSelected = formData.projectType.includes(type);
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => toggleProjectType(type)}
                            onMouseEnter={playHover}
                            className={`px-4 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                              isSelected
                                ? "bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-semibold shadow-[0_0_15px_rgba(181,18,27,0.4)]"
                                : "bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/10"
                            }`}
                          >
                            {isSelected ? "✓ " : "+ "}
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector Pills */}
                  <div className="space-y-3">
                    <label className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                      ANTICIPATED INVESTMENT
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {budgetTiers.map((tier) => {
                        const isSelected = formData.budget === tier;
                        return (
                          <button
                            type="button"
                            key={tier}
                            onClick={() => {
                              playClick();
                              setFormData({ ...formData, budget: tier });
                            }}
                            onMouseEnter={playHover}
                            className={`px-3 py-2.5 rounded-xl font-mono text-xs text-center uppercase tracking-wider transition-all duration-200 ${
                              isSelected
                                ? "bg-white text-black font-bold"
                                : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/10"
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                      PROJECT OVERVIEW & AMBITION *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your current bottlenecks, upcoming launch timeline, or specific creative ambitions..."
                      className="w-full px-5 py-4 rounded-xl bg-black/60 border border-white/10 focus:border-[#F06A28] focus:outline-none text-white font-sans text-sm placeholder:text-neutral-600 transition-colors resize-none"
                    />
                  </div>

                  {/* Form Submission Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={playHover}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#B5121B] via-[#E82823] to-[#F06A28] text-white font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_35px_rgba(181,18,27,0.5)] hover:shadow-[0_0_55px_rgba(240,106,40,0.7)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    data-cursor-text="TRANSMIT"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        TRANSMITTING DISPATCH...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        SUBMIT INQUIRY // COMMENCE
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-neutral-400 font-mono text-[11px] pt-2">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      ENCRYPTED TRANSMISSION
                    </span>
                    <span>NDAS HONORED PRIOR TO CALL</span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Area: Direct Studio Dossier & Instagram */}
          <div className="lg:col-span-4 space-y-6">
            {/* Instagram Official Channel Card */}
            <a
              href="https://instagram.com/signboard_studio"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              className="p-8 rounded-3xl bg-gradient-to-br from-[#1A0A0C] to-[#121212] border border-[#B5121B]/30 hover:border-[#F06A28] transition-all block group shadow-lg"
              data-cursor-text="INSTA"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-[#B5121B]/20 text-[#F06A28] border border-[#B5121B]/30">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-[#F06A28] font-bold tracking-widest uppercase">
                  OFFICIAL FEED
                </span>
              </div>

              <div className="font-serif text-2xl font-bold uppercase text-white group-hover:text-[#F06A28] transition-colors mb-1">
                @signboard_studio
              </div>

              <p className="font-sans text-neutral-400 text-sm leading-relaxed mb-4">
                Follow our daily art direction, live motion experiments, behind-the-scenes engineering, and design thinking.
              </p>

              <div className="font-mono text-xs text-neutral-300 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>CONNECT ON INSTAGRAM</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F06A28]" />
              </div>
            </a>

            {/* Direct Channel Dossier */}
            <div className="p-8 rounded-3xl bg-[#111111] border border-white/10 space-y-6">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#F06A28] font-semibold">
                DIRECT STUDIO DOSSIER
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-mono text-[10px] text-neutral-400 uppercase">DIRECT COMMISSIONS</div>
                    <a
                      href="mailto:hello@signboardstudio.com"
                      className="font-sans text-sm text-neutral-200 hover:text-white transition-colors"
                    >
                      hello@signboardstudio.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-mono text-[10px] text-neutral-400 uppercase">LOCATION & COVERAGE</div>
                    <div className="font-sans text-sm text-neutral-200">
                      Hyderabad, India / Global Remote Commissions
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-mono text-[10px] text-neutral-400 uppercase">RESPONSE VELOCITY</div>
                    <div className="font-sans text-sm text-neutral-200">
                      Within 24 Hours on Business Days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

