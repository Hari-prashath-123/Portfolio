"use client"

import type React from "react"
import { useState } from "react"
import { AnimateOnScroll } from "./scroll-animations"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import type { ContactData } from "@/lib/portfolio-data"

export default function Contact({ contact }: { contact: ContactData }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    permission: true,
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim() || "Anonymous"
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          message: formData.message,
        }),
      })
      if (res.ok) {
        setIsSuccess(true)
        setFormData({ firstName: "", lastName: "", email: "", message: "", permission: true })
        setTimeout(() => setIsSuccess(false), 6000)
      } else {
        const data = await res.json()
        setError(data.error || "Failed to transmit payload. Please try again.")
      }
    } catch {
      setError("Network connection error. Transmission failed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const fullName = `${formData.firstName} ${formData.lastName}`.trim()
  const displaySender = fullName ? fullName : "[Awaiting Name]"
  const displayEmail = formData.email ? formData.email : "[Awaiting Email]"
  const displayMessage = formData.message ? `"${formData.message}"` : '"[Awaiting Message]"'

  return (
    <section id="contact" className="relative py-28 px-4 bg-[#07090e] overflow-hidden">
      {/* Background Watermark Typography */}
      <div className="contact-bg-typography-container" aria-hidden="true">
        <div className="contact-bg-typography-track contact-bg-drift-a">
          <span className="contact-bg-text">C O N T A C T</span>
          <span className="contact-bg-sep">·</span>
          <span className="contact-bg-text">D I S P A T C H</span>
          <span className="contact-bg-sep">·</span>
          <span className="contact-bg-text">C O N T A C T</span>
        </div>
        <div className="contact-bg-typography-track contact-bg-drift-b">
          <span className="contact-bg-text">C O N T A C T</span>
          <span className="contact-bg-sep">·</span>
          <span className="contact-bg-text">C O N N E C T</span>
          <span className="contact-bg-sep">·</span>
          <span className="contact-bg-text">C O N T A C T</span>
        </div>
        <div className="contact-bg-typography-track contact-bg-drift-c">
          <span className="contact-bg-text">D I S P A T C H</span>
          <span className="contact-bg-sep">·</span>
          <span className="contact-bg-text">C O N T A C T</span>
          <span className="contact-bg-sep">·</span>
          <span className="contact-bg-text">C O N N E C T</span>
        </div>
      </div>

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/5 blur-[140px] rounded-full pointer-events-none z-[2]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT CARD */}
          <AnimateOnScroll animation="fade-up" delay={100} duration={750} once={true} className="h-full">
            <div className="relative h-full flex flex-col justify-between group">
              {/* Soft ambient halo behind outer card */}
              <div 
                className="absolute -inset-2 rounded-[36px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none -z-10" 
                aria-hidden="true" 
              />

              {/* Main Outer Glass Card Container */}
              <div className="contact-left-card relative rounded-[32px] p-8 sm:p-10 h-full flex flex-col justify-between overflow-hidden border border-white/15 bg-[#080b12]/85 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
                {/* Top specular reflection sheen line */}
                <div 
                  className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-20"
                  aria-hidden="true"
                />

                {/* 
                  ========================================================================
                  ROTATING INSIDE CARD (Matches Reference Image Exactly)
                  ========================================================================
                */}
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0"
                  aria-hidden="true"
                >
                  <div className="relative w-[130%] h-[130%] flex items-center justify-center contact-rotate-card-inside">
                    {/* Diffuse shaded glow halo */}
                    <div className="absolute w-[85%] h-[80%] rounded-[40px] blur-3xl opacity-45 bg-gradient-to-tr from-white/40 via-slate-200/20 to-transparent" />
                    
                    {/* Rotating Card Silhouette - distinct rounded card shape visible inside */}
                    <div className="absolute w-[80%] h-[75%] rounded-[32px] blur-xl opacity-65 bg-gradient-to-br from-white/70 via-slate-100/25 to-transparent border border-white/30" />
                    
                    {/* Shaded card face with diagonal specular light */}
                    <div className="absolute w-[72%] h-[68%] rounded-[26px] blur-md opacity-50 bg-gradient-to-tl from-white/50 via-white/10 to-transparent" />
                    
                    {/* Luminous core */}
                    <div className="absolute w-[55%] h-[50%] rounded-[20px] blur-sm opacity-35 bg-white/60" />
                  </div>
                </div>

                {/* Content Area - elevated above the rotating card */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-semibold text-white/60 tracking-widest uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                        // LIVE DISPATCH NODE
                      </span>
                      <div className="relative flex h-2.5 w-2.5">
                        <span className="status-dot-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                      </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 leading-tight">
                      Let&apos;s Build Something Exceptional.
                    </h2>

                    <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6">
                      Fill out the transmission form or preview your live payload stream directly below.
                    </p>

                    {/* Compact contact quick badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-mono">
                      <a 
                        href={`mailto:${contact.email}`} 
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/80 hover:text-white transition-all backdrop-blur-md"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-300" />
                        <span>{contact.email}</span>
                      </a>
                      <a 
                        href={contact.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/80 hover:text-white transition-all backdrop-blur-md"
                      >
                        <span className="text-emerald-400 font-bold">→</span>
                        <span>GitHub</span>
                      </a>
                      <a 
                        href={contact.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/80 hover:text-white transition-all backdrop-blur-md"
                      >
                        <span className="text-emerald-400 font-bold">→</span>
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>

                  {/* Nested Inner Code Card */}
                  <div className="contact-inner-code-card mt-auto bg-[#07090f]/90 backdrop-blur-xl rounded-2xl p-5 border border-white/15 font-mono text-xs sm:text-sm text-white/80 shadow-2xl relative overflow-hidden">
                    <div className="contact-inner-shimmer" aria-hidden="true" />
                    <div className="flex items-center justify-between text-white/40 text-[11px] mb-3 pb-2 border-b border-white/5 select-none">
                      <span>// payload_preview.json</span>
                      <span className="text-[10px] text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        STREAM_ACTIVE
                      </span>
                    </div>
                    <div className="space-y-2 text-white/90">
                      <div className="flex gap-2 items-center">
                        <span className="text-slate-400 select-none">sender:</span>
                        <span className={fullName ? "text-emerald-300 font-medium" : "text-white/40"}>{displaySender}</span>
                        {!fullName && <span className="contact-cursor-blink">|</span>}
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-slate-400 select-none">email:</span>
                        <span className={formData.email ? "text-emerald-300 font-medium" : "text-white/40"}>{displayEmail}</span>
                        {fullName && !formData.email && <span className="contact-cursor-blink">|</span>}
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="text-slate-400 select-none shrink-0 pt-0.5">message:</span>
                        <span className={`break-all ${formData.message ? "text-emerald-300 font-medium" : "text-white/40"}`}>{displayMessage}</span>
                        {formData.email && !formData.message && <span className="contact-cursor-blink">|</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* RIGHT CARD */}
          <AnimateOnScroll animation="fade-up" delay={180} duration={750} once={true} className="h-full">
            <div className="contact-right-card hud-card rounded-[32px] p-8 sm:p-10 h-full flex flex-col justify-between border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-5 flex flex-col justify-between h-full">
                {isSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium animate-in fade-in">
                    Transmission successfully dispatched. I&apos;ll connect with you shortly!
                  </div>
                )}
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-medium animate-in fade-in">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="contact-input-field w-full px-4 py-3.5 rounded-2xl text-white placeholder:text-white/40 text-sm outline-none" />
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="contact-input-field w-full px-4 py-3.5 rounded-2xl text-white placeholder:text-white/40 text-sm outline-none" />
                </div>
                <div>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="contact-input-field w-full px-4 py-3.5 rounded-2xl text-white placeholder:text-white/40 text-sm outline-none" />
                </div>
                <div>
                  <textarea name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Type your message here..." required className="contact-input-field w-full px-4 py-3.5 rounded-2xl text-white placeholder:text-white/40 text-sm resize-none outline-none" />
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <label className="flex items-center gap-2.5 text-xs text-white/60 cursor-pointer select-none">
                    <input type="checkbox" name="permission" checked={formData.permission} onChange={handleChange} className="rounded bg-white/10 border-white/20 text-white focus:ring-0 focus:ring-offset-0" />
                    <span>I give permission to contact me at this email address.</span>
                  </label>
                  <button type="submit" disabled={isSubmitting} className="contact-submit-btn hud-pill-btn shrink-0 w-full sm:w-auto disabled:opacity-50">
                    {isSubmitting ? "Transmitting..." : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 btn-arrow-icon" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
