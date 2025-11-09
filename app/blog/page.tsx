import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

const BLOG_POSTS = [
  {
    id: "autofixhub-guide",
    title: "Building an Agentic Code-Fixing Bot: AutoFixHub",
    excerpt: "How I built an AI system that autonomously identifies and fixes code bugs using multiple LLM agents.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Agentic AI", "Python", "LLM"],
  },
  {
    id: "wire-edm-ml",
    title: "Wire EDM AI: Simulating Manufacturing Processes with ML",
    excerpt: "Deep dive into machine learning techniques for optimizing electrical discharge machining processes.",
    date: "2024-01-10",
    readTime: "10 min read",
    tags: ["Machine Learning", "Manufacturing", "Python"],
  },
  {
    id: "pl300-journey",
    title: "How I Prepared for PL-300 & Power BI Project Case Study",
    excerpt: "My complete guide to mastering Power BI certification and applying it to real-world data projects.",
    date: "2024-01-05",
    readTime: "7 min read",
    tags: ["Power BI", "Data Analysis", "Career"],
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">Blog & Insights</h1>
            <p className="text-xl text-muted-foreground">
              Thoughts on AI, data science, and building intelligent systems
            </p>
          </div>

          <div className="space-y-6">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="space-y-3 cursor-pointer group">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{post.title}</h2>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">{post.readTime}</span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <time className="text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
