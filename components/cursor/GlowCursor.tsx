'use client'

import { useEffect, useRef, useState } from 'react'

export function GlowCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) return

    const move = (e: MouseEvent) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
    }

    const lerp = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.2
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.2

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`
      }

      rafRef.current = requestAnimationFrame(lerp)
    }

    targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    rafRef.current = requestAnimationFrame(lerp)
    document.addEventListener('mousemove', move, { passive: true })

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!mounted || ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0)) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-opacity duration-200"
      style={{
        backgroundColor: 'var(--accent)',
        boxShadow: '0 0 12px 3px var(--accent-pulse)',
        opacity: 1,
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
