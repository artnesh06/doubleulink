import { useState } from 'react'

export default function EditPopup({ type, data, position, onClose, onUpdate, theme, cardBgStyle, cardRadius }) {
  const [formData, setFormData] = useState(data)

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
    height: 'calc(100vh - 60px)',
    maxHeight: 'calc(100vh - 60px)',
    padding: '24px',
    overflowY: 'auto',
    ...cardBgStyle,
    borderRadius: `${cardRadius} ${cardRadius} 0 0`,
  }

  function renderContent() {
    switch (type) {
      case 'avatar':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff' }}>Edit Avatar</h3>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Avatar URL</span>
              <input
                type="text"
                value={formData.avatarUrl}
                onChange={(e) => handleLiveUpdate({ avatarUrl: e.target.value })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '14px',
                }}
              />
            </label>

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff' }}>
              Edit {type === 'name' ? 'Name' : 'Bio'}
            </h3>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Text</span>
              {type === 'bio' ? (
                <textarea
                  value={formData[type]}
                  onChange={(e) => handleLiveUpdate({ [type]: e.target.value })}
                  rows={3}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              ) : (
                <input
                  type="text"
                  value={formData[type]}
                  onChange={(e) => handleLiveUpdate({ [type]: e.target.value })}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                />
              )}
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Font (leave empty for global)</span>
              <select
                value={formData[type + 'Font'] || ''}
                onChange={(e) => handleLiveUpdate({ [type + 'Font']: e.target.value || null })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '14px',
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
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Color</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={formData[type + 'Color'] || '#ffffff'}
                  onChange={(e) => handleLiveUpdate({ [type + 'Color']: e.target.value })}
                  style={{ width: '60px', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                />
                <button
                  onClick={() => handleLiveUpdate({ [type + 'Color']: null })}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#aaa',
                    fontSize: '12px',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  Use Global Color
                </button>
              </div>
            </label>

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
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff' }}>Edit Link</h3>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Label</span>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => handleLiveUpdate({ label: e.target.value })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '14px',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>URL</span>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => handleLiveUpdate({ url: e.target.value })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '14px',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Icon</span>
              <select
                value={formData.icon}
                onChange={(e) => handleLiveUpdate({ icon: e.target.value })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '14px',
                }}
              >
                <option value="instagram">Instagram</option>
                <option value="x">X / Twitter</option>
                <option value="pinterest">Pinterest</option>
              </select>
            </label>

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
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff' }}>Edit Social Links</h3>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Instagram</span>
              <input
                type="text"
                value={formData.instagram || ''}
                onChange={(e) => handleLiveUpdate({ instagram: e.target.value })}
                placeholder="https://instagram.com/username"
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '14px',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Twitter / X</span>
              <input
                type="text"
                value={formData.twitter || ''}
                onChange={(e) => handleLiveUpdate({ twitter: e.target.value })}
                placeholder="https://x.com/username"
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '14px',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Pinterest</span>
              <input
                type="text"
                value={formData.pinterest || ''}
                onChange={(e) => handleLiveUpdate({ pinterest: e.target.value })}
                placeholder="https://pinterest.com/username"
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '14px',
                }}
              />
            </label>

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

      case 'wallpaper':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff' }}>Edit Wallpaper Background</h3>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Style</span>
              <select
                value={formData.style || 'solid'}
                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
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
              <span style={{ fontSize: '13px', color: '#aaa' }}>Color</span>
              <input
                type="color"
                value={formData.color || '#1a1a1a'}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
              />
            </label>

            {formData.style === 'gradient' && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', color: '#aaa' }}>Gradient Color 2</span>
                <input
                  type="color"
                  value={formData.gradientColor2 || '#2a2a2a'}
                  onChange={(e) => setFormData({ ...formData, gradientColor2: e.target.value })}
                  style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                />
              </label>
            )}

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Animated Background</span>
              <select
                value={formData.animation?.id || 'none'}
                onChange={(e) => setFormData({ ...formData, animation: { id: e.target.value, params: {} } })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
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
              <span style={{ fontSize: '13px', color: '#aaa' }}>Opacity</span>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.opacity || 100}
                onChange={(e) => setFormData({ ...formData, opacity: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>{formData.opacity || 100}%</span>
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
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff' }}>Edit Tab Navigator</h3>
            
            <p style={{ fontSize: '13px', color: '#aaa', margin: 0 }}>
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
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff' }}>Edit Card Background</h3>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Style</span>
              <select
                value={formData.style || 'solid'}
                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
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
              <span style={{ fontSize: '13px', color: '#aaa' }}>Color</span>
              <input
                type="color"
                value={formData.color || '#242424'}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
              />
            </label>

            {formData.style === 'gradient' && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', color: '#aaa' }}>Gradient Color 2</span>
                <input
                  type="color"
                  value={formData.gradientColor2 || '#2a2a2a'}
                  onChange={(e) => setFormData({ ...formData, gradientColor2: e.target.value })}
                  style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                />
              </label>
            )}

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Animated Background</span>
              <select
                value={formData.animation?.id || 'none'}
                onChange={(e) => setFormData({ ...formData, animation: { id: e.target.value, params: {} } })}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
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
              <span style={{ fontSize: '13px', color: '#aaa' }}>Blur Effect</span>
              <input
                type="range"
                min="0"
                max="20"
                value={formData.blur || 0}
                onChange={(e) => setFormData({ ...formData, blur: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>{formData.blur || 0}px</span>
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
            color: '#fff',
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
