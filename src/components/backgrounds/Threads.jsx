import { useEffect, useRef } from 'react'

export default function Threads({ color = '#7b2ff7', speed = 1, opacity = 0.3, count = 12 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, t = 0, threads = []

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initThreads()
    }

    function initThreads() {
      threads = Array.from({ length: count }, (_, i) => ({
        phase: (i / count) * Math.PI * 2,
        amp: 50 + Math.random() * 100,
        freq: 0.5 + Math.random() * 1.5,
        yBase: (canvas.height / count) * i,
        width: 0.5 + Math.random() * 1.5,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      threads.forEach(th => {
        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = th.yBase + Math.sin(x * 0.005 * th.freq + t + th.phase) * th.amp
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = color
        ctx.lineWidth = th.width
        ctx.globalAlpha = opacity
        ctx.stroke()
      })
      ctx.globalAlpha = 1
      t += 0.015 * speed
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [color, speed, opacity, count])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}
