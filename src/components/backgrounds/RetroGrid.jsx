import { useEffect, useRef } from 'react'

export default function RetroGrid({ color = '#7b2ff7', speed = 1, opacity = 0.4, cellSize = 40 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, offset = 0

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width, h = canvas.height
      const horizon = h * 0.5
      const vp = { x: w / 2, y: horizon }

      ctx.strokeStyle = color
      ctx.globalAlpha = opacity

      // Horizontal lines (perspective)
      for (let i = 0; i < 20; i++) {
        const y = horizon + (i * cellSize * (1 + i * 0.1)) + (offset % cellSize) * (1 + i * 0.1)
        if (y > h) break
        const spread = (y - horizon) / (h - horizon)
        ctx.lineWidth = spread * 1.5
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Vertical lines (perspective)
      const numV = Math.ceil(w / cellSize) + 2
      for (let i = -numV; i <= numV; i++) {
        const xBottom = w / 2 + i * cellSize
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(vp.x, vp.y)
        ctx.lineTo(xBottom, h)
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      offset += speed * 0.5
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [color, speed, opacity, cellSize])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}
