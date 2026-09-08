"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function HudContact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "", consent: false })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const inputStyle = {
    width: "100%",
    background: "var(--hud-elevated)",
    border: "1px solid var(--hud-border)",
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    fontFamily: "var(--hud-font-body)",
    fontSize: "0.875rem",
    color: "var(--hud-text-primary)",
    outline: "none",
    transition: "border-color 200ms ease",
  } as React.CSSProperties

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent) { setError("Please give consent to continue."); return }
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          message: form.message,
        }),
      })
      if (res.ok) {
        setSuccess(true)
        setForm({ firstName: "", lastName: "", email: "", message: "", consent: false })
      } else {
        const d = await res.json()
        setError(d.error || "Failed to send. Please try again.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Live JSON payload preview
  const payload = {
    sender: form.firstName || form.lastName ? `${form.firstName} ${form.lastName}`.trim() : "[Awaiting Name]",
    email: form.email || "[Awaiting Email]",
    message: form.message || "[Awaiting Message]",
  }

  return (
    <section
      id="contact"
      style={{ background: "var(--hud-bg)", padding: "7rem 2rem", borderTop: "1px solid var(--hud-border)" }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <span className="hud-eyebrow">// LIVE DISPATCH NODE</span>
          <h2 style={{ fontFamily: "var(--hud-font-body)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "var(--hud-text-primary)", lineHeight: 1.2, margin: 0 }}>
            Let&apos;s Build Something Exceptional.
          </h2>
          <p style={{ fontFamily: "var(--hud-font-body)", fontSize: "0.9375rem", color: "var(--hud-text-secondary)", lineHeight: 1.7, margin: 0 }}>
            Fill out the transmission form or preview the live payload stream directly below.
          </p>

          {/* JSON preview */}
          <div
            style={{
              background: "var(--hud-elevated)",
              border: "1px solid var(--hud-border)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "0.6rem 1rem",
                borderBottom: "1px solid var(--hud-border)",
                fontFamily: "var(--hud-font-mono)",
                fontSize: "0.5625rem",
                color: "var(--hud-text-tertiary)",
                letterSpacing: "0.12em",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              // payload_preview.json
            </div>
            <pre
              style={{
                fontFamily: "var(--hud-font-mono)",
                fontSize: "0.75rem",
                color: "var(--hud-text-secondary)",
                padding: "1.25rem 1rem",
                margin: 0,
                lineHeight: 1.8,
                overflowX: "auto",
              }}
            >
              {`{\n  sender: "${payload.sender}",\n  email: "${payload.email}",\n  message: "${payload.message.slice(0, 48)}${payload.message.length > 48 ? "..." : ""}"\n}`}
            </pre>
          </div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.form
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {success && (
            <div style={{ padding: "0.875rem 1rem", borderRadius: "10px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", fontFamily: "var(--hud-font-body)", fontSize: "0.875rem", color: "var(--hud-accent-green)" }}>
              ✅ Message transmitted. I&apos;ll be in touch soon!
            </div>
          )}
          {error && (
            <div style={{ padding: "0.875rem 1rem", borderRadius: "10px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontFamily: "var(--hud-font-body)", fontSize: "0.875rem", color: "#f87171" }}>
              ❌ {error}
            </div>
          )}

          {/* Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.12em", display: "block", marginBottom: "0.4rem" }}>FIRST NAME</label>
              <input
                style={inputStyle}
                type="text"
                placeholder="Hari"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
                onFocus={(e) => (e.target.style.borderColor = "var(--hud-border-bright)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--hud-border)")}
              />
            </div>
            <div>
              <label style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.12em", display: "block", marginBottom: "0.4rem" }}>LAST NAME</label>
              <input
                style={inputStyle}
                type="text"
                placeholder="Prashath"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                onFocus={(e) => (e.target.style.borderColor = "var(--hud-border-bright)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--hud-border)")}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.12em", display: "block", marginBottom: "0.4rem" }}>EMAIL ADDRESS</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              onFocus={(e) => (e.target.style.borderColor = "var(--hud-border-bright)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--hud-border)")}
            />
          </div>

          {/* Message */}
          <div>
            <label style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.12em", display: "block", marginBottom: "0.4rem" }}>MESSAGE</label>
            <textarea
              style={{ ...inputStyle, resize: "none" }}
              rows={5}
              placeholder="Your message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              onFocus={(e) => (e.target.style.borderColor = "var(--hud-border-bright)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--hud-border)")}
            />
          </div>

          {/* Consent */}
          <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              style={{ marginTop: "2px", accentColor: "var(--hud-accent-green)", flexShrink: 0 }}
            />
            <span style={{ fontFamily: "var(--hud-font-body)", fontSize: "0.8125rem", color: "var(--hud-text-secondary)", lineHeight: 1.5 }}>
              I give permission to contact me at this email address.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="hud-btn-filled"
            style={{ alignSelf: "flex-start", opacity: submitting ? 0.6 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
          >
            {submitting ? "Transmitting..." : "Send Message →"}
          </button>
        </motion.form>
      </div>

      {/* Mobile stack */}
      <style>{`
        @media (max-width: 767px) {
          #hud-contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
