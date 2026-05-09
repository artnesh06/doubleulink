import { useEffect, useRef } from 'react'

export default function Lightning({ color = '#7b2ff7', speed = 1, opacity = 0.6, branches = 5 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let bolts = []
    let nextBolt = 0

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function createBolt(x, y, angle, length, depth) {
      if (depth <= 0 || length < 5) return []
      const segments = []
      let cx = x, cy = y
      const segLen = length / 8
      for (let i = 0; i < 8; i++) {
        const nx = cx + Math.cos(angle) * segLen + (Math.random() - 0.5) * 30
        const ny = cy + Math.sin(angle) * segLen + (Math.random() - 0.5) * 30
        segments.push({ x1: cx, y1: cy, x2: nx, y2: ny, alpha: opacity, depth })
        if (Math.random() < 0.3 && depth > 1) {
          const branchAngle = angle + (Math.random() - 0.5) * 1.5
          segments.push(...createBolt(nx, ny, branchAngle, length * 0.5, depth - 1))
        }
        cx = nx; cy = ny
      }
      return segments
    }

    function draw(ts) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (ts > nextBolt) {
        const x = Math.random() * canvas.width
        bolts.push({
          segments: createBolt(x, 0, Math.PI / 2 + (Math.random() - 0.5) * 0.5, canvas.height * 0.8, branches),
          life: 1,
        })
        nextBolt = ts + (500 + Math.random() * 1000) / speed
      }
      bolts = bolts.filter(b => b.life > 0)
      bolts.forEach(bolt => {
        bolt.life -= 0.05 * speed
        bolt.segments.forEach(seg => {
          ctx.beginPath()
          ctx.moveTo(seg.x1, seg.y1)
          ctx.lineTo(seg.x2, seg.y2)
          ctx.strokeStyle = color
          ctx.lineWidth = seg.depth * 0.8
          ctx.globalAlpha = bolt.life * seg.alpha
          ctx.shadowColor = color
          ctx.shadowBlur = 10
          ctx.stroke()
        })
      })
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      animId = requestAnimationFrame(draw)
    }

    resize()
    animId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [color, speed, opacity, branches])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}
