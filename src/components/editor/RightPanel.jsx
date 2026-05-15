import { THEMES } from '../../data/themes'
import { BG_ANIMATIONS } from '../backgrounds'

const FONTS = [
  { name: 'Inter', category: 'Sans-serif' }, { name: 'Poppins', category: 'Sans-serif' },
  { name: 'DM Sans', category: 'Sans-serif' }, { name: 'Nunito', category: 'Rounded' },
  { name: 'Sora', category: 'Sans-serif' }, { name: 'Outfit', category: 'Sans-serif' },
  { name: 'Raleway', category: 'Elegant' }, { name: 'Oswald', category: 'Condensed' },
  { name: 'Roboto', category: 'Sans-serif' }, { name: 'Lora', category: 'Serif' },
  { name: 'Merriweather', category: 'Serif' }, { name: 'Playfair Display', category: 'Serif' },
  { name: 'Abril Fatface', category: 'Display' }, { name: 'Bebas Neue', category: 'Display' },
  { name: 'Dancing Script', category: 'Handwriting' }, { name: 'Pacifico', category: 'Handwriting' },
  { name: 'Caveat', category: 'Handwriting' }, { name: 'Space Mono', category: 'Monospace' },
  { name: 'Fira Code', category: 'Monospace' }, { name: 'JetBrains Mono', category: 'Monospace' },
]

const SECTION_LABELS = {
  links: 'Links', shop: 'Shop', insights: 'Insights',
  'design-theme': 'Design - Theme', 'design-header': 'Design - Header',
  'design-text': 'Design - Text', 'design-buttons': 'Design - Buttons',
  'design-card': 'Design - Card', 'design-wallpaper': 'Design - Wallpaper',
  'design-spacing': 'Design - Spacing',
}

function ColorRow({ label, value, onChange, lbl, inputBg, inputBorder, inputColor }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={lbl}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="color"
          value={value || '#000000'}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '40px', height: '40px', borderRadius: '8px',
            border: '1px solid ' + inputBorder,
            background: 'none', cursor: 'pointer', padding: '2px',
          }}
        />
        <input
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          style={{
            flex: 1,
            background: inputBg,
            border: '1px solid ' + inputBorder,
            borderRadius: '10px',
            padding: '9px 12px',
            color: inputColor,
            fontSize: '13px',
            outline: 'none',
            fontFamily: 'Inter, sans-serif',
          }}
        />
      </div>
    </div>
  )
}

// Corner preview SVGs
const CORNER_PREVIEWS = {
  square:  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2 L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M2 2 L14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  round:   <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 10 L2 5 Q2 2 5 2 L10 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
  rounder: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12 L2 6 Q2 2 6 2 L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
  full:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 14 L2 8 Q2 2 8 2 L14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
}

