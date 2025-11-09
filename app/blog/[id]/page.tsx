import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface BlogPageProps {
  params: Promise<{ id: string }>
}

const BLOG_CONTENT: Record<string, any> = {
  "autofixhub-guide": {
    title: "Building an Agentic Code-Fixing Bot: AutoFixHub",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Agentic AI", "Python", "LLM"],
    content: `
# Building an Agentic Code-Fixing Bot: AutoFixHub

## Introduction

In this comprehensive guide, I'll walk you through the architecture and implementation of AutoFixHub, an intelligent code-fixing bot that leverages generative AI and agentic workflows to autonomously identify and resolve bugs.

## The Problem

Traditional debugging tools require human expertise and extensive manual effort. As codebases grow larger and more complex, the time spent on debugging increases exponentially. AutoFixHub was created to automate this process.

## Architecture Overview

AutoFixHub uses multiple specialized LLM agents working in concert:

- **Analysis Agent**: Understands code context and identifies potential bugs
- **Suggestion Agent**: Generates multiple fix candidates
- **Validation Agent**: Tests fixes for correctness
- **Integration Agent**: Creates pull requests with solutions

## Key Features

### Multi-Language Support
The system supports Python, JavaScript, TypeScript, and Go, with extensibility for additional languages.

### Intelligent Bug Detection
Using code analysis and ML models, it achieves 85% accuracy in bug detection across diverse codebases.

### Autonomous Fixing
The agentic workflow allows the system to propose and validate fixes without human intervention until review stage.

## Implementation Details

### Technology Stack
- Python 3.11 for core logic
- LangChain for LLM orchestration
- FastAPI for serving
- PostgreSQL for persistence

### API Integration
The system integrates with GitHub, GitLab, and Gitea through webhooks for automatic triggering on code changes.

## Results

During pilot testing with 10+ open-source projects:
- 85% bug detection accuracy
- 60% reduction in manual debugging time
- Successfully fixed over 500 bugs autonomously

## Lessons Learned

1. **Context is King**: The more code context provided to LLMs, the better the results
2. **Validation is Critical**: Always validate AI-generated code before deployment
3. **Human Oversight Matters**: A review stage prevents problematic fixes from reaching production

## Future Directions

- Support for more programming languages
- Integration with CI/CD pipelines
- Custom training on private codebases
- Real-time debugging during development

## Conclusion

AutoFixHub demonstrates the power of agentic AI in solving real-world software engineering challenges. As LLMs continue to improve, autonomous debugging will become increasingly practical for production systems.

---

Have thoughts on agentic AI or debugging automation? Reach out on GitHub or LinkedIn!
    `,
  },
  "wire-edm-ml": {
    title: "Wire EDM AI: Simulating Manufacturing Processes with ML",
    date: "2024-01-10",
    readTime: "10 min read",
    tags: ["Machine Learning", "Manufacturing", "Python"],
    content: `
# Wire EDM AI: Simulating Manufacturing Processes with ML

## Introduction

Wire Electrical Discharge Machining (EDM) is a precision manufacturing process used to create complex shapes in conductive materials. In this article, I'll discuss how machine learning can optimize this process.

## What is Wire EDM?

Wire EDM uses electrical sparks to precisely cut through materials. The process is controlled by multiple parameters that significantly impact quality and efficiency.

## The Challenge

Traditional wire EDM requires extensive trial-and-error to find optimal parameters. Different materials, thicknesses, and geometries require different settings, making it time-consuming and expensive to optimize.

## Machine Learning Solution

By training ML models on historical manufacturing data, we can predict optimal parameters with high accuracy.

### Data Collection

We collected data from 1000+ manufacturing runs, capturing:
- Material properties
- Desired surface finish
- Tool wear characteristics
- Electrical parameters
- Process outcomes

### Model Architecture

We used an ensemble approach:
- Gradient Boosting for parameter prediction
- Neural Networks for surface finish estimation
- Random Forests for tool wear forecasting

### Results

- 94% accuracy in predicting optimal parameters
- 70% reduction in setup time
- Improved surface quality consistency

## Implementation

The solution integrates with existing CNC machines through a REST API, providing real-time optimization suggestions.

## Business Impact

- Reduced manufacturing cycle time by 40%
- Decreased material waste by 30%
- Improved product quality metrics

## Future Enhancements

- Real-time adaptation during machining
- Integration with computer vision for defect detection
- Predictive maintenance capabilities

---

Interested in manufacturing AI? Let's connect!
    `,
  },
  "pl300-journey": {
    title: "How I Prepared for PL-300 & Power BI Project Case Study",
    date: "2024-01-05",
    readTime: "7 min read",
    tags: ["Power BI", "Data Analysis", "Career"],
    content: `
# How I Prepared for PL-300 & Power BI Project Case Study

## The Certification Journey

Earning the Microsoft PL-300 (Power BI Data Analyst) certification was a transformative experience. In this post, I share my preparation strategy and what I learned.

## Why Power BI?

Power BI is one of the leading business intelligence tools. Its importance in data analysis careers cannot be overstated.

## Study Strategy

### Month 1: Fundamentals
- Completed Microsoft Learn modules
- Built basic dashboards with sample datasets
- Learned DAX basics

### Month 2: Advanced Topics
- Mastered DAX functions
- Learned data modeling best practices
- Explored advanced visualizations

### Month 3: Exam Preparation
- Took practice exams (scored 85% average)
- Built real-world projects
- Reviewed weak areas

## Key Learnings

### DAX is Powerful
DAX (Data Analysis Expressions) enables complex calculations and insights. Mastering it is crucial for success.

### Data Modeling Matters
Proper data models significantly impact dashboard performance and accuracy.

### Visualization Design
Effective communication of data through visualization is as important as the analysis itself.

## Project Case Study

I applied these learnings to a real business analytics project, reducing report generation time by 60%.

## Certification Results

Passed the exam with 920/1000 points. The certification opened doors to new opportunities in data analytics roles.

## Resources That Helped

1. Microsoft Learn (free official training)
2. YouTube tutorials by specialists
3. Practice datasets from Kaggle
4. Real-world projects for hands-on learning

## Tips for Future Candidates

- Don't just memorize; understand concepts deeply
- Build projects; theory alone isn't enough
- Join communities for peer learning
- Take practice exams seriously

## Conclusion

The PL-300 certification journey strengthened my data analysis skills and opened new career possibilities. If you're considering it, I highly recommend pursuing it.

---

Questions about Power BI or data analytics? Let's chat!
    `,
  },
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { id } = await params
  const post = BLOG_CONTENT[id]

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      <article className="py-12 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            {post.content.split("\n\n").map((paragraph: string, idx: number) => {
              if (paragraph.startsWith("#")) {
                const level = paragraph.match(/^#+/)?.[0].length || 1
                const text = paragraph.replace(/^#+\s/, "")
                const headingClass =
                  {
                    1: "text-3xl font-bold text-foreground",
                    2: "text-2xl font-bold text-foreground",
                    3: "text-xl font-bold text-foreground",
                  }[level] || "text-lg font-bold text-foreground"
                return (
                  <h2 key={idx} className={headingClass}>
                    {text}
                  </h2>
                )
              }
              if (paragraph.startsWith("-")) {
                const items = paragraph.split("\n").filter((line) => line.startsWith("-"))
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2">
                    {items.map((item, i) => (
                      <li key={i}>{item.substring(2)}</li>
                    ))}
                  </ul>
                )
              }
              if (paragraph.startsWith("1.")) {
                const items = paragraph.split("\n").filter((line) => /^\d+\./.test(line))
                return (
                  <ol key={idx} className="list-decimal list-inside space-y-2">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s/, "")}</li>
                    ))}
                  </ol>
                )
              }
              return <p key={idx}>{paragraph}</p>
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Enjoyed this article?</h3>
              <p className="text-muted-foreground mb-6">Share your thoughts or let's discuss these ideas further</p>
              <Link href="/#contact">
                <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
