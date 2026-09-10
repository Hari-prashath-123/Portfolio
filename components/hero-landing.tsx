"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"

export default function HeroLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [portraitVisible, setPortraitVisible] = useState(false)

  // Mouse / fluid physics tracking
  const mouseRef = useRef({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    prevX: 0.5,
    prevY: 0.5,
    vx: 0,
    vy: 0,
    speed: 0,
    isHovering: false,
    hoverStrength: 0,
  })

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)

    // ------------------------------------------------------------------
    // Staged entrance sequence:
    // 1. Text starts zoomed-in + blurred, then zooms OUT to full frame
    //    over exactly 3 seconds (camera pull-back effect).
    // 2. AFTER the zoom-out finishes, the portrait pops up smoothly
    //    from below into its final position.
    //
    // We use a double requestAnimationFrame before flipping textVisible
    // so the browser is guaranteed to paint the "zoomed-in" starting
    // state first — otherwise React/the browser can collapse the state
    // change into the very first paint and the transition never plays.
    // ------------------------------------------------------------------
    let raf1 = 0
    let raf2 = 0
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setTextVisible(true)
      })
    })

    // Portrait pop-up starts once the 3s zoom-out has fully completed
    const portraitTimer = setTimeout(() => {
      setPortraitVisible(true)
    }, 3050)

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      clearTimeout(portraitTimer)
    }
  }, [])

  // WebGL Fluid / Liquid Text Shader Implementation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      powerPreference: "high-performance",
    })

    if (!gl) {
      // Fallback: 2D Context if WebGL is unavailable
      render2DFallback(canvas)
      return
    }

    // Non-nullable alias so TypeScript can track gl is safe inside closures
    const glCtx: WebGLRenderingContext = gl

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        v_uv.y = 1.0 - v_uv.y; // Flip Y for standard texture coordinates
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader: Viscous Liquid / Oil / Ink Surface Displacement
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      
      uniform sampler2D u_text_texture;
      uniform vec2 u_mouse;
      uniform vec2 u_velocity;
      uniform float u_strength;
      uniform float u_time;
      uniform vec2 u_resolution;
      
      void main() {
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        
        // Correct aspect ratio for circular distance calculation
        vec2 uvCorrected = uv * aspect;
        vec2 mouseCorrected = u_mouse * aspect;
        
        float dist = distance(uvCorrected, mouseCorrected);
        
        // Fluid interaction radius (~18% of screen height)
        float radius = 0.28;
        
        if (dist < radius && u_strength > 0.001) {
          // Smooth bell-curve falloff
          float factor = smoothstep(radius, 0.0, dist);
          float viscousFalloff = pow(factor, 2.2);
          
          // Primary liquid drag along mouse movement direction
          vec2 flowDisp = u_velocity * viscousFalloff * 0.45 * u_strength;
          
          // Organic surface oil ripples & swirl
          vec2 toCenter = normalize(uvCorrected - mouseCorrected + 0.0001);
          float wave = sin(dist * 36.0 - u_time * 5.0) * 0.018 * viscousFalloff * u_strength;
          vec2 waveDisp = toCenter * wave;
          
          // Viscous curl / surface tension distortion
          vec2 curlDisp = vec2(-toCenter.y, toCenter.x) * sin(dist * 24.0 + u_time * 3.0) * 0.012 * viscousFalloff * u_strength;
          
          uv -= (flowDisp + waveDisp + curlDisp);
        }
        
        // Sample rendered typography texture
        vec4 texColor = texture2D(u_text_texture, uv);
        
        // Pure high-contrast black & white editorial thresholding
        float ink = texColor.r; // 0.0 = black ink, 1.0 = white background
        
        // Smooth anti-aliased edge
        vec3 finalColor = vec3(ink);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    // Shader compilation helpers
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(glCtx, glCtx.VERTEX_SHADER, vsSource)
    const fs = createShader(glCtx, glCtx.FRAGMENT_SHADER, fsSource)
    if (!vs || !fs) return

    const program = glCtx.createProgram()
    if (!program) return
    glCtx.attachShader(program, vs)
    glCtx.attachShader(program, fs)
    glCtx.linkProgram(program)
    if (!glCtx.getProgramParameter(program, glCtx.LINK_STATUS)) return

    glCtx.useProgram(program)

    // Setup full-screen quad geometry
    const positionBuffer = glCtx.createBuffer()
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, positionBuffer)
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      glCtx.STATIC_DRAW
    )

    const aPositionLoc = glCtx.getAttribLocation(program, "a_position")
    glCtx.enableVertexAttribArray(aPositionLoc)
    glCtx.vertexAttribPointer(aPositionLoc, 2, glCtx.FLOAT, false, 0, 0)

    // Uniform locations
    const uMouseLoc = glCtx.getUniformLocation(program, "u_mouse")
    const uVelocityLoc = glCtx.getUniformLocation(program, "u_velocity")
    const uStrengthLoc = glCtx.getUniformLocation(program, "u_strength")
    const uTimeLoc = glCtx.getUniformLocation(program, "u_time")
    const uResolutionLoc = glCtx.getUniformLocation(program, "u_resolution")
    const uTextTextureLoc = glCtx.getUniformLocation(program, "u_text_texture")

    // Offscreen Canvas for drawing the pristine "HARIPRASHATH" typography
    const textCanvas = document.createElement("canvas")
    const textCtx = textCanvas.getContext("2d", { willReadFrequently: false })

    // WebGL Texture setup
    const textTexture = glCtx.createTexture()
    glCtx.activeTexture(glCtx.TEXTURE0)
    glCtx.bindTexture(glCtx.TEXTURE_2D, textTexture)
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_S, glCtx.CLAMP_TO_EDGE)
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_T, glCtx.CLAMP_TO_EDGE)
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MIN_FILTER, glCtx.LINEAR)
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MAG_FILTER, glCtx.LINEAR)
    glCtx.uniform1i(uTextTextureLoc, 0)

    function updateTextTexture() {
      if (!textCtx || !canvas) return
      const width = canvas.width
      const height = canvas.height

      textCanvas.width = width
      textCanvas.height = height

      // 1. Pure White Background
      textCtx.fillStyle = "#FFFFFF"
      textCtx.fillRect(0, 0, width, height)

      // 2. Compute dynamic responsive typography size
      // Spanning 75-88% of viewport width
      const targetText = "HARIPRASHATH"
      textCtx.save()

      let fontSize = Math.floor(width * 0.125)
      // Cap fontSize to fit cleanly vertically
      if (fontSize > height * 0.32) {
        fontSize = Math.floor(height * 0.32)
      }
      if (fontSize < 38) fontSize = 38

      textCtx.font = `900 ${fontSize}px "Inter", "Helvetica Neue", "Arial Black", -apple-system, sans-serif`
      textCtx.textAlign = "center"
      textCtx.textBaseline = "middle"
      textCtx.fillStyle = "#000000"

      // Letter spacing simulation via precise measurement
      textCtx.letterSpacing = "-0.04em"

      // Position: Centered horizontally, centered around 48% vertical height
      const posX = width / 2
      const posY = height * 0.48

      textCtx.fillText(targetText, posX, posY)
      textCtx.restore()

      // Upload to GPU
      if (textTexture) {
        glCtx.bindTexture(glCtx.TEXTURE_2D, textTexture)
        glCtx.texImage2D(glCtx.TEXTURE_2D, 0, glCtx.RGBA, glCtx.RGBA, glCtx.UNSIGNED_BYTE, textCanvas)
      }
    }

    // Resize handling with devicePixelRatio for ultra-crisp editorial typography
    function handleResize() {
      if (!canvas) return
      // Cap raised to 3 to keep the texture crisp during the CSS scale-up
      const dpr = Math.min(window.devicePixelRatio || 1, 3)
      const width = canvas.clientWidth * dpr
      const height = canvas.clientHeight * dpr

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        glCtx.viewport(0, 0, width, height)
        updateTextTexture()
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Animation Loop
    let animationFrameId: number
    const startTime = performance.now()

    function render(currentTime: number) {
      const elapsed = (currentTime - startTime) * 0.001
      const m = mouseRef.current

      // Lerp mouse coordinates towards target for smooth fluid physics
      const lerpFactor = 0.14
      const prevX = m.x
      const prevY = m.y

      m.x += (m.targetX - m.x) * lerpFactor
      m.y += (m.targetY - m.y) * lerpFactor

      // Compute velocity vector & speed
      m.vx = (m.x - prevX) * 12.0
      m.vy = (m.y - prevY) * 12.0
      m.speed = Math.sqrt(m.vx * m.vx + m.vy * m.vy)

      // Hover strength relaxation
      const targetStrength = m.isHovering ? 1.0 : 0.0
      m.hoverStrength += (targetStrength - m.hoverStrength) * 0.08

      // Update uniforms safely
      if (uMouseLoc) glCtx.uniform2f(uMouseLoc, m.x, m.y)
      if (uVelocityLoc) glCtx.uniform2f(uVelocityLoc, m.vx, m.vy)
      if (uStrengthLoc) glCtx.uniform1f(uStrengthLoc, m.hoverStrength)
      if (uTimeLoc) glCtx.uniform1f(uTimeLoc, elapsed)
      if (uResolutionLoc && canvas) glCtx.uniform2f(uResolutionLoc, canvas.width, canvas.height)

      // Draw full-screen displaced text quad
      glCtx.drawArrays(glCtx.TRIANGLES, 0, 6)

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      glCtx.deleteProgram(program)
      glCtx.deleteBuffer(positionBuffer)
      if (textTexture) glCtx.deleteTexture(textTexture)
    }
  }, [])

  // 2D Canvas Fallback (if WebGL is not supported)
  function render2DFallback(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.clientWidth * dpr
    canvas.height = canvas.clientHeight * dpr
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = `900 ${Math.floor(canvas.width * 0.125)}px "Inter", "Arial Black", sans-serif`
    ctx.fillStyle = "#000000"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("HARIPRASHATH", canvas.width / 2, canvas.height * 0.48)
  }

  // Mouse Move Event Listener
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height

    const m = mouseRef.current
    m.targetX = nx
    m.targetY = ny
    m.isHovering = true
  }, [])

  const handleMouseEnter = useCallback(() => {
    mouseRef.current.isHovering = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isHovering = false
  }, [])

  // Touch handlers for mobile
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return
    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const nx = (touch.clientX - rect.left) / rect.width
    const ny = (touch.clientY - rect.top) / rect.height

    const m = mouseRef.current
    m.targetX = nx
    m.targetY = ny
    m.isHovering = true
  }, [])

  const handleTouchEnd = useCallback(() => {
    mouseRef.current.isHovering = false
  }, [])

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-white overflow-hidden select-none cursor-default"
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* 
        ========================================================================
        LAYER 1: PURE WHITE BACKGROUND & LIQUID DISPLACEMENT TYPOGRAPHY CANVAS
        ========================================================================
        Camera zoom-out: starts scaled to 1.7x + blurred, pulls back to 1x
        over exactly 3 seconds. All animated values are set via inline style
        (not Tailwind classes) so the transition always fires reliably.
      */}
      <div
        className="absolute inset-0 w-full h-full z-10 pointer-events-none origin-center"
        style={{
          transform: textVisible ? "scale(1)" : "scale(1.7)",
          opacity: textVisible ? 1 : 0,
          filter: textVisible ? "blur(0px)" : "blur(10px)",
          transition:
            "transform 3000ms cubic-bezier(0.19, 1, 0.22, 1), " +
            "opacity 1400ms cubic-bezier(0.19, 1, 0.22, 1), " +
            "filter 2000ms ease-out",
          willChange: "transform, opacity, filter",
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* 
        ========================================================================
        LAYER 2: FOREGROUND HIGH-CONTRAST PORTRAIT SILHOUETTE (PROMINENT CENTER)
        ========================================================================
        Pops up smoothly from below AFTER the 3s text zoom-out finishes.
        Animated via inline style with a slight overshoot easing for a
        genuine "pop" feel rather than a flat slide.
      */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-end justify-center h-[82vh] sm:h-[86vh] md:h-[90vh] lg:h-[94vh] w-auto max-w-none origin-bottom"
        style={{
          transform: portraitVisible
            ? "translateY(0%) scale(1)"
            : "translateY(55%) scale(0.96)",
          opacity: portraitVisible ? 1 : 0,
          transition:
            "transform 1100ms cubic-bezier(0.22, 1.2, 0.36, 1), " +
            "opacity 800ms ease-out",
          willChange: "transform, opacity",
        }}
      >
        <Image
          src="/portfolio-hero-section.png"
          alt="Hariprashath - Portrait Silhouette"
          width={1920}
          height={1080}
          priority
          className="w-auto h-full max-w-none object-contain object-bottom origin-bottom drop-shadow-2xl"
          style={{
            filter: "contrast(1.05) brightness(0.98)",
          }}
        />
      </div>

      {/* Subtle bottom scroll fade/transition gradient to cleanly blend into existing portfolio */}
      <div 
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-30" 
        aria-hidden="true" 
      />
    </section>
  )
}