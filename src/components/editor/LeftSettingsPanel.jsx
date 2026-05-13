import { useState } from 'react'

export default function LeftSettingsPanel({ open, state, onUpdate, onReset, onUndo, onRedo, canUndo, canRedo, theme, cardBgStyle, cardRadius, maxHeight }) {
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

  // Dynamic text color based on theme
  const panelTextColor = state.themeMode === 'bright' ? '#000000' : '#ffffff'
  const panelSecondaryColor = state.themeMode === 'bright' ? '#666666' : '#aaa'
  const panelTertiaryColor = state.themeMode === 'bright' ? '#888888' : '#888'

  return (
    <div
      className="left-settings-panel"
      style={{
        position: 'relative',
        width: '100%',
        height: maxHeight > 0 ? `${maxHeight}px` : 'auto',
        maxHeight: maxHeight > 0 ? `${maxHeight}px` : 'none',
        padding: '28px 24px',
        overflowY: 'auto',
        overflowX: 'hidden',
        ...cardBgStyle,
        borderRadius: `${cardRadius} ${cardRadius} 0 0`,
        animation: 'slideInLeft 0.3s ease-out',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: panelTextColor, letterSpacing: '-0.5px' }}>
          Settings
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Undo Button */}
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            style={{
              padding: '8px 10px',
              borderRadius: '6px',
              border: 'none',
              background: canUndo ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
              color: canUndo ? panelTextColor : 'rgba(255,255,255,0.3)',
              fontSize: '16px',
              cursor: canUndo ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              if (canUndo) e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
            }}
            onMouseLeave={(e) => {
              if (canUndo) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
            }}
          >
            ↶
          </button>
          
          {/* Redo Button */}
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Shift+Z)"
            style={{
              padding: '8px 10px',
              borderRadius: '6px',
              border: 'none',
              background: canRedo ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
              color: canRedo ? panelTextColor : 'rgba(255,255,255,0.3)',
              fontSize: '16px',
              cursor: canRedo ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              if (canRedo) e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
            }}
            onMouseLeave={(e) => {
              if (canRedo) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
            }}
          >
            ↷
          </button>
          
          {/* Reset Button */}
          <button
            onClick={onReset}
            title="Reset All"
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: 'none',
              background: 'rgba(255, 59, 48, 0.1)',
              color: '#ff3b30',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 59, 48, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 59, 48, 0.1)'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 0 24px 0' }} />

      {/* Theme Mode */}
      <div style={{ 
        marginBottom: '20px',
        padding: '16px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 600, color: panelSecondaryColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Theme Mode
        </h3>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {['system', 'bright', 'night'].map((mode) => (
            <button
              key={mode}
              onClick={() => onUpdate('themeMode', mode)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: state.themeMode === mode 
                  ? '2px solid #00ff88' 
                  : '1px solid rgba(255,255,255,0.08)',
                background: state.themeMode === mode 
                  ? 'rgba(0, 255, 136, 0.1)' 
                  : 'rgba(255,255,255,0.05)',
                color: state.themeMode === mode ? '#00ff88' : panelTextColor,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
              onMouseEnter={(e) => {
                if (state.themeMode !== mode) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }
              }}
              onMouseLeave={(e) => {
                if (state.themeMode !== mode) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Wallpaper Background */}
      <div style={{ 
        marginBottom: '20px',
        padding: '16px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <h3 
          onClick={() => toggleSection('wallpaper')}
          style={{ 
            margin: '0 0 12px 0', 
            fontSize: '12px', 
            fontWeight: 600, 
            color: panelSecondaryColor,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = panelTextColor}
          onMouseLeave={(e) => e.currentTarget.style.color = panelSecondaryColor}
        >
          Wallpaper Background
          <svg 
            width="14" 
            height="14" 
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
          <div style={{ marginTop: '12px' }}>
        
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Style</span>
          <select
            value={state.wallpaper?.style || 'solid'}
            onChange={(e) => onUpdate('wallpaper', { ...state.wallpaper, style: e.target.value })}
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
            <option value="solid">Solid</option>
            <option value="gradient">Gradient</option>
            <option value="dots">Dots</option>
            <option value="grid">Grid</option>
            <option value="mesh">Mesh</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Color</span>
          <input
            type="color"
            value={state.wallpaper?.color || '#1a1a1a'}
            onChange={(e) => onUpdate('wallpaper', { ...state.wallpaper, color: e.target.value })}
            style={{ width: '100%', height: '36px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Animation</span>
          <select
            value={state.wallpaper?.animation?.id || 'none'}
            onChange={(e) => onUpdate('wallpaper', { ...state.wallpaper, animation: { id: e.target.value, params: {} } })}
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
      <div style={{ 
        marginBottom: '20px',
        padding: '16px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <h3 
          onClick={() => toggleSection('cardBg')}
          style={{ 
            margin: '0 0 12px 0', 
            fontSize: '12px', 
            fontWeight: 600, 
            color: panelSecondaryColor,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = panelTextColor}
          onMouseLeave={(e) => e.currentTarget.style.color = panelSecondaryColor}
        >
          Card Background
          <svg 
            width="14" 
            height="14" 
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
          <div style={{ marginTop: '12px' }}>
        
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Style</span>
          <select
            value={state.cardBg?.style || 'solid'}
            onChange={(e) => onUpdate('cardBg', { ...state.cardBg, style: e.target.value })}
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
            <option value="solid">Solid</option>
            <option value="gradient">Gradient</option>
            <option value="dots">Dots</option>
            <option value="grid">Grid</option>
            <option value="mesh">Mesh</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Color</span>
          <input
            type="color"
            value={state.cardBg?.color || '#242424'}
            onChange={(e) => onUpdate('cardBg', { ...state.cardBg, color: e.target.value })}
            style={{ width: '100%', height: '36px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Animation</span>
          <select
            value={state.cardBg?.animation?.id || 'none'}
            onChange={(e) => onUpdate('cardBg', { ...state.cardBg, animation: { id: e.target.value, params: {} } })}
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
      <div style={{ 
        marginBottom: '20px',
        padding: '16px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: panelSecondaryColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Spacing
          </h3>
          <button
            onClick={() => setSpacingMode(prev => prev === 'simple' ? 'advanced' : 'simple')}
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              background: spacingMode === 'advanced' ? 'rgba(0, 255, 136, 0.15)' : 'transparent',
              color: '#00ff88',
              fontSize: '10px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {spacingMode === 'simple' ? 'Advanced' : 'Simple'}
          </button>
        </div>
        
        {spacingMode === 'simple' ? (
          <>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Avatar Size</span>
              <input
                type="range"
                min="60"
                max="160"
                value={state.spacing?.avatarSize || 100}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, avatarSize: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>{state.spacing?.avatarSize || 100}px</span>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Link Gap</span>
              <input
                type="range"
                min="0"
                max="32"
                value={state.spacing?.linkGap || 8}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, linkGap: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>{state.spacing?.linkGap || 8}px</span>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Card Padding</span>
              <input
                type="range"
                min="0"
                max="64"
                value={state.spacing?.cardPadding || 16}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, cardPadding: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>{state.spacing?.cardPadding || 16}px</span>
            </label>
          </>
        ) : (
          <>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Avatar Size</span>
              <input
                type="range"
                min="60"
                max="160"
                value={state.spacing?.avatarSize || 100}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, avatarSize: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>{state.spacing?.avatarSize || 100}px</span>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Profile → Social Gap</span>
              <input
                type="range"
                min="0"
                max="64"
                value={state.spacing?.profileToSocial || 14}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, profileToSocial: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>{state.spacing?.profileToSocial || 14}px</span>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Social → Tabs Gap</span>
              <input
                type="range"
                min="0"
                max="64"
                value={state.spacing?.socialToTabs || 18}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, socialToTabs: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>{state.spacing?.socialToTabs || 18}px</span>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Tabs → Links Gap</span>
              <input
                type="range"
                min="0"
                max="64"
                value={state.spacing?.tabsToLinks || 24}
                onChange={(e) => onUpdate('spacing', { ...state.spacing, tabsToLinks: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>{state.spacing?.tabsToLinks || 24}px</span>
            </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Link Gap</span>
          <input
            type="range"
            min="0"
            max="32"
            value={state.spacing?.linkGap || 8}
            onChange={(e) => onUpdate('spacing', { ...state.spacing, linkGap: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
          <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>{state.spacing?.linkGap || 8}px</span>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Card Padding</span>
          <input
            type="range"
            min="0"
            max="64"
            value={state.spacing?.cardPadding || 16}
            onChange={(e) => onUpdate('spacing', { ...state.spacing, cardPadding: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
          <span style={{ fontSize: '11px', color: panelTertiaryColor, textAlign: 'center' }}>{state.spacing?.cardPadding || 16}px</span>
        </label>
          </>
        )}
      </div>

      {/* Typography */}
      <div style={{ 
        marginBottom: '20px',
        padding: '16px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 600, color: panelSecondaryColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Typography
        </h3>
        
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Font Family</span>
          <select
            value={state.textSettings?.font || 'Inter'}
            onChange={(e) => onUpdate('textSettings', { ...state.textSettings, font: e.target.value })}
            style={{
              padding: '9px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              color: panelTextColor,
              fontSize: '13px',
              cursor: 'pointer',
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
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Text Color</span>
          <input
            type="color"
            value={state.textSettings?.color || '#ffffff'}
            onChange={(e) => onUpdate('textSettings', { ...state.textSettings, color: e.target.value })}
            style={{ width: '100%', height: '36px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Title Size</span>
          <select
            value={state.textSettings?.titleSize || 'normal'}
            onChange={(e) => onUpdate('textSettings', { ...state.textSettings, titleSize: e.target.value })}
            style={{
              padding: '9px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              color: panelTextColor,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            <option value="normal">Normal (24px)</option>
            <option value="large">Large (30px)</option>
          </select>
        </label>
      </div>

      {/* Corner Radius */}
      <div style={{ 
        marginBottom: '20px',
        padding: '16px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 600, color: panelSecondaryColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Corner Radius
        </h3>
        
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: panelSecondaryColor, fontWeight: 500 }}>Style</span>
          <select
            value={state.cornerRadius || 'round'}
            onChange={(e) => onUpdate('cornerRadius', e.target.value)}
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
            <option value="square">Square (0px)</option>
            <option value="round">Round (8px)</option>
            <option value="rounder">Rounder (16px)</option>
            <option value="full">Full (999px)</option>
          </select>
        </label>
      </div>

      {/* Hide Social Icons */}
      <div style={{ 
        padding: '16px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 600, color: panelSecondaryColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Social Icons
        </h3>
        
        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          cursor: 'pointer',
          padding: '10px 12px',
          borderRadius: '6px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        }}
        >
          <input
            type="checkbox"
            checked={state.hideSocialIcons || false}
            onChange={(e) => onUpdate('hideSocialIcons', e.target.checked)}
            style={{
              width: '16px',
              height: '16px',
              cursor: 'pointer',
              accentColor: '#00ff88',
            }}
          />
          <span style={{ fontSize: '12px', color: panelTextColor, flex: 1, fontWeight: 500 }}>
            Hide Social Icons
          </span>
        </label>
        
        <p style={{ fontSize: '11px', color: panelTertiaryColor, margin: '8px 0 0 0', lineHeight: '1.4', paddingLeft: '2px' }}>
          Toggle to hide/show social media icons on your page
        </p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .left-settings-panel {
            display: none !important;
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .left-settings-panel::-webkit-scrollbar {
          display: none;
        }
        
        .left-settings-panel {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
