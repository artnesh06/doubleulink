import { useState } from 'react'
import { SOCIAL_PLATFORMS, SOCIAL_CATEGORIES } from '../../data/socialIcons'

export default function EditPopup({ type, data, position, onClose, onUpdate, theme, cardBgStyle, cardRadius, maxHeight }) {
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

  // Calculate popup position - side panel (desktop) or bottom sheet (mobile)
  const popupStyle = {
    position: 'relative',
    width: '100%',
    height: maxHeight > 0 ? `${maxHeight}px` : 'auto',
    maxHeight: maxHeight > 0 ? `${maxHeight}px` : 'none',
    padding: '28px 24px',
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

      case 'social':
        // Get all social platforms and group by category
        const socialEntries = Object.entries(SOCIAL_PLATFORMS)
        const filteredSocials = selectedCategory === 'all' 
          ? socialEntries 
          : socialEntries.filter(([key, value]) => value.category === selectedCategory)
        
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: panelTextColor, letterSpacing: '-0.5px' }}>Edit Social Links</h3>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginTop: '16px' }} />
            </div>
            
            {/* Category Filter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: panelSecondaryColor }}>Filter by Category</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: panelTextColor,
                  fontSize: '14px',
                }}
              >
                <option value="all">All Platforms ({socialEntries.length})</option>
                {Object.entries(SOCIAL_CATEGORIES).map(([key, label]) => {
                  const count = socialEntries.filter(([k, v]) => v.category === key).length
                  return <option key={key} value={key}>{label} ({count})</option>
                })}
              </select>
            </div>

            {/* Social Media Inputs */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              maxHeight: '400px',
              overflowY: 'auto',
              paddingRight: '8px',
            }}>
              {filteredSocials.map(([key, platform]) => {
                // Custom placeholder based on platform type
                let placeholder = `https://${key}.com/username`
                if (key === 'email') placeholder = 'your@email.com'
                if (key === 'phone') placeholder = '+1234567890'
                if (key === 'website') placeholder = 'https://yourwebsite.com'
                if (key === 'payment') placeholder = 'https://paypal.me/username'
                
                return (
                  <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '13px', color: panelSecondaryColor, fontWeight: 500 }}>
                      {platform.name}
                    </span>
                    <input
                      type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                      value={formData[key] || ''}
                      onChange={(e) => handleLiveUpdate({ [key]: e.target.value })}
                      placeholder={placeholder}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: formData[key] ? '1px solid rgba(0, 255, 136, 0.3)' : '1px solid rgba(255,255,255,0.1)',
                        background: formData[key] ? 'rgba(0, 255, 136, 0.05)' : 'rgba(255,255,255,0.05)',
                        color: panelTextColor,
                        fontSize: '14px',
                      }}
                    />
                  </label>
                )
              })}
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '8px',
              paddingTop: '8px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}>
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
                  border: '1px solid rgba(255, 59, 48, 0.4)',
                  background: 'rgba(255, 59, 48, 0.1)',
                  color: '#ff3b30',
                  fontWeight: 600,
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: panelTextColor }}>Edit Tab Navigator</h3>
            
            <p style={{ fontSize: '13px', color: panelSecondaryColor, margin: 0 }}>
              Tab styling is currently controlled by the global theme settings. Individual tab customization coming soon!
            </p>

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
