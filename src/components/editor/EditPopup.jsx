import { useState } from 'react'
import { SOCIAL_PLATFORMS, SOCIAL_CATEGORIES } from '../../data/socialIcons'

export default function EditPopup({ type, data, onClose, onUpdate, cardBgStyle, cardRadius, maxHeight }) {
  const [formData, setFormData] = useState(data)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get theme mode from data if available (passed from parent)
  const themeMode = data?.themeMode || 'system'
  const panelTextColor = themeMode === 'bright' ? '#000000' : '#ffffff'
  const panelSecondaryColor = themeMode === 'bright' ? '#666666' : '#aaa'
  const panelTertiaryColor = themeMode === 'bright' ? '#888888' : '#888'

  function handleSubmit(e) {
    e.preventDefault()
    onUpdate(formData)
  }

  // Live update - call onUpdate immediately when form changes
  function handleLiveUpdate(updates) {
    const newData = { ...formData, ...updates }
    setFormData(newData)
    onUpdate(newData)
  }

  function updateTabHidden(tab, checked) {
    handleLiveUpdate({
      hiddenTabs: {
        ...(formData.hiddenTabs || {}),
        [tab]: checked,
      },
    })
  }

  function getColorValue(value, fallback) {
    return /^#[0-9a-fA-F]{6}$/.test(value || '') ? value : fallback
  }

  const panelInputStyle = {
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    padding: '14px 16px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.055)',
    color: panelTextColor,
    fontSize: '14px',
    fontWeight: 700,
  }

  const panelFieldLabelStyle = {
    fontSize: '13px',
    color: panelSecondaryColor,
    fontWeight: 700,
  }

  function renderTabToggle(label, tab) {
    return (
      <button
        type="button"
        onClick={() => updateTabHidden(tab, !formData.hiddenTabs?.[tab])}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.055)',
          color: panelTextColor,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 800,
          textAlign: 'left',
        }}
      >
        <span style={{
          width: '18px',
          height: '18px',
          borderRadius: '4px',
          border: '2px solid rgba(255,255,255,0.78)',
          background: formData.hiddenTabs?.[tab] ? '#69f493' : '#ffffff',
          boxShadow: formData.hiddenTabs?.[tab] ? 'inset 0 0 0 4px #1f1f1f' : 'none',
          flexShrink: 0,
        }} />
        {label}
      </button>
    )
  }

  function renderTabColor(label, field, fallback) {
    const value = formData[field] || fallback

    return (
      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={panelFieldLabelStyle}>{label}</span>
        <div style={{ display: 'grid', gridTemplateColumns: '64px minmax(0, 1fr)', gap: '10px', minWidth: 0 }}>
          <input
            type="color"
            value={getColorValue(value, fallback)}
            onChange={(e) => handleLiveUpdate({ [field]: e.target.value })}
            style={{
              width: '64px',
              height: '48px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.055)',
              padding: '8px',
              cursor: 'pointer',
            }}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => handleLiveUpdate({ [field]: e.target.value })}
            style={panelInputStyle}
          />
        </div>
      </label>
    )
  }

  function renderTabSlider(label, field, min, max, suffix = 'px') {
    const value = formData[field] ?? 0

    return (
      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ ...panelFieldLabelStyle, display: 'flex', justifyContent: 'space-between' }}>
          {label}
          <span style={{ color: panelTertiaryColor }}>{value}{suffix}</span>
        </span>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => handleLiveUpdate({ [field]: parseInt(e.target.value) })}
          style={{ width: '100%' }}
        />
      </label>
    )
  }

  const avatarLayoutOptions = [
    { id: 'classic', label: 'Classic' },
    { id: 'shape', label: 'Shape' },
  ]

  const avatarShapeOptions = [
    { id: 'flower', label: 'Flower' },
    { id: 'oval', label: 'Oval' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'burst', label: 'Burst' },
  ]

  function renderAvatarPreview(layout = 'classic', shape = formData.avatarShape || 'flower') {
    const src = formData.avatarUrl
    const shapeClass = `avatar-style-shape-${shape}`
    const image = src ? <img src={src} alt="" /> : <span />

    if (layout === 'banner') {
      return (
        <div className="avatar-style-banner">
          <div>{image}</div>
          <i>{image}</i>
        </div>
      )
    }

    if (layout === 'hero') {
      return <div className="avatar-style-hero">{image}<b /></div>
    }

    if (layout === 'cutout') {
      return <div className="avatar-style-cutout">{image}<b /></div>
    }

    if (layout === 'shape') {
      return <div className={`avatar-style-shape ${shapeClass}`}>{image}</div>
    }

    return <div className="avatar-style-classic">{image}</div>
  }

  function renderAvatarLayoutOption(option) {
    const currentLayout = ['classic', 'shape'].includes(formData.avatarLayout) ? formData.avatarLayout : 'classic'
    const active = currentLayout === option.id

    return (
      <button
        key={option.id}
        type="button"
        className={active ? 'avatar-style-option active' : 'avatar-style-option'}
        onClick={() => handleLiveUpdate({ avatarLayout: option.id })}
      >
        {['hero', 'banner', 'cutout', 'shape'].includes(option.id) && <em>⚡</em>}
        <div className="avatar-style-preview">{renderAvatarPreview(option.id)}</div>
        <span>{option.label}</span>
      </button>
    )
  }

  function renderAvatarShapeOption(option) {
    const active = (formData.avatarShape || 'flower') === option.id

    return (
      <button
        key={option.id}
        type="button"
        className={active ? 'avatar-shape-option active' : 'avatar-shape-option'}
        onClick={() => handleLiveUpdate({ avatarLayout: 'shape', avatarShape: option.id })}
      >
        <div className={`avatar-shape-swatch avatar-style-shape-${option.id}`} />
        <span>{option.label}</span>
      </button>
    )
  }

  // Calculate popup position - side panel (desktop) or bottom sheet (mobile)
  const popupStyle = {
    position: 'relative',
    width: '100%',
    height: maxHeight > 0 ? `${maxHeight}px` : 'auto',
    maxHeight: maxHeight > 0 ? `${maxHeight}px` : 'none',
    padding: '24px 22px',
    overflowY: 'auto',
    overflowX: 'hidden',
    ...cardBgStyle,
    borderRadius: `${cardRadius} ${cardRadius} 0 0`,
    animation: 'slideInRight 0.3s ease-out',
  }

  function renderContent() {
    switch (type) {
      case 'avatar':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: panelTextColor, letterSpacing: '-0.5px' }}>Edit Avatar</h3>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginTop: '16px' }} />
            </div>

            <div className="avatar-style-panel">
              <span className="avatar-style-label">PFP layout</span>
              <div className="avatar-style-grid">
                {avatarLayoutOptions.map(renderAvatarLayoutOption)}
              </div>
              {(['classic', 'shape'].includes(formData.avatarLayout) ? formData.avatarLayout : 'classic') === 'shape' && (
                <>
                  <span className="avatar-style-label">Shape</span>
                  <div className="avatar-shape-grid">
                    {avatarShapeOptions.map(renderAvatarShapeOption)}
                  </div>
                </>
              )}
            </div>
            
            {/* Avatar URL Section */}
            <div style={{ 
              padding: '16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avatar URL</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={formData.avatarUrl}
                    onChange={(e) => handleLiveUpdate({ avatarUrl: e.target.value })}
                    placeholder="Paste image URL or upload below"
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.05)',
                      color: panelTextColor,
                      fontSize: '13px',
                    }}
                  />
                  {formData.avatarUrl && formData.avatarUrl.trim() !== '' && (
                    <button
                      onClick={() => handleLiveUpdate({ avatarUrl: '' })}
                      style={{
                        padding: '9px 14px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 59, 48, 0.4)',
                        background: 'rgba(255, 59, 48, 0.1)',
                        color: '#ff3b30',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Or Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const imageUrl = URL.createObjectURL(file)
                      handleLiveUpdate({ avatarUrl: imageUrl, avatarFile: file })
                    }
                  }}
                  style={{
                    padding: '9px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.05)',
                    color: panelTextColor,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ fontSize: '11px', color: panelTertiaryColor, fontStyle: 'italic' }}>
                  Recommended: Square image, min 200x200px
                </span>
              </label>
            </div>

            {/* Avatar Preview */}
            {formData.avatarUrl && formData.avatarUrl.trim() !== '' && (
              <div style={{ 
                padding: '16px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '12px' }}>Preview</span>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                  margin: '0 auto',
                }}>
                  <img
                    src={formData.avatarUrl}
                    alt="Avatar Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `
                        scaleX(${formData.avatarFlipH ? -1 : 1}) 
                        scaleY(${formData.avatarFlipV ? -1 : 1}) 
                        rotate(${formData.avatarRotate || 0}deg) 
                        scale(${formData.avatarScale || 1})
                      `,
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Transform Controls */}
            {formData.avatarUrl && formData.avatarUrl.trim() !== '' && (
              <div style={{ 
                padding: '16px', 
                borderRadius: '8px', 
                background: 'rgba(0, 255, 136, 0.05)',
                border: '1px solid rgba(0, 255, 136, 0.2)',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#00ff88', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '12px' }}>
                  Transform
                </span>

                {/* Flip Controls */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <button
                    onClick={() => handleLiveUpdate({ avatarFlipH: !formData.avatarFlipH })}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '6px',
                      border: formData.avatarFlipH ? '2px solid #00ff88' : '1px solid rgba(255,255,255,0.1)',
                      background: formData.avatarFlipH ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255,255,255,0.05)',
                      color: formData.avatarFlipH ? '#00ff88' : panelTextColor,
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    ↔️ Flip H
                  </button>
                  <button
                    onClick={() => handleLiveUpdate({ avatarFlipV: !formData.avatarFlipV })}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '6px',
                      border: formData.avatarFlipV ? '2px solid #00ff88' : '1px solid rgba(255,255,255,0.1)',
                      background: formData.avatarFlipV ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255,255,255,0.05)',
                      color: formData.avatarFlipV ? '#00ff88' : panelTextColor,
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    ↕️ Flip V
                  </button>
                </div>

                {/* Rotate */}
                <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Rotate</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={formData.avatarRotate || 0}
                    onChange={(e) => handleLiveUpdate({ avatarRotate: parseInt(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                  <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                    {formData.avatarRotate || 0}°
                  </span>
                </label>

                {/* Scale/Zoom */}
                <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Scale/Zoom</span>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={formData.avatarScale || 1}
                    onChange={(e) => handleLiveUpdate({ avatarScale: parseFloat(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                  <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                    {formData.avatarScale || 1}x
                  </span>
                </label>

                {/* Reset Transform */}
                <button
                  onClick={() => handleLiveUpdate({ 
                    avatarFlipH: false, 
                    avatarFlipV: false, 
                    avatarRotate: 0, 
                    avatarScale: 1 
                  })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: panelSecondaryColor,
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Reset Transform
                </button>
              </div>
            )}

            <button
              onClick={() => onClose()}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: '#00ff88',
                color: '#000',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Done
            </button>
          </div>
        )

      case 'subtitle':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: panelTextColor, letterSpacing: '-0.5px' }}>Edit Sub Title</h3>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginTop: '16px' }} />
            </div>

            {/* Text */}
            <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Text</span>
                <input
                  type="text"
                  value={formData.label || ''}
                  onChange={(e) => handleLiveUpdate({ label: e.target.value })}
                  placeholder="Section name..."
                  style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.05)', color: panelTextColor, fontSize: '13px' }}
                />
              </label>
            </div>

            {/* Font & Size */}
            <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Font</span>
                <select
                  value={formData.subtitleFont || ''}
                  onChange={(e) => handleLiveUpdate({ subtitleFont: e.target.value || null })}
                  style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.05)', color: panelTextColor, fontSize: '13px', cursor: 'pointer' }}
                >
                  <option value="">Use Global Font</option>
                  <option value="Inter">Inter</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Space Mono">Space Mono</option>
                  <option value="DM Sans">DM Sans</option>
                  <option value="Bebas Neue">Bebas Neue</option>
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Size</span>
                  <span style={{ fontSize: '12px', color: '#00ff88', fontWeight: 600 }}>{formData.subtitleSize || 11}px</span>
                </div>
                <input type="range" min="9" max="24" value={formData.subtitleSize || 11} onChange={(e) => handleLiveUpdate({ subtitleSize: parseInt(e.target.value) })} style={{ width: '100%' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: panelTertiaryColor }}>
                  <span>9px</span><span>24px</span>
                </div>
              </label>
            </div>

            {/* Color & Opacity */}
            <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Color</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type="color" value={formData.subtitleColor || '#ffffff'} onChange={(e) => handleLiveUpdate({ subtitleColor: e.target.value })} style={{ width: '60px', height: '36px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }} />
                  <button onClick={() => handleLiveUpdate({ subtitleColor: null })} style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: panelSecondaryColor, fontSize: '12px', cursor: 'pointer' }}>Use Global Color</button>
                </div>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Opacity</span>
                  <span style={{ fontSize: '12px', color: '#00ff88', fontWeight: 600 }}>{Math.round((formData.subtitleOpacity ?? 0.45) * 100)}%</span>
                </div>
                <input type="range" min="0.1" max="1" step="0.05" value={formData.subtitleOpacity ?? 0.45} onChange={(e) => handleLiveUpdate({ subtitleOpacity: parseFloat(e.target.value) })} style={{ width: '100%' }} />
              </label>
            </div>

            {/* Line & Align */}
            <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Show Line toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Show Line</span>
                  <span style={{ fontSize: '11px', color: panelTertiaryColor }}>Horizontal line beside text</span>
                </div>
                <button
                  onClick={() => handleLiveUpdate({ subtitleShowLine: !(formData.subtitleShowLine !== false) })}
                  style={{ width: '40px', height: '22px', borderRadius: '11px', border: 'none', background: formData.subtitleShowLine !== false ? '#00ff88' : 'rgba(255,255,255,0.15)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s ease', flexShrink: 0 }}
                >
                  <div style={{ position: 'absolute', top: '3px', left: formData.subtitleShowLine !== false ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s ease' }} />
                </button>
              </div>
            </div>

            {/* Delete */}
            <button
              onClick={() => {
                if (formData.onDelete) formData.onDelete(formData.id)
                onClose()
              }}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,59,48,0.4)', background: 'rgba(255,59,48,0.1)', color: '#ff3b30', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
            >
              Delete Sub Title
            </button>
          </div>
        )

      case 'name':
      case 'bio':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: panelTextColor, letterSpacing: '-0.5px' }}>
                Edit {type === 'name' ? 'Name' : 'Bio'}
              </h3>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginTop: '16px' }} />
            </div>
            
            {/* Text Input Section */}
            <div style={{ 
              padding: '16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Text</span>
                {type === 'bio' ? (
                  <textarea
                    value={formData[type]}
                    onChange={(e) => {
                      handleLiveUpdate({ [type]: e.target.value })
                      // Auto-resize textarea
                      e.target.style.height = 'auto'
                      e.target.style.height = e.target.scrollHeight + 'px'
                    }}
                    onFocus={(e) => {
                      // Set initial height on focus
                      e.target.style.height = 'auto'
                      e.target.style.height = e.target.scrollHeight + 'px'
                    }}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.05)',
                      color: panelTextColor,
                      fontSize: '13px',
                      resize: 'none',
                      fontFamily: 'inherit',
                      minHeight: '80px',
                      maxHeight: '400px',
                      overflow: 'auto',
                      lineHeight: '1.5',
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[type]}
                    onChange={(e) => handleLiveUpdate({ [type]: e.target.value })}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.05)',
                      color: panelTextColor,
                      fontSize: '13px',
                    }}
                  />
                )}
              </label>
            </div>

            {/* Font Section */}
            <div style={{ 
              padding: '16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Font</span>
                <select
                  value={formData[type + 'Font'] || ''}
                  onChange={(e) => handleLiveUpdate({ [type + 'Font']: e.target.value || null })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.05)',
                    color: panelTextColor,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Use Global Font</option>
                  <option value="Inter">Inter</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Space Mono">Space Mono</option>
                  <option value="DM Sans">DM Sans</option>
                </select>
                <span style={{ fontSize: '11px', color: panelTertiaryColor, fontStyle: 'italic' }}>
                  Leave empty to use global font setting
                </span>
              </label>
            </div>

            {/* Color Section */}
            <div style={{ 
              padding: '16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Color</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={formData[type + 'Color'] || '#ffffff'}
                    onChange={(e) => handleLiveUpdate({ [type + 'Color']: e.target.value })}
                    style={{ width: '60px', height: '36px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
                  />
                  <button
                    onClick={() => handleLiveUpdate({ [type + 'Color']: null })}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.05)',
                      color: panelSecondaryColor,
                      fontSize: '12px',
                      cursor: 'pointer',
                      flex: 1,
                    }}
                  >
                    Use Global Color
                  </button>
                </div>
              </label>
            </div>

            <button
              onClick={() => onClose()}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: '#00ff88',
                color: '#000',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Done
            </button>
          </div>
        )

      case 'link':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: panelTextColor, letterSpacing: '-0.5px' }}>Edit Link</h3>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginTop: '16px' }} />
            </div>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Label</span>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => handleLiveUpdate({ label: e.target.value })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: panelTextColor,
                  fontSize: '14px',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>URL</span>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => handleLiveUpdate({ url: e.target.value })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: panelTextColor,
                  fontSize: '14px',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Image</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={formData.imageUrl || ''}
                  onChange={(e) => handleLiveUpdate({ imageUrl: e.target.value })}
                  placeholder="Paste image URL or upload below"
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: panelTextColor,
                    fontSize: '14px',
                  }}
                />
                {formData.imageUrl && formData.imageUrl.trim() !== '' && (
                  <button
                    onClick={() => handleLiveUpdate({ imageUrl: '' })}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 59, 48, 0.4)',
                      background: 'rgba(255, 59, 48, 0.1)',
                      color: '#ff3b30',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Or Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    // Create object URL for preview
                    const imageUrl = URL.createObjectURL(file)
                    handleLiveUpdate({ imageUrl, imageFile: file })
                  }
                }}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: panelTextColor,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '11px', color: panelTertiaryColor, fontStyle: 'italic' }}>
                Recommended: Square image, min 200x200px
              </span>
            </label>

            {formData.imageUrl && formData.imageUrl.trim() !== '' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Preview</span>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: `${formData.cornerRadius || 14}px`,
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                }}>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              </div>
            )}

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Corner Radius</span>
              <input
                type="range"
                min="0"
                max="50"
                value={formData.cornerRadius || 14}
                onChange={(e) => handleLiveUpdate({ cornerRadius: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: panelTertiaryColor }}>
                <span>0px (Square)</span>
                <span style={{ fontWeight: 600, color: '#00ff88' }}>{formData.cornerRadius || 14}px</span>
                <span>50px (Pill)</span>
              </div>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Animation Effect</span>
              <select
                value={formData.animation || 'none'}
                onChange={(e) => handleLiveUpdate({ animation: e.target.value, animationSettings: {} })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: panelTextColor,
                  fontSize: '14px',
                }}
              >
                <option value="none">None</option>
                <optgroup label="Hover Effects">
                  <option value="shimmer">Shimmer</option>
                  <option value="shiny">Shiny</option>
                  <option value="glare">Glare</option>
                  <option value="rainbow">Rainbow</option>
                  <option value="interactive">Interactive Hover</option>
                  <option value="magnet">Magnet</option>
                </optgroup>
                <optgroup label="Border Effects">
                  <option value="electric">Electric Border</option>
                  <option value="starborder">Star Border</option>
                  <option value="borderglow">Border Glow</option>
                  <option value="spotlight">Spotlight</option>
                </optgroup>
                <optgroup label="Continuous">
                  <option value="ripple">Ripple</option>
                  <option value="pulsating">Pulsating</option>
                  <option value="pixel">Pixel</option>
                </optgroup>
                <optgroup label="Click Effects">
                  <option value="clickspark">Click Spark</option>
                  <option value="targetcursor">Target Cursor</option>
                </optgroup>
              </select>
            </label>

            {/* Animation Settings */}
            {formData.animation && formData.animation !== 'none' && (
              <div style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                background: 'rgba(0, 255, 136, 0.05)',
                border: '1px solid rgba(0, 255, 136, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#00ff88' }}>
                  {formData.animation.toUpperCase()} SETTINGS
                </span>

                {/* Shimmer Settings */}
                {formData.animation === 'shimmer' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Speed (seconds)</span>
                      <input
                        type="range"
                        min="0.5"
                        max="5"
                        step="0.5"
                        value={formData.animationSettings?.speed || 2}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, speed: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.speed || 2}s
                      </span>
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Color</span>
                      <input
                        type="color"
                        value={formData.animationSettings?.color || '#ffffff'}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, color: e.target.value }
                        })}
                        style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Opacity</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={formData.animationSettings?.opacity || 0.3}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, opacity: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {Math.round((formData.animationSettings?.opacity || 0.3) * 100)}%
                      </span>
                    </label>
                  </>
                )}

                {/* Glare Settings */}
                {formData.animation === 'glare' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Color</span>
                      <input
                        type="color"
                        value={formData.animationSettings?.color || '#ffffff'}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, color: e.target.value }
                        })}
                        style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Opacity</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={formData.animationSettings?.opacity || 0.4}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, opacity: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {Math.round((formData.animationSettings?.opacity || 0.4) * 100)}%
                      </span>
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Size</span>
                      <input
                        type="range"
                        min="50"
                        max="200"
                        step="10"
                        value={formData.animationSettings?.size || 100}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, size: parseInt(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.size || 100}px
                      </span>
                    </label>
                  </>
                )}

                {/* Rainbow Settings */}
                {formData.animation === 'rainbow' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Speed (seconds)</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.5"
                        value={formData.animationSettings?.speed || 3}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, speed: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.speed || 3}s
                      </span>
                    </label>
                  </>
                )}

                {/* Ripple Settings */}
                {formData.animation === 'ripple' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Speed (seconds)</span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.5"
                        value={formData.animationSettings?.speed || 2}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, speed: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.speed || 2}s
                      </span>
                    </label>
                  </>
                )}

                {/* Pulsating Settings */}
                {formData.animation === 'pulsating' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Speed (seconds)</span>
                      <input
                        type="range"
                        min="0.5"
                        max="5"
                        step="0.5"
                        value={formData.animationSettings?.speed || 2}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, speed: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.speed || 2}s
                      </span>
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Scale</span>
                      <input
                        type="range"
                        min="1"
                        max="1.2"
                        step="0.05"
                        value={formData.animationSettings?.scale || 1.05}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, scale: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.scale || 1.05}x
                      </span>
                    </label>
                  </>
                )}

                {/* Electric Border Settings */}
                {formData.animation === 'electric' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Speed (seconds)</span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.5"
                        value={formData.animationSettings?.speed || 2}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, speed: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.speed || 2}s
                      </span>
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Color 1</span>
                      <input
                        type="color"
                        value={formData.animationSettings?.color1 || '#00f0ff'}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, color1: e.target.value }
                        })}
                        style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Color 2</span>
                      <input
                        type="color"
                        value={formData.animationSettings?.color2 || '#5200ff'}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, color2: e.target.value }
                        })}
                        style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Color 3</span>
                      <input
                        type="color"
                        value={formData.animationSettings?.color3 || '#ff00d4'}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, color3: e.target.value }
                        })}
                        style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Blur</span>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={formData.animationSettings?.blur || 4}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, blur: parseInt(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.blur || 4}px
                      </span>
                    </label>
                  </>
                )}

                {/* Interactive Hover Settings */}
                {formData.animation === 'interactive' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Scale on Hover</span>
                      <input
                        type="range"
                        min="1"
                        max="1.2"
                        step="0.01"
                        value={formData.animationSettings?.scale || 1.05}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, scale: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.scale || 1.05}x
                      </span>
                    </label>
                  </>
                )}

                {/* Magnet Settings */}
                {formData.animation === 'magnet' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Strength</span>
                      <input
                        type="range"
                        min="0.05"
                        max="0.3"
                        step="0.05"
                        value={formData.animationSettings?.strength || 0.15}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, strength: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.strength || 0.15}
                      </span>
                    </label>
                  </>
                )}

                {/* Spotlight Settings */}
                {formData.animation === 'spotlight' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Color</span>
                      <input
                        type="color"
                        value={formData.animationSettings?.color || '#ffffff'}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, color: e.target.value }
                        })}
                        style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Size</span>
                      <input
                        type="range"
                        min="50"
                        max="300"
                        step="10"
                        value={formData.animationSettings?.size || 150}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, size: parseInt(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.size || 150}px
                      </span>
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Opacity</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={formData.animationSettings?.opacity || 0.1}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, opacity: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {Math.round((formData.animationSettings?.opacity || 0.1) * 100)}%
                      </span>
                    </label>
                  </>
                )}

                {/* Border Glow Settings */}
                {formData.animation === 'borderglow' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Color 1</span>
                      <input
                        type="color"
                        value={formData.animationSettings?.color1 || '#00f0ff'}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, color1: e.target.value }
                        })}
                        style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Color 2</span>
                      <input
                        type="color"
                        value={formData.animationSettings?.color2 || '#5200ff'}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, color2: e.target.value }
                        })}
                        style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Blur</span>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value={formData.animationSettings?.blur || 8}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, blur: parseInt(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.blur || 8}px
                      </span>
                    </label>
                  </>
                )}

                {/* Star Border Settings */}
                {formData.animation === 'starborder' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Speed (seconds)</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.5"
                        value={formData.animationSettings?.speed || 3}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, speed: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.speed || 3}s
                      </span>
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Color</span>
                      <input
                        type="color"
                        value={formData.animationSettings?.color || '#ffd700'}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, color: e.target.value }
                        })}
                        style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      />
                    </label>
                  </>
                )}

                {/* Pixel Settings */}
                {formData.animation === 'pixel' && (
                  <>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Color</span>
                      <input
                        type="color"
                        value={formData.animationSettings?.color || '#ffffff'}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, color: e.target.value }
                        })}
                        style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Opacity</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={formData.animationSettings?.opacity || 0.03}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, opacity: parseFloat(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {Math.round((formData.animationSettings?.opacity || 0.03) * 100)}%
                      </span>
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor }}>Grid Size</span>
                      <input
                        type="range"
                        min="2"
                        max="8"
                        step="1"
                        value={formData.animationSettings?.gridSize || 4}
                        onChange={(e) => handleLiveUpdate({ 
                          animationSettings: { ...formData.animationSettings, gridSize: parseInt(e.target.value) }
                        })}
                        style={{ width: '100%' }}
                      />
                      <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>
                        {formData.animationSettings?.gridSize || 4}px
                      </span>
                    </label>
                  </>
                )}
              </div>
            )}

            {/* Arrow Settings */}
            <div style={{ 
              padding: '16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {/* Header + Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Arrow Indicator</span>
                  <span style={{ fontSize: '11px', color: panelTertiaryColor }}>Show arrows on button edges</span>
                </div>
                <button
                  onClick={() => handleLiveUpdate({ arrowEnabled: !(formData.arrowEnabled !== false) })}
                  style={{
                    width: '40px', height: '22px',
                    borderRadius: '11px',
                    border: 'none',
                    background: formData.arrowEnabled !== false ? '#00ff88' : 'rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '3px',
                    left: formData.arrowEnabled !== false ? '21px' : '3px',
                    width: '16px', height: '16px',
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.2s ease',
                  }} />
                </button>
              </div>

              {formData.arrowEnabled !== false && (
                <>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                  {/* Arrow type */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Arrow Type</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      {[
                        { id: 'chevron', label: 'Chevron' },
                        { id: 'arrow', label: 'Arrow' },
                        { id: 'double', label: 'Double' },
                        { id: 'triangle', label: 'Triangle' },
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleLiveUpdate({ arrowType: item.id })}
                          style={{
                            padding: '8px',
                            borderRadius: '6px',
                            border: (formData.arrowType || 'chevron') === item.id
                              ? '2px solid #00ff88'
                              : '1px solid rgba(255,255,255,0.1)',
                            background: (formData.arrowType || 'chevron') === item.id
                              ? 'rgba(0,255,136,0.1)'
                              : 'rgba(255,255,255,0.03)',
                            color: (formData.arrowType || 'chevron') === item.id ? '#00ff88' : panelSecondaryColor,
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Effect */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Hover Effect</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      {['slide', 'bounce', 'fade', 'grow'].map(effect => (
                        <button
                          key={effect}
                          onClick={() => handleLiveUpdate({ arrowEffect: effect })}
                          style={{
                            padding: '8px',
                            borderRadius: '6px',
                            border: (formData.arrowEffect || 'slide') === effect
                              ? '2px solid #00ff88'
                              : '1px solid rgba(255,255,255,0.1)',
                            background: (formData.arrowEffect || 'slide') === effect
                              ? 'rgba(0,255,136,0.1)'
                              : 'rgba(255,255,255,0.03)',
                            color: (formData.arrowEffect || 'slide') === effect ? '#00ff88' : panelSecondaryColor,
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                          }}
                        >
                          {effect === 'slide' ? '← Slide →' : effect === 'bounce' ? '↔ Bounce' : effect === 'fade' ? '✦ Fade' : '⊕ Grow'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Opacity */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Opacity</span>
                      <span style={{ fontSize: '12px', color: '#00ff88', fontWeight: 600 }}>
                        {Math.round((formData.arrowOpacity ?? 0.5) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={formData.arrowOpacity ?? 0.5}
                      onChange={(e) => handleLiveUpdate({ arrowOpacity: parseFloat(e.target.value) })}
                      style={{ width: '100%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: panelTertiaryColor }}>
                      <span>10%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button
                onClick={() => onClose()}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#00ff88',
                  color: '#000',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Done
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Delete this link?')) {
                    // Call a delete handler passed via data
                    if (formData.onDelete) {
                      formData.onDelete(formData.id)
                    }
                    onClose()
                  }
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 59, 48, 0.4)',
                  background: 'rgba(255, 59, 48, 0.1)',
                  color: '#ff3b30',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )

      case 'social': {
        // Get all social platforms and group by category
        const socialEntries = Object.entries(SOCIAL_PLATFORMS)
        const filteredSocials = selectedCategory === 'all' 
          ? socialEntries 
          : socialEntries.filter(([, value]) => value.category === selectedCategory)
        const activeSocialCount = socialEntries.filter(([key]) => formData[key]?.trim()).length
        
        return (
          <div className="social-editor-panel">
            <div className="social-editor-header">
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '11px', color: panelTertiaryColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Profile
                </p>
                <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 750, color: panelTextColor, letterSpacing: '-0.35px' }}>
                  Social links
                </h3>
              </div>
              <span className="social-count-pill">
                {activeSocialCount}/{socialEntries.length}
              </span>
            </div>
            
            {/* Category Filter */}
            <div className="social-filter-card">
              <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Category
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '11px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.055)',
                  color: panelTextColor,
                  fontSize: '13px',
                  fontWeight: 650,
                  outline: 'none',
                }}
              >
                <option value="all">All Platforms ({socialEntries.length})</option>
                {Object.entries(SOCIAL_CATEGORIES).map(([key, label]) => {
                  const count = socialEntries.filter(([, platform]) => platform.category === key).length
                  return <option key={key} value={key}>{label} ({count})</option>
                })}
              </select>
            </div>

            {/* Social Media Inputs */}
            <div className="social-input-list">
              {filteredSocials.map(([key, platform]) => {
                // Custom placeholder based on platform type
                let placeholder = `https://${key}.com/username`
                if (key === 'email') placeholder = 'your@email.com'
                if (key === 'phone') placeholder = '+1234567890'
                if (key === 'website') placeholder = 'https://yourwebsite.com'
                if (key === 'payment') placeholder = 'https://paypal.me/username'
                
                return (
                  <label key={key} className={formData[key] ? 'social-input-row active' : 'social-input-row'}>
                    <span className="social-input-label">
                      <span>{platform.name}</span>
                      {formData[key] && <span className="social-active-dot" />}
                    </span>
                    <input
                      type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                      value={formData[key] || ''}
                      onChange={(e) => handleLiveUpdate({ [key]: e.target.value })}
                      placeholder={placeholder}
                      style={{
                        padding: '11px 13px',
                        borderRadius: '8px',
                        border: formData[key] ? '1px solid rgba(105, 244, 147, 0.34)' : '1px solid rgba(255,255,255,0.1)',
                        background: formData[key] ? 'rgba(105, 244, 147, 0.07)' : 'rgba(255,255,255,0.045)',
                        color: panelTextColor,
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </label>
                )
              })}
            </div>

            <div className="social-editor-footer">
              <button
                onClick={() => onClose()}
                style={{
                  flex: 1,
                  padding: '13px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#69f493',
                  color: '#000',
                  fontWeight: 750,
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Done
              </button>
              <button
                onClick={() => {
                  // Clear all social links
                  const cleared = {}
                  Object.keys(SOCIAL_PLATFORMS).forEach(key => {
                    cleared[key] = ''
                  })
                  handleLiveUpdate(cleared)
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 92, 82, 0.32)',
                  background: 'rgba(255, 92, 82, 0.1)',
                  color: '#ff6b5f',
                  fontWeight: 750,
                  cursor: 'pointer',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        )
      }

      case 'wallpaper':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: panelTextColor }}>Edit Wallpaper Background</h3>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Style</span>
              <select
                value={formData.style || 'solid'}
                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: panelTextColor,
                  fontSize: '14px',
                }}
              >
                <option value="solid">Solid Color</option>
                <option value="gradient">Gradient</option>
                <option value="dots">Dots</option>
                <option value="grid">Grid</option>
                <option value="mesh">Mesh</option>
                <option value="image">Image</option>
                <option value="blur">Blur</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Color</span>
              <input
                type="color"
                value={formData.color || '#1a1a1a'}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
              />
            </label>

            {formData.style === 'gradient' && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Gradient Color 2</span>
                <input
                  type="color"
                  value={formData.gradientColor2 || '#2a2a2a'}
                  onChange={(e) => setFormData({ ...formData, gradientColor2: e.target.value })}
                  style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                />
              </label>
            )}

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Animated Background</span>
              <select
                value={formData.animation?.id || 'none'}
                onChange={(e) => setFormData({ ...formData, animation: { id: e.target.value, params: {} } })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: panelTextColor,
                  fontSize: '14px',
                }}
              >
                <option value="none">None</option>
                <option value="aurora">Aurora</option>
                <option value="particles">Particles</option>
                <option value="waves">Waves</option>
                <option value="silk">Silk</option>
                <option value="retroGrid">Retro Grid</option>
                <option value="lightning">Lightning</option>
                <option value="orb">Orb</option>
                <option value="pixelSnow">Pixel Snow</option>
                <option value="threads">Threads</option>
                <option value="radar">Radar</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Opacity</span>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.opacity || 100}
                onChange={(e) => setFormData({ ...formData, opacity: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: panelTertiaryColor, textAlign: 'center' }}>{formData.opacity || 100}%</span>
            </label>

            <button
              onClick={handleSubmit}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: '#00ff88',
                color: '#000',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Save Changes
            </button>
          </div>
        )

      case 'tabs':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: panelTextColor, letterSpacing: '-0.4px' }}>Edit Tabs</h3>
                <p style={{ fontSize: '13px', color: panelSecondaryColor, margin: '6px 0 0' }}>Visibility, colors, glass, blur, and outline.</p>
              </div>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Visible Tabs</span>
              {renderTabToggle('Hide Links', 'links')}
              {renderTabToggle('Hide Shop', 'shop')}
              {renderTabToggle('Hide Collections', 'collections')}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              padding: '14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={panelFieldLabelStyle}>Tab style</span>
                <select
                  value={formData.style || 'solid'}
                  onChange={(e) => handleLiveUpdate({ style: e.target.value })}
                  style={panelInputStyle}
                >
                  <option value="solid">Solid</option>
                  <option value="glass">Glass</option>
                  <option value="blur">Background blur</option>
                  <option value="outline">Outline</option>
                </select>
              </label>

              {renderTabColor('Background color', 'bgColor', '#3a3a3a')}
              {renderTabColor('Active color', 'activeColor', '#111111')}
              {renderTabColor('Active text', 'activeTextColor', '#ffffff')}
              {renderTabColor('Inactive text', 'inactiveTextColor', '#9a9a9a')}

              {['glass', 'blur'].includes(formData.style) && renderTabSlider('Blur amount', 'blur', 0, 30)}
              {renderTabSlider('Border width', 'borderWidth', 0, 4)}
              {renderTabColor('Border color', 'borderColor', '#444444')}
            </div>

            <button
              onClick={() => onClose()}
              style={{
                padding: '13px',
                borderRadius: '8px',
                border: 'none',
                background: '#69f493',
                color: '#111',
                fontWeight: 800,
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Done
            </button>
          </div>
        )

      case 'cardBg':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: panelTextColor }}>Edit Card Background</h3>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Style</span>
              <select
                value={formData.style || 'solid'}
                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: panelTextColor,
                  fontSize: '14px',
                }}
              >
                <option value="solid">Solid Color</option>
                <option value="gradient">Gradient</option>
                <option value="dots">Dots</option>
                <option value="grid">Grid</option>
                <option value="mesh">Mesh</option>
                <option value="image">Image</option>
                <option value="blur">Blur</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Color</span>
              <input
                type="color"
                value={formData.color || '#242424'}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
              />
            </label>

            {formData.style === 'gradient' && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Gradient Color 2</span>
                <input
                  type="color"
                  value={formData.gradientColor2 || '#2a2a2a'}
                  onChange={(e) => setFormData({ ...formData, gradientColor2: e.target.value })}
                  style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                />
              </label>
            )}

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Animated Background</span>
              <select
                value={formData.animation?.id || 'none'}
                onChange={(e) => setFormData({ ...formData, animation: { id: e.target.value, params: {} } })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: panelTextColor,
                  fontSize: '14px',
                }}
              >
                <option value="none">None</option>
                <option value="aurora">Aurora</option>
                <option value="particles">Particles</option>
                <option value="waves">Waves</option>
                <option value="silk">Silk</option>
                <option value="retroGrid">Retro Grid</option>
                <option value="lightning">Lightning</option>
                <option value="orb">Orb</option>
                <option value="pixelSnow">Pixel Snow</option>
                <option value="threads">Threads</option>
                <option value="radar">Radar</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Blur Effect</span>
              <input
                type="range"
                min="0"
                max="20"
                value={formData.blur || 0}
                onChange={(e) => setFormData({ ...formData, blur: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: panelTertiaryColor, textAlign: 'center' }}>{formData.blur || 0}px</span>
            </label>

            <button
              onClick={handleSubmit}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: '#00ff88',
                color: '#000',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Save Changes
            </button>
          </div>
        )

      default:
        return <div>Unknown type</div>
    }
  }

  return (
    <>
      {/* Backdrop - don't close on click on desktop, but close on mobile */}
      <div
        className="edit-popup-backdrop"
        onClick={onClose}
        style={{
          display: 'none',
        }}
      />

      {/* Popup */}
      <div
        className="edit-popup"
        style={popupStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            border: 'none',
            background: 'rgba(255,255,255,0.08)',
            color: panelTextColor,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            transition: 'background 0.2s',
            zIndex: 10,
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          ×
        </button>

        {/* Content */}
        <div>
          {renderContent()}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideUpFromBottom {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .edit-popup::-webkit-scrollbar {
          display: none;
        }
        
        .edit-popup {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .edit-popup input,
        .edit-popup select,
        .edit-popup button {
          font-family: Inter, sans-serif;
          max-width: 100%;
          box-sizing: border-box;
        }

        .avatar-style-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 14px;
          border-radius: 8px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .avatar-style-label {
          color: ${panelSecondaryColor};
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .avatar-style-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
          gap: 10px;
        }

        .avatar-style-option {
          position: relative;
          min-height: 132px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.045);
          color: ${panelSecondaryColor};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 14px 10px 12px;
          cursor: pointer;
          overflow: hidden;
        }

        .avatar-style-option.active {
          border: 2px solid ${themeMode === 'bright' ? '#111' : '#fff'};
          color: ${panelTextColor};
          background: rgba(255,255,255,0.07);
        }

        .avatar-style-option em {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 26px;
          height: 26px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.45);
          color: #fff;
          font-size: 12px;
          font-style: normal;
          z-index: 2;
        }

        .avatar-style-option span {
          font-size: 14px;
          font-weight: 750;
        }

        .avatar-style-preview {
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-style-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .avatar-style-preview > div {
          position: relative;
          background: rgba(255,255,255,0.9);
          overflow: hidden;
        }

        .avatar-style-classic {
          width: 54px;
          height: 54px;
          border-radius: 999px;
        }

        .avatar-style-hero {
          width: 104px;
          height: 70px;
          border-radius: 8px;
        }

        .avatar-style-hero b,
        .avatar-style-cutout b {
          position: absolute;
          inset: 48% 0 0;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.96));
        }

        .avatar-style-banner {
          width: 110px;
          height: 68px;
          border-radius: 8px;
        }

        .avatar-style-banner > div {
          position: absolute;
          inset: 0;
          opacity: 0.7;
        }

        .avatar-style-banner > i {
          position: absolute;
          left: 50%;
          bottom: 6px;
          width: 42px;
          height: 42px;
          transform: translateX(-50%);
          border-radius: 999px;
          overflow: hidden;
          border: 3px solid rgba(255,255,255,0.92);
          background: #fff;
          font-style: normal;
        }

        .avatar-style-cutout {
          width: 84px;
          height: 76px;
          border-radius: 8px;
          background: transparent !important;
        }

        .avatar-style-cutout img {
          object-fit: contain;
        }

        .avatar-style-shape {
          width: 96px;
          height: 62px;
        }

        .avatar-style-shape-flower {
          border-radius: 58% 42% 54% 46% / 44% 54% 46% 56%;
          clip-path: polygon(50% 2%, 66% 18%, 90% 14%, 82% 38%, 98% 52%, 78% 66%, 84% 91%, 58% 83%, 42% 98%, 30% 76%, 6% 82%, 16% 57%, 2% 42%, 26% 32%, 20% 8%);
        }

        .avatar-style-shape-oval {
          border-radius: 999px;
        }

        .avatar-style-shape-rounded {
          border-radius: 14px;
        }

        .avatar-style-shape-burst {
          border-radius: 38% 62% 45% 55% / 52% 38% 62% 48%;
          clip-path: polygon(50% 0%, 58% 13%, 74% 5%, 77% 22%, 94% 20%, 87% 38%, 100% 50%, 86% 61%, 94% 79%, 76% 77%, 72% 95%, 57% 87%, 50% 100%, 41% 86%, 25% 95%, 22% 76%, 5% 80%, 13% 62%, 0% 50%, 14% 39%, 6% 21%, 25% 23%, 28% 5%, 42% 14%);
        }

        .avatar-shape-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .avatar-shape-option {
          min-height: 76px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.045);
          color: ${panelSecondaryColor};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }

        .avatar-shape-option.active {
          border: 2px solid #69f493;
          color: ${panelTextColor};
        }

        .avatar-shape-swatch {
          width: 46px;
          height: 28px;
          background: ${themeMode === 'bright' ? '#111' : '#e9e9e9'};
        }

        .social-editor-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 100%;
        }

        .social-editor-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding-right: 38px;
          margin-bottom: 6px;
        }

        .social-count-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 54px;
          height: 28px;
          padding: 0 10px;
          border-radius: 999px;
          border: 1px solid rgba(105, 244, 147, 0.32);
          background: rgba(105, 244, 147, 0.1);
          color: #69f493;
          font-size: 12px;
          font-weight: 800;
        }

        .social-filter-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 14px;
          border-radius: 8px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .social-input-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow-y: auto;
          padding-right: 4px;
          max-height: min(430px, calc(100vh - 360px));
        }

        .social-input-list::-webkit-scrollbar {
          width: 4px;
        }

        .social-input-list::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.16);
          border-radius: 999px;
        }

        .social-input-row {
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding: 12px;
          border-radius: 8px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .social-input-row.active {
          border-color: rgba(105, 244, 147, 0.22);
          background: rgba(105, 244, 147, 0.035);
        }

        .social-input-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: rgba(255,255,255,0.68);
          font-size: 12px;
          font-weight: 700;
        }

        .social-active-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #69f493;
          box-shadow: 0 0 0 3px rgba(105, 244, 147, 0.12);
        }

        .social-editor-footer {
          display: flex;
          gap: 10px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin-top: auto;
        }
        
        @media (max-width: 600px) {
          .edit-popup {
            position: fixed !important;
            left: 0 !important;
            right: 0 !important;
            top: auto !important;
            bottom: 0 !important;
            width: 100% !important;
            min-width: auto !important;
            max-width: none !important;
            height: 70vh !important;
            min-height: auto !important;
            max-height: 70vh !important;
            border-radius: 20px 20px 0 0 !important;
            animation: slideUpFromBottom 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            background: rgba(20, 20, 20, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5) !important;
            z-index: 9999 !important;
          }
          
          .edit-popup-backdrop {
            display: block !important;
            position: fixed !important;
            inset: 0 !important;
            background: rgba(0, 0, 0, 0.5) !important;
            z-index: 9998 !important;
          }
        }
      `}</style>
    </>
  )
}
