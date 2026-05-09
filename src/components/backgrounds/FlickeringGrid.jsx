import { useEffect, useRef } from 'react'

export default function FlickeringGrid({ color = '#ffffff', cellSize = 20, flickerSpeed = 1, opacity = 0.15 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let cells = []

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initCells()
    }

    function initCells() {
      cells = []
      const cols = Math.ceil(canvas.width / cellSize)
      const rows = Math.ceil(canvas.height / cellSize)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            x: c * cellSize, y: r * cellSize,
            alpha: Math.random() * opacity,
            target: Math.random() * opacity,
            speed: (Math.random() * 0.02 + 0.005) * flickerSpeed,
          })
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      cells.forEach(cell => {
        if (Math.abs(cell.alpha - cell.target) < 0.005) {
          cell.target = Math.random() * opacity
        }
        cell.alpha += (cell.target - cell.alpha) * cell.speed
        ctx.fillStyle = color
        ctx.globalAlpha = cell.alpha
        ctx.fillRect(cell.x + 1, cell.y + 1, cellSize - 2, cellSize - 2)
      })
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [color, cellSize, flickerSpeed, opacity])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}
