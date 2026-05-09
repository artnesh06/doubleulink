import { useState, useRef, useEffect } from 'react'
import LeftPanel from '../editor/LeftPanel'
import RightPanel from '../editor/RightPanel'
import { usePageState } from '../../hooks/usePageState'
import { getTheme } from '../../data/themes'
import TabNavigator from './TabNavigator'
import ShopGrid from './ShopGrid'
import SocialIcons from './SocialIcons'
import { Aurora, Particles, FlickeringGrid, Waves, Silk, RetroGrid, Lightning, Orb, PixelSnow, Threads, Radar } from '../backgrounds'

// ── Icon map for link thumbnails ─────────────────────────────
const ICON_MAP = {
  instagram: {
    bg: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/>
      </svg>
    ),
  },
  x: {
    bg: '#000000',
    svg: (
      <svg viewBox="0 0 24 24" fill="#fff" width="20" height="20">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.841L1.254 2.25H8.08l4.259 5.629 5.905-5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  pinterest: {
    bg: '#ffffff',
    svg: (
      <svg viewBox="0 0 24 24" fill="#E60023" width="22" height="22">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
  },
}

// ── Color helper ─────────────────────────────────────────────
function adjustColor(hex, amount) {
  try {
    const clean = hex.replace('#', '')
    const num = parseInt(clean, 16)
    const r = Math.min(255, Math.max(0, (num >> 16) + amount))
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount))
    const b = Math.min(255, Math.max(0, (num & 0xff) + amount))
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
  } catch {
    return hex
  }
}

// ── Wallpaper background computer ───────────────────────────
function getWallpaperBg(wallpaper, theme) {
  const color = wallpaper.color || theme.pageBg
  const deg   = wallpaper.gradientDeg ?? 135
  const color2 = wallpaper.gradientColor2 ?? theme.pageBg
  switch (wallpaper.style) {
    case 'gradient':
      return `linear-gradient(${deg}deg, ${color} 0%, ${color2} 100%)`
    case 'dots':
      return `radial-gradient(circle, ${adjustColor(color, 30)} 1px, transparent 1px)`
    case 'grid':
      return color
    case 'noise':
      return color
    case 'mesh':
      return `radial-gradient(ellipse at 20% 50%, ${adjustColor(color, 50)} 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, ${adjustColor(color, -20)} 0%, transparent 50%), ${color}`
    case 'image':
      return wallpaper.imageUrl ? `url(${wallpaper.imageUrl}) center/cover no-repeat fixed` : color
    case 'blur':
      return color
    default:
      return color
  }
}

