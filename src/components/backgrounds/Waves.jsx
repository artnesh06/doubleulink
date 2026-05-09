import { useEffect, useRef } from 'react'

export default function Waves({ color = '#7b2ff7', speed = 1, amplitude = 40, opacity = 0.3, waveCount = 3 }) {
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
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath()
        const yBase = canvas.height * (0.3 + w * 0.2)
        const phase = (w * Math.PI * 2) / waveCount
        ctx.moveTo(0, yBase)
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = yBase + Math.sin((x / canvas.width) * Math.PI * 4 + t + phase) * amplitude
          ctx.lineTo(x, y)
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.globalAlpha = opacity / waveCount
        ctx.fill()
      }
      ctx.globalAlpha = 1
      t += 0.02 * speed
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [color, speed, amplitude, opacity, waveCount])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}
