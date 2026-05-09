// Aurora background animation

export default function Aurora({ color1 = '#7b2ff7', color2 = '#00d4ff', color3 = '#ff6b6b', speed = 1, opacity = 0.6 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <style>{`
        @keyframes aurora1 {
          0%, 100% { transform: translate(-20%, -20%) scale(1.2) rotate(0deg); }
          50% { transform: translate(20%, 20%) scale(0.8) rotate(180deg); }
        }
        @keyframes aurora2 {
          0%, 100% { transform: translate(20%, -30%) scale(0.9) rotate(0deg); }
          50% { transform: translate(-20%, 30%) scale(1.3) rotate(-180deg); }
        }
        @keyframes aurora3 {
          0%, 100% { transform: translate(-10%, 20%) scale(1.1) rotate(0deg); }
          50% { transform: translate(10%, -20%) scale(0.9) rotate(90deg); }
        }
      `}</style>
      <div style={{
        position: 'absolute', width: '80%', height: '80%', top: '-20%', left: '-20%',
        background: color1, borderRadius: '50%', filter: 'blur(80px)',
        opacity, animation: `aurora1 ${8 / speed}s ease-in-out infinite`,
      }} />
      <div style={{
        position: 'absolute', width: '70%', height: '70%', top: '10%', right: '-20%',
        background: color2, borderRadius: '50%', filter: 'blur(80px)',
        opacity, animation: `aurora2 ${10 / speed}s ease-in-out infinite`,
      }} />
      <div style={{
        position: 'absolute', width: '60%', height: '60%', bottom: '-10%', left: '20%',
        background: color3, borderRadius: '50%', filter: 'blur(80px)',
        opacity, animation: `aurora3 ${12 / speed}s ease-in-out infinite`,
      }} />
    </div>
  )
}
