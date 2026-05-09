import PixelAvatar from './PixelAvatar'

export default function ShopCard({ name, price, badge, bg, fg, url, theme, cornerRadius = '14px', hoverZoom = 1 }) {
  const cardBg  = theme?.linkBg    || '#0d0d0d'
  const text    = theme?.textColor || '#ffffff'
  const sub     = theme?.subColor  || '#aaaaaa'
  const badgeBg = theme?.badgeBg   || '#2a2a2a'

  const rawPx = parseInt(cornerRadius)
  const cappedRadius = isNaN(rawPx) ? '14px' : Math.min(rawPx, 24) + 'px'

  return (
    <a href={url || '#'} target="_blank" rel="noopener noreferrer"
      style={{
        background: cardBg,
        borderRadius: cappedRadius,
        overflow: 'hidden', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', textDecoration: 'none',
        transition: 'border-radius 0.3s ease, transform 0.2s cubic-bezier(0.4,0,0.2,1)',
      }}
      onMouseEnter={e => { if (hoverZoom > 1) e.currentTarget.style.transform = `scale(${hoverZoom})` }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      <div style={{ width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <PixelAvatar bg={bg} fg={fg} size={80} className="w-full h-full" />
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: text, marginBottom: '4px' }}>{name}</div>
        <div style={{ fontSize: '12px', color: sub }}>{price}</div>
        <span style={{
          display: 'inline-block', fontSize: '10px', fontWeight: 600,
          background: badgeBg, color: sub,
          borderRadius: '4px', padding: '2px 6px', marginTop: '4px',
        }}>{badge}</span>
      </div>
    </a>
  )
}
