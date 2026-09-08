export default function HudFooter() {
  return (
    <footer
      style={{
        background: "var(--hud-bg)",
        borderTop: "1px solid var(--hud-border)",
        padding: "3rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* LEFT */}
        <div>
          <div style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>
            // System Architecture
          </div>
          <div style={{ fontFamily: "var(--hud-font-body)", fontWeight: 600, fontSize: "0.875rem", color: "var(--hud-text-secondary)", lineHeight: 1.7 }}>
            Full-Stack Web Engineering<br />
            AI &amp; Machine Learning Solutions
          </div>
          <div style={{ marginTop: "1.25rem", display: "flex", gap: "1rem" }}>
            <a
              href="https://github.com/Hari-prashath-123"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.1em", textDecoration: "none", transition: "color 200ms" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--hud-text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--hud-text-tertiary)")}
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/hariprashath-b-3029s/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.1em", textDecoration: "none", transition: "color 200ms" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--hud-text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--hud-text-tertiary)")}
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:hariprashath321@gmail.com"
              style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.1em", textDecoration: "none", transition: "color 200ms" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--hud-text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--hud-text-tertiary)")}
            >
              Email ↗
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>
            // Status
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--hud-accent-green)",
              }}
              className="hud-dot-pulse"
            />
            <span style={{ fontFamily: "var(--hud-font-body)", fontWeight: 600, fontSize: "0.8125rem", color: "var(--hud-accent-green)" }}>
              Open to Opportunities
            </span>
          </div>
          <a
            href="#projects"
            style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.1em", textDecoration: "none", transition: "color 200ms" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--hud-text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--hud-text-tertiary)")}
          >
            VIEW WORK →
          </a>
          <div style={{ marginTop: "1.5rem", fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} Hariprashath B
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>
            // Region
          </div>
          <div style={{ fontFamily: "var(--hud-font-body)", fontWeight: 600, fontSize: "0.875rem", color: "var(--hud-text-secondary)", lineHeight: 1.7 }}>
            Trichy, Tamil Nadu<br />
            <span style={{ color: "var(--hud-text-tertiary)", fontWeight: 400 }}>Worldwide (Remote)</span>
          </div>
          <div style={{ marginTop: "1.25rem", fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.1em" }}>
            PORTFOLIO {new Date().getFullYear()}
          </div>
        </div>
      </div>

      {/* Mobile stack */}
      <style>{`
        @media (max-width: 767px) {
          #hud-footer-grid { grid-template-columns: 1fr !important; text-align: left !important; gap: 2rem !important; }
        }
      `}</style>
    </footer>
  )
}
