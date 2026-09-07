"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { PortfolioData, Project } from "@/lib/portfolio-data"

type Tab = "hero" | "about" | "projects" | "contact"

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
          placeholder="Add tag and press Enter"
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
      }
    } catch {
      alert("Save failed")
    } finally {
      setSaving(false)
    }
  }

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

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

  const updateAboutBio = (index: number, value: string) => {
    if (!data) return
    const bio = [...data.about.bio]
    bio[index] = value
    setData({ ...data, about: { ...data.about, bio } })
  }

  const updateCerts = (value: string) => {
    if (!data) return
    const certifications = value.split("\n").filter(Boolean)
    setData({ ...data, about: { ...data.about, certifications } })
  }

  const updateSkillCategory = (catIndex: number, skills: string[]) => {
    if (!data) return
    const skillCategories = [...data.about.skillCategories]
    skillCategories[catIndex] = { ...skillCategories[catIndex], skills }
    setData({ ...data, about: { ...data.about, skillCategories } })
  }

  const updateContact = (field: string, value: string) => {
    if (!data) return
    setData({ ...data, contact: { ...data.contact, [field]: value } })
  }

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
          Loading...
        </div>
      </div>
    )
  }

  if (!data) return null

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "hero", label: "Hero", icon: "🏠" },
    { id: "about", label: "About", icon: "👤" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "contact", label: "Contact", icon: "📬" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold">H</div>
            <div>
              <span className="font-bold text-white">Admin Dashboard</span>
              <span className="text-slate-500 text-xs ml-2">Portfolio CMS</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-green-400 text-sm flex items-center gap-1.5 animate-in fade-in duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Saved!
              </span>
            )}
            <a href="/" target="_blank" className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              View Site
            </a>
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-1.5 rounded-lg text-sm bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {saving ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={logout} className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar Nav */}
        <aside className="w-48 shrink-0">
          <nav className="space-y-1 sticky top-24">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  tab === t.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* HERO TAB */}
          {tab === "hero" && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold">Hero Section</h2>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <Field label="Full Name">
                  <input className={inputCls} value={data.hero.name} onChange={(e) => updateHero("name", e.target.value)} placeholder="Your full name" />
                </Field>
                <Field label="Role / Title">
                  <input className={inputCls} value={data.hero.role} onChange={(e) => updateHero("role", e.target.value)} placeholder="AI Engineer | Full-Stack Developer" />
                </Field>
                <Field label="Tagline (shown in gradient)">
                  <input className={inputCls} value={data.hero.tagline} onChange={(e) => updateHero("tagline", e.target.value)} placeholder="Crafting Intelligent Systems" />
                </Field>
                <Field label="Short Bio">
                  <textarea className={textareaCls} rows={3} value={data.hero.bio} onChange={(e) => updateHero("bio", e.target.value)} placeholder="Short bio for the hero section" />
                </Field>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-300">Stats</h3>
                {data.hero.stats.map((stat, i) => (
                  <div key={i} className="grid grid-cols-2 gap-3">
                    <Field label={`Stat ${i + 1} Value`}>
                      <input className={inputCls} value={stat.value} onChange={(e) => updateStat(i, "value", e.target.value)} />
                    </Field>
                    <Field label={`Stat ${i + 1} Label`}>
                      <input className={inputCls} value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} />
                    </Field>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ABOUT TAB */}
          {tab === "about" && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold">About Section</h2>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <h3 className="font-semibold text-slate-300">Bio Paragraphs</h3>
                {data.about.bio.map((para, i) => (
                  <Field key={i} label={`Paragraph ${i + 1}`}>
                    <textarea className={textareaCls} rows={4} value={para} onChange={(e) => updateAboutBio(i, e.target.value)} />
                  </Field>
                ))}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-300">Certifications</h3>
                <p className="text-xs text-slate-500">One certification per line</p>
                <Field label="Certifications">
                  <textarea
                    className={textareaCls}
                    rows={10}
                    value={data.about.certifications.join("\n")}
                    onChange={(e) => updateCerts(e.target.value)}
                    placeholder="Each certification on a new line"
                  />
                </Field>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <h3 className="font-semibold text-slate-300">Skills</h3>
                {data.about.skillCategories.map((cat, catIdx) => (
                  <div key={cat.label} className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{cat.label}</label>
                    <TagInput tags={cat.skills} onChange={(skills) => updateSkillCategory(catIdx, skills)} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROJECTS TAB */}
          {tab === "projects" && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Projects</h2>
                <button
                  onClick={() => {
                    setIsNewProject(true)
                    setEditingProject({ id: "", title: "", description: "", tags: [], repoUrl: "", liveUrl: "", year: new Date().getFullYear().toString() })
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all shadow-lg shadow-blue-500/20"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add Project
                </button>
              </div>

              <div className="space-y-3">
                {data.projects.map((project) => (
                  <div key={project.id} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex items-start justify-between gap-4 transition-all group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white truncate">{project.title}</h3>
                        <span className="text-xs text-slate-500 shrink-0">{project.year}</span>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => { setIsNewProject(false); setEditingProject({ ...project }) }}
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Edit Modal */}
              {editingProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                      <h3 className="font-bold text-lg">{isNewProject ? "Add New Project" : "Edit Project"}</h3>
                      <button onClick={() => { setEditingProject(null); setIsNewProject(false) }} className="text-slate-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      <Field label="Project ID (URL slug, no spaces)">
                        <input className={inputCls} value={editingProject.id} onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value.toLowerCase().replace(/\s+/g, "-") })} placeholder="my-project" disabled={!isNewProject} />
                      </Field>
                      <Field label="Title">
                        <input className={inputCls} value={editingProject.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} />
                      </Field>
                      <Field label="Description">
                        <textarea className={textareaCls} rows={4} value={editingProject.description} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} />
                      </Field>
                      <Field label="Year">
                        <input className={inputCls} value={editingProject.year} onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })} placeholder="2025" />
                      </Field>
                      <Field label="Repository URL">
                        <input className={inputCls} value={editingProject.repoUrl || ""} onChange={(e) => setEditingProject({ ...editingProject, repoUrl: e.target.value })} placeholder="https://github.com/..." />
                      </Field>
                      <Field label="Live URL (optional)">
                        <input className={inputCls} value={editingProject.liveUrl || ""} onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })} placeholder="https://..." />
                      </Field>
                      <Field label="Tags">
                        <TagInput tags={editingProject.tags} onChange={(tags) => setEditingProject({ ...editingProject, tags })} />
                      </Field>
                    </div>
                    <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 px-6 py-4 flex justify-end gap-3">
                      <button onClick={() => { setEditingProject(null); setIsNewProject(false) }} className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all">Cancel</button>
                      <button
                        onClick={() => {
                          if (!editingProject.id || !editingProject.title) { alert("ID and Title are required"); return }
                          saveProject(editingProject)
                        }}
                        className="px-5 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-500/20"
                      >
                        {isNewProject ? "Add Project" : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* CONTACT TAB */}
          {tab === "contact" && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold">Contact Information</h2>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <Field label="Email">
                  <input className={inputCls} type="email" value={data.contact.email} onChange={(e) => updateContact("email", e.target.value)} />
                </Field>
                <Field label="Phone">
                  <input className={inputCls} value={data.contact.phone} onChange={(e) => updateContact("phone", e.target.value)} />
                </Field>
                <Field label="Location">
                  <input className={inputCls} value={data.contact.location} onChange={(e) => updateContact("location", e.target.value)} />
                </Field>
                <Field label="GitHub URL">
                  <input className={inputCls} value={data.contact.github} onChange={(e) => updateContact("github", e.target.value)} />
                </Field>
                <Field label="LinkedIn URL">
                  <input className={inputCls} value={data.contact.linkedin} onChange={(e) => updateContact("linkedin", e.target.value)} />
                </Field>
                <Field label="Fun Fact">
                  <textarea className={textareaCls} rows={4} value={data.contact.funFact} onChange={(e) => updateContact("funFact", e.target.value)} />
                </Field>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
