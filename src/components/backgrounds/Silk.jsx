import { useEffect, useRef } from 'react'

export default function Silk({ color = '#7b2ff7', speed = 1, opacity = 0.4 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, t = 0

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width, h = canvas.height
      for (let i = 0; i < 8; i++) {
        const x1 = w * 0.5 + Math.cos(t * 0.7 + i) * w * 0.4
        const y1 = h * 0.5 + Math.sin(t * 0.5 + i) * h * 0.4
        const x2 = w * 0.5 + Math.cos(t * 0.3 + i + 2) * w * 0.3
        const y2 = h * 0.5 + Math.sin(t * 0.6 + i + 2) * h * 0.3
        const grad = ctx.createLinearGradient(x1, y1, x2, y2)
        grad.addColorStop(0, color + '00')
        grad.addColorStop(0.5, color)
        grad.addColorStop(1, color + '00')
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.bezierCurveTo(
          x1 + Math.cos(t + i) * 100, y1 + Math.sin(t + i) * 100,
          x2 + Math.cos(t + i + 1) * 100, y2 + Math.sin(t + i + 1) * 100,
          x2, y2
        )
        ctx.strokeStyle = grad
        ctx.lineWidth = 60
        ctx.globalAlpha = opacity / 8
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      t += 0.008 * speed
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [color, speed, opacity])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}
