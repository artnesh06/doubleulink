import { useEffect, useRef } from 'react'

export default function PixelSnow({ color = '#ffffff', speed = 1, opacity = 0.4, count = 80, pixelSize = 3 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, flakes = []

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initFlakes()
    }

    function initFlakes() {
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vy: (Math.random() * 1 + 0.3) * speed,
        vx: (Math.random() - 0.5) * 0.5 * speed,
        size: Math.floor(Math.random() * 2 + 1) * pixelSize,
        alpha: Math.random() * opacity + 0.1,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      flakes.forEach(f => {
        f.y += f.vy
        f.x += f.vx
        if (f.y > canvas.height) { f.y = -f.size; f.x = Math.random() * canvas.width }
        if (f.x < 0) f.x = canvas.width
        if (f.x > canvas.width) f.x = 0
        ctx.fillStyle = color
        ctx.globalAlpha = f.alpha
        ctx.fillRect(Math.round(f.x / f.size) * f.size, Math.round(f.y / f.size) * f.size, f.size, f.size)
      })
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [color, speed, opacity, count, pixelSize])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}
