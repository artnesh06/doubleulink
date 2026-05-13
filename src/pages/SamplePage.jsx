import { useState, useRef, useEffect } from 'react'
import { getTheme } from '../data/themes'
import { Aurora, Particles, FlickeringGrid, Waves, Silk, RetroGrid, Lightning, Orb, PixelSnow, Threads, Radar } from '../components/backgrounds'
import TabNavigator from '../components/linktree/TabNavigator'
import SocialIcons from '../components/linktree/SocialIcons'
import CollectionGrid from '../components/linktree/CollectionGrid'
import EditPopup from '../components/editor/EditPopup'
import LeftSettingsPanel from '../components/editor/LeftSettingsPanel'
import { defaultLinks, PFP_URL } from '../data/data'
import {
  ShimmerEffect,
  ShinyEffect,
  RainbowEffect,
  RippleEffect,
  PulsatingEffect,
  GlareEffect,
  ElectricBorderEffect,
  StarBorderEffect,
  BorderGlowEffect,
  SpotlightEffect,
  InteractiveHoverEffect,
  MagnetEffect,
  PixelEffect,
  ClickSparkEffect,
  TargetCursorEffect,
} from '../components/animations/ButtonAnimations'

// Default state for SamplePage (no localStorage)
const defaultState = {
  profile: {
    name: 'Artnesh',
    bio: 'NFT artist and developer @oddslaunchpad.\nCreating art and building in Web3.',
    instagram: 'https://www.instagram.com/artnesh_/',
    pinterest: 'https://id.pinterest.com/artnesh_/_created/',
    twitter: 'https://x.com/artnesh',
    // Additional social media (empty by default)
    facebook: '',
    youtube: '',
    tiktok: '',
    linkedin: '',
    github: '',
    discord: '',
    telegram: '',
    whatsapp: '',
    spotify: '',
    twitch: '',
    behance: '',
    dribbble: '',
    medium: '',
    reddit: '',
    snapchat: '',
    threads: '',
    substack: '',
    patreon: '',
    etsy: '',
    email: '',
    phone: '',
    website: '',
    avatarUrl: PFP_URL,
    avatarFlipH: false,
    avatarFlipV: false,
    avatarRotate: 0,
    avatarScale: 1,
    nameFont: null, // null = use global
    nameColor: null, // null = use global
    bioFont: null,
    bioColor: null,
  },
  hideSocialIcons: false, // Toggle to hide/show social icons
  links: defaultLinks,
  themeId: 'chrome',
  themeMode: 'system', // 'system', 'bright', 'night'
  wallpaper: { style: 'solid', color: '#1a1a1a', animation: { id: 'none', params: {} } },
  cardBg: { style: 'solid', color: '#242424', animation: { id: 'none', params: {} } },
  textSettings: { font: 'Inter', color: '#ffffff', titleSize: 'small' },
  buttonSettings: { style: 'solid', roundness: 'full', shadow: 'none', color: '#171717', textColor: '#ffffff' },
  spacing: { 
    cardPadding: 16, 
    linkGap: 10, 
    avatarSize: 100, 
    hoverZoom: 1,
    sectionGap: 14,
    profileToSocial: 16,
    socialToTabs: 21,
    tabsToLinks: 30
  },
  cornerRadius: 'full',
}

// Theme presets
const THEME_PRESETS = {
  system: {
    wallpaper: '#1a1a1a',
    cardBg: '#242424',
    textColor: '#ffffff',
    linkBg: '#171717',
    linkText: '#ffffff',
  },
  bright: {
    wallpaper: '#f5f5f5',
    cardBg: '#ffffff',
    textColor: '#000000',
    linkBg: '#e8e8e8',
    linkText: '#000000',
  },
  night: {
    wallpaper: '#000000',
    cardBg: '#0a0a0a',
    textColor: '#ffffff',
    linkBg: '#1a1a1a',
    linkText: '#ffffff',
  },
}

// ── Icon map ─────────────────────────────────────────────────
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

