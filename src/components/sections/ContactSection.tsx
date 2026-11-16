"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Send,
  Clock,
  ShieldCheck,
  AlertCircle,
  Linkedin,
  Github,
  Twitter,
  FileText,
  X,
  ExternalLink,
} from "lucide-react";
import { useSound } from "@/context/SoundContext";

interface ContactSectionProps {
  onStartProject?: () => void;
}

export function ContactSection({ onStartProject }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    projectType: [] as string[],
    budget: "$5,000 – $15,000",
    message: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const { playHover, playClick, playReveal, playModalClose, playTabSwitch, playSuccess } = useSound();

  const studioEmail = "contact@signboardstudio.com";
  const founderEmail = "suhith@signboardstudio.com";

  const projectTypes = [
    "Flagship Web Architecture (Next.js)",
    "Creative Motion Design & Brand Film",
    "Art Direction & Editorial Visual System",
    "AI Workflow & Generative Integration",
    "Comprehensive Studio Retainer",
  ];

  const budgetTiers = [
    { label: "$5K – $15K", value: "$5,000 – $15,000", scope: "Core Web Experience" },
    { label: "$15K – $35K", value: "$15,000 – $35,000", scope: "Full Brand & Motion Overhaul" },
    { label: "$35K+", value: "$35,000+", scope: "Custom Enterprise & AI Architecture" },
    { label: "Retainer", value: "Custom Studio Retainer", scope: "Ongoing Strategic Direction" },
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

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Spam honeypot detection
    if (honeypot.trim() !== "") {
      setErrorMessage("Automated submission detected.");
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setErrorMessage("Please provide a valid business email address.");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 15) {
      setErrorMessage("Please provide a brief project overview (at least 15 characters).");
      return;
    }

    setIsSubmitting(true);
    playClick();

    const submissionPayload = {
      _subject: `New Commission Inquiry from ${formData.name.trim()} [Signboard Studio]`,
      _template: "table",
      _captcha: "false",
      name: formData.name.trim(),
      email: formData.email.trim(),
      businessName: formData.businessName.trim() || "Not specified",
      disciplines: formData.projectType.length > 0 ? formData.projectType.join(", ") : "General Consultation",
      budgetTier: formData.budget,
      overview: formData.message.trim(),
      submittedAt: new Date().toISOString(),
      source: "Signboard Studio Direct Commission Portal",
    };

    const targetEndpoint =
      process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ||
      "https://formsubmit.co/ajax/contact@signboardstudio.com";

    try {
      const response = await fetch(targetEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionPayload),
      });

      const data = await response.json().catch(() => null);

      // FormSubmit AJAX returns HTTP 200 with { success: "false", message: "..." } if unactivated or invalid.
      // We strictly confirm data.success is truthy ("true" or true) before displaying success.
      const isSuccess =
        response.ok &&
        data &&
        (data.success === true || data.success === "true");

      if (isSuccess) {
        setIsSubmitting(false);
        setSubmissionStatus("success");
        playSuccess();
      } else {
        const rawMessage =
          data && (data.message || data.error)
            ? data.message || data.error
            : "The commission dispatch server was unable to verify your transmission.";
        throw new Error(rawMessage);
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmissionStatus("error");
      setErrorMessage(
        err.message ||
          "Transmission could not be confirmed by the studio server. Please use our direct email fallback below."
      );
    }
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(`Commission Inquiry: ${formData.name} [Signboard Studio]`);
    const body = encodeURIComponent(
      `Hi Suhith and the Signboard team,\n\nName: ${formData.name}\nCompany: ${formData.businessName || "N/A"}\nEmail: ${formData.email}\nInvestment Tier: ${formData.budget}\nDisciplines: ${formData.projectType.join(", ") || "General"}\n\nProject Overview:\n${formData.message}\n`
    );
    return `mailto:${studioEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#070707] text-white z-10 border-t border-white/10">
      {/* Background Refined Ambient Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(181, 18, 27, 0.45) 0%, rgba(240, 106, 40, 0.2) 50%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#F06A28]">
              SECTION G // COMMISSION & INITIATION
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[1.05] mb-6">
            LET’S CREATE WORK{" "}
            <span className="bg-gradient-to-r from-[#B5121B] via-[#E82823] to-[#F06A28] bg-clip-text text-transparent italic">
              THAT DELIVERS.
            </span>
          </h2>

          <p className="font-sans text-neutral-300 text-base sm:text-lg font-light tracking-wide max-w-2xl leading-relaxed">
            We partner with ambitious founders and design-forward brands worldwide. Every engagement is founder-led, strategically grounded, and executed to the highest technical standard.
          </p>
        </div>

        {/* Contact Grid: Form & Studio Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Area: The Commission Form */}
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-[#0F0F0F] border border-white/10 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {submissionStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="py-14 text-center flex flex-col items-center justify-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#B5121B] to-[#F06A28] flex items-center justify-center text-white shadow-[0_0_30px_rgba(181,18,27,0.5)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                    INQUIRY VERIFIED & DISPATCHED
                  </h3>

                  <p className="font-sans text-neutral-300 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your brief has been securely transmitted. KKS Suhith will review your project details and respond within 24 business hours.
                  </p>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-xs text-neutral-400">
                    DISPATCH CHANNEL: VERIFIED // CONFIRMATION RECORDED
                  </div>

                  <button
                    onClick={() => {
                      playClick();
                      setSubmissionStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        businessName: "",
                        projectType: [],
                        budget: "$5,000 – $15,000",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono uppercase tracking-widest text-neutral-200 transition-colors"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-7"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Invisible Honeypot Spam Protection */}
                  <input
                    type="text"
                    name="_honey"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {submissionStatus === "error" && (
                    <div className="p-4 sm:p-5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-sm font-sans space-y-3">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-white">
                            {errorMessage.toLowerCase().includes("activation") ||
                            errorMessage.toLowerCase().includes("activate")
                              ? "Form Activation Required for contact@signboardstudio.com"
                              : "Direct Dispatch Notice"}
                          </div>
                          <div className="text-xs text-red-200/90 leading-relaxed mt-1">
                            {errorMessage.toLowerCase().includes("activation") ||
                            errorMessage.toLowerCase().includes("activate")
                              ? "FormSubmit sent an initial confirmation email to contact@signboardstudio.com. Please open that mailbox and click 'Activate Form' once to authorize web submissions. In the meantime, you can send your inquiry immediately using the direct email button below."
                              : errorMessage}
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-red-500/20 flex flex-wrap items-center gap-3">
                        <a
                          href={generateMailtoLink()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#F06A28]" />
                          Open Direct Email Client
                        </a>
                        <button
                          type="button"
                          onClick={() => setSubmissionStatus("idle")}
                          className="px-3 py-1.5 rounded-lg bg-transparent hover:bg-white/5 text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors"
                        >
                          Dismiss & Retry
                        </button>
                      </div>
                    </div>
                  )}

                  {errorMessage && submissionStatus !== "error" && (
                    <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-200 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                        className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#F06A28] focus:outline-none text-white font-sans text-sm placeholder:text-neutral-600 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                        BUSINESS EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#F06A28] focus:outline-none text-white font-sans text-sm placeholder:text-neutral-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Business / Brand Name */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                      ORGANIZATION / BRAND NAME
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Luminary Global or Stealth Venture"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#F06A28] focus:outline-none text-white font-sans text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  {/* Project Type Multi-Select */}
                  <div className="space-y-2.5">
                    <label className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                      CORE DISCIPLINE (SELECT APPLICABLE)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => {
                        const isSelected = formData.projectType.includes(type);
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => toggleProjectType(type)}
                            onMouseEnter={playHover}
                            className={`px-3.5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                              isSelected
                                ? "bg-gradient-to-r from-[#B5121B] to-[#F06A28] text-white font-semibold shadow-sm"
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

                  {/* Budget Selector Pills with Scope Guidance */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                        ANTICIPATED INVESTMENT TIER
                      </label>
                      <span className="font-mono text-[10px] text-neutral-400">USD CURRENCY</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {budgetTiers.map((tier) => {
                        const isSelected = formData.budget === tier.value;
                        return (
                          <button
                            type="button"
                            key={tier.label}
                            onClick={() => {
                              playTabSwitch();
                              setFormData({ ...formData, budget: tier.value });
                            }}
                            onMouseEnter={playHover}
                            className={`p-3 rounded-xl font-mono text-left transition-all duration-200 border ${
                              isSelected
                                ? "bg-white text-black font-bold border-white"
                                : "bg-white/[0.03] text-neutral-400 hover:text-white border-white/10"
                            }`}
                          >
                            <div className="text-xs uppercase">{tier.label}</div>
                            <div className="text-[10px] opacity-75 font-sans mt-0.5">{tier.scope}</div>
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
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your timeline, current bottlenecks, or specific digital goals..."
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#F06A28] focus:outline-none text-white font-sans text-sm placeholder:text-neutral-600 transition-colors resize-none"
                    />
                  </div>

                  {/* Form Submission Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={playHover}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B5121B] via-[#C91822] to-[#F06A28] text-white font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(181,18,27,0.35)] hover:shadow-[0_0_40px_rgba(240,106,40,0.5)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        DISPATCHING TO STUDIO SERVER...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        SUBMIT INQUIRY // COMMENCE
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>

                  {/* Privacy Notice & Security Assurance */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-neutral-400 font-mono text-[11px] pt-1 gap-2 border-t border-white/5">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      CONFIDENTIAL & DIRECT TO FOUNDER
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        playReveal();
                        setIsPrivacyModalOpen(true);
                      }}
                      className="text-neutral-400 hover:text-white underline underline-offset-2 transition-colors text-left sm:text-right"
                    >
                      Privacy & Confidentiality Notice
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Area: Verified Founder Dossier & Direct Channels */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Studio Dossier Card */}
            <div className="p-7 rounded-3xl bg-[#0F0F0F] border border-white/10 space-y-6 shadow-xl">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#F06A28] font-semibold flex items-center justify-between">
                <span>STUDIO DOSSIER</span>
                <span className="text-[10px] text-emerald-400 font-normal">COMMISSIONS OPEN</span>
              </div>

              <div className="space-y-4 font-sans">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                      DIRECT INQUIRIES
                    </div>
                    <a
                      href={`mailto:${studioEmail}`}
                      className="text-sm text-neutral-200 hover:text-white transition-colors"
                    >
                      {studioEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                      STUDIO BASE
                    </div>
                    <div className="text-sm text-neutral-200">
                      Hyderabad, India / Global Remote Delivery
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                      RESPONSE VELOCITY
                    </div>
                    <div className="text-sm text-neutral-200">
                      Within 24 Hours on Business Days
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Profiles List */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  VERIFIED FOUNDER PROFILES
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <a
                    href="https://www.linkedin.com/in/kocherlakoteswarasuhithsravanbabu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors border border-white/5 group"
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                      LinkedIn Profile
                    </span>
                    <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href="https://github.com/Kocherlasuhith12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors border border-white/5 group"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-3.5 h-3.5 text-neutral-200" />
                      GitHub Repository
                    </span>
                    <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href="https://x.com/KksSuhith"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors border border-white/5 group"
                  >
                    <span className="flex items-center gap-2">
                      <Twitter className="w-3.5 h-3.5 text-[#1DA1F2]" />
                      @KksSuhith on X
                    </span>
                    <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Email Direct Fallback Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#121212] to-[#160A0B] border border-white/10 space-y-3">
              <div className="font-mono text-xs text-neutral-300 font-semibold uppercase flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F06A28]" />
                <span>PREFER DIRECT EMAIL?</span>
              </div>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                If you have an RFP or pitch deck ready, forward it directly to our founder mailbox.
              </p>
              <a
                href={`mailto:${founderEmail}?subject=Direct Project Inquiry [Signboard Studio]`}
                className="inline-flex items-center gap-2 font-mono text-xs text-[#F06A28] hover:text-white transition-colors pt-1"
              >
                <span>Write to {founderEmail}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & NDA Modal */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => {
              playModalClose();
              setIsPrivacyModalOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5 text-neutral-300 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="font-mono text-xs uppercase tracking-widest text-[#F06A28] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  CONFIDENTIALITY & PRIVACY POLICY
                </div>
                <button
                  onClick={() => {
                    playModalClose();
                    setIsPrivacyModalOpen(false);
                  }}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed">
                <p>
                  <strong className="text-white">Non-Disclosure & Confidentiality:</strong> All project inquiries, company data, unreleased concepts, and commercial ambitions shared with Signboard Studio are treated as strictly confidential. Mutual non-disclosure agreements (NDAs) are gladly executed prior to deep architectural discussions.
                </p>
                <p>
                  <strong className="text-white">Data Minimization:</strong> We only collect the information necessary to evaluate your project scope and schedule a consultation. We never sell, rent, or distribute client contact records or project specifications to third-party marketing services.
                </p>
                <p>
                  <strong className="text-white">Intellectual Property:</strong> All client deliverables, code repositories, design assets, and brand content commissioned through Signboard Studio become 100% the exclusive property of the client upon project completion and final settlement.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => {
                    playModalClose();
                    setIsPrivacyModalOpen(false);
                  }}
                  className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  Close Notice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
