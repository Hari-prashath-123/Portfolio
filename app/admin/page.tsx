"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { PortfolioData, Project, ExperienceRole, PillarItem, CertificationItem, KpiMetric } from "@/lib/portfolio-data"

type Tab = "hero" | "about" | "skills" | "projects" | "contact" | "media"

function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState("")

  const add = () => {
    const val = input.trim()
    if (val && !tags.includes(val)) {
      onChange([...tags, val])
    }
    setInput("")
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30">
            {tag}
            <button type="button" onClick={() => onChange(tags.filter((t) => t !== tag))} className="text-blue-400 hover:text-red-400 transition-colors ml-1">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add() } }}
          placeholder="Type skill & press Enter"
          className="flex-1 px-3 py-2 text-sm rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
        />
        <button type="button" onClick={add} className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors">Add</button>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
const textareaCls = inputCls + " resize-none"

type UploadType = "profile" | "logo" | "resume"

function FileUploader({
  type,
  label,
  accept,
  hint,
  previewUrl,
}: {
  type: UploadType
  label: string
  accept: string
  hint: string
  previewUrl?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState(previewUrl || "")
  const [dragOver, setDragOver] = useState(false)

  const upload = async (file: File) => {
    setUploading(true)
    setError("")
    setUploaded(false)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (res.ok) {
        setUploaded(true)
        if (type !== "resume") {
          setPreview(data.url + "?t=" + Date.now())
        } else {
          setPreview(data.url)
        }
        setTimeout(() => setUploaded(false), 4000)
      } else {
        setError(data.error || "Upload failed")
      }
    } catch {
      setError("Network error during upload")
    } finally {
      setUploading(false)
    }
  }

  const handleFile = (file: File | null) => {
    if (!file) return
    upload(file)
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">{label}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{hint}</p>
        </div>
        {uploaded && (
          <span className="text-green-400 text-sm flex items-center gap-1.5 animate-in fade-in">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Uploaded successfully!
          </span>
        )}
      </div>

      {preview && type !== "resume" && (
        <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-700">
          <img src={preview} alt="Current" className="w-full h-full object-cover" />
        </div>
      )}
      {preview && type === "resume" && (
        <a href={preview} target="_blank" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-blue-400 text-sm hover:text-blue-300 transition-colors border border-slate-700">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          View Current Resume (/resume.pdf)
        </a>
      )}

      <label
        className={`flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
          dragOver
            ? "border-blue-500 bg-blue-500/10"
            : "border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
      >
        <input type="file" accept={accept} className="hidden" onChange={(e) => handleFile(e.target.files?.[0] || null)} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-blue-400">
            <svg className="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
            <span className="text-sm">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <span className="text-sm font-medium">Drop file here or click to browse</span>
            <span className="text-xs text-slate-600">{hint}</span>
          </div>
        )}
      </label>

      {error && <p className="text-red-400 text-sm flex items-center gap-2"><svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{error}</p>}
    </div>
  )
}

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("hero")
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isNewProject, setIsNewProject] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/data")
      if (res.status === 401) { router.push("/admin/login"); return }
      const json = await res.json()
      setData(json)
    } catch {
      console.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { loadData() }, [loadData])

  const save = async () => {
    if (!data) return
    setSaving(true)
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        alert("Save failed with status " + res.status)
      }
    } catch {
      alert("Network error: Save failed")
    } finally {
      setSaving(false)
    }
  }

  // Ctrl+S / Cmd+S shortcut to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        save()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [data])

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  // ─── Hero Helpers ────────────────────────────────────────────────────────
  const updateHero = (field: string, value: string) => {
    if (!data) return
    setData({ ...data, hero: { ...data.hero, [field]: value } })
  }

  const updateStat = (index: number, field: "value" | "label", value: string) => {
    if (!data) return
    const stats = [...data.hero.stats]
    stats[index] = { ...stats[index], [field]: value }
    setData({ ...data, hero: { ...data.hero, stats } })
  }

  const addStat = () => {
    if (!data) return
    setData({ ...data, hero: { ...data.hero, stats: [...data.hero.stats, { value: "New", label: "Metric" }] } })
  }

  const deleteStat = (index: number) => {
    if (!data) return
    const stats = data.hero.stats.filter((_, i) => i !== index)
    setData({ ...data, hero: { ...data.hero, stats } })
  }

  // ─── About Helpers ───────────────────────────────────────────────────────
  const updateAbout = (field: string, value: any) => {
    if (!data) return
    setData({ ...data, about: { ...data.about, [field]: value } })
  }

  const updateParagraph = (index: number, value: string) => {
    if (!data) return
    const paragraphs = [...data.about.paragraphs]
    paragraphs[index] = value
    setData({ ...data, about: { ...data.about, paragraphs } })
  }

  const addParagraph = () => {
    if (!data) return
    setData({ ...data, about: { ...data.about, paragraphs: [...data.about.paragraphs, ""] } })
  }

  const deleteParagraph = (index: number) => {
    if (!data) return
    setData({ ...data, about: { ...data.about, paragraphs: data.about.paragraphs.filter((_, i) => i !== index) } })
  }

  const updateKpi = (index: number, field: keyof KpiMetric, value: string) => {
    if (!data) return
    const kpis = [...data.about.kpis]
    kpis[index] = { ...kpis[index], [field]: value }
    setData({ ...data, about: { ...data.about, kpis } })
  }

  const addKpi = () => {
    if (!data) return
    setData({ ...data, about: { ...data.about, kpis: [...data.about.kpis, { value: "0", label: "Metric" }] } })
  }

  const deleteKpi = (index: number) => {
    if (!data) return
    setData({ ...data, about: { ...data.about, kpis: data.about.kpis.filter((_, i) => i !== index) } })
  }

  const updateExperience = (index: number, field: keyof ExperienceRole, value: string) => {
    if (!data) return
    const experience = [...data.about.experience]
    experience[index] = { ...experience[index], [field]: value }
    setData({ ...data, about: { ...data.about, experience } })
  }

  const addExperience = () => {
    if (!data) return
    const newItem: ExperienceRole = {
      title: "New Role",
      organization: "Company / Institution",
      period: "2026 - PRESENT",
      type: "LEADERSHIP",
      description: "Description of role and achievements.",
    }
    setData({ ...data, about: { ...data.about, experience: [...data.about.experience, newItem] } })
  }

  const deleteExperience = (index: number) => {
    if (!data) return
    setData({ ...data, about: { ...data.about, experience: data.about.experience.filter((_, i) => i !== index) } })
  }

  const updatePillar = (index: number, field: keyof PillarItem, value: string) => {
    if (!data) return
    const pillars = [...data.about.pillars]
    pillars[index] = { ...pillars[index], [field]: value }
    setData({ ...data, about: { ...data.about, pillars } })
  }

  const updateCertification = (index: number, field: keyof CertificationItem, value: string) => {
    if (!data) return
    const certifications = [...data.about.certifications]
    certifications[index] = { ...certifications[index], [field]: value }
    setData({ ...data, about: { ...data.about, certifications } })
  }

  const addCertification = () => {
    if (!data) return
    const newCert: CertificationItem = {
      title: "Certification Title",
      issuer: "Issuing Organization",
      date: "2026",
      type: "Specialization",
    }
    setData({ ...data, about: { ...data.about, certifications: [...data.about.certifications, newCert] } })
  }

  const deleteCertification = (index: number) => {
    if (!data) return
    setData({ ...data, about: { ...data.about, certifications: data.about.certifications.filter((_, i) => i !== index) } })
  }

  // ─── Skills Helpers ──────────────────────────────────────────────────────
  const updateSkillsRow = (row: "row1" | "row2", list: string[]) => {
    if (!data) return
    setData({ ...data, skills: { ...data.skills, [row]: list } })
  }

  // ─── Contact Helpers ─────────────────────────────────────────────────────
  const updateContact = (field: string, value: string) => {
    if (!data) return
    setData({ ...data, contact: { ...data.contact, [field]: value } })
  }

  // ─── Projects Helpers ────────────────────────────────────────────────────
  const saveProject = (proj: Project) => {
    if (!data) return
    let projects = [...data.projects]
    if (isNewProject) {
      projects = [...projects, proj]
    } else {
      projects = projects.map((p) => (p.id === proj.id ? proj : p))
    }
    setData({ ...data, projects })
    setEditingProject(null)
    setIsNewProject(false)
  }

  const deleteProject = (id: string) => {
    if (!data) return
    if (!confirm("Delete this project?")) return
    setData({ ...data, projects: data.projects.filter((p) => p.id !== id) })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading portfolio data...
        </div>
      </div>
    )
  }

  if (!data) return null

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "hero", label: "Hero", icon: "🏠" },
    { id: "about", label: "About & Credentials", icon: "👤" },
    { id: "skills", label: "Tech Stack", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "contact", label: "Contact", icon: "📬" },
    { id: "media", label: "Media & Assets", icon: "🖼️" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
            HP
          </div>
          <div>
            <h1 className="font-semibold text-white leading-tight">Admin Portal</h1>
            <p className="text-xs text-slate-500">Connected to MongoDB Atlas · Live Synchronization</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span>Preview Website</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>

          <button
            type="button"
            onClick={save}
            disabled={saving}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 ${
              saved
                ? "bg-green-600 text-white"
                : "bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
            }`}
          >
            {saving ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                Saving...
              </>
            ) : saved ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Saved to MongoDB!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                Save Changes (Ctrl+S)
              </>
            )}
          </button>

          <button
            type="button"
            onClick={logout}
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
            title="Log Out"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-6 gap-6">
        {/* Sidebar Tabs */}
        <aside className="w-56 shrink-0 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                tab === t.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 space-y-6 pb-20">

          {/* ─── TAB: HERO ───────────────────────────────────────────────── */}
          {tab === "hero" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Hero & Identity</h2>
                <p className="text-xs text-slate-500 mt-0.5">Primary header typography, title badge, and live introductory metrics.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full Name">
                  <input
                    type="text"
                    value={data.hero.name || ""}
                    onChange={(e) => updateHero("name", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Hariprashath B"
                  />
                </Field>

                <Field label="Role / Title Badge">
                  <input
                    type="text"
                    value={data.hero.role || ""}
                    onChange={(e) => updateHero("role", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. AI Engineer & Full-Stack Architect"
                  />
                </Field>
              </div>

              <Field label="Tagline / Headline">
                <input
                  type="text"
                  value={data.hero.tagline || ""}
                  onChange={(e) => updateHero("tagline", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. Crafting Intelligent Systems"
                />
              </Field>

              <Field label="Bio / Executive Summary">
                <textarea
                  rows={3}
                  value={data.hero.bio || ""}
                  onChange={(e) => updateHero("bio", e.target.value)}
                  className={textareaCls}
                  placeholder="Brief introduction displayed in the hero section..."
                />
              </Field>

              {/* Stats Strip */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hero Metrics &amp; Badges</label>
                  <button
                    type="button"
                    onClick={addStat}
                    className="text-xs px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    + Add Metric
                  </button>
                </div>

                <div className="space-y-2">
                  {data.hero.stats.map((stat, i) => (
                    <div key={i} className="flex gap-3 items-center bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateStat(i, "value", e.target.value)}
                        placeholder="Value (e.g. Final Year)"
                        className="w-1/3 px-3 py-2 text-sm rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateStat(i, "label", e.target.value)}
                        placeholder="Label (e.g. B.Tech AI & Data Science)"
                        className="flex-1 px-3 py-2 text-sm rounded-lg bg-slate-800 border border-slate-700 text-white"
                      />
                      <button
                        type="button"
                        onClick={() => deleteStat(i)}
                        className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete Stat"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB: ABOUT ──────────────────────────────────────────────── */}
          {tab === "about" && (
            <div className="space-y-6">
              {/* Card 1: Narrative & KPIs */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Academic &amp; Engineering Narrative</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Displayed in Bento Card 1 (Academic &amp; Engineering Directive).</p>
                </div>

                <Field label="Section Narrative Heading">
                  <input
                    type="text"
                    value={data.about.heading || ""}
                    onChange={(e) => updateAbout("heading", e.target.value)}
                    className={inputCls}
                  />
                </Field>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bio Paragraphs</label>
                    <button
                      type="button"
                      onClick={addParagraph}
                      className="text-xs px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      + Add Paragraph
                    </button>
                  </div>

                  {data.about.paragraphs.map((para, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => updateParagraph(i, e.target.value)}
                        className={textareaCls}
                      />
                      <button
                        type="button"
                        onClick={() => deleteParagraph(i)}
                        className="p-2 mt-2 text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete Paragraph"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* KPI Metrics */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bento KPI Metrics Strip</label>
                    <button
                      type="button"
                      onClick={addKpi}
                      className="text-xs px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      + Add KPI
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.about.kpis.map((kpi, i) => (
                      <div key={i} className="flex gap-2 items-center bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                        <input
                          type="text"
                          value={kpi.value}
                          onChange={(e) => updateKpi(i, "value", e.target.value)}
                          placeholder="Value (e.g. 7.84)"
                          className="w-1/3 px-3 py-2 text-sm rounded-lg bg-slate-800 border border-slate-700 text-white font-mono font-bold"
                        />
                        <input
                          type="text"
                          value={kpi.label}
                          onChange={(e) => updateKpi(i, "label", e.target.value)}
                          placeholder="Label (e.g. CGPA)"
                          className="flex-1 px-3 py-2 text-sm rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => deleteKpi(i)}
                          className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: Leadership & Experience */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Leadership &amp; Industry Experience</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Displayed in Bento Card 2.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>+ Add Role</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.about.experience.map((exp, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Role #{i + 1}</span>
                        <button
                          type="button"
                          onClick={() => deleteExperience(i)}
                          className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                        >
                          Delete Role
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field label="Role Title">
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => updateExperience(i, "title", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Organization / Company">
                          <input
                            type="text"
                            value={exp.organization}
                            onChange={(e) => updateExperience(i, "organization", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Period (e.g. JUL 2026 - PRESENT)">
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => updateExperience(i, "period", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Badge / Category (e.g. INTERNSHIP / LEADERSHIP)">
                          <input
                            type="text"
                            value={exp.type}
                            onChange={(e) => updateExperience(i, "type", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                      <Field label="Description">
                        <textarea
                          rows={2}
                          value={exp.description}
                          onChange={(e) => updateExperience(i, "description", e.target.value)}
                          className={textareaCls}
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Architectural Pillars */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Architectural Pillars (3 Cards)</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Displayed across Bento Card 3.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.about.pillars.map((pillar, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-3">
                      <div className="text-xs font-mono text-blue-400 font-bold">PILLAR 0{i + 1}</div>
                      <Field label="Tag (e.g. AGENTIC_NODE)">
                        <input
                          type="text"
                          value={pillar.tag}
                          onChange={(e) => updatePillar(i, "tag", e.target.value)}
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Title">
                        <input
                          type="text"
                          value={pillar.title}
                          onChange={(e) => updatePillar(i, "title", e.target.value)}
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Description">
                        <textarea
                          rows={3}
                          value={pillar.description}
                          onChange={(e) => updatePillar(i, "description", e.target.value)}
                          className={textareaCls}
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Certifications */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Verified Certifications</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Displayed in Bento Card 4.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addCertification}
                    className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>+ Add Certificate</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.about.certifications.map((cert, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-emerald-400">CERT #{i + 1}</span>
                        <button
                          type="button"
                          onClick={() => deleteCertification(i)}
                          className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                        >
                          ✕ Delete
                        </button>
                      </div>
                      <Field label="Certificate Title">
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => updateCertification(i, "title", e.target.value)}
                          className={inputCls}
                        />
                      </Field>
                      <div className="grid grid-cols-3 gap-2">
                        <Field label="Issuer">
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => updateCertification(i, "issuer", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Date">
                          <input
                            type="text"
                            value={cert.date}
                            onChange={(e) => updateCertification(i, "date", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Badge / Type">
                          <input
                            type="text"
                            value={cert.type}
                            onChange={(e) => updateCertification(i, "type", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB: SKILLS ─────────────────────────────────────────────── */}
          {tab === "skills" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Technical Stack &amp; Skills</h2>
                <p className="text-xs text-slate-500 mt-0.5">Controls the continuous marquee badges in the Technical Stack section.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Row 1: Modern Web &amp; Backend Engineering</h3>
                      <p className="text-xs text-slate-400">Left-to-Right moving marquee pills.</p>
                    </div>
                    <span className="text-xs font-mono text-blue-400">{data.skills.row1.length} skills</span>
                  </div>
                  <TagInput
                    tags={data.skills.row1}
                    onChange={(tags) => updateSkillsRow("row1", tags)}
                  />
                </div>

                <div className="space-y-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Row 2: Artificial Intelligence &amp; Autonomous Agents</h3>
                      <p className="text-xs text-slate-400">Right-to-Left moving marquee pills.</p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">{data.skills.row2.length} skills</span>
                  </div>
                  <TagInput
                    tags={data.skills.row2}
                    onChange={(tags) => updateSkillsRow("row2", tags)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB: PROJECTS ───────────────────────────────────────────── */}
          {tab === "projects" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Projects ({data.projects.length})</h2>
                  <p className="text-xs text-slate-500">Live projects featured on your portfolio marquee and project cards.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsNewProject(true)
                    setEditingProject({
                      id: `proj-${Date.now()}`,
                      title: "",
                      description: "",
                      tags: [],
                      repoUrl: "",
                      liveUrl: "",
                      year: new Date().getFullYear().toString(),
                    })
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5"
                >
                  <span>+ Add Project</span>
                </button>
              </div>

              {/* Project editor modal / panel */}
              {editingProject && (
                <div className="bg-slate-900 border-2 border-blue-500/50 rounded-2xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="font-semibold text-white">
                      {isNewProject ? "Add New Project" : `Edit Project: ${editingProject.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Project Title">
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className={inputCls}
                        placeholder="e.g. AutoFixHub – Agentic AI"
                      />
                    </Field>

                    <Field label="Slug ID (unique key)">
                      <input
                        type="text"
                        value={editingProject.id}
                        onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value })}
                        className={inputCls}
                        placeholder="e.g. autofixhub"
                      />
                    </Field>

                    <Field label="Year">
                      <input
                        type="text"
                        value={editingProject.year}
                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                        className={inputCls}
                        placeholder="2026"
                      />
                    </Field>

                    <Field label="Repository URL">
                      <input
                        type="url"
                        value={editingProject.repoUrl || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, repoUrl: e.target.value })}
                        className={inputCls}
                        placeholder="https://github.com/..."
                      />
                    </Field>

                    <Field label="Live URL (optional)">
                      <input
                        type="url"
                        value={editingProject.liveUrl || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                        className={inputCls}
                        placeholder="https://..."
                      />
                    </Field>
                  </div>

                  <Field label="Description">
                    <textarea
                      rows={3}
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className={textareaCls}
                      placeholder="Detailed overview of technical architecture and features..."
                    />
                  </Field>

                  <Field label="Technology Tags">
                    <TagInput
                      tags={editingProject.tags}
                      onChange={(tags) => setEditingProject({ ...editingProject, tags })}
                    />
                  </Field>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 text-sm rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => saveProject(editingProject)}
                      disabled={!editingProject.title.trim()}
                      className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
                    >
                      Apply to Projects
                    </button>
                  </div>
                </div>
              )}

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-white leading-snug text-base">{proj.title}</h4>
                        <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded shrink-0">
                          {proj.year}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.tags.map((t) => (
                          <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                      <div className="truncate max-w-[200px]">
                        {proj.repoUrl ? (
                          <a href={proj.repoUrl} target="_blank" className="text-blue-400 hover:underline">
                            {proj.repoUrl.replace("https://github.com/", "")}
                          </a>
                        ) : (
                          "No repo URL"
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => { setIsNewProject(false); setEditingProject(proj) }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProject(proj.id)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-red-900/50 text-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── TAB: CONTACT ────────────────────────────────────────────── */}
          {tab === "contact" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Contact &amp; Social Links</h2>
                <p className="text-xs text-slate-500 mt-0.5">Used across Contact section, Header, and Footer.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Email Address">
                  <input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => updateContact("email", e.target.value)}
                    className={inputCls}
                  />
                </Field>

                <Field label="Phone Number">
                  <input
                    type="text"
                    value={data.contact.phone}
                    onChange={(e) => updateContact("phone", e.target.value)}
                    className={inputCls}
                  />
                </Field>

                <Field label="Location">
                  <input
                    type="text"
                    value={data.contact.location}
                    onChange={(e) => updateContact("location", e.target.value)}
                    className={inputCls}
                  />
                </Field>

                <Field label="GitHub Profile URL">
                  <input
                    type="url"
                    value={data.contact.github}
                    onChange={(e) => updateContact("github", e.target.value)}
                    className={inputCls}
                  />
                </Field>

                <Field label="LinkedIn Profile URL">
                  <input
                    type="url"
                    value={data.contact.linkedin}
                    onChange={(e) => updateContact("linkedin", e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Personal Fun Fact / Statement">
                <textarea
                  rows={3}
                  value={data.contact.funFact}
                  onChange={(e) => updateContact("funFact", e.target.value)}
                  className={textareaCls}
                />
              </Field>
            </div>
          )}

          {/* ─── TAB: MEDIA ──────────────────────────────────────────────── */}
          {tab === "media" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Media &amp; Documents</h2>
                <p className="text-xs text-slate-500 mt-0.5">Upload and overwrite public images and download assets.</p>
              </div>

              <FileUploader
                type="resume"
                label="Resume PDF"
                accept=".pdf,application/pdf"
                hint="Upload your latest PDF resume. Replaces /resume.pdf directly so the 'Download Resume' button gives the new file."
                previewUrl="/resume.pdf"
              />

              <FileUploader
                type="profile"
                label="Profile Picture"
                accept="image/*"
                hint="Upload a square JPEG/PNG. Replaces /Profile.jpeg on the hero profile card."
                previewUrl="/Profile.jpeg"
              />
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
