'use client'

import { useEffect, useRef } from 'react'

interface Blob {
  x: number
  y: number
  radius: number
  color: string
  phaseX: number
  phaseY: number
  freqX: number
  freqY: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
  radius: number
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const blobsRef = useRef<Blob[]>([])
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const prefersReducedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedRef.current = mq.matches

    let w = 0
    let h = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = window.innerHeight
      initBlobs()
      initParticles()
    }

    function initBlobs() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      blobsRef.current = [
        { x: w * 0.3, y: h * 0.4, radius: w * 0.3, color: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.05)', phaseX: 0, phaseY: Math.PI / 3, freqX: 0.0003, freqY: 0.00025 },
        { x: w * 0.7, y: h * 0.5, radius: w * 0.25, color: isDark ? 'rgba(99, 102, 241, 0.07)' : 'rgba(37, 99, 235, 0.05)', phaseX: Math.PI / 2, phaseY: 0, freqX: 0.0002, freqY: 0.00035 },
        { x: w * 0.5, y: h * 0.7, radius: w * 0.2, color: isDark ? 'rgba(6, 182, 212, 0.06)' : 'rgba(6, 182, 212, 0.04)', phaseX: Math.PI, phaseY: Math.PI / 2, freqX: 0.0004, freqY: 0.0002 },
      ]
    }

    function initParticles() {
      const count = w < 640 ? 50 : w < 1024 ? 90 : 160
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        baseX: Math.random() * w,
        baseY: Math.random() * h,
        radius: Math.random() * 1.5 + 1
      }))
    }

    function drawBlobs(time: number) {
      for (const blob of blobsRef.current) {
        const dx = Math.sin(time * blob.freqX + blob.phaseX) * 30
        const dy = Math.cos(time * blob.freqY + blob.phaseY) * 30

        const gradient = ctx!.createRadialGradient(
          blob.x + dx, blob.y + dy, 0,
          blob.x + dx, blob.y + dy, blob.radius
        )
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, 'transparent')

        ctx!.beginPath()
        ctx!.fillStyle = gradient
        ctx!.globalCompositeOperation = 'screen'
        ctx!.arc(blob.x + dx, blob.y + dy, blob.radius, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function drawParticles() {
      const particles = particlesRef.current
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      const particleColor = isDark ? 'rgba(56, 189, 248, 0.9)' : 'rgba(2, 132, 199, 0.8)'
      const lineColor = isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.2)'
      const mouse = mouseRef.current

      ctx!.globalCompositeOperation = 'source-over'

      for (const p of particles) {
        // Distance to mouse
        const dxMouse = mouse.x - p.x
        const dyMouse = mouse.y - p.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

        // Mouse attraction physics
        if (distMouse < 250) {
          const force = (250 - distMouse) / 250
          p.vx += (dxMouse / distMouse) * force * 0.6
          p.vy += (dyMouse / distMouse) * force * 0.6
        }

        // Add some random wander
        p.vx += (Math.random() - 0.5) * 0.1
        p.vy += (Math.random() - 0.5) * 0.1

        // Apply friction
        p.vx *= 0.98
        p.vy *= 0.98

        // Limit max speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 4) {
          p.vx = (p.vx / speed) * 4
          p.vy = (p.vy / speed) * 4
        }
        
        // Minimum speed to keep them moving when not attracted
        if (speed < 0.2) {
          p.vx *= 1.1
          p.vy *= 1.1
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges instead of harsh bouncing for a smoother look
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx!.beginPath()
        ctx!.fillStyle = particleColor
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fill()
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            const opacity = (1 - dist / 120) * (isDark ? 0.3 : 0.25)
            ctx!.beginPath()
            ctx!.strokeStyle = lineColor
            ctx!.globalAlpha = opacity
            ctx!.lineWidth = 0.8
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }
      ctx!.globalAlpha = 1
    }

    function animate(time: number) {
      if (prefersReducedRef.current) return

      ctx!.clearRect(0, 0, w, h)
      drawBlobs(time)
      drawParticles()

      animRef.current = requestAnimationFrame(animate)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    if (!prefersReducedRef.current) {
      animRef.current = requestAnimationFrame(animate)
    }

    const themeObserver = new MutationObserver(() => {
      initBlobs()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      themeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}
