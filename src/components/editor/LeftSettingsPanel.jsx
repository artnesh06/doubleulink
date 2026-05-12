import { useState } from 'react'

export default function LeftSettingsPanel({ open, state, onUpdate, onReset, theme, cardBgStyle, cardRadius }) {
  const [expandedSections, setExpandedSections] = useState({
    wallpaper: false,
    cardBg: false,
    spacing: true,
    typography: true,
    cornerRadius: true,
  })
  const [spacingMode, setSpacingMode] = useState('simple') // 'simple' or 'advanced'

  if (!open) return null

  function toggleSection(section) {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div
      className="left-settings-panel"
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 60px)',
        maxHeight: 'calc(100vh - 60px)',
        padding: '24px',
        overflowY: 'auto',
        ...cardBgStyle,
        borderRadius: `${cardRadius} ${cardRadius} 0 0`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff' }}>
          Global Settings
        </h2>
        <button
          onClick={onReset}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 59, 48, 0.4)',
            background: 'rgba(255, 59, 48, 0.1)',
            color: '#ff3b30',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 59, 48, 0.2)'
            e.currentTarget.style.borderColor = 'rgba(255, 59, 48, 0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 59, 48, 0.1)'
            e.currentTarget.style.borderColor = 'rgba(255, 59, 48, 0.4)'
          }}
        >
          Reset
        </button>
      </div>

      {/* ... rest of content ... */}
      
      <style>{`
        @keyframes slideInFromLeft {
          from { 
            opacity: 0;
            transform: translateY(-50%) translateX(-100%);
          }
          to { 
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }
      `}</style>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, color: '#fff' }}>
        Global Settings
      </h2>

      {/* Wallpaper Background */}
      <div style={{ marginBottom: '24px' }}>
        <h3 
          onClick={() => toggleSection('wallpaper')}
          style={{ 
            margin: '0 0 12px 0', 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          Wallpaper Background
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ 
              transform: expandedSections.wallpaper ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </h3>
        
        {expandedSections.wallpaper && (
          <div style={{ paddingLeft: '12px' }}>
        
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Style</span>
          <select
            value={state.wallpaper?.style || 'solid'}
            onChange={(e) => onUpdate('wallpaper', { ...state.wallpaper, style: e.target.value })}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: '14px',
            }}
          >
            <option value="solid">Solid</option>
            <option value="gradient">Gradient</option>
            <option value="dots">Dots</option>
            <option value="grid">Grid</option>
            <option value="mesh">Mesh</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Color</span>
          <input
            type="color"
            value={state.wallpaper?.color || '#1a1a1a'}
            onChange={(e) => onUpdate('wallpaper', { ...state.wallpaper, color: e.target.value })}
            style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Animation</span>
          <select
            value={state.wallpaper?.animation?.id || 'none'}
            onChange={(e) => onUpdate('wallpaper', { ...state.wallpaper, animation: { id: e.target.value, params: {} } })}
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
          </div>
        )}
      </div>

      {/* Card Background */}
      <div style={{ marginBottom: '24px' }}>
        <h3 
          onClick={() => toggleSection('cardBg')}
          style={{ 
            margin: '0 0 12px 0', 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          Card Background
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ 
              transform: expandedSections.cardBg ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </h3>
        
        {expandedSections.cardBg && (
          <div style={{ paddingLeft: '12px' }}>
        
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Style</span>
          <select
            value={state.cardBg?.style || 'solid'}
            onChange={(e) => onUpdate('cardBg', { ...state.cardBg, style: e.target.value })}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: '14px',
            }}
          >
            <option value="solid">Solid</option>
            <option value="gradient">Gradient</option>
            <option value="dots">Dots</option>
            <option value="grid">Grid</option>
            <option value="mesh">Mesh</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Color</span>
          <input
            type="color"
            value={state.cardBg?.color || '#242424'}
            onChange={(e) => onUpdate('cardBg', { ...state.cardBg, color: e.target.value })}
            style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Animation</span>
          <select
            value={state.cardBg?.animation?.id || 'none'}
            onChange={(e) => onUpdate('cardBg', { ...state.cardBg, animation: { id: e.target.value, params: {} } })}
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
          </div>
        )}
      </div>

      {/* Spacing */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#fff' }}>
            Spacing
          </h3>
          <button
            onClick={() => setSpacingMode(prev => prev === 'simple' ? 'advanced' : 'simple')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              background: spacingMode === 'advanced' ? 'rgba(0, 255, 136, 0.15)' : 'transparent',
              color: '#00ff88',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {spacingMode === 'simple' ? 'Advanced' : 'Simple'}
          </button>
        </div>
        
        {spacingMode === 'simple' ? (
          <>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Avatar Size</span>
              <input
                type="range"
                min="60"
                max="160"
                value={state.spacing?.avatarSize || 100}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, avatarSize: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>{state.spacing?.avatarSize || 100}px</span>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Link Gap</span>
              <input
                type="range"
                min="0"
                max="32"
                value={state.spacing?.linkGap || 8}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, linkGap: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>{state.spacing?.linkGap || 8}px</span>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Card Padding</span>
              <input
                type="range"
                min="0"
                max="64"
                value={state.spacing?.cardPadding || 16}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, cardPadding: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>{state.spacing?.cardPadding || 16}px</span>
            </label>
          </>
        ) : (
          <>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Avatar Size</span>
              <input
                type="range"
                min="60"
                max="160"
                value={state.spacing?.avatarSize || 100}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, avatarSize: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>{state.spacing?.avatarSize || 100}px</span>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Profile → Social Gap</span>
              <input
                type="range"
                min="0"
                max="64"
                value={state.spacing?.profileToSocial || 14}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, profileToSocial: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>{state.spacing?.profileToSocial || 14}px</span>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Social → Tabs Gap</span>
              <input
                type="range"
                min="0"
                max="64"
                value={state.spacing?.socialToTabs || 18}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, socialToTabs: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>{state.spacing?.socialToTabs || 18}px</span>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Tabs → Links Gap</span>
              <input
                type="range"
                min="0"
                max="64"
                value={state.spacing?.tabsToLinks || 24}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, tabsToLinks: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>{state.spacing?.tabsToLinks || 24}px</span>
            </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Link Gap</span>
          <input
            type="range"
            min="0"
            max="32"
            value={state.spacing?.linkGap || 8}
            onChange={(e) => onUpdate('spacing', { ...state.spacing, linkGap: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
          <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>{state.spacing?.linkGap || 8}px</span>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Card Padding</span>
          <input
            type="range"
            min="0"
            max="64"
            value={state.spacing?.cardPadding || 16}
            onChange={(e) => onUpdate('spacing', { ...state.spacing, cardPadding: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
          <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>{state.spacing?.cardPadding || 16}px</span>
        </label>
          </>
        )}
      </div>

      {/* Typography */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
          Typography
        </h3>
        
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Font Family</span>
          <select
            value={state.textSettings?.font || 'Inter'}
            onChange={(e) => onUpdate('textSettings', { ...state.textSettings, font: e.target.value })}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: '14px',
            }}
          >
            <option value="Inter">Inter</option>
            <option value="Poppins">Poppins</option>
            <option value="Roboto">Roboto</option>
            <option value="Playfair Display">Playfair Display</option>
            <option value="Space Mono">Space Mono</option>
            <option value="DM Sans">DM Sans</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Text Color</span>
          <input
            type="color"
            value={state.textSettings?.color || '#ffffff'}
            onChange={(e) => onUpdate('textSettings', { ...state.textSettings, color: e.target.value })}
            style={{ width: '100%', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Title Size</span>
          <select
            value={state.textSettings?.titleSize || 'normal'}
            onChange={(e) => onUpdate('textSettings', { ...state.textSettings, titleSize: e.target.value })}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: '14px',
            }}
          >
            <option value="normal">Normal (24px)</option>
            <option value="large">Large (30px)</option>
          </select>
        </label>
      </div>

      {/* Corner Radius */}
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
          Corner Radius
        </h3>
        
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '13px', color: '#aaa' }}>Style</span>
          <select
            value={state.cornerRadius || 'round'}
            onChange={(e) => onUpdate('cornerRadius', e.target.value)}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: '14px',
            }}
          >
            <option value="square">Square (0px)</option>
            <option value="round">Round (8px)</option>
            <option value="rounder">Rounder (16px)</option>
            <option value="full">Full (999px)</option>
          </select>
        </label>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .left-settings-panel {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