// ── Card background computer ────────────────────────────────
function getCardBg(cardBg) {
  const color = cardBg.color || '#242424'
  const deg   = cardBg.gradientDeg ?? 135
  const color2 = cardBg.gradientColor2 ?? '#2a2a2a'
  switch (cardBg.style) {
    case 'gradient':
      return { background: `linear-gradient(${deg}deg, ${color} 0%, ${color2} 100%)` }
    case 'blur':
    case 'image':
      if (cardBg.imageUrl) {
        return {
          backgroundImage: `url(${cardBg.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      }
      return { background: color }
    case 'dots':
      return { background: `radial-gradient(circle, ${adjustColor(color, 30)} 1px, transparent 1px)`, backgroundSize: '20px 20px' }
    case 'grid':
      return { background: color }
    case 'noise':
      return { background: color }
    case 'mesh':
      return { background: `radial-gradient(ellipse at 20% 50%, ${adjustColor(color, 50)} 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, ${adjustColor(color, -20)} 0%, transparent 50%), ${color}` }
    default:
      return { background: color }
  }
}

// ── Inline editable component ────────────────────────────────
function InlineEdit({ value, onChange, multiline = false, editMode, style = {} }) {
  const [editing, setEditing] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (editing && ref.current) ref.current.focus()
  }, [editing])

  // View mode — no edit
  if (!editMode) {
    if (multiline) {
      return (
        <div style={style}>
          {value.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </div>
      )
    }
    return <div style={style}>{value}</div>
  }

  // Edit mode — active input
  if (editing) {
    const sharedInputStyle = {
      background: 'rgba(255,255,255,0.1)',
      border: '1.5px solid rgba(255,255,255,0.4)',
      borderRadius: '8px',
      outline: 'none',
      padding: '4px 8px',
      fontFamily: 'inherit',
      color: '#ffffff',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      textAlign: 'center',
    }
    if (multiline) {
      return (
        <textarea
          ref={ref}
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          rows={3}
          style={{ ...style, ...sharedInputStyle, resize: 'none', width: '100%', maxWidth: '420px', display: 'block' }}
        />
      )
    }
    return (
      <input
        ref={ref}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        style={{ ...style, ...sharedInputStyle, fontWeight: 'inherit', width: 'auto', minWidth: '120px' }}
      />
    )
  }

  // Edit mode — hover-to-edit
  return (
    <div
      onClick={() => setEditing(true)}
      title="Click to edit"
      style={{
        ...style,
        cursor: 'text',
        borderRadius: '6px',
        padding: '2px 6px',
        margin: '-2px -6px',
        transition: 'background 0.15s',
        display: multiline ? 'block' : 'inline-block',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.outline = '1.5px dashed rgba(255,255,255,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.outline = 'none'
      }}
    >
      {multiline
        ? value.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))
        : value
      }
    </div>
  )
}

// ── Main component ───────────────────────────────────────────
export default function LinktreePage({ isOwner = false }) {
  const {
    state, save, reset,
    updateProfile, setThemeId,
    setWallpaper, setCardBg,
    setTextSettings, setButtonSettings, setCustomColors,
    setSpacing, setCornerRadius,
    addLink, updateLink, removeLink,
    addShopItem, updateShopItem, removeShopItem,
  } = usePageState()

  const [activeTab, setActiveTab] = useState('links')
  const [slideDir, setSlideDir] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [activeSection, setActiveSection] = useState('links')
  const [saved, setSaved] = useState(false)
  const [showSubscribePopup, setShowSubscribePopup] = useState(false)

  // TODO: replace with real Supabase auth check
  const isSubscribed = true

  const theme = getTheme(state.themeId)

  // ── Corner radius map ────────────────────────────────────
  const radiusMap = { square: '0px', round: '8px', rounder: '16px', full: '999px' }
  const r = radiusMap[state.cornerRadius] || '16px'
  const avatarRadius = state.cornerRadius === 'full' ? '50%' : r
  const cardRadius = state.cornerRadius === 'full' ? '32px' : r

  // ── Hover zoom ───────────────────────────────────────────
  const hoverZoom = state.spacing.hoverZoom ?? 1
  const hoverScale = `scale(${hoverZoom})`

  // ── Effective styles — settings override theme defaults ──
  const effectiveBg        = getWallpaperBg(state.wallpaper, theme)
  const effectiveCardBgStyle = getCardBg(state.cardBg, theme)
  const effectiveFont      = state.textSettings.font || 'Inter'
  const effectiveTextColor = state.textSettings.color || theme.textColor
  const effectiveTitleSize = state.textSettings.titleSize === 'large' ? '30px' : '24px'

  // Extra CSS for wallpaper styles
  let wallpaperExtraStyle = ''
  if (state.wallpaper.style === 'dots') {
    wallpaperExtraStyle = 'background-size: 20px 20px;'
  } else if (state.wallpaper.style === 'grid') {
    const gc = adjustColor(state.wallpaper.color || theme.pageBg, 25)
    wallpaperExtraStyle = `background-image: linear-gradient(${gc} 1px, transparent 1px), linear-gradient(90deg, ${gc} 1px, transparent 1px); background-size: 24px 24px;`
  } else if (state.wallpaper.style === 'blur') {
    wallpaperExtraStyle = 'backdrop-filter: blur(20px);'
  }

  // Wallpaper effect filter (for page background)
  const wallpaperEffect = state.wallpaper.effect ?? 'none'
  const wallpaperEffectIntensity = state.wallpaper.effectIntensity
  let wallpaperEffectFilter = ''
  if (wallpaperEffect === 'mono') wallpaperEffectFilter = `grayscale(${wallpaperEffectIntensity ?? 100}%)`
  else if (wallpaperEffect === 'blur') wallpaperEffectFilter = `blur(${wallpaperEffectIntensity ?? 8}px)`
  else if (wallpaperEffect === 'halftone') wallpaperEffectFilter = `contrast(${(wallpaperEffectIntensity ?? 120) / 100}) saturate(1.1)`

  // Card effect filter (for card background only — not content)
  const cardEffect = state.cardBg?.effect ?? 'none'
  const cardStyleIsBlur = state.cardBg?.style === 'blur'
  const cardEffectIntensity = state.cardBg?.effectIntensity
  let cardEffectFilter = ''
  if (cardStyleIsBlur) cardEffectFilter = 'blur(12px) scale(1.05)'
  else if (cardEffect === 'mono') cardEffectFilter = `grayscale(${cardEffectIntensity ?? 100}%)`
  else if (cardEffect === 'blur') cardEffectFilter = `blur(${cardEffectIntensity ?? 8}px) scale(1.02)`
  else if (cardEffect === 'halftone') cardEffectFilter = `contrast(${(cardEffectIntensity ?? 120) / 100}) saturate(1.1)`

  // Tint overlay opacity
  const tintOpacity = ((state.wallpaper.tint ?? 0) / 100) * 0.6
  const cardTintOpacity = ((state.cardBg.tint ?? 0) / 100) * 0.6

  // ── Background animation renderer (card) ────────────────
  const cardBgAnim = state.cardBg?.animation || { id: 'none', params: {} }

  function renderBgAnimation() {
    const p = cardBgAnim.params || {}
    switch (cardBgAnim.id) {
      case 'aurora':         return <Aurora {...p} />
      case 'particles':      return <Particles {...p} />
      case 'flickeringGrid': return <FlickeringGrid {...p} />
      case 'waves':          return <Waves {...p} />
      case 'silk':           return <Silk {...p} />
      case 'retroGrid':      return <RetroGrid {...p} />
      case 'lightning':      return <Lightning {...p} />
      case 'orb':            return <Orb {...p} />
      case 'pixelSnow':      return <PixelSnow {...p} />
      case 'threads':        return <Threads {...p} />
      case 'radar':          return <Radar {...p} />
      default:               return null
    }
  }

  // ── Page background animation renderer ──────────────────
  const pageBgAnim = state.wallpaper?.animation || { id: 'none', params: {} }

  function renderPageAnimation() {
    const p = pageBgAnim.params || {}
    switch (pageBgAnim.id) {
      case 'aurora':         return <Aurora {...p} />
      case 'particles':      return <Particles {...p} />
      case 'flickeringGrid': return <FlickeringGrid {...p} />
      case 'waves':          return <Waves {...p} />
      case 'silk':           return <Silk {...p} />
      case 'retroGrid':      return <RetroGrid {...p} />
      case 'lightning':      return <Lightning {...p} />
      case 'orb':            return <Orb {...p} />
      case 'pixelSnow':      return <PixelSnow {...p} />
      case 'threads':        return <Threads {...p} />
      case 'radar':          return <Radar {...p} />
      default:               return null
    }
  }

  // Button computed styles
  const btnBgColor = state.buttonSettings.color || theme.linkBg
  const btnTextColor = state.buttonSettings.textColor || theme.textColor
  const hz = state.spacing.hoverZoom ?? 1

  const btnStyle = {
    background: state.buttonSettings.style === 'outline' ? 'transparent'
      : state.buttonSettings.style === 'glass' ? 'rgba(255,255,255,0.08)'
      : btnBgColor,
    border: state.buttonSettings.style === 'outline'
      ? `2px solid ${btnBgColor}`
      : 'none',
    borderRadius: r,
    backdropFilter: state.buttonSettings.style === 'glass' ? 'blur(10px)' : 'none',
    WebkitBackdropFilter: state.buttonSettings.style === 'glass' ? 'blur(10px)' : 'none',
  }

  function handleSwitch(tab) {
    if (tab === activeTab) return
    setSlideDir(tab === 'shop' ? 'right' : 'left')
    setActiveTab(tab)
  }

  function toggleEdit() {
    if (!isSubscribed) {
      setShowSubscribePopup(true)
      return
    }
    setEditMode(prev => !prev)
  }

  function handleSave() {
    save()
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setEditMode(false)
    }, 1000)
  }

  function handleReset() {
    reset()
  }

  const LEFT_W  = 220
  const RIGHT_W = 450

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital@1&family=Roboto:wght@400;500;700&family=Playfair+Display:wght@400;700&family=Space+Mono:wght@400;700&family=Poppins:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&family=Merriweather:wght@400;700&family=DM+Sans:wght@400;500;600;700&family=Nunito:wght@400;600;700&family=Sora:wght@400;600;700&family=Outfit:wght@400;500;600;700&family=Bebas+Neue&family=Abril+Fatface&family=Dancing+Script:wght@400;700&family=Pacifico&family=Fira+Code:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@400;700&display=swap');

        body {
          background: ${effectiveBg};
          ${wallpaperExtraStyle}
          filter: ${wallpaperEffectFilter || 'none'};
          transition: background 0.4s ease;
          margin: 0;
          font-family: '${effectiveFont}', sans-serif;
          overscroll-behavior: none;
        }
        .lt-body {
          background: ${effectiveBg};
          ${wallpaperExtraStyle}
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 60px 0 0;
          transition: padding 0.35s cubic-bezier(0.4,0,0.2,1), background 0.4s ease;
          font-family: '${effectiveFont}', sans-serif;
        }
        .lt-body.edit-open {
          padding-left: ${LEFT_W}px;
          padding-right: ${RIGHT_W}px;
        }
        .lt-card {
          width: 100%;
          max-width: 650px;
          border-radius: ${cardRadius} ${cardRadius} 0 0;
          position: relative;
          margin: 0 20px;
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          overscroll-behavior: contain;
          transition: border-radius 0.3s ease;
          overflow: hidden;
        }
        .lt-card-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .lt-card-content {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .lt-footer {
          margin-top: 24px;
          margin-bottom: 32px;
          font-size: 12px;
          color: ${theme.footerColor};
          display: flex;
          gap: 8px;
          align-items: center;
          justify-content: center;
        }
        .lt-footer a { color: ${theme.footerColor}; text-decoration: none; }
        .lt-footer span { color: ${theme.footerColor}; opacity: 0.4; }

        ${''/* animation css placeholder */}
        @keyframes gear-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes live-pulse {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 4px #00ff88); }
          50%       { opacity: 0.4; filter: drop-shadow(0 0 1px #00ff88); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .slide-in-right { animation: slideInFromRight 0.3s cubic-bezier(0.4,0,0.2,1) both; }
        .slide-in-left  { animation: slideInFromLeft  0.3s cubic-bezier(0.4,0,0.2,1) both; }

        .lt-zoomable {
          transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
        }
        .lt-zoomable:hover {
          transform: ${hoverZoom > 1 ? hoverScale : 'none'};
        }

        @media (max-width: 600px) {
          .lt-body { padding: 0 !important; align-items: stretch; }
          .lt-card { max-width: 100%; margin: 0; border-radius: 0; }
          .lt-card-content { padding: 24px 16px 40px; }
        }
      `}</style>

      <LeftPanel open={editMode} activeSection={activeSection} onSelect={setActiveSection} theme={theme} />

      <RightPanel
        open={editMode}
        activeSection={activeSection}
        profile={state.profile}
        links={state.links}
        shopItems={state.shopItems}
        activeThemeId={state.themeId}
        wallpaper={state.wallpaper}
        cardBg={state.cardBg}
        textSettings={state.textSettings}
        buttonSettings={state.buttonSettings}
        customColors={state.customColors}
        spacing={state.spacing}
        cornerRadius={state.cornerRadius}
        saved={saved}
        theme={theme}
        onSave={handleSave}
        onReset={handleReset}
        onThemeChange={setThemeId}
        onWallpaperChange={setWallpaper}
        onCardBgChange={setCardBg}
        onTextSettingsChange={setTextSettings}
        onButtonSettingsChange={setButtonSettings}
        onCustomColorsChange={setCustomColors}
        onSpacingChange={setSpacing}
        onCornerRadiusChange={setCornerRadius}
        onUpdateProfile={updateProfile}
        onAddLink={addLink}
        onUpdateLink={updateLink}
        onRemoveLink={removeLink}
        onAddShopItem={addShopItem}
        onUpdateShopItem={updateShopItem}
        onRemoveShopItem={removeShopItem}
      />

      <div className={`lt-body${editMode ? ' edit-open' : ''}`}>
        {/* Page background animation */}
        {renderPageAnimation()}
        {/* Tint overlay */}
        {tintOpacity > 0 && (
          <div style={{
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: `rgba(0,0,0,${tintOpacity})`,
          }} />
        )}
        <div className="lt-card" style={{ position: 'relative', zIndex: 1 }}>
          {/* Background layer — image/color */}
          <div className="lt-card-bg" style={{
            ...effectiveCardBgStyle,
          }} />
          {/* Effect overlay — applies blur/mono/halftone via backdrop-filter */}
          {(() => {
            const style = state.cardBg?.style
            const effect = state.cardBg?.effect ?? 'none'
            const intensity = state.cardBg?.effectIntensity
            let backdropFilter = 'none'
            if (style === 'blur') backdropFilter = 'blur(12px)'
            else if (effect === 'blur') backdropFilter = `blur(${intensity ?? 8}px)`
            else if (effect === 'mono') backdropFilter = `grayscale(${intensity ?? 100}%)`
            else if (effect === 'halftone') backdropFilter = `contrast(${(intensity ?? 120) / 100}) saturate(1.1)`
            if (backdropFilter === 'none') return null
            return (
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                backdropFilter: backdropFilter,
                WebkitBackdropFilter: backdropFilter,
                borderRadius: 'inherit',
              }} />
            )
          })()}
          
          {/* Background animation layer */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', borderRadius: 'inherit', filter: cardEffectFilter || 'none' }}>
            {renderBgAnimation()}
          </div>
          
          {/* Card tint overlay */}
          {cardTintOpacity > 0 && (
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
              background: `rgba(0,0,0,${cardTintOpacity})`,
              borderRadius: 'inherit',
            }} />
          )}

          {/* Card content (not affected by filter) */}
          <div className="lt-card-content" style={{ padding: `${state.spacing.cardPadding}px ${state.spacing.cardPadding}px 0` }}>

          {/* ── TopBar ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            {/* Logo /w/ */}
            <div
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.2s ease', cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = `scale(${hz})`}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: '18px', fontStyle: 'italic',
                color: effectiveTextColor, lineHeight: 1,
              }}>
                /w/
              </span>
            </div>

            {isOwner ? (
              <button
                onClick={toggleEdit}
                title={editMode ? 'Close editor' : 'Edit page'}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'transparent',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0,
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = `scale(${hz})`}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ position: 'relative', width: '15px', height: '15px' }}>
                  {/* Ripple ring 1 */}
                  {!editMode && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      borderRadius: '50%',
                      background: '#00ff88',
                      opacity: 0.4,
                      animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
                    }} />
                  )}
                  {/* Ripple ring 2 */}
                  {!editMode && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      borderRadius: '50%',
                      background: '#00ff88',
                      opacity: 0.3,
                      animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
                      animationDelay: '0.6s',
                    }} />
                  )}
                  {/* Ripple ring 3 */}
                  {!editMode && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      borderRadius: '50%',
                      background: '#00ff88',
                      opacity: 0.2,
                      animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
                      animationDelay: '1.2s',
                    }} />
                  )}
                  {/* Solid dot */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '50%',
                    background: editMode ? '#ff3b30' : '#00ff88',
                    boxShadow: editMode
                      ? '0 0 8px #ff3b30'
                      : '0 0 6px #00ff88',
                  }} />
                </div>
              </button>
            ) : (
              <button style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'transparent', border: 'none',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: effectiveTextColor,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
                  <polyline points="16 6 12 2 8 6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
              </button>
            )}
          </div>

          {/* ── Profile ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            marginBottom: `${state.spacing.sectionGap}px`,
          }}>
            <div style={{
              width: `${state.spacing.avatarSize}px`,
              height: `${state.spacing.avatarSize}px`,
              borderRadius: avatarRadius,
              background: '#fff', marginBottom: '14px',
              overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-radius 0.3s ease, width 0.3s ease, height 0.3s ease, transform 0.2s ease',
              cursor: 'default',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = `scale(${hz})`}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={state.profile.avatarUrl}
                alt={state.profile.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none' }}
              />
            </div>

            <InlineEdit
              editMode={editMode}
              value={state.profile.name}
              onChange={v => updateProfile('name', v)}
              style={{
                fontSize: effectiveTitleSize,
                fontWeight: 700,
                color: effectiveTextColor,
                letterSpacing: '-0.3px',
                marginBottom: '6px',
                fontFamily: `'${effectiveFont}', sans-serif`,
                textAlign: 'center',
              }}
            />

            <InlineEdit
              editMode={editMode}
              value={state.profile.bio}
              onChange={v => updateProfile('bio', v)}
              multiline
              style={{
                fontSize: '17px',
                fontWeight: 400,
                color: effectiveTextColor,
                textAlign: 'center',
                lineHeight: 1.5,
                maxWidth: '420px',
                fontFamily: `'${effectiveFont}', sans-serif`,
              }}
            />
          </div>

          <SocialIcons
            instagram={state.profile.instagram}
            pinterest={state.profile.pinterest}
            twitter={state.profile.twitter}
            theme={{ ...theme, textColor: effectiveTextColor }}
            hoverZoom={hz}
          />

          <TabNavigator
            activeTab={activeTab}
            onSwitch={handleSwitch}
            theme={theme}
            cornerRadius={r}
          />

          {/* ── Links tab ── */}
          {activeTab === 'links' ? (
            <div
              key={slideDir + '-links'}
              className={slideDir === null ? '' : slideDir === 'right' ? 'slide-in-right' : 'slide-in-left'}
              style={{ display: 'flex', flexDirection: 'column', gap: `${state.spacing.linkGap}px`, marginBottom: '32px' }}
            >
              {state.links.map(link => {
                const iconCfg = link.icon ? ICON_MAP[link.icon] : null
                return (
                  <div
                    key={link.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      ...btnStyle,
                      padding: '0 16px',
                      height: '64px',
                      position: 'relative',
                      cursor: editMode ? 'default' : 'pointer',
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={!editMode ? e => e.currentTarget.style.transform = `scale(${hz})` : undefined}
                    onMouseLeave={!editMode ? e => e.currentTarget.style.transform = 'scale(1)' : undefined}
                    onClick={!editMode ? () => window.open(link.url, '_blank', 'noopener') : undefined}
                  >
                    {iconCfg && (
                      <div style={{
                        width: '44px', height: '44px', minWidth: '44px',
                        borderRadius: r,
                        background: iconCfg.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        overflow: 'hidden',
                        transition: 'border-radius 0.3s ease',
                      }}>
                        {iconCfg.img
                          ? <img src={iconCfg.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : iconCfg.svg
                        }
                      </div>
                    )}
                    <div style={{ flex: 1, textAlign: 'center', paddingRight: iconCfg ? '40px' : '0' }}>
                      <InlineEdit
                        editMode={editMode}
                        value={link.label}
                        onChange={v => updateLink(link.id, 'label', v)}
                        style={{
                          fontSize: '16px',
                          fontWeight: 500,
                          color: state.buttonSettings.style === 'outline' ? effectiveTextColor : btnTextColor,
                          fontFamily: `'${effectiveFont}', sans-serif`,
                          display: 'inline-block',
                        }}
                      />
                    </div>
                    <span style={{ position: 'absolute', right: '16px', color: theme.subColor, display: 'flex', alignItems: 'center' }}>
                      {editMode ? (
                        <button
                          onClick={e => { e.stopPropagation(); removeLink(link.id) }}
                          style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '20px', lineHeight: 1, padding: 0 }}
                        >
                          ×
                        </button>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                          <circle cx="12" cy="5" r="1" fill="currentColor" stroke="none"/>
                          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
                          <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>
                        </svg>
                      )}
                    </span>
                  </div>
                )
              })}

              {editMode && (
                <button
                  onClick={addLink}
                  style={{
                    background: 'transparent',
                    border: `1.5px dashed ${theme.subColor}`,
                    borderRadius: r,
                    height: '52px',
                    color: theme.subColor,
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: `'${effectiveFont}', sans-serif`,
                    width: '100%',
                  }}
                >
                  + Add link
                </button>
              )}
            </div>
          ) : (
            <div style={{ marginBottom: '32px' }}>
              <ShopGrid
                items={state.shopItems}
                slideDir={slideDir}
                theme={theme}
                cornerRadius={r}
                hoverZoom={hz}
              />
            </div>
          )}

          {/* Footer — inside card, pinned to bottom */}
          <div className="lt-footer" style={{ marginTop: 'auto', paddingBottom: '24px' }}>
            <a href="#">Report</a>
            <span>·</span>
            <a href="#">Privacy</a>
            <span>·</span>
            <a href="#">Contact</a>
            {editMode && (
              <>
                <span>·</span>
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); localStorage.removeItem('doubleulink_page_state'); window.location.reload() }}
                  style={{ color: '#ff6b6b' }}
                >
                  Clear Cache
                </a>
              </>
            )}
          </div>
          </div>{/* end lt-card-content */}
        </div>
      </div>

      {/* Subscribe popup */}
      {showSubscribePopup && (
        <div
          onClick={() => setShowSubscribePopup(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#1e1e1e',
              border: '1px solid #2e2e2e',
              borderRadius: '20px',
              padding: '32px 28px',
              maxWidth: '340px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>✦</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: '0 0 8px', fontFamily: 'Inter, sans-serif' }}>
              Subscribe to Edit
            </h3>
            <p style={{ fontSize: '14px', color: '#888888', lineHeight: 1.6, margin: '0 0 24px', fontFamily: 'Inter, sans-serif' }}>
              Upgrade your plan to customize your page, add links, and unlock all design features.
            </p>
            <button
              onClick={() => setShowSubscribePopup(false)}
              style={{
                width: '100%', padding: '12px',
                background: '#ffffff', color: '#000000',
                border: 'none', borderRadius: '999px',
                fontSize: '14px', fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                marginBottom: '10px',
              }}
            >
              Subscribe Now
            </button>
            <button
              onClick={() => setShowSubscribePopup(false)}
              style={{
                width: '100%', padding: '10px',
                background: 'transparent', color: '#555555',
                border: 'none', borderRadius: '999px',
                fontSize: '13px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </>
  )
}