function ToggleGroup({ options, value, onChange, columns, toggleActive, toggleInactive, toggleActiveBorder, toggleInactiveBorder, toggleActiveText, toggleInactiveText, showCornerPreview }) {
  const cols = columns || options.length
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: '6px' }}>
      {options.map(opt => {
        const id    = typeof opt === 'string' ? opt.toLowerCase() : opt.id
        const label = typeof opt === 'string' ? opt : opt.label
        const active = value === id
        const preview = showCornerPreview ? CORNER_PREVIEWS[id] : null
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              background: active ? toggleActive : toggleInactive,
              border: '1.5px solid ' + (active ? toggleActiveBorder : toggleInactiveBorder),
              borderRadius: '8px',
              padding: preview ? '10px 4px 6px' : '7px 4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: active ? 600 : 400,
              color: active ? toggleActiveText : toggleInactiveText,
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.15s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {preview && <span style={{ opacity: active ? 1 : 0.5 }}>{preview}</span>}
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default function RightPanel({
  open, activeSection,
  profile, links,
  activeThemeId, wallpaper, cardBg,
  textSettings, buttonSettings, customColors,
  spacing, cornerRadius,
  saved, theme,
  onSave, onReset,
  onThemeChange, onWallpaperChange, onCardBgChange,
  onTextSettingsChange, onButtonSettingsChange, onCustomColorsChange,
  onSpacingChange, onCornerRadiusChange,
  onUpdateProfile,
  onAddLink, onUpdateLink, onRemoveLink,
}) {
  const t = theme || {}
  const isLight = t.id === 'bright' || t.id === 'rose'
  const panelBg     = t.pageBg || '#111111'
  const panelBorder = isLight ? '#dddddd' : '#1e1e1e'
  const panelText   = t.textColor || '#ffffff'
  const panelSub    = t.subColor || '#888888'
  const inputBg     = isLight ? '#f0f0f0' : '#0d0d0d'
  const inputBorder = isLight ? '#cccccc' : '#222222'
  const inputColor  = t.textColor || '#ffffff'
  const panelCardBg = isLight ? '#e8e8e8' : '#1a1a1a'
  const panelCardBorder = isLight ? '#cccccc' : '#222222'
  const toggleActive   = isLight ? '#cccccc' : '#2a2a2a'
  const toggleInactive = isLight ? '#e8e8e8' : '#1a1a1a'
  const toggleActiveBorder   = isLight ? '#aaaaaa' : '#444444'
  const toggleInactiveBorder = isLight ? '#cccccc' : '#222222'
  const toggleActiveText   = t.textColor || '#ffffff'
  const toggleInactiveText = t.subColor || '#666666'

  const inp = {
    width: '100%',
    background: inputBg,
    border: '1px solid ' + inputBorder,
    borderRadius: '10px',
    padding: '11px 14px',
    color: inputColor,
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
  }

  const lbl = {
    fontSize: '11px',
    fontWeight: 600,
    color: panelSub,
    display: 'block',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
  }

  const ttl = {
    fontSize: '15px',
    fontWeight: 700,
    color: panelText,
    fontFamily: 'Inter, sans-serif',
    margin: '0 0 18px',
  }

  const divider = { borderTop: '1px solid ' + panelBorder, margin: '18px 0' }

  const tgProps = { toggleActive, toggleInactive, toggleActiveBorder, toggleInactiveBorder, toggleActiveText, toggleInactiveText }
  const crProps = { lbl, inputBg, inputBorder, inputColor }

  return (
    <>
      <style>{`
        .right-panel {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: 450px;
          background: ${panelBg};
          border-left: 1px solid ${panelBorder};
          z-index: 100;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
          font-family: Inter, sans-serif;
          overflow: hidden;
        }
        .right-panel.open { transform: translateX(0); }
        .rp-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 18px;
        }
        .rp-body::-webkit-scrollbar { width: 3px; }
        .rp-body::-webkit-scrollbar-thumb {
          background: ${isLight ? '#cccccc' : '#2a2a2a'};
          border-radius: 4px;
        }
      `}</style>

      <div className={'right-panel' + (open ? ' open' : '')}>

        {/* Header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid ' + panelBorder,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          gap: '8px',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: panelSub, flex: 1 }}>
            {SECTION_LABELS[activeSection] || activeSection}
          </span>

          {/* Reset button */}
          <button
            onClick={onReset}
            title="Reset to default"
            style={{
              background: isLight ? '#e0e0e0' : '#3a3a3a',
              color: isLight ? '#555555' : '#aaaaaa',
              border: '1px solid ' + (isLight ? '#cccccc' : '#4a4a4a'),
              borderRadius: '999px',
              padding: '5px 12px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            Reset
          </button>

          {/* Save button */}
          <button
            onClick={onSave}
            style={{
              background: saved ? '#0d1f0d' : (isLight ? '#111111' : '#ffffff'),
              color: saved ? '#6bcb77' : (isLight ? '#ffffff' : '#000000'),
              border: 'none',
              borderRadius: '999px',
              padding: '6px 16px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>

        <div className="rp-body">

          {/* LINKS */}
          {activeSection === 'links' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <p style={ttl}>Links</p>
                <button onClick={onAddLink} style={{ background: isLight ? '#111111' : '#ffffff', color: isLight ? '#ffffff' : '#000000', border: 'none', borderRadius: '999px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  + Add
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link, i) => (
                  <div key={link.id} style={{ background: panelCardBg, border: '1px solid ' + panelCardBorder, borderRadius: '12px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontSize: '11px', color: panelSub, fontWeight: 600 }}>Link {i + 1}</span>
                      <button onClick={() => onRemoveLink(link.id)} style={{ background: 'none', border: 'none', color: panelSub, cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: 0 }}>x</button>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <label style={lbl}>Label</label>
                      <input style={inp} value={link.label} onChange={e => onUpdateLink(link.id, 'label', e.target.value)} />
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <label style={lbl}>URL</label>
                      <input style={inp} value={link.url} onChange={e => onUpdateLink(link.id, 'url', e.target.value)} />
                    </div>
                    <div>
                      <label style={lbl}>Icon</label>
                      <select style={{ ...inp, cursor: 'pointer' }} value={link.icon || ''} onChange={e => onUpdateLink(link.id, 'icon', e.target.value || null)}>
                        <option value="">None</option>
                        <option value="instagram">Instagram</option>
                        <option value="x">X / Twitter</option>
                        <option value="pinterest">Pinterest</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SHOP */}
          {activeSection === 'shop' && (
            <div>
              <p style={ttl}>Shop</p>
              <div style={{ background: panelCardBg, border: '1px solid ' + panelCardBorder, borderRadius: '14px', padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🛍️</div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: panelText, marginBottom: '6px' }}>Shop editor coming soon</p>
                <p style={{ fontSize: '13px', color: panelSub, lineHeight: 1.6 }}>Add NFTs, prints, and products here.</p>
              </div>
            </div>
          )}

          {/* DESIGN - THEME */}
          {activeSection === 'design-theme' && (
            <div>
              <p style={ttl}>Theme</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 12px' }}>
                {THEMES.map(th => {
                  const active = activeThemeId === th.id
                  const previewBg = th.preview.image
                    ? `linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.24) 100%), url(${th.preview.image}) center/cover`
                    : th.preview.bg
                  const previewText = th.preview.text || panelText
                  const previewBtn = th.preview.btn || th.linkBg
                  const previewBtnText = th.preview.textOnButton || th.linkTextColor || th.textColor

                  return (
                    <button
                      key={th.id}
                      onClick={() => onThemeChange(th.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        textAlign: 'center',
                        outline: 'none',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      <div style={{
                        position: 'relative',
                        minHeight: '126px',
                        borderRadius: '18px',
                        overflow: 'hidden',
                        background: previewBg,
                        border: active
                          ? '3px solid ' + (isLight ? '#111111' : '#ffffff')
                          : '1.5px solid ' + (isLight ? '#d5d5d5' : '#333333'),
                        boxShadow: active
                          ? `0 0 0 2px ${isLight ? '#ffffff' : panelBg}, 0 8px 24px rgba(0,0,0,0.22)`
                          : 'none',
                        transition: 'border 0.15s, box-shadow 0.15s, transform 0.15s',
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '14px',
                          left: '14px',
                          color: previewText,
                          fontSize: '35px',
                          lineHeight: 1,
                          fontWeight: th.font === 'Playfair Display' ? 700 : 600,
                          fontFamily: th.font ? `'${th.font}', serif` : 'Inter, sans-serif',
                        }}>
                          Aa
                        </div>
                        <div style={{
                          position: 'absolute',
                          left: '18px',
                          right: '18px',
                          bottom: '20px',
                          height: '34px',
                          borderRadius: '999px',
                          background: previewBtn,
                          color: previewBtnText,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 700,
                          boxShadow: th.preview.image ? '0 8px 22px rgba(0,0,0,0.22)' : 'none',
                        }}>
                          Links
                        </div>
                        {active && (
                          <div style={{
                            position: 'absolute',
                            top: '9px',
                            right: '9px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: isLight ? '#111111' : '#ffffff',
                            color: isLight ? '#ffffff' : '#111111',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '13px',
                            fontWeight: 800,
                          }}>
                            ✓
                          </div>
                        )}
                      </div>
                      <span style={{
                        display: 'block',
                        color: active ? panelText : panelSub,
                        fontSize: '13px',
                        fontWeight: active ? 700 : 500,
                        marginTop: '7px',
                      }}>
                        {th.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* DESIGN - CARD */}
          {activeSection === 'design-card' && (
            <div>
              <p style={ttl}>Card Background</p>

              {/* ── Style ── */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ ...lbl, marginBottom: '10px' }}>Card style</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {[
                    { id: 'fill',     label: 'Fill',     preview: cardBg?.color || '#242424' },
                    { id: 'gradient', label: 'Gradient', preview: `linear-gradient(${cardBg?.gradientDeg ?? 135}deg, ${cardBg?.color || '#242424'}, ${cardBg?.gradientColor2 ?? '#2a2a2a'})` },
                    { id: 'blur',     label: 'Blur',     preview: cardBg?.color || '#242424', blur: true },
                    { id: 'dots',     label: 'Pattern',  preview: cardBg?.color || '#242424', dots: true },
                    { id: 'image',    label: 'Image',    preview: cardBg?.imageUrl },
                  ].map(s => (
                    <button key={s.id} onClick={() => onCardBgChange({ style: s.id })} style={{
                      border: (cardBg?.style || 'fill') === s.id ? '2px solid #ffffff' : `2px solid ${inputBorder}`,
                      borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
                      padding: 0, background: 'none', outline: 'none',
                    }}>
                      <div style={{
                        height: '56px',
                        background: s.preview
                          ? (s.id === 'image' && s.preview ? `url(${s.preview}) center/cover` : s.preview)
                          : (isLight ? '#e0e0e0' : '#1a1a1a'),
                        filter: s.blur ? 'blur(4px)' : 'none',
                        display: 'flex', alignItems: 'flex-end', padding: '6px',
                        position: 'relative',
                      }}>
                        {s.dots && (
                          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #ffffff44 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                        )}
                        {s.id === 'image' && !s.preview && (
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: panelSub, fontSize: '20px' }}>🖼️</div>
                        )}
                      </div>
                      <div style={{ padding: '5px 0', fontSize: '11px', fontWeight: 500, color: (cardBg?.style || 'fill') === s.id ? panelText : panelSub, textAlign: 'center', background: panelCardBg }}>
                        {s.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Image upload ── */}
              {cardBg?.style === 'image' && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={lbl}>Background image</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {cardBg.imageUrl && (
                      <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `1px solid ${inputBorder}` }}>
                        <img src={cardBg.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <label style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      background: toggleInactive, border: `1.5px solid ${toggleInactiveBorder}`,
                      borderRadius: '999px', padding: '8px 16px',
                      cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: panelText,
                    }}>
                      ✏️ {cardBg.imageUrl ? 'Edit' : 'Upload'}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                        const file = e.target.files[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = ev => onCardBgChange({ imageUrl: ev.target.result })
                        reader.readAsDataURL(file)
                      }} />
                    </label>
                    {cardBg.imageUrl && (
                      <button onClick={() => onCardBgChange({ imageUrl: null })} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '13px' }}>Remove</button>
                    )}
                  </div>
                </div>
              )}

              {/* ── Color ── */}
              {cardBg?.style !== 'image' && (
                <ColorRow label="Background color" value={cardBg?.color || '#242424'} onChange={v => onCardBgChange({ color: v })} {...crProps} />
              )}

              {/* ── Gradient options ── */}
              {cardBg?.style === 'gradient' && (
                <>
                  <ColorRow label="Gradient color 2" value={cardBg?.gradientColor2 ?? '#2a2a2a'} onChange={v => onCardBgChange({ gradientColor2: v })} {...crProps} />
                  <div style={{ marginBottom: '16px' }}>
                    <label style={lbl}>Gradient angle — {cardBg?.gradientDeg ?? 135}°</label>
                    <input type="range" min="0" max="360" value={cardBg?.gradientDeg ?? 135}
                      onChange={e => onCardBgChange({ gradientDeg: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: '#c77dff' }}
                    />
                  </div>
                </>
              )}

              <div style={{ borderTop: `1px solid ${inputBorder}`, margin: '16px 0' }} />

              {/* ── Effect ── */}
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Effect</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {[
                    { id: 'none',      icon: '⊘',  label: 'None' },
                    { id: 'mono',      icon: '◑',  label: 'Mono' },
                    { id: 'blur',      icon: '💧', label: 'Blur' },
                    { id: 'halftone',  icon: '⠿',  label: 'Halftone' },
                  ].map(ef => {
                    const active = (cardBg?.effect ?? 'none') === ef.id
                    return (
                      <button key={ef.id} onClick={() => onCardBgChange({ effect: ef.id })} style={{
                        background: active ? toggleActive : toggleInactive,
                        border: `1.5px solid ${active ? toggleActiveBorder : toggleInactiveBorder}`,
                        borderRadius: '10px', padding: '10px 4px 6px',
                        cursor: 'pointer', textAlign: 'center',
                      }}>
                        <div style={{ fontSize: '18px', marginBottom: '4px' }}>{ef.icon}</div>
                        <div style={{ fontSize: '11px', fontWeight: active ? 600 : 400, color: active ? toggleActiveText : toggleInactiveText }}>{ef.label}</div>
                      </button>
                    )
                  })}
                </div>

                {/* Effect intensity slider — only shows when an effect is active */}
                {(cardBg?.effect === 'blur') && (
                  <div style={{ marginTop: '12px' }}>
                    <label style={lbl}>Blur amount — {cardBg?.effectIntensity ?? 8}px</label>
                    <input type="range" min="1" max="30" value={cardBg?.effectIntensity ?? 8}
                      onChange={e => onCardBgChange({ effectIntensity: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: '#c77dff' }}
                    />
                  </div>
                )}
                {(cardBg?.effect === 'mono') && (
                  <div style={{ marginTop: '12px' }}>
                    <label style={lbl}>Grayscale — {cardBg?.effectIntensity ?? 100}%</label>
                    <input type="range" min="10" max="100" value={cardBg?.effectIntensity ?? 100}
                      onChange={e => onCardBgChange({ effectIntensity: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: '#c77dff' }}
                    />
                  </div>
                )}
                {(cardBg?.effect === 'halftone') && (
                  <div style={{ marginTop: '12px' }}>
                    <label style={lbl}>Contrast — {cardBg?.effectIntensity ?? 120}%</label>
                    <input type="range" min="100" max="200" value={cardBg?.effectIntensity ?? 120}
                      onChange={e => onCardBgChange({ effectIntensity: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: '#c77dff' }}
                    />
                  </div>
                )}
              </div>

              {/* ── Tint ── */}
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Tint — improves text visibility</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '16px' }}>🌙</span>
                  <input type="range" min="0" max="100" value={cardBg?.tint ?? 0}
                    onChange={e => onCardBgChange({ tint: Number(e.target.value) })}
                    style={{ flex: 1, accentColor: '#c77dff' }}
                  />
                  <span style={{ fontSize: '16px' }}>☀️</span>
                </div>
              </div>

              <div style={divider} />

              {/* ── Animation ── */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ ...lbl, marginBottom: '10px' }}>Animation</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                  {BG_ANIMATIONS.map(anim => {
                    const active = (cardBg?.animation?.id || 'none') === anim.id
                    return (
                      <button key={anim.id} onClick={() => onCardBgChange({ animation: { id: anim.id, params: {} } })} style={{
                        background: active ? toggleActive : toggleInactive,
                        border: '1.5px solid ' + (active ? toggleActiveBorder : toggleInactiveBorder),
                        borderRadius: '8px', padding: '8px', cursor: 'pointer', textAlign: 'left',
                      }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: active ? toggleActiveText : toggleInactiveText }}>{anim.name}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Animation params */}
              {cardBg?.animation?.id && cardBg.animation.id !== 'none' && (() => {
                const animDef = BG_ANIMATIONS.find(a => a.id === cardBg.animation.id)
                if (!animDef) return null
                const params = cardBg.animation.params || {}
                return animDef.params.map(param => (
                  <div key={param.key} style={{ marginBottom: '12px' }}>
                    <label style={lbl}>{param.label}{param.type === 'range' ? ` — ${params[param.key] ?? param.default}` : ''}</label>
                    {param.type === 'color' ? (
                      <input type="color" value={params[param.key] ?? param.default} onChange={e => onCardBgChange({ animation: { ...cardBg.animation, params: { ...params, [param.key]: e.target.value } } })} style={{ width: '40px', height: '36px', borderRadius: '8px', border: '1px solid ' + inputBorder, background: 'none', cursor: 'pointer' }} />
                    ) : (
                      <input type="range" min={param.min} max={param.max} step={param.step} value={params[param.key] ?? param.default} onChange={e => onCardBgChange({ animation: { ...cardBg.animation, params: { ...params, [param.key]: Number(e.target.value) } } })} style={{ width: '100%', accentColor: '#c77dff' }} />
                    )}
                  </div>
                ))
              })()}

              <div style={divider} />

              {/* ── Colors ── */}
              <p style={{ ...lbl, fontSize: '12px', marginBottom: '12px' }}>Colors</p>
              <ColorRow label="Background" value={cardBg?.colors?.background || '#1a1a1a'} onChange={v => onCardBgChange({ colors: { ...(cardBg?.colors || {}), background: v } })} {...crProps} />
              <ColorRow label="Buttons" value={cardBg?.colors?.buttons || '#171717'} onChange={v => onCardBgChange({ colors: { ...(cardBg?.colors || {}), buttons: v } })} {...crProps} />
              <ColorRow label="Button text" value={cardBg?.colors?.buttonText || '#ffffff'} onChange={v => onCardBgChange({ colors: { ...(cardBg?.colors || {}), buttonText: v } })} {...crProps} />
              <ColorRow label="Page text" value={cardBg?.colors?.pageText || '#ffffff'} onChange={v => onCardBgChange({ colors: { ...(cardBg?.colors || {}), pageText: v } })} {...crProps} />
              <ColorRow label="Title text" value={cardBg?.colors?.titleText || '#ffffff'} onChange={v => onCardBgChange({ colors: { ...(cardBg?.colors || {}), titleText: v } })} {...crProps} />
            </div>
          )}

          {/* DESIGN - HEADER */}
          {activeSection === 'design-header' && (
            <div>
              <p style={ttl}>Header</p>
              <div style={{ marginBottom: '14px' }}>
                <label style={lbl}>Display name</label>
                <input style={inp} value={profile.name} onChange={e => onUpdateProfile('name', e.target.value)} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={lbl}>Bio</label>
                <textarea style={{ ...inp, height: '80px', resize: 'vertical', lineHeight: 1.5 }} value={profile.bio} onChange={e => onUpdateProfile('bio', e.target.value)} />
              </div>
              <div style={divider} />
              <p style={{ fontSize: '12px', fontWeight: 600, color: panelSub, marginBottom: '12px' }}>Social links</p>
              {[{ field: 'instagram', label: 'Instagram' }, { field: 'twitter', label: 'X / Twitter' }, { field: 'pinterest', label: 'Pinterest' }].map(s => (
                <div key={s.field} style={{ marginBottom: '12px' }}>
                  <label style={lbl}>{s.label}</label>
                  <input style={inp} value={profile[s.field] || ''} onChange={e => onUpdateProfile(s.field, e.target.value)} />
                </div>
              ))}
            </div>
          )}

          {/* DESIGN - WALLPAPER */}
          {activeSection === 'design-wallpaper' && (
            <div>
              <p style={ttl}>Wallpaper</p>

              {/* ── Style ── */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ ...lbl, marginBottom: '10px' }}>Wallpaper style</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {[
                    { id: 'fill',     label: 'Fill',     preview: wallpaper.color },
                    { id: 'gradient', label: 'Gradient', preview: `linear-gradient(${wallpaper.gradientDeg ?? 135}deg, ${wallpaper.color}, ${wallpaper.gradientColor2 ?? '#2a2a2a'})` },
                    { id: 'blur',     label: 'Blur',     preview: wallpaper.color, blur: true },
                    { id: 'dots',     label: 'Pattern',  preview: wallpaper.color, dots: true },
                    { id: 'image',    label: 'Image',    preview: wallpaper.imageUrl },
                  ].map(s => (
                    <button key={s.id} onClick={() => onWallpaperChange({ style: s.id })} style={{
                      border: wallpaper.style === s.id ? '2px solid #ffffff' : `2px solid ${inputBorder}`,
                      borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
                      padding: 0, background: 'none', outline: 'none',
                    }}>
                      <div style={{
                        height: '56px',
                        background: s.preview
                          ? (s.id === 'image' && s.preview ? `url(${s.preview}) center/cover` : s.preview)
                          : (isLight ? '#e0e0e0' : '#1a1a1a'),
                        filter: s.blur ? 'blur(4px)' : 'none',
                        display: 'flex', alignItems: 'flex-end', padding: '6px',
                        position: 'relative',
                      }}>
                        {s.dots && (
                          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #ffffff44 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                        )}
                        {s.id === 'image' && !s.preview && (
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: panelSub, fontSize: '20px' }}>🖼️</div>
                        )}
                      </div>
                      <div style={{ padding: '5px 0', fontSize: '11px', fontWeight: 500, color: wallpaper.style === s.id ? panelText : panelSub, textAlign: 'center', background: panelCardBg }}>
                        {s.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Image upload ── */}
              {wallpaper.style === 'image' && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={lbl}>Background image</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {wallpaper.imageUrl && (
                      <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `1px solid ${inputBorder}` }}>
                        <img src={wallpaper.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <label style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      background: toggleInactive, border: `1.5px solid ${toggleInactiveBorder}`,
                      borderRadius: '999px', padding: '8px 16px',
                      cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: panelText,
                    }}>
                      ✏️ {wallpaper.imageUrl ? 'Edit' : 'Upload'}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                        const file = e.target.files[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = ev => onWallpaperChange({ imageUrl: ev.target.result })
                        reader.readAsDataURL(file)
                      }} />
                    </label>
                    {wallpaper.imageUrl && (
                      <button onClick={() => onWallpaperChange({ imageUrl: null })} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '13px' }}>Remove</button>
                    )}
                  </div>
                </div>
              )}

              {/* ── Color ── */}
              {wallpaper.style !== 'image' && (
                <ColorRow label="Background color" value={wallpaper.color} onChange={v => onWallpaperChange({ color: v })} {...crProps} />
              )}

              {/* ── Gradient options ── */}
              {wallpaper.style === 'gradient' && (
                <>
                  <ColorRow label="Gradient color 2" value={wallpaper.gradientColor2 ?? '#2a2a2a'} onChange={v => onWallpaperChange({ gradientColor2: v })} {...crProps} />
                  <div style={{ marginBottom: '16px' }}>
                    <label style={lbl}>Gradient angle — {wallpaper.gradientDeg ?? 135}°</label>
                    <input type="range" min="0" max="360" value={wallpaper.gradientDeg ?? 135}
                      onChange={e => onWallpaperChange({ gradientDeg: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: '#c77dff' }}
                    />
                  </div>
                </>
              )}

              <div style={{ borderTop: `1px solid ${inputBorder}`, margin: '16px 0' }} />

              {/* ── Effect ── */}
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Effect</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {[
                    { id: 'none',      icon: '⊘',  label: 'None' },
                    { id: 'mono',      icon: '◑',  label: 'Mono' },
                    { id: 'blur',      icon: '💧', label: 'Blur' },
                    { id: 'halftone',  icon: '⠿',  label: 'Halftone' },
                  ].map(ef => {
                    const active = (wallpaper.effect ?? 'none') === ef.id
                    return (
                      <button key={ef.id} onClick={() => onWallpaperChange({ effect: ef.id })} style={{
                        background: active ? toggleActive : toggleInactive,
                        border: `1.5px solid ${active ? toggleActiveBorder : toggleInactiveBorder}`,
                        borderRadius: '10px', padding: '10px 4px 6px',
                        cursor: 'pointer', textAlign: 'center',
                      }}>
                        <div style={{ fontSize: '18px', marginBottom: '4px' }}>{ef.icon}</div>
                        <div style={{ fontSize: '11px', fontWeight: active ? 600 : 400, color: active ? toggleActiveText : toggleInactiveText }}>{ef.label}</div>
                      </button>
                    )
                  })}
                </div>

                {/* Effect intensity slider — only shows when an effect is active */}
                {(wallpaper.effect === 'blur') && (
                  <div style={{ marginTop: '12px' }}>
                    <label style={lbl}>Blur amount — {wallpaper.effectIntensity ?? 8}px</label>
                    <input type="range" min="1" max="30" value={wallpaper.effectIntensity ?? 8}
                      onChange={e => onWallpaperChange({ effectIntensity: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: '#c77dff' }}
                    />
                  </div>
                )}
                {(wallpaper.effect === 'mono') && (
                  <div style={{ marginTop: '12px' }}>
                    <label style={lbl}>Grayscale — {wallpaper.effectIntensity ?? 100}%</label>
                    <input type="range" min="10" max="100" value={wallpaper.effectIntensity ?? 100}
                      onChange={e => onWallpaperChange({ effectIntensity: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: '#c77dff' }}
                    />
                  </div>
                )}
                {(wallpaper.effect === 'halftone') && (
                  <div style={{ marginTop: '12px' }}>
                    <label style={lbl}>Contrast — {wallpaper.effectIntensity ?? 120}%</label>
                    <input type="range" min="100" max="200" value={wallpaper.effectIntensity ?? 120}
                      onChange={e => onWallpaperChange({ effectIntensity: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: '#c77dff' }}
                    />
                  </div>
                )}
              </div>

              {/* ── Tint ── */}
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Tint — improves text visibility</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '16px' }}>🌙</span>
                  <input type="range" min="0" max="100" value={wallpaper.tint ?? 0}
                    onChange={e => onWallpaperChange({ tint: Number(e.target.value) })}
                    style={{ flex: 1, accentColor: '#c77dff' }}
                  />
                  <span style={{ fontSize: '16px' }}>☀️</span>
                </div>
              </div>

              <div style={divider} />

              {/* ── Animation ── */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ ...lbl, marginBottom: '10px' }}>Animation</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                  {BG_ANIMATIONS.map(anim => {
                    const active = (wallpaper.animation?.id || 'none') === anim.id
                    return (
                      <button key={anim.id} onClick={() => onWallpaperChange({ animation: { id: anim.id, params: {} } })} style={{
                        background: active ? toggleActive : toggleInactive,
                        border: '1.5px solid ' + (active ? toggleActiveBorder : toggleInactiveBorder),
                        borderRadius: '8px', padding: '8px', cursor: 'pointer', textAlign: 'left',
                      }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: active ? toggleActiveText : toggleInactiveText }}>{anim.name}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Animation params */}
              {wallpaper.animation?.id && wallpaper.animation.id !== 'none' && (() => {
                const animDef = BG_ANIMATIONS.find(a => a.id === wallpaper.animation.id)
                if (!animDef) return null
                const params = wallpaper.animation.params || {}
                return animDef.params.map(param => (
                  <div key={param.key} style={{ marginBottom: '12px' }}>
                    <label style={lbl}>{param.label}{param.type === 'range' ? ` — ${params[param.key] ?? param.default}` : ''}</label>
                    {param.type === 'color' ? (
                      <input type="color" value={params[param.key] ?? param.default} onChange={e => onWallpaperChange({ animation: { ...wallpaper.animation, params: { ...params, [param.key]: e.target.value } } })} style={{ width: '40px', height: '36px', borderRadius: '8px', border: '1px solid ' + inputBorder, background: 'none', cursor: 'pointer' }} />
                    ) : (
                      <input type="range" min={param.min} max={param.max} step={param.step} value={params[param.key] ?? param.default} onChange={e => onWallpaperChange({ animation: { ...wallpaper.animation, params: { ...params, [param.key]: Number(e.target.value) } } })} style={{ width: '100%', accentColor: '#c77dff' }} />
                    )}
                  </div>
                ))
              })()}

              <div style={divider} />

              {/* ── Colors ── */}
              <p style={{ ...lbl, fontSize: '12px', marginBottom: '12px' }}>Colors</p>
              <ColorRow label="Background" value={customColors.background} onChange={v => { onCustomColorsChange({ background: v }); onWallpaperChange({ color: v }) }} {...crProps} />
              <ColorRow label="Buttons" value={customColors.buttons} onChange={v => { onCustomColorsChange({ buttons: v }); onButtonSettingsChange({ color: v }) }} {...crProps} />
              <ColorRow label="Button text" value={customColors.buttonText} onChange={v => { onCustomColorsChange({ buttonText: v }); onButtonSettingsChange({ textColor: v }) }} {...crProps} />
              <ColorRow label="Page text" value={customColors.pageText} onChange={v => { onCustomColorsChange({ pageText: v }); onTextSettingsChange({ color: v }) }} {...crProps} />
              <ColorRow label="Title text" value={customColors.titleText} onChange={v => onCustomColorsChange({ titleText: v })} {...crProps} />
            </div>
          )}

          {/* DESIGN - TEXT */}
          {activeSection === 'design-text' && (
            <div>
              <p style={ttl}>Text</p>
              <div style={{ marginBottom: '14px' }}>
                <label style={lbl}>Page font</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
                  {FONTS.map(f => {
                    const active = textSettings.font === f.name
                    return (
                      <button
                        key={f.name}
                        onClick={() => onTextSettingsChange({ font: f.name })}
                        style={{
                          background: active ? toggleActive : toggleInactive,
                          border: '1.5px solid ' + (active ? toggleActiveBorder : toggleInactiveBorder),
                          borderRadius: '10px',
                          padding: '12px 10px 8px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s',
                        }}
                      >
                        <div style={{ fontFamily: f.name + ', sans-serif', fontSize: '22px', color: active ? toggleActiveText : toggleInactiveText, lineHeight: 1, marginBottom: '6px' }}>Aa</div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: active ? toggleActiveText : toggleInactiveText, fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                        <div style={{ fontSize: '10px', color: panelSub, fontFamily: 'Inter, sans-serif', marginTop: '2px' }}>{f.category}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
              <ColorRow label="Page text color" value={textSettings.color} onChange={v => onTextSettingsChange({ color: v })} {...crProps} />
              <div style={{ marginBottom: '14px' }}>
                <label style={lbl}>Title size</label>
                <ToggleGroup options={[{ id: 'small', label: 'Small' }, { id: 'large', label: 'Large' }]} value={textSettings.titleSize} onChange={v => onTextSettingsChange({ titleSize: v })} {...tgProps} />
              </div>
            </div>
          )}

          {/* DESIGN - BUTTONS */}
          {activeSection === 'design-buttons' && (
            <div>
              <p style={ttl}>Buttons</p>
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Style</label>
                <ToggleGroup options={[{ id: 'solid', label: 'Solid' }, { id: 'glass', label: 'Glass' }, { id: 'outline', label: 'Outline' }]} value={buttonSettings.style} onChange={v => onButtonSettingsChange({ style: v })} {...tgProps} />
              </div>
              <ColorRow label="Button color" value={buttonSettings.color} onChange={v => onButtonSettingsChange({ color: v })} {...crProps} />
              <ColorRow label="Button text color" value={buttonSettings.textColor} onChange={v => onButtonSettingsChange({ textColor: v })} {...crProps} />
            </div>
          )}

          {/* DESIGN - SPACING */}
          {activeSection === 'design-spacing' && (
            <div>
              <p style={ttl}>Spacing</p>
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Corner roundness</label>
                <ToggleGroup
                  options={[{ id: 'square', label: 'Square' }, { id: 'round', label: 'Round' }, { id: 'rounder', label: 'Rounder' }, { id: 'full', label: 'Full' }]}
                  value={cornerRadius}
                  onChange={v => onCornerRadiusChange(v)}
                  columns={4}
                  showCornerPreview={true}
                  {...tgProps}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Card padding — {spacing.cardPadding}px</label>
                <input type="range" min="12" max="48" value={spacing.cardPadding} onChange={e => onSpacingChange({ cardPadding: Number(e.target.value) })} style={{ width: '100%', accentColor: '#c77dff' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Link gap — {spacing.linkGap}px</label>
                <input type="range" min="4" max="32" value={spacing.linkGap} onChange={e => onSpacingChange({ linkGap: Number(e.target.value) })} style={{ width: '100%', accentColor: '#c77dff' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Section gap — {spacing.sectionGap}px</label>
                <input type="range" min="8" max="48" value={spacing.sectionGap} onChange={e => onSpacingChange({ sectionGap: Number(e.target.value) })} style={{ width: '100%', accentColor: '#c77dff' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Avatar size — {spacing.avatarSize}px</label>
                <input type="range" min="60" max="160" value={spacing.avatarSize} onChange={e => onSpacingChange({ avatarSize: Number(e.target.value) })} style={{ width: '100%', accentColor: '#c77dff' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Hover zoom — {Math.round((spacing.hoverZoom ?? 1) * 100)}%</label>
                <input type="range" min="100" max="120" step="1"
                  value={Math.round((spacing.hoverZoom ?? 1) * 100)}
                  onChange={e => onSpacingChange({ hoverZoom: Number(e.target.value) / 100 })}
                  style={{ width: '100%', accentColor: '#c77dff' }}
                />
              </div>
            </div>
          )}

          {/* INSIGHTS */}
          {activeSection === 'insights' && (
            <div>
              <p style={ttl}>Insights</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                {[['Views', 7], ['Clicks', 0], ['Contacts', 0]].map(([label, val]) => (
                  <div key={label} style={{ background: panelCardBg, border: '1px solid ' + panelCardBorder, borderRadius: '12px', padding: '14px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: panelText }}>{val}</div>
                    <div style={{ fontSize: '11px', color: panelSub, marginTop: '2px' }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: panelCardBg, border: '1px solid ' + panelCardBorder, borderRadius: '14px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: panelText }}>Activity</span>
                  <span style={{ fontSize: '11px', color: panelSub }}>Last 7 days</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '56px' }}>
                  {[1, 0, 0, 0, 0, 2, 7].map((v, i) => (
                    <div key={i} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                      <div style={{ width: '100%', height: Math.max(4, (v / 7) * 52) + 'px', background: v > 0 ? '#c77dff' : (isLight ? '#dddddd' : '#222222'), borderRadius: '3px 3px 0 0' }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '5px', marginTop: '6px' }}>
                  {['M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'].map(d => (
                    <div key={d} style={{ flex: 1, textAlign: 'center', fontSize: '9px', color: panelSub }}>{d}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
