import { useEffect, useRef } from 'react'
import { avatarPixels } from '../../data/data'

export default function PixelAvatar({ bg = '#ffffff', fg = '#111111', size = 44, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const ps = canvas.width / 11
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = fg
    avatarPixels.forEach(([x, y]) => ctx.fillRect(x * ps, y * ps, ps, ps))
  }, [bg, fg])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
