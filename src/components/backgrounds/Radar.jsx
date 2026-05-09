import { useEffect, useRef } from 'react'

export default function Radar({ color = '#00ff88', speed = 1, opacity = 0.5, rings = 4 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, angle = 0, dots = []

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2, cy = canvas.height / 2
      const maxR = Math.min(cx, cy) * 0.9

      // Rings
      for (let i = 1; i <= rings; i++) {
        const r = (maxR / rings) * i
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = color
        ctx.lineWidth = 0.5
        ctx.globalAlpha = opacity * 0.4
        ctx.stroke()
      }

      // Cross lines
      ctx.globalAlpha = opacity * 0.3
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5
      ctx.beginPath(); ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR); ctx.stroke()

      // Sweep
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)
      const grad = ctx.createLinearGradient(0, 0, maxR, 0)
      grad.addColorStop(0, color + 'cc')
      grad.addColorStop(1, color + '00')
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, maxR, -0.3, 0)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.globalAlpha = opacity
      ctx.fill()
      ctx.restore()

      // Sweep line
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(maxR, 0)
      ctx.strokeStyle = color
      ctx.lineWidth = 1.5
      ctx.globalAlpha = opacity
      ctx.stroke()
      ctx.restore()

      // Dots that appear after sweep
      dots = dots.filter(d => d.life > 0)
      if (Math.random() < 0.05) {
        const r = Math.random() * maxR
        dots.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, life: 1 })
      }
      dots.forEach(d => {
        d.life -= 0.01
        ctx.beginPath()
        ctx.arc(d.x, d.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = d.life * opacity
        ctx.fill()
      })

      ctx.globalAlpha = 1
      angle += 0.02 * speed
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [color, speed, opacity, rings])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}
