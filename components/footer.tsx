export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {currentYear} Hari Prashath. All rights reserved.</p>
        <div className="flex gap-6">
          <a
            href="https://github.com/Hari-prashath-123"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a href="mailto:your@email.com" className="hover:text-foreground transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
