// Button Animation Effects
import { useState } from 'react'

// Shimmer Effect
export function ShimmerEffect({ children, style, settings = {} }) {
  const speed = settings.speed || 2
  const color = settings.color || '#ffffff'
  const opacity = settings.opacity || 0.3
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {children}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, rgba(${parseInt(color.slice(1,3), 16)}, ${parseInt(color.slice(3,5), 16)}, ${parseInt(color.slice(5,7), 16)}, ${opacity}), transparent)`,
          animation: `shimmer ${speed}s infinite`,
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  )
}

// Shiny Effect
export function ShinyEffect({ children, style }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {children}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }}
        className="shiny-overlay"
      />
      <style>{`
        div:hover .shiny-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

// Rainbow Effect
export function RainbowEffect({ children, style, settings = {} }) {
  const speed = settings.speed || 3
  return (
    <div style={{ position: 'relative', ...style }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '2px',
          background: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
          backgroundSize: '200% 100%',
          animation: `rainbow ${speed}s linear infinite`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {children}
      <style>{`
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  )
}

// Ripple Effect
export function RippleEffect({ children, style, settings = {} }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {children}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '0',
          height: '0',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.5)',
          transform: 'translate(-50%, -50%)',
          animation: `ripple ${settings.speed || 2}s infinite`,
        }}
      />
      <style>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 200%;
            height: 200%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

// Pulsating Effect
export function PulsatingEffect({ children, style }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      <div
        style={{
          position: 'absolute',
          inset: '-4px',
          borderRadius: 'inherit',
          background: 'inherit',
          opacity: 0.5,
          animation: 'pulsate 2s ease-in-out infinite',
        }}
      />
      {children}
      <style>{`
        @keyframes pulsate {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}

// Glare Effect
export function GlareEffect({ children, style, settings = {} }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const color = settings.color || '#ffffff'
  const opacity = settings.opacity || 0.4
  const size = settings.size || 100

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          top: mousePos.y - size/2,
          left: mousePos.x - size/2,
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle, rgba(${parseInt(color.slice(1,3), 16)}, ${parseInt(color.slice(3,5), 16)}, ${parseInt(color.slice(5,7), 16)}, ${opacity}) 0%, transparent 70%)`,
          pointerEvents: 'none',
          transition: 'opacity 0.2s',
        }}
      />
    </div>
  )
}

// Electric Border Effect
export function ElectricBorderEffect({ children, style, settings = {} }) {
  const speed = settings.speed || 2
  const color1 = settings.color1 || '#00f0ff'
  const color2 = settings.color2 || '#5200ff'
  const color3 = settings.color3 || '#ff00d4'
  const blur = settings.blur || 4
  
  return (
    <div style={{ position: 'relative', ...style }}>
      <div
        style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: 'inherit',
          background: `linear-gradient(90deg, ${color1}, ${color2}, ${color3}, ${color1})`,
          backgroundSize: '300% 100%',
          animation: `electric ${speed}s linear infinite`,
          filter: `blur(${blur}px)`,
          opacity: 0.8,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
      <style>{`
        @keyframes electric {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </div>
  )
}

// Star Border Effect
export function StarBorderEffect({ children, style }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '2px',
          background: 'conic-gradient(from 0deg, #ffd700, #ffed4e, #ffd700)',
          animation: 'rotate 3s linear infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {children}
      <style>{`
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// Border Glow Effect
export function BorderGlowEffect({ children, style }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      <div
        style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: 'inherit',
          background: 'linear-gradient(45deg, #00f0ff, #5200ff)',
          filter: 'blur(8px)',
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
        className="border-glow"
      />
      {children}
      <style>{`
        div:hover .border-glow {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

// Spotlight Effect
export function SpotlightEffect({ children, style }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1), transparent)`,
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  )
}

// Interactive Hover Effect
export function InteractiveHoverEffect({ children, style }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        ...style,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}

// Magnet Effect
export function MagnetEffect({ children, style }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  return (
    <div
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.2s ease-out',
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * 0.15
        const deltaY = (e.clientY - centerY) * 0.15
        setOffset({ x: deltaX, y: deltaY })
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </div>
  )
}

// Pixel Effect
export function PixelEffect({ children, style }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  )
}

// Click Spark Effect (simplified - full version needs canvas)
export function ClickSparkEffect({ children, style }) {
  const [sparks, setSparks] = useState([])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    
    setSparks([...sparks, { id, x, y }])
    setTimeout(() => {
      setSparks(prev => prev.filter(s => s.id !== id))
    }, 600)
  }

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      onClick={handleClick}
    >
      {children}
      {sparks.map(spark => (
        <div
          key={spark.id}
          style={{
            position: 'absolute',
            left: spark.x,
            top: spark.y,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#fff',
            animation: 'spark 0.6s ease-out',
            pointerEvents: 'none',
          }}
        />
      ))}
      <style>{`
        @keyframes spark {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

// Target Cursor Effect
export function TargetCursorEffect({ children, style }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <>
          <div
            style={{
              position: 'absolute',
              left: mousePos.x,
              top: 0,
              width: '1px',
              height: '100%',
              background: 'rgba(255,255,255,0.3)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: mousePos.y,
              width: '100%',
              height: '1px',
              background: 'rgba(255,255,255,0.3)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}
    </div>
  )
}
