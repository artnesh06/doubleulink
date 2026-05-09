import { useState } from 'react'

const DESIGN_SUBS = [
  { id: 'design-theme',    label: 'Theme' },
  { id: 'design-header',   label: 'Header' },
  { id: 'design-text',     label: 'Text' },
  { id: 'design-buttons',  label: 'Buttons' },
  { id: 'design-card',     label: 'Card' },
  { id: 'design-wallpaper',label: 'Wallpaper' },
  { id: 'design-spacing',  label: 'Spacing' },
]

export default function LeftPanel({ open, activeSection, onSelect, theme = {} }) {
  const isLight     = theme.id === 'bright' || theme.id === 'rose'
  const panelBg     = theme.pageBg || '#111111'
  const panelBorder = isLight ? '#dddddd' : '#1e1e1e'
  const textActive  = theme.textColor || '#ffffff'
  const textInactive = theme.subColor || '#888888'
  const activeBg    = isLight ? '#e8e8e8' : '#2a2a2a'
  const subActiveBg = isLight ? '#eeeeee' : '#1e1e1e'
  const labelColor  = isLight ? '#aaaaaa' : '#444444'

  const [designOpen, setDesignOpen] = useState(true)
  const isDesign = activeSection.startsWith('design')

  function handleDesignClick() {
    if (!designOpen) { setDesignOpen(true); onSelect('design-theme') }
    else setDesignOpen(false)
  }

  const navBtn = (id, label, icon) => {
    const active = activeSection === id
    return (
      <button key={id} onClick={() => onSelect(id)} style={{
        background: active ? activeBg : 'transparent',
        border: 'none', color: active ? textActive : textInactive,
        padding: '9px 12px', borderRadius: '8px', cursor: 'pointer',
        fontSize: '14px', fontWeight: active ? 600 : 400,
        textAlign: 'left', width: '100%', fontFamily: 'Inter, sans-serif',
        display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.15s',
      }}>
        {icon && <span style={{ fontSize: '15px', width: '18px', textAlign: 'center' }}>{icon}</span>}
        {label}
      </button>
    )
  }

  return (
    <>
      <style>{`
        .left-panel {
          position: fixed; top: 0; left: 0; bottom: 0; width: 220px;
          background: ${panelBg}; border-right: 1px solid ${panelBorder};
          z-index: 100; display: flex; flex-direction: column;
          padding: 20px 10px; transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
          font-family: Inter, sans-serif; overflow-y: auto;
        }
        .left-panel.open { transform: translateX(0); }
        .left-panel::-webkit-scrollbar { width: 0; }
        .lp-sub-item {
          display: flex; align-items: center;
          padding: 7px 12px 7px 32px; border-radius: 8px;
          cursor: pointer; font-size: 13px; font-family: Inter, sans-serif;
          border: none; width: 100%; text-align: left; transition: all 0.15s;
        }
      `}</style>

      <div className={'left-panel' + (open ? ' open' : '')}>

        {/* Logo */}
        <div style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '18px', fontStyle: 'italic', color: textActive, marginBottom: '24px', paddingLeft: '4px' }}>
          /w/
        </div>

        {/* MY WLINKS */}
        <p style={{ fontSize: '10px', fontWeight: 700, color: labelColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px', paddingLeft: '4px' }}>
          My Wlinks
        </p>

        {navBtn('links', 'Links', '🔗')}
        {navBtn('shop', 'Shop', '🛍️')}

        {/* Design collapsible */}
        <button onClick={handleDesignClick} style={{
          background: isDesign ? activeBg : 'transparent', border: 'none',
          color: isDesign ? textActive : textInactive, padding: '9px 12px',
          borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
          fontWeight: isDesign ? 600 : 400, textAlign: 'left', width: '100%',
          fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', transition: 'all 0.15s',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '15px', width: '18px', textAlign: 'center' }}>🎨</span>
            Design
          </span>
          <span style={{ fontSize: '10px', color: textInactive, transform: designOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}>▼</span>
        </button>

        {designOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '2px' }}>
            {DESIGN_SUBS.map(s => (
              <button key={s.id} onClick={() => onSelect(s.id)} className="lp-sub-item" style={{
                background: activeSection === s.id ? subActiveBg : 'transparent',
                color: activeSection === s.id ? textActive : textInactive,
                fontWeight: activeSection === s.id ? 600 : 400,
              }}>
                {activeSection === s.id && <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: textActive, marginRight: '8px', flexShrink: 0 }} />}
                {s.label}
              </button>
            ))}
          </div>
        )}

        {navBtn('insights', 'Insights', '📊')}

        <div style={{ flex: 1, minHeight: '20px' }} />
      </div>
    </>
  )
}
