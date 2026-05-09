import { useEffect, useRef } from 'react'

export default function Orb({ color = '#7b2ff7', speed = 1, opacity = 0.5, size = 300 }) {
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
      const x = w / 2 + Math.sin(t * 0.7) * w * 0.2
      const y = h / 2 + Math.cos(t * 0.5) * h * 0.2
      const grad = ctx.createRadialGradient(x, y, 0, x, y, size)
      grad.addColorStop(0, color)
      grad.addColorStop(0.4, color + '88')
      grad.addColorStop(1, color + '00')
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.globalAlpha = opacity
      ctx.fill()
      ctx.globalAlpha = 1
      t += 0.01 * speed
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [color, speed, opacity, size])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}
