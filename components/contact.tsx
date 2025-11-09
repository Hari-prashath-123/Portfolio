"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setIsSuccess(false), 3000)
    }, 1000)
  }

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Let's Connect</h2>
          <p className="text-lg text-muted-foreground">Have a project in mind or want to collaborate? Reach out!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSuccess && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 animate-in fade-in slide-in-from-top-2 duration-300">
                Thank you! I'll get back to you soon.
              </div>
            )}

            <div className="group">
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 group-hover:text-primary transition-colors duration-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 hover:border-primary/50"
                placeholder="Your name"
              />
            </div>

            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 group-hover:text-primary transition-colors duration-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 hover:border-primary/50"
                placeholder="your@email.com"
              />
            </div>

            <div className="group">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 group-hover:text-primary transition-colors duration-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 hover:border-primary/50 resize-none"
                placeholder="Your message..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-sm font-semibold uppercase text-primary tracking-wide mb-4">Contact Information</h3>
              <div className="space-y-3">
                <a
                  href="mailto:hariprashath321@gmail.com"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
                >
                  <span className="text-sm">📧</span>
                  <span>hariprashath321@gmail.com</span>
                </a>
                <a
                  href="tel:+919944227061"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
                >
                  <span className="text-sm">📱</span>
                  <span>+91 9944 227 061</span>
                </a>
                <div className="flex items-center gap-3 text-foreground">
                  <span className="text-sm">📍</span>
                  <span>Trichy, Tamil Nadu</span>
                </div>
              </div>
            </div>

            <div className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-sm font-semibold uppercase text-primary tracking-wide mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/Hari-prashath-123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
                >
                  <span>→</span> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/hari-prashath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
                >
                  <span>→</span> LinkedIn
                </a>
                <a
                  href="https://hariprashath-b.b12sites.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
                >
                  <span>→</span> Portfolio
                </a>
              </div>
            </div>

            <div className="group p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-sm font-semibold uppercase text-primary tracking-wide mb-2">Fun Fact</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm passionate about emerging AI technologies, love building agentic AI systems, and enjoy exploring the
                intersection of AI and human creativity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