function getWallpaperBg(wallpaper, theme) {
  const color = wallpaper.color || theme.pageBg
  const deg = wallpaper.gradientDeg ?? 135
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

function getCardBg(cardBg) {
  const color = cardBg.color || '#242424'
  const deg = cardBg.gradientDeg ?? 135
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

export default function SamplePage() {
  // Use local state instead of usePageState (no localStorage)
  const [state, setState] = useState(defaultState)
  const [editMode, setEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState('links')
  const [popup, setPopup] = useState(null)
  const [centerCardHeight, setCenterCardHeight] = useState(0)
  const centerCardRef = useRef(null)
  
  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  
  // History for undo/redo
  const [history, setHistory] = useState([defaultState])
  const [historyIndex, setHistoryIndex] = useState(0)
  const isUndoRedoAction = useRef(false)
  const prevStateRef = useRef(defaultState)

  // Save to history when state changes (but not during undo/redo)
  useEffect(() => {
    // Skip if this is an undo/redo action
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false
      prevStateRef.current = state
      return
    }

    // Skip if state hasn't actually changed
    if (JSON.stringify(state) === JSON.stringify(prevStateRef.current)) {
      return
    }

    prevStateRef.current = state

    // Add new state to history
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push(state)
      
      // Limit history to 50 items
      if (newHistory.length > 50) {
        newHistory.shift()
        return newHistory
      }
      
      return newHistory
    })
    
    setHistoryIndex(prev => Math.min(prev + 1, 49))
  }, [state])

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    function handleKeyDown(e) {
      // Ctrl+Z or Cmd+Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        handleUndo()
      }
      // Ctrl+Shift+Z or Cmd+Shift+Z for redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault()
        handleRedo()
      }
      // Ctrl+Y or Cmd+Y for redo (alternative)
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault()
        handleRedo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [historyIndex, history])

  function handleUndo() {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setState(history[newIndex])
    }
  }

  function handleRedo() {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setState(history[newIndex])
    }
  }

  // Measure center card height
  useEffect(() => {
    if (centerCardRef.current) {
      const updateHeight = () => {
        setCenterCardHeight(centerCardRef.current.offsetHeight)
      }
      updateHeight()
      
      // Update on window resize
      window.addEventListener('resize', updateHeight)
      
      // Use ResizeObserver for content changes
      const resizeObserver = new ResizeObserver(updateHeight)
      resizeObserver.observe(centerCardRef.current)
      
      return () => {
        window.removeEventListener('resize', updateHeight)
        resizeObserver.disconnect()
      }
    }
  }, [state, activeTab, editMode]) // Re-measure when content changes

  function updateProfile(field, value) {
    setState(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }))
  }

  function updateLink(id, field, value) {
    setState(prev => ({ ...prev, links: prev.links.map(l => l.id === id ? { ...l, [field]: value } : l) }))
  }

  function removeLink(id) {
    setState(prev => ({ ...prev, links: prev.links.filter(l => l.id !== id) }))
  }

  function addLink(newLink) {
    setState(prev => ({ ...prev, links: [...prev.links, newLink] }))
  }

  function reorderLinks(newLinks) {
    setState(prev => ({ ...prev, links: newLinks }))
  }

  // Drag and drop handlers
  function handleDragStart(e, index) {
    if (!editMode) return
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e, index) {
    if (!editMode) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (index !== dragOverIndex) {
      setDragOverIndex(index)
    }
  }

  function handleDragLeave() {
    setDragOverIndex(null)
  }

  function handleDrop(e, dropIndex) {
    if (!editMode) return
    e.preventDefault()
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    // Reorder the links
    const newLinks = [...state.links]
    const [draggedItem] = newLinks.splice(draggedIndex, 1)
    newLinks.splice(dropIndex, 0, draggedItem)
    
    reorderLinks(newLinks)
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  function handleDragEnd() {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  function setWallpaper(updates) {
    setState(prev => ({ ...prev, wallpaper: { ...prev.wallpaper, ...updates } }))
  }

  function setCardBg(updates) {
    setState(prev => ({ ...prev, cardBg: { ...prev.cardBg, ...updates } }))
  }

  function setTextSettings(updates) {
    setState(prev => ({ ...prev, textSettings: { ...prev.textSettings, ...updates } }))
  }

  function setSpacing(updates) {
    setState(prev => ({ ...prev, spacing: { ...prev.spacing, ...updates } }))
  }

  function setCornerRadius(value) {
    setState(prev => ({ ...prev, cornerRadius: value }))
  }

  function setThemeMode(mode) {
    const preset = THEME_PRESETS[mode]
    setState(prev => ({
      ...prev,
      themeMode: mode,
      wallpaper: { ...prev.wallpaper, color: preset.wallpaper },
      cardBg: { ...prev.cardBg, color: preset.cardBg },
      textSettings: { ...prev.textSettings, color: preset.textColor },
      buttonSettings: { ...prev.buttonSettings, color: preset.linkBg, textColor: preset.linkText },
    }))
  }

  function handleReset() {
    setState(defaultState)
    setPopup(null)
    // Reset history
    setHistory([defaultState])
    setHistoryIndex(0)
  }

  function handleGlobalUpdate(key, value) {
    switch (key) {
      case 'wallpaper':
        setWallpaper(value)
        break
      case 'cardBg':
        setCardBg(value)
        break
      case 'textSettings':
        setTextSettings(value)
        break
      case 'spacing':
        setSpacing(value)
        break
      case 'cornerRadius':
        setCornerRadius(value)
        break
      case 'themeMode':
        setThemeMode(value)
        break
      case 'hideSocialIcons':
        setState(prev => ({ ...prev, hideSocialIcons: value }))
        break
    }
  }

  const theme = getTheme(state.themeId)
  const radiusMap = { square: '0px', round: '8px', rounder: '16px', full: '999px' }
  const r = radiusMap[state.cornerRadius] || '16px'
  const avatarRadius = state.cornerRadius === 'full' ? '50%' : r
  const cardRadius = state.cornerRadius === 'full' ? '32px' : r

  // Helper function to wrap link with animation
  function wrapWithAnimation(content, animation, linkStyle, settings = {}) {
    const animationProps = { style: linkStyle, settings }
    
    switch (animation) {
      case 'shimmer': return <ShimmerEffect {...animationProps}>{content}</ShimmerEffect>
      case 'shiny': return <ShinyEffect {...animationProps}>{content}</ShinyEffect>
      case 'rainbow': return <RainbowEffect {...animationProps}>{content}</RainbowEffect>
      case 'ripple': return <RippleEffect {...animationProps}>{content}</RippleEffect>
      case 'pulsating': return <PulsatingEffect {...animationProps}>{content}</PulsatingEffect>
      case 'glare': return <GlareEffect {...animationProps}>{content}</GlareEffect>
      case 'electric': return <ElectricBorderEffect {...animationProps}>{content}</ElectricBorderEffect>
      case 'starborder': return <StarBorderEffect {...animationProps}>{content}</StarBorderEffect>
      case 'borderglow': return <BorderGlowEffect {...animationProps}>{content}</BorderGlowEffect>
      case 'spotlight': return <SpotlightEffect {...animationProps}>{content}</SpotlightEffect>
      case 'interactive': return <InteractiveHoverEffect {...animationProps}>{content}</InteractiveHoverEffect>
      case 'magnet': return <MagnetEffect {...animationProps}>{content}</MagnetEffect>
      case 'pixel': return <PixelEffect {...animationProps}>{content}</PixelEffect>
      case 'clickspark': return <ClickSparkEffect {...animationProps}>{content}</ClickSparkEffect>
      case 'targetcursor': return <TargetCursorEffect {...animationProps}>{content}</TargetCursorEffect>
      default: return <div style={linkStyle}>{content}</div>
    }
  }

  const effectiveBg = getWallpaperBg(state.wallpaper, theme)
  const effectiveCardBgStyle = getCardBg(state.cardBg, theme)
  const effectiveFont = state.textSettings.font || 'Inter'
  const effectiveTextColor = state.textSettings.color || theme.textColor
  const effectiveTitleSize = state.textSettings.titleSize === 'large' ? '30px' : '24px'
  const hz = state.spacing.hoverZoom ?? 1

  let wallpaperExtraStyle = ''
  if (state.wallpaper.style === 'dots') {
    wallpaperExtraStyle = 'background-size: 20px 20px;'
  } else if (state.wallpaper.style === 'grid') {
    const gc = adjustColor(state.wallpaper.color || theme.pageBg, 25)
    wallpaperExtraStyle = `background-image: linear-gradient(${gc} 1px, transparent 1px), linear-gradient(90deg, ${gc} 1px, transparent 1px); background-size: 24px 24px;`
  } else if (state.wallpaper.style === 'blur') {
    wallpaperExtraStyle = 'backdrop-filter: blur(20px);'
  }

  const tintOpacity = ((state.wallpaper.tint ?? 0) / 100) * 0.6
  const cardTintOpacity = ((state.cardBg.tint ?? 0) / 100) * 0.6

  const pageBgAnim = state.wallpaper?.animation || { id: 'none', params: {} }
  const cardBgAnim = state.cardBg?.animation || { id: 'none', params: {} }

  function renderPageAnimation() {
    const p = pageBgAnim.params || {}
    switch (pageBgAnim.id) {
      case 'aurora': return <Aurora {...p} />
      case 'particles': return <Particles {...p} />
      case 'flickeringGrid': return <FlickeringGrid {...p} />
      case 'waves': return <Waves {...p} />
      case 'silk': return <Silk {...p} />
      case 'retroGrid': return <RetroGrid {...p} />
      case 'lightning': return <Lightning {...p} />
      case 'orb': return <Orb {...p} />
      case 'pixelSnow': return <PixelSnow {...p} />
      case 'threads': return <Threads {...p} />
      case 'radar': return <Radar {...p} />
      default: return null
    }
  }

  function renderBgAnimation() {
    const p = cardBgAnim.params || {}
    switch (cardBgAnim.id) {
      case 'aurora': return <Aurora {...p} />
      case 'particles': return <Particles {...p} />
      case 'flickeringGrid': return <FlickeringGrid {...p} />
      case 'waves': return <Waves {...p} />
      case 'silk': return <Silk {...p} />
      case 'retroGrid': return <RetroGrid {...p} />
      case 'lightning': return <Lightning {...p} />
      case 'orb': return <Orb {...p} />
      case 'pixelSnow': return <PixelSnow {...p} />
      case 'threads': return <Threads {...p} />
      case 'radar': return <Radar {...p} />
      default: return null
    }
  }

  function handleElementClick(e, type, data) {
    if (!editMode) return
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setPopup({
      type,
      data,
      position: { 
        x: rect.right, 
        y: rect.top 
      }
    })
  }

  function handleBackgroundClick() {
    if (!editMode) return
    // Don't open popup - wallpaper settings are in LeftPanel
    // Just ignore the click or could expand the wallpaper section in LeftPanel
  }

  const btnStyle = {
    background: state.buttonSettings.style === 'outline' ? 'transparent'
      : state.buttonSettings.style === 'glass' ? 'rgba(255,255,255,0.08)'
      : state.buttonSettings.color || theme.linkBg,
    border: state.buttonSettings.style === 'outline'
      ? `2px solid ${state.buttonSettings.color || theme.linkBg}`
      : 'none',
    borderRadius: r,
    backdropFilter: state.buttonSettings.style === 'glass' ? 'blur(10px)' : 'none',
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital@1&family=Roboto:wght@400;500;700&family=Playfair+Display:wght@400;700&family=Space+Mono:wght@400;700&family=Poppins:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&family=Merriweather:wght@400;700&family=DM+Sans:wght@400;500;600;700&family=Nunito:wght@400;600;700&family=Sora:wght@400;600;700&family=Outfit:wght@400;500;600;700&family=Bebas+Neue&family=Abril+Fatface&family=Dancing+Script:wght@400;700&family=Pacifico&family=Fira+Code:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@400;700&display=swap');

        body {
          background: ${effectiveBg};
          ${wallpaperExtraStyle}
          margin: 0;
          font-family: '${effectiveFont}', sans-serif;
          /* Enable bounce scroll effect */
          -webkit-overflow-scrolling: touch;
          overflow-y: auto;
        }

        html, body {
          /* Smooth bounce scroll on iOS */
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-y: auto;
        }

        .sample-body {
          background: ${effectiveBg};
          ${wallpaperExtraStyle}
          min-height: 100vh;
          display: flex;
          gap: 25px;
          align-items: flex-start;
          justify-content: center;
          padding: 60px 20px 0;
          font-family: '${effectiveFont}', sans-serif;
          position: relative;
          /* Enable bounce scroll */
          -webkit-overflow-scrolling: touch;
        }

        .sample-card {
          width: 100%;
          max-width: 650px;
          border-radius: ${cardRadius} ${cardRadius} 0 0;
          position: relative;
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          cursor: ${editMode ? 'pointer' : 'default'};
        }

        .editable-element {
          position: relative;
          transition: all 0.2s ease;
        }

        .social-icons-override > div {
          margin: 0 !important;
        }

        .tab-navigator-override > div {
          margin: 0 !important;
        }

        .edit-icon {
          position: absolute;
          top: 50%;
          right: -36px;
          transform: translateY(-50%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: rgba(0, 255, 136, 0.15);
          border: 1.5px solid rgba(0, 255, 136, 0.4);
          border-radius: 50%;
          cursor: pointer;
          opacity: ${editMode ? '1' : '0'};
          transition: all 0.2s;
          pointer-events: ${editMode ? 'auto' : 'none'};
        }

        .edit-icon:hover {
          ${editMode ? 'background: rgba(0, 255, 136, 0.25); border-color: rgba(0, 255, 136, 0.6); transform: translateY(-50%) scale(1.1);' : ''}
        }

        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }

        @media (max-width: 600px) {
          .sample-body {
            padding: 0 !important;
            align-items: stretch;
            /* Enable bounce scroll effect on mobile */
            -webkit-overflow-scrolling: touch;
            overflow-y: auto;
          }
          .sample-card {
            max-width: 100%;
            margin: 0;
            border-radius: 0 !important;
            min-height: 100vh;
            /* Add extra padding at bottom for bounce scroll */
            padding-bottom: 60px !important;
          }
          .sample-card > div:first-of-type {
            padding: 24px 16px 0 !important;
          }
          
          /* Mobile font sizes - keep desktop sizes */
          .sample-card h1,
          .sample-card [style*="fontSize: 24px"],
          .sample-card [style*="fontSize: 30px"] {
            font-size: 24px !important;
          }
          
          .sample-card [style*="fontSize: 17px"] {
            font-size: 16px !important;
          }
          
          .sample-card [style*="fontSize: 16px"] {
            font-size: 15px !important;
          }
          
          /* Link cards BIGGER on mobile */
          .sample-card [style*="height: 64px"] {
            height: 58px !important;
            font-size: 16px !important;
          }
          
          /* Social icons BIGGER on mobile - target the container */
          .social-icons-override {
            transform: scale(1.15) !important;
          }
          
          .social-icons-override a {
            margin: 0 4px !important;
          }
          
          /* Tab buttons */
          .sample-card [style*="padding: 13px 28px"],
          .sample-card [style*="padding: 13px 12px"] {
            padding: 12px 20px !important;
            font-size: 14px !important;
          }
          
          /* Avatar size */
          .sample-card [style*="width: 100px"][style*="height: 100px"] {
            width: 100px !important;
            height: 100px !important;
          }
        }
      `}</style>

      <div className="sample-body" onClick={handleBackgroundClick} style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '60px 30px 0',
        minHeight: '100vh',
        position: 'relative',
        WebkitOverflowScrolling: 'touch', // Enable bounce scroll on iOS
      }}>
        {renderPageAnimation()}
        {tintOpacity > 0 && (
          <div style={{
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: `rgba(0,0,0,${tintOpacity})`,
          }} />
        )}

        {/* Left Settings Panel - Absolute positioned */}
        {editMode && (
          <div style={{
            position: 'absolute',
            left: '30px',
            top: '60px',
            width: 'calc((100% - 650px - 90px) / 2)',
            minWidth: '280px',
            maxWidth: '500px',
            zIndex: 10,
          }}>
            <LeftSettingsPanel 
              open={editMode} 
              state={state} 
              onUpdate={handleGlobalUpdate}
              onReset={handleReset}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
              theme={theme}
              cardBgStyle={effectiveCardBgStyle}
              cardRadius={cardRadius}
              maxHeight={centerCardHeight}
            />
          </div>
        )}

        <div ref={centerCardRef} className="sample-card" onClick={(e) => {
          // Don't open popup for card background - settings are in LeftPanel
          e.stopPropagation()
        }}>
          {/* Card background */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            zIndex: 0, 
            ...effectiveCardBgStyle,
          }} />
          
          {/* Card animation */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
            {renderBgAnimation()}
          </div>

          {/* Card tint */}
          {cardTintOpacity > 0 && (
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
              background: `rgba(0,0,0,${cardTintOpacity})`,
              borderRadius: 'inherit',
            }} />
          )}

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', padding: `${state.spacing.cardPadding || 40}px ${state.spacing.cardPadding || 40}px 0` }}>
            
            {/* TopBar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: '18px', fontStyle: 'italic',
                  color: effectiveTextColor,
                }}>
                  /w/
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setEditMode(prev => !prev)
                  if (editMode) setPopup(null)
                }}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0,
                }}
              >
                <div style={{ position: 'relative', width: '15px', height: '15px' }}>
                  {!editMode && (
                    <>
                      <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: '#00ff88', opacity: 0.4,
                        animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
                      }} />
                      <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: '#00ff88', opacity: 0.3,
                        animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
                        animationDelay: '0.6s',
                      }} />
                    </>
                  )}
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: editMode ? '#ff3b30' : '#00ff88',
                    boxShadow: editMode ? '0 0 8px #ff3b30' : '0 0 6px #00ff88',
                  }} />
                </div>
              </button>
            </div>

            {/* Profile */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              marginBottom: `${state.spacing.profileToSocial || 14}px`,
            }}>
              <div
                className={editMode ? 'editable-element' : ''}
                onClick={(e) => handleElementClick(e, 'avatar', state.profile)}
                style={{
                  width: `${state.spacing.avatarSize}px`,
                  height: `${state.spacing.avatarSize}px`,
                  borderRadius: avatarRadius,
                  marginBottom: '14px',
                  cursor: editMode ? 'pointer' : 'default',
                  position: 'relative',
                  outline: editMode ? '4px dashed rgba(0, 255, 136, 0.6)' : 'none',
                  outlineOffset: '6px',
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: avatarRadius,
                  background: '#fff',
                  overflow: 'hidden',
                }}>
                  <img
                    src={state.profile.avatarUrl}
                    alt={state.profile.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: 'block',
                      transform: `
                        scaleX(${state.profile.avatarFlipH ? -1 : 1}) 
                        scaleY(${state.profile.avatarFlipV ? -1 : 1}) 
                        rotate(${state.profile.avatarRotate || 0}deg) 
                        scale(${state.profile.avatarScale || 1})
                      `,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
                <div
                  className={editMode ? 'editable-element' : ''}
                  onClick={(e) => handleElementClick(e, 'name', state.profile)}
                  style={{
                    fontSize: effectiveTitleSize,
                    fontWeight: 700,
                    color: state.profile.nameColor || effectiveTextColor,
                    fontFamily: state.profile.nameFont ? `'${state.profile.nameFont}', sans-serif` : `'${effectiveFont}', sans-serif`,
                    margin: 0,
                    cursor: editMode ? 'pointer' : 'default',
                    position: 'relative',
                  }}
                >
                  {state.profile.name}
                  {editMode && (
                    <button 
                      className="edit-icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleElementClick(e, 'name', state.profile)
                      }}
                      style={{ border: 'none' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '0', maxWidth: '500px', width: '100%' }}>
                <div
                  className={editMode ? 'editable-element' : ''}
                  onClick={(e) => handleElementClick(e, 'bio', state.profile)}
                  style={{
                    fontSize: '17px',
                    color: state.profile.bioColor || effectiveTextColor,
                    fontFamily: state.profile.bioFont ? `'${state.profile.bioFont}', sans-serif` : `'${effectiveFont}', sans-serif`,
                    textAlign: 'center',
                    cursor: editMode ? 'pointer' : 'default',
                    position: 'relative',
                    flex: 1,
                    lineHeight: '1.5',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {state.profile.bio}
                  {editMode && (
                    <button 
                      className="edit-icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleElementClick(e, 'bio', state.profile)
                      }}
                      style={{ border: 'none', top: '0', transform: 'translateY(0)' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Social Icons */}
            {!state.hideSocialIcons && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: `${state.spacing.socialToTabs || 18}px` }}>
                <div
                  className={editMode ? 'editable-element social-icons-override' : 'social-icons-override'}
                  onClick={(e) => handleElementClick(e, 'social', state.profile)}
                  style={{ cursor: editMode ? 'pointer' : 'default', position: 'relative' }}
                >
                  <SocialIcons
                    profile={state.profile}
                    theme={{ ...theme, textColor: effectiveTextColor }}
                    hoverZoom={hz}
                  />
                  {editMode && (
                    <button 
                      className="edit-icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleElementClick(e, 'social', state.profile)
                      }}
                      style={{ 
                        border: 'none',
                        position: 'absolute',
                        right: '-36px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: `${state.spacing.tabsToLinks || 24}px` }}>
              <div
                className={editMode ? 'editable-element tab-navigator-override' : 'tab-navigator-override'}
                onClick={(e) => {
                  if (editMode) {
                    e.stopPropagation()
                    handleElementClick(e, 'tabs', { activeTab })
                  }
                }}
                style={{ 
                  cursor: editMode ? 'pointer' : 'default',
                  position: 'relative',
                }}
              >
                <TabNavigator
                  activeTab={activeTab}
                  onSwitch={setActiveTab}
                  theme={theme}
                  cornerRadius={r}
                  hoverZoom={hz}
                />
                {editMode && (
                  <button 
                    className="edit-icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleElementClick(e, 'tabs', { activeTab })
                    }}
                    style={{ 
                      border: 'none',
                      position: 'absolute',
                      right: '-36px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'links' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${state.spacing.linkGap || 12}px`, paddingBottom: '40px' }}>
                {state.links.map((link, index) => {
                const hasImage = link.imageUrl && link.imageUrl.trim() !== ''
                
                // Corner radius - use numeric value directly
                const linkRadius = link.cornerRadius !== undefined ? `${link.cornerRadius}px` : '14px'
                const linkAnimation = link.animation || 'none'
                
                const linkContent = (
                  <>
                    {hasImage && (
                      <div style={{
                        width: '44px', height: '44px', minWidth: '44px',
                        borderRadius: linkRadius,
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}>
                        <img
                          src={link.imageUrl}
                          alt={link.label}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    )}
                    <span style={{ 
                      fontSize: '16px', 
                      fontWeight: 500, 
                      flex: 1,
                      textAlign: 'center',
                      paddingRight: hasImage ? '44px' : '0',
                      paddingLeft: hasImage ? '0' : '0',
                    }}>
                      {link.label}
                    </span>
                    {editMode && (
                      <button 
                        className="edit-icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          handleElementClick(e, 'link', { ...link, onDelete: removeLink })
                        }}
                        style={{ 
                          border: 'none', 
                          position: 'absolute',
                          right: '16px',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                    )}
                  </>
                )
                
                const linkStyle = {
                  ...btnStyle,
                  borderRadius: linkRadius,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0',
                  padding: '0 16px',
                  height: '64px',
                  cursor: editMode ? 'move' : 'pointer',
                  textDecoration: 'none',
                  color: state.buttonSettings.textColor || theme.textColor,
                  transition: 'transform 0.2s ease',
                  position: 'relative',
                  opacity: draggedIndex === index ? 0.5 : 1,
                }
                
                return (
                  <div
                    key={link.id}
                    draggable={editMode}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    style={{
                      position: 'relative',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {/* Drop indicator line */}
                    {dragOverIndex === index && draggedIndex !== null && draggedIndex !== index && (
                      <div style={{
                        position: 'absolute',
                        top: draggedIndex < index ? '100%' : '-2px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: '#00ff88',
                        borderRadius: '1px',
                        boxShadow: '0 0 8px rgba(0, 255, 136, 0.6)',
                        zIndex: 20,
                      }} />
                    )}
                    
                    {/* Link button with animation wrapper */}
                    {wrapWithAnimation(linkContent, linkAnimation, linkStyle, link.animationSettings)}
                  </div>
                )
              })}

              {/* Add Link Button */}
              {editMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const newLink = {
                      id: Date.now(),
                      label: 'New Link',
                      url: 'https://example.com',
                      icon: 'instagram'
                    }
                    addLink(newLink)
                  }}
                  style={{
                    ...btnStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px 18px',
                    cursor: 'pointer',
                    border: '2px dashed rgba(0, 255, 136, 0.4)',
                    background: 'rgba(0, 255, 136, 0.05)',
                    color: '#00ff88',
                    fontWeight: 500,
                    fontSize: '15px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.6)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.4)'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add Link
                </button>
              )}
              </div>
            )}

            {/* Collections Tab */}
            {activeTab === 'collections' && (
              <CollectionGrid
                theme={theme}
                cornerRadius={r}
                hoverZoom={hz}
                cardBgStyle={effectiveCardBgStyle}
                textColor={effectiveTextColor}
                font={effectiveFont}
                editMode={editMode}
              />
            )}

            {/* Shop Tab */}
            {activeTab === 'shop' && (
              <div style={{ 
                padding: '60px 20px 40px',
                textAlign: 'center',
                color: effectiveTextColor,
                opacity: 0.5,
              }}>
                <p style={{ fontFamily: `'${effectiveFont}', sans-serif` }}>Shop coming soon...</p>
              </div>
            )}

            {/* Footer */}
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '32px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
            }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                Report
              </a>
              <span style={{ opacity: 0.3 }}>•</span>
              <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                Privacy
              </a>
              <span style={{ opacity: 0.3 }}>•</span>
              <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Edit Popup - Absolute positioned */}
        {popup && (
          <div style={{
            position: 'absolute',
            right: '30px',
            top: '60px',
            width: 'calc((100% - 650px - 90px) / 2)',
            minWidth: '280px',
            maxWidth: '500px',
            zIndex: 10,
          }}>
            <EditPopup
              key={`${popup.type}-${popup.data?.id || 'single'}`}
              type={popup.type}
              data={{ ...popup.data, themeMode: state.themeMode }}
              position={popup.position}
              onClose={() => setPopup(null)}
              onUpdate={(updates) => {
                // Handle updates based on type - DON'T close popup for live preview
                console.log('Popup type:', popup.type, 'Updates:', updates)
                switch (popup.type) {
                  case 'avatar':
                    if (updates.avatarUrl !== undefined) updateProfile('avatarUrl', updates.avatarUrl)
                    if (updates.avatarFlipH !== undefined) updateProfile('avatarFlipH', updates.avatarFlipH)
                    if (updates.avatarFlipV !== undefined) updateProfile('avatarFlipV', updates.avatarFlipV)
                    if (updates.avatarRotate !== undefined) updateProfile('avatarRotate', updates.avatarRotate)
                    if (updates.avatarScale !== undefined) updateProfile('avatarScale', updates.avatarScale)
                    break
                  case 'name':
                    if (updates.name !== undefined) {
                      console.log('Updating name to:', updates.name)
                      updateProfile('name', updates.name)
                    }
                    if (updates.nameFont !== undefined) updateProfile('nameFont', updates.nameFont)
                    if (updates.nameColor !== undefined) updateProfile('nameColor', updates.nameColor)
                    break
                  case 'bio':
                    if (updates.bio !== undefined) {
                      console.log('Updating bio to:', updates.bio)
                      updateProfile('bio', updates.bio)
                    }
                    if (updates.bioFont !== undefined) updateProfile('bioFont', updates.bioFont)
                    if (updates.bioColor !== undefined) updateProfile('bioColor', updates.bioColor)
                    break
                  case 'social':
                    // Update all social media fields dynamically
                    Object.keys(updates).forEach(key => {
                      if (updates[key] !== undefined) {
                        updateProfile(key, updates[key])
                      }
                    })
                    break
                  case 'link':
                    if (updates.label !== undefined) updateLink(popup.data.id, 'label', updates.label)
                    if (updates.url !== undefined) updateLink(popup.data.id, 'url', updates.url)
                    if (updates.icon !== undefined) updateLink(popup.data.id, 'icon', updates.icon)
                    if (updates.imageUrl !== undefined) updateLink(popup.data.id, 'imageUrl', updates.imageUrl)
                    if (updates.cornerRadius !== undefined) updateLink(popup.data.id, 'cornerRadius', updates.cornerRadius)
                    if (updates.animation !== undefined) updateLink(popup.data.id, 'animation', updates.animation)
                    if (updates.animationSettings !== undefined) updateLink(popup.data.id, 'animationSettings', updates.animationSettings)
                    break
                  case 'wallpaper':
                    setWallpaper(updates)
                    break
                  case 'cardBg':
                    setCardBg(updates)
                    break
                  case 'tabs':
                    // Tab settings would go here
                    break
                }
                // Don't close popup - keep it open for live preview
              }}
              theme={theme}
              cardBgStyle={effectiveCardBgStyle}
              cardRadius={cardRadius}
              maxHeight={centerCardHeight}
            />
          </div>
        )}
      </div>
    </>
  )
}
