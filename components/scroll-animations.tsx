"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-in" | "blur-in" | "slide-rotate"

interface AnimateOnScrollProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = "",
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once])

  const getInitialStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      opacity: 0,
      transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: "transform, opacity, filter",
    }

    switch (animation) {
      case "fade-up":
        return { ...base, transform: "translateY(40px)" }
      case "fade-down":
        return { ...base, transform: "translateY(-40px)" }
      case "fade-left":
        return { ...base, transform: "translateX(40px)" }
      case "fade-right":
        return { ...base, transform: "translateX(-40px)" }
      case "scale-in":
        return { ...base, transform: "scale(0.85)" }
      case "blur-in":
        return { ...base, filter: "blur(10px)", transform: "translateY(20px)" }
      case "slide-rotate":
        return { ...base, transform: "translateY(30px) rotate(-2deg)" }
      default:
        return base
    }
  }

  const getVisibleStyles = (): React.CSSProperties => ({
    opacity: 1,
    transform: "translateY(0) translateX(0) scale(1) rotate(0deg)",
    filter: "blur(0px)",
    transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "auto",
  })

  return (
    <div
      ref={ref}
      className={className}
      style={isVisible ? getVisibleStyles() : getInitialStyles()}
    >
      {children}
    </div>
  )
}

// Stagger children animation wrapper
interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  animation?: AnimationType
  className?: string
  threshold?: number
}

export function StaggerContainer({
  children,
  staggerDelay = 100,
  animation = "fade-up",
  className = "",
  threshold = 0.1,
}: StaggerContainerProps) {
  const childArray = Array.isArray(children) ? children : [children]

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <AnimateOnScroll
          key={index}
          animation={animation}
          delay={index * staggerDelay}
          threshold={threshold}
        >
          {child}
        </AnimateOnScroll>
      ))}
    </div>
  )
}
