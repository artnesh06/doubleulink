import { useState, useRef, useEffect } from 'react'
import { getTheme, THEMES } from '../data/themes'
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
    avatarLayout: 'classic',
    avatarShape: 'flower',
    nameFont: null, // null = use global
    nameColor: null, // null = use global
    bioFont: null,
    bioColor: null,
  },
  hideSocialIcons: false, // Toggle to hide/show social icons
  hideTabs: false,
  links: defaultLinks,
  themeId: 'chrome',
  themeMode: 'system', // 'system', 'bright', 'night'
  wallpaper: { style: 'solid', color: '#1a1a1a', animation: { id: 'none', params: {} }, effect: 'none', effectIntensity: 0, tint: 0, noise: false, noiseAmount: 25, imageScale: 120, imageX: 50, imageY: 50 },
  cardBg: { style: 'solid', color: '#242424', animation: { id: 'none', params: {} }, effect: 'none', effectIntensity: 0, tint: 0, noise: false, noiseAmount: 25, imageScale: 120, imageX: 50, imageY: 50 },
  textSettings: { font: 'Inter', color: '#ffffff', titleSize: 'small', titleSizePx: 24 },
  socialSettings: { size: 28, gap: 16 },
  tabSettings: {
    scale: 1,
    fontSize: 13,
    tabGap: 0,
    paddingY: 13,
    style: 'solid',
    bgColor: '#3a3a3a',
    activeColor: '#111111',
    activeTextColor: '#ffffff',
    inactiveTextColor: '#9a9a9a',
    borderWidth: 0,
    borderColor: '#444444',
    blur: 12,
    hiddenTabs: { links: false, shop: false, collections: false },
  },
  subtitleSettings: { hidden: false, gap: 8 },
  buttonSettings: {
    style: 'solid',
    roundness: 'full',
    shadow: 'soft',
    color: '#171717',
    textColor: '#ffffff',
    radius: null,
    borderWidth: 0,
    borderColor: 'rgba(255,255,255,0.12)',
    blur: 12,
    arrowEnabled: true,
    arrowEffect: 'slide',
    arrowOpacity: 0.5,
    arrowType: 'chevron',
  },
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
  globalRadius: 32,
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
  const imagePosition = `${wallpaper.imageX ?? 50}% ${wallpaper.imageY ?? 50}%`
  const imageSize = `${wallpaper.imageScale || 120}%`
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
      return wallpaper.imageUrl ? `url(${wallpaper.imageUrl}) ${imagePosition} / ${imageSize} no-repeat fixed` : color
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
  const imagePosition = `${cardBg.imageX ?? 50}% ${cardBg.imageY ?? 50}%`
  const imageSize = `${cardBg.imageScale || 120}%`
  switch (cardBg.style) {
    case 'gradient':
      return { background: `linear-gradient(${deg}deg, ${color} 0%, ${color2} 100%)` }
    case 'blur':
    case 'image':
      if (cardBg.imageUrl) {
        return {
          backgroundImage: `url(${cardBg.imageUrl})`,
          backgroundSize: imageSize,
          backgroundPosition: imagePosition,
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
  const [themeTab, setThemeTab] = useState('Customizable')
  const [activeTab, setActiveTab] = useState('links')
  const [popup, setPopup] = useState(null)
  const [centerCardHeight, setCenterCardHeight] = useState(0)
  const centerCardRef = useRef(null)
  
  // Drag and drop state
  const [linkDragState, setLinkDragState] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const draggedIndex = linkDragState?.index ?? null
  const linkDragOffset = linkDragState ? linkDragState.currentY - linkDragState.startY : 0
  
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

  // Link list drag handlers - custom pointer drag avoids browser-native ghost cursors.
  function handleLinkPointerDown(e, index) {
    if (!editMode) return
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setLinkDragState({ id: state.links[index]?.id, index, startY: e.clientY, currentY: e.clientY })
    setDragOverIndex(null)
  }

  function updateLinkDragTarget(clientX, clientY) {
    const target = document
      .elementsFromPoint(clientX, clientY)
      .map(element => element.closest?.('[data-link-index]'))
      .find(element => element && Number(element.getAttribute('data-link-index')) !== draggedIndex)

    const targetIndex = target ? Number(target.getAttribute('data-link-index')) : -1
    if (targetIndex < 0 || draggedIndex === null || targetIndex === draggedIndex) return

    setDragOverIndex(targetIndex)
    setState(prev => {
      const nextLinks = [...prev.links]
      const currentIndex = nextLinks.findIndex(item => item.id === linkDragState?.id)
      const fromIdx = currentIndex >= 0 ? currentIndex : draggedIndex
      if (fromIdx < 0 || fromIdx === targetIndex) return prev

      const [moving] = nextLinks.splice(fromIdx, 1)
      nextLinks.splice(targetIndex, 0, moving)
      return { ...prev, links: nextLinks }
    })
    setLinkDragState(prev => prev ? { ...prev, index: targetIndex, startY: clientY, currentY: clientY } : prev)
  }

  function handleLinkPointerMove(e) {
    if (!linkDragState) return
    setLinkDragState(prev => prev ? { ...prev, currentY: e.clientY } : prev)
    updateLinkDragTarget(e.clientX, e.clientY)
  }

  function finishLinkDrag() {
    setLinkDragState(null)
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

  function setSocialSettings(updates) {
    setState(prev => ({ ...prev, socialSettings: { ...prev.socialSettings, ...updates } }))
  }

  function setTabSettings(updates) {
    const nextSettings = { ...(state.tabSettings || {}), ...updates }
    setState(prev => ({ ...prev, tabSettings: { ...prev.tabSettings, ...updates } }))

    if (nextSettings.hiddenTabs?.[activeTab]) {
      const nextTab = ['links', 'shop', 'collections'].find(tab => !nextSettings.hiddenTabs?.[tab])
      if (nextTab) setActiveTab(nextTab)
    }
  }

  function setSubtitleSettings(updates) {
    setState(prev => ({ ...prev, subtitleSettings: { ...prev.subtitleSettings, ...updates } }))
  }

  function setButtonSettings(updates) {
    setState(prev => ({ ...prev, buttonSettings: { ...prev.buttonSettings, ...updates } }))
  }

  function setCornerRadius(value) {
    setState(prev => ({ ...prev, cornerRadius: value }))
  }

  function setGlobalRadius(value) {
    setState(prev => ({ ...prev, globalRadius: value }))
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
      case 'socialSettings':
        setSocialSettings(value)
        break
      case 'tabSettings':
        setTabSettings(value)
        break
      case 'subtitleSettings':
        setSubtitleSettings(value)
        break
      case 'buttonSettings':
        setButtonSettings(value)
        break
      case 'cornerRadius':
        setCornerRadius(value)
        break
      case 'globalRadius':
        setGlobalRadius(value)
        break
      case 'themeMode':
        setThemeMode(value)
        break
      case 'hideSocialIcons':
        setState(prev => ({ ...prev, hideSocialIcons: value }))
        break
      case 'hideTabs':
        setState(prev => ({ ...prev, hideTabs: value }))
        break
    }
  }

  const theme = getTheme(state.themeId)
  const r = `${state.globalRadius ?? 32}px`
  const avatarRadius = state.globalRadius >= 48 ? '50%' : r
  const cardRadius = r
  const avatarLayout = ['classic', 'shape'].includes(state.profile.avatarLayout) ? state.profile.avatarLayout : 'classic'
  const avatarShape = state.profile.avatarShape || 'flower'
  const avatarSize = state.spacing.avatarSize || 100
  const avatarTransform = `
    scaleX(${state.profile.avatarFlipH ? -1 : 1}) 
    scaleY(${state.profile.avatarFlipV ? -1 : 1}) 
    rotate(${state.profile.avatarRotate || 0}deg) 
    scale(${state.profile.avatarScale || 1})
  `
  const avatarShapeStyles = {
    flower: {
      borderRadius: '58% 42% 54% 46% / 44% 54% 46% 56%',
      clipPath: 'polygon(50% 2%, 66% 18%, 90% 14%, 82% 38%, 98% 52%, 78% 66%, 84% 91%, 58% 83%, 42% 98%, 30% 76%, 6% 82%, 16% 57%, 2% 42%, 26% 32%, 20% 8%)',
    },
    oval: { borderRadius: '50%' },
    rounded: { borderRadius: `${Math.max(16, state.globalRadius || 32)}px` },
    burst: {
      borderRadius: '38% 62% 45% 55% / 52% 38% 62% 48%',
      clipPath: 'polygon(50% 0%, 58% 13%, 74% 5%, 77% 22%, 94% 20%, 87% 38%, 100% 50%, 86% 61%, 94% 79%, 76% 77%, 72% 95%, 57% 87%, 50% 100%, 41% 86%, 25% 95%, 22% 76%, 5% 80%, 13% 62%, 0% 50%, 14% 39%, 6% 21%, 25% 23%, 28% 5%, 42% 14%)',
    },
  }
  const avatarFrameByLayout = {
    classic: {
      width: `${avatarSize}px`,
      height: `${avatarSize}px`,
      borderRadius: avatarRadius,
      overflow: 'hidden',
    },
    hero: {
      width: `${Math.min(340, Math.max(190, avatarSize * 2.45))}px`,
      height: `${Math.max(130, avatarSize * 1.45)}px`,
      borderRadius: `${Math.max(18, state.globalRadius || 32)}px`,
      overflow: 'hidden',
    },
    cutout: {
      width: `${Math.min(280, Math.max(170, avatarSize * 1.85))}px`,
      height: `${Math.max(150, avatarSize * 1.85)}px`,
      borderRadius: `${Math.max(18, state.globalRadius || 32)}px`,
      overflow: 'hidden',
    },
    shape: {
      width: `${Math.min(280, Math.max(160, avatarSize * 1.85))}px`,
      height: `${Math.max(120, avatarSize * 1.25)}px`,
      overflow: 'hidden',
      ...(avatarShapeStyles[avatarShape] || avatarShapeStyles.flower),
    },
  }

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
  const editorPanelBgStyle = {
    background: state.themeMode === 'bright'
      ? 'rgba(255,255,255,0.92)'
      : 'rgba(31,31,31,0.86)',
    border: state.themeMode === 'bright'
      ? '1px solid rgba(0,0,0,0.08)'
      : '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 24px 70px rgba(0,0,0,0.28)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
  }
  const effectiveFont = state.textSettings.font || 'Inter'
  const effectiveTextColor = state.textSettings.color || theme.textColor
  const effectiveTitleSize = `${state.textSettings.titleSizePx || (state.textSettings.titleSize === 'large' ? 30 : 24)}px`
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

  const wallpaperEffect = state.wallpaper.effect ?? 'none'
  const wallpaperEffectIntensity = state.wallpaper.effectIntensity ?? 0
  let wallpaperEffectFilter = ''
  if (wallpaperEffect === 'mono') wallpaperEffectFilter = `grayscale(${wallpaperEffectIntensity}%)`
  else if (wallpaperEffect === 'blur') wallpaperEffectFilter = `blur(${Math.round((wallpaperEffectIntensity / 100) * 24)}px)`
  else if (wallpaperEffect === 'halftone') wallpaperEffectFilter = `contrast(${1 + (wallpaperEffectIntensity / 100) * 0.85}) saturate(${1 + (wallpaperEffectIntensity / 100) * 0.35})`

  const cardEffect = state.cardBg?.effect ?? 'none'
  const cardEffectIntensity = state.cardBg?.effectIntensity ?? 0
  let cardEffectFilter = ''
  if (cardEffect === 'mono') cardEffectFilter = `grayscale(${cardEffectIntensity}%)`
  else if (cardEffect === 'blur') cardEffectFilter = `blur(${Math.round((cardEffectIntensity / 100) * 24)}px)`
  else if (cardEffect === 'halftone') cardEffectFilter = `contrast(${1 + (cardEffectIntensity / 100) * 0.85}) saturate(${1 + (cardEffectIntensity / 100) * 0.35})`

  const tintOpacity = ((state.wallpaper.tint ?? 0) / 100) * 0.6
  const cardTintOpacity = ((state.cardBg.tint ?? 0) / 100) * 0.6
  const wallpaperNoiseOpacity = ((state.wallpaper.noiseAmount ?? 25) / 100) * 0.34
  const cardNoiseOpacity = ((state.cardBg.noiseAmount ?? 25) / 100) * 0.34

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

  const buttonShadowMap = {
    none: 'none',
    soft: '0 14px 28px rgba(0,0,0,0.18)',
    deep: '0 22px 44px rgba(0,0,0,0.35)',
    glow: `0 0 0 1px ${state.buttonSettings.borderColor || 'rgba(255,255,255,0.12)'}, 0 18px 36px rgba(0,0,0,0.28)`,
  }

  const btnStyle = {
    background: state.buttonSettings.style === 'outline' ? 'transparent'
      : state.buttonSettings.style === 'glass' ? 'rgba(255,255,255,0.09)'
      : state.buttonSettings.style === 'blur' ? 'rgba(255,255,255,0.06)'
      : state.buttonSettings.color || theme.linkBg,
    border: state.buttonSettings.style === 'outline'
      ? `${Math.max(1, state.buttonSettings.borderWidth || 2)}px solid ${state.buttonSettings.borderColor || state.buttonSettings.color || theme.linkBg}`
      : (state.buttonSettings.borderWidth || 0) > 0
        ? `${state.buttonSettings.borderWidth}px solid ${state.buttonSettings.borderColor || 'rgba(255,255,255,0.12)'}`
        : 'none',
    borderRadius: r,
    backdropFilter: ['glass', 'blur'].includes(state.buttonSettings.style) ? `blur(${state.buttonSettings.blur || 12}px)` : 'none',
    WebkitBackdropFilter: ['glass', 'blur'].includes(state.buttonSettings.style) ? `blur(${state.buttonSettings.blur || 12}px)` : 'none',
    boxShadow: buttonShadowMap[state.buttonSettings.shadow || 'none'] || 'none',
  }
  const editorActionButtonShadow = btnStyle.boxShadow === 'none' ? 'none' : btnStyle.boxShadow

  function renderArrowIcon(direction, type = 'chevron') {
    if (type === 'arrow') {
      return direction === 'left' ? (
        <path d="M19 12H5M12 19l-7-7 7-7" />
      ) : (
        <path d="M5 12h14M12 5l7 7-7 7" />
      )
    }
    if (type === 'triangle') {
      return direction === 'left' ? (
        <path d="M15 6l-6 6 6 6z" fill="currentColor" stroke="none" />
      ) : (
        <path d="M9 6l6 6-6 6z" fill="currentColor" stroke="none" />
      )
    }
    if (type === 'double') {
      return direction === 'left' ? (
        <>
          <polyline points="13 18 7 12 13 6" />
          <polyline points="18 18 12 12 18 6" />
        </>
      ) : (
        <>
          <polyline points="6 18 12 12 6 6" />
          <polyline points="11 18 17 12 11 6" />
        </>
      )
    }
    return direction === 'left' ? (
      <polyline points="15 18 9 12 15 6" />
    ) : (
      <polyline points="9 18 15 12 9 6" />
    )
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

        .sample-body.edit-mode .sample-card {
          max-width: min(650px, calc(100vw - var(--editor-panel-w) - var(--editor-panel-w) - 120px));
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

        /* Link arrow animations */
        .link-arrow {
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        /* Slide effect (default) */
        a:hover .link-arrow-left.link-arrow-effect-slide,
        [draggable]:hover .link-arrow-left.link-arrow-effect-slide {
          transform: translateX(-5px);
          opacity: 1 !important;
        }
        a:hover .link-arrow-right.link-arrow-effect-slide,
        [draggable]:hover .link-arrow-right.link-arrow-effect-slide {
          transform: translateX(5px);
          opacity: 1 !important;
        }

        /* Bounce effect */
        @keyframes arrow-bounce-left {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-6px); }
        }
        @keyframes arrow-bounce-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        a:hover .link-arrow-left.link-arrow-effect-bounce,
        [draggable]:hover .link-arrow-left.link-arrow-effect-bounce {
          animation: arrow-bounce-left 0.6s ease infinite;
          opacity: 1 !important;
        }
        a:hover .link-arrow-right.link-arrow-effect-bounce,
        [draggable]:hover .link-arrow-right.link-arrow-effect-bounce {
          animation: arrow-bounce-right 0.6s ease infinite;
          opacity: 1 !important;
        }

        /* Fade effect */
        a:hover .link-arrow-left.link-arrow-effect-fade,
        [draggable]:hover .link-arrow-left.link-arrow-effect-fade,
        a:hover .link-arrow-right.link-arrow-effect-fade,
        [draggable]:hover .link-arrow-right.link-arrow-effect-fade {
          opacity: 1 !important;
        }

        /* Grow effect */
        a:hover .link-arrow-left.link-arrow-effect-grow,
        [draggable]:hover .link-arrow-left.link-arrow-effect-grow,
        a:hover .link-arrow-right.link-arrow-effect-grow,
        [draggable]:hover .link-arrow-right.link-arrow-effect-grow {
          transform: scale(1.4);
          opacity: 1 !important;
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
          .sample-card [style*="height: 72px"] {
            height: 64px !important;
            font-size: 16px !important;
          }
          
          /* Social icons proper size on mobile */
          .social-icons-override a > div {
            width: 36px !important;
            height: 36px !important;
          }
          
          .social-icons-override a > div svg {
            width: 24px !important;
            height: 24px !important;
          }
          
          /* Reduce gap between icons on mobile - tighter spacing */
          .social-icons-override {
            gap: 10px !important;
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

      <div className={`sample-body${editMode ? ' edit-mode' : ''}`} onClick={handleBackgroundClick} style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '60px 30px 0',
        minHeight: '100vh',
        position: 'relative',
        '--editor-panel-w': 'clamp(240px, calc((100vw - 650px - 120px) / 2), 420px)',
        WebkitOverflowScrolling: 'touch', // Enable bounce scroll on iOS
      }}>
        {renderPageAnimation()}
        {wallpaperEffectFilter && (
          <div style={{
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
            backdropFilter: wallpaperEffectFilter,
            WebkitBackdropFilter: wallpaperEffectFilter,
          }} />
        )}
        {state.wallpaper.noise && (
          <div style={{
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
            opacity: wallpaperNoiseOpacity,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.42) 0.7px, transparent 0.7px)',
            backgroundSize: '4px 4px',
            mixBlendMode: 'overlay',
          }} />
        )}
        {tintOpacity > 0 && (
          <div style={{
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: `rgba(0,0,0,${tintOpacity})`,
          }} />
        )}

        {/* Desktop: Left Settings Panel */}
        {editMode && (
          <div className="desktop-left-panel" style={{
            position: 'fixed',
            left: '30px',
            top: '60px',
            width: 'var(--editor-panel-w)',
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
              cardBgStyle={editorPanelBgStyle}
              cardRadius={cardRadius}
              maxHeight={centerCardHeight}
            />
          </div>
        )}

        {/* Mobile: Bottom Sheet */}
        {editMode && (
          <div className="mobile-bottom-sheet" style={{
            position: 'fixed', inset: 0, zIndex: 200,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            pointerEvents: 'none',
          }}>
            <style>{`
              @keyframes slideUpSheet {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
              @media (min-width: 601px) { .mobile-bottom-sheet { display: none !important; } }
              @media (max-width: 600px) { .desktop-left-panel { display: none !important; } }
            `}</style>
            <div onClick={() => setEditMode(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', pointerEvents: 'auto' }} />
            <div style={{
              position: 'relative', zIndex: 1,
              background: state.themeMode === 'bright' ? '#ffffff' : '#1a1a1a',
              borderRadius: '24px 24px 0 0', maxHeight: '85vh',
              display: 'flex', flexDirection: 'column',
              pointerEvents: 'auto',
              animation: 'slideUpSheet 0.35s cubic-bezier(0.4,0,0.2,1)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 0' }}>
                <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: state.themeMode === 'bright' ? '#ddd' : '#444' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px 0', flexShrink: 0 }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: state.themeMode === 'bright' ? '#111' : '#fff', fontFamily: 'Inter, sans-serif' }}>Theme</h2>
                <button onClick={() => setEditMode(false)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: state.themeMode === 'bright' ? '#f0f0f0' : '#2a2a2a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: state.themeMode === 'bright' ? '#555' : '#aaa', fontSize: '22px' }}>×</button>
              </div>
              <div style={{ display: 'flex', padding: '16px 24px 0', borderBottom: `1px solid ${state.themeMode === 'bright' ? '#eee' : '#2a2a2a'}`, flexShrink: 0 }}>
                {['Customizable', 'Curated'].map(tab => {
                  const active = themeTab === tab
                  return (
                    <button key={tab} onClick={() => setThemeTab(tab)} style={{
                      padding: '8px 4px', marginRight: '24px', background: 'transparent', border: 'none',
                      borderBottom: active ? `2px solid ${state.themeMode === 'bright' ? '#111' : '#fff'}` : '2px solid transparent',
                      color: active ? (state.themeMode === 'bright' ? '#111' : '#fff') : (state.themeMode === 'bright' ? '#999' : '#666'),
                      fontSize: '16px', fontWeight: active ? 700 : 400, cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif', marginBottom: '-1px',
                    }}>{tab}</button>
                  )
                })}
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {themeTab === 'Customizable' ? (
                  <LeftSettingsPanel
                    open={editMode} state={state} onUpdate={handleGlobalUpdate}
                    onReset={handleReset} onUndo={handleUndo} onRedo={handleRedo}
                    canUndo={historyIndex > 0} canRedo={historyIndex < history.length - 1}
                    theme={theme} cardBgStyle={{}} cardRadius={'0px'} maxHeight={0}
                  />
                ) : (
                  <div style={{ padding: '16px 20px' }}>
                    <button
                      onClick={() => {
                        const random = THEMES[Math.floor(Math.random() * THEMES.length)]
                        handleGlobalUpdate('themeId', random.id)
                      }}
                      style={{
                        width: '100%', padding: '14px', borderRadius: '12px',
                        background: state.themeMode === 'bright' ? '#f5f5f5' : '#2a2a2a',
                        border: `1px solid ${state.themeMode === 'bright' ? '#e0e0e0' : '#3a3a3a'}`,
                        color: state.themeMode === 'bright' ? '#333' : '#ccc',
                        fontSize: '15px', fontWeight: 600, cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        marginBottom: '16px',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
                        <polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
                      </svg>
                      Shuffle
                    </button>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      {THEMES.map(t => {
                        const active = state.themeId === t.id
                        const prev = t.preview || {}
                        return (
                          <button key={t.id} onClick={() => handleGlobalUpdate('themeId', t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <div style={{
                              width: '100%', aspectRatio: '3/4', borderRadius: '14px',
                              background: prev.bg || t.pageBg || '#1a1a1a',
                              border: active ? '2.5px solid #00ff88' : `2px solid ${state.themeMode === 'bright' ? '#e0e0e0' : '#333'}`,
                              overflow: 'hidden', position: 'relative',
                            }}>
                              {prev.image && <img src={prev.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />}
                              <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', background: prev.card || '#242424', borderRadius: '8px', padding: '8px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: prev.text || '#fff', fontFamily: t.font ? `'${t.font}', sans-serif` : 'Inter, sans-serif', marginBottom: '4px' }}>Aa</div>
                                <div style={{ height: '6px', borderRadius: '3px', background: prev.btn || '#333' }} />
                              </div>
                              {active && (
                                <div style={{ position: 'absolute', top: '8px', right: '8px', width: '20px', height: '20px', borderRadius: '50%', background: '#00ff88', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                              )}
                            </div>
                            <span style={{ fontSize: '12px', fontWeight: active ? 700 : 400, color: active ? (state.themeMode === 'bright' ? '#111' : '#fff') : (state.themeMode === 'bright' ? '#666' : '#888'), fontFamily: 'Inter, sans-serif' }}>{t.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
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
            filter: cardEffectFilter || 'none',
            transform: cardEffect === 'blur' ? 'scale(1.03)' : 'none',
          }} />
          
          {/* Card animation */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
            {renderBgAnimation()}
          </div>

          {state.cardBg.noise && (
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
              opacity: cardNoiseOpacity,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.45) 0.7px, transparent 0.7px)',
              backgroundSize: '4px 4px',
              mixBlendMode: 'overlay',
              borderRadius: 'inherit',
            }} />
          )}

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
                  width: avatarLayout === 'banner' ? `${Math.min(360, Math.max(240, avatarSize * 3.1))}px` : avatarFrameByLayout[avatarLayout]?.width,
                  height: avatarLayout === 'banner' ? `${Math.max(110, avatarSize * 1.18)}px` : avatarFrameByLayout[avatarLayout]?.height,
                  borderRadius: avatarLayout === 'banner' ? `${Math.max(18, state.globalRadius || 32)}px` : avatarFrameByLayout[avatarLayout]?.borderRadius,
                  marginBottom: avatarLayout === 'banner' ? `${Math.max(34, avatarSize * 0.45)}px` : '14px',
                  cursor: editMode ? 'pointer' : 'default',
                  position: 'relative',
                  outline: editMode ? '4px dashed rgba(0, 255, 136, 0.6)' : 'none',
                  outlineOffset: '6px',
                  flexShrink: 0,
                }}
              >
                {avatarLayout === 'banner' ? (
                  <>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 'inherit',
                      overflow: 'hidden',
                      background: '#fff',
                    }}>
                      <img
                        src={state.profile.avatarUrl}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          opacity: 0.72,
                          filter: 'saturate(1.05)',
                          transform: avatarTransform,
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.32))',
                      }} />
                    </div>
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: `${Math.max(-34, avatarSize * -0.34)}px`,
                      width: `${avatarSize}px`,
                      height: `${avatarSize}px`,
                      transform: 'translateX(-50%)',
                      borderRadius: avatarRadius,
                      overflow: 'hidden',
                      background: '#fff',
                      border: '4px solid rgba(255,255,255,0.85)',
                      boxShadow: '0 14px 30px rgba(0,0,0,0.22)',
                    }}>
                      <img
                        src={state.profile.avatarUrl}
                        alt={state.profile.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transform: avatarTransform,
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: avatarFrameByLayout[avatarLayout]?.borderRadius,
                    clipPath: avatarFrameByLayout[avatarLayout]?.clipPath,
                    background: '#fff',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: ['hero', 'cutout', 'shape'].includes(avatarLayout) ? '0 16px 32px rgba(0,0,0,0.16)' : 'none',
                  }}>
                    <img
                      src={state.profile.avatarUrl}
                      alt={state.profile.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: avatarLayout === 'cutout' ? 'contain' : 'cover',
                        display: 'block',
                        transform: avatarTransform,
                      }}
                    />
                    {avatarLayout === 'hero' && (
                      <div style={{ position: 'absolute', inset: '45% 0 0', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.92))' }} />
                    )}
                    {avatarLayout === 'cutout' && (
                      <div style={{ position: 'absolute', inset: '58% 0 0', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.95))' }} />
                    )}
                  </div>
                )}
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
                    lineHeight: '1.5',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    display: 'inline',
                  }}
                >
                  {state.profile.bio}
                  {editMode && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleElementClick(e, 'bio', state.profile)
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '22px',
                        height: '22px',
                        marginLeft: '6px',
                        background: 'rgba(0, 255, 136, 0.15)',
                        border: '1.5px solid rgba(0, 255, 136, 0.4)',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        verticalAlign: 'middle',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(0, 255, 136, 0.25)'
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.6)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(0, 255, 136, 0.15)'
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.4)'
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                    size={state.socialSettings?.size || 28}
                    gap={state.socialSettings?.gap || 16}
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
            {!state.hideTabs && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: `${state.spacing.tabsToLinks || 24}px` }}>
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
                  scale={state.tabSettings?.scale || 1}
                  fontSize={state.tabSettings?.fontSize || 13}
                  tabGap={state.tabSettings?.tabGap || 0}
                  paddingY={state.tabSettings?.paddingY || 13}
                  settings={state.tabSettings || {}}
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
            </div>}

            {/* Tab Content */}
            {activeTab === 'links' && (
              <div
                onPointerMove={handleLinkPointerMove}
                onPointerUp={finishLinkDrag}
                onPointerCancel={finishLinkDrag}
                style={{ display: 'flex', flexDirection: 'column', gap: `${state.spacing.linkGap || 12}px`, paddingBottom: '40px' }}
              >
                {state.links.map((link, index) => {

                // ── Subtitle/divider item ──────────────────────────
                if (link.type === 'subtitle') {
                  if (state.subtitleSettings?.hidden) return null

                  return (
                    <div
                      key={link.id}
                      data-link-index={index}
                      onPointerDown={(e) => {
                        if (editMode) handleLinkPointerDown(e, index)
                      }}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: `${state.subtitleSettings?.gap ?? 8}px 0`,
                        cursor: editMode ? 'grab' : 'default',
                        opacity: 1,
                        transform: draggedIndex === index ? `translateY(${linkDragOffset}px) scale(1.01)` : 'translateY(0) scale(1)',
                        transition: draggedIndex === index ? 'none' : 'transform 0.16s ease, box-shadow 0.16s ease',
                        zIndex: draggedIndex === index ? 40 : 1,
                        filter: draggedIndex === index ? 'drop-shadow(0 16px 32px rgba(0,0,0,0.3))' : 'none',
                      }}
                    >
                      {/* Drop indicator */}
                      {dragOverIndex === index && draggedIndex !== null && draggedIndex !== index && (
                        <div style={{
                          position: 'absolute',
                          top: draggedIndex < index ? '100%' : '-2px',
                          left: 0, right: 0, height: '2px',
                          background: '#00ff88',
                          borderRadius: '1px',
                          boxShadow: '0 0 8px rgba(0, 255, 136, 0.6)',
                          zIndex: 20,
                        }} />
                      )}

                      {/* Delete button - left */}
                      {editMode && (
                        <button
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); removeLink(link.id) }}
                          style={{
                            width: '22px', height: '22px', flexShrink: 0,
                            borderRadius: '50%',
                            background: 'rgba(255,59,48,0.15)',
                            border: '1.5px solid rgba(255,59,48,0.5)',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      )}

                      {/* Line + text */}
                      <div style={{ flex: 1, height: '1px', background: link.subtitleShowLine !== false ? 'rgba(255,255,255,0.12)' : 'transparent' }} />
                      <span style={{
                        fontSize: `${link.subtitleSize || 11}px`, fontWeight: 600,
                        color: link.subtitleColor || effectiveTextColor,
                        opacity: link.subtitleOpacity ?? 0.45,
                        textTransform: 'uppercase', letterSpacing: '1.2px',
                        fontFamily: link.subtitleFont ? `'${link.subtitleFont}', sans-serif` : `'${effectiveFont}', sans-serif`,
                        whiteSpace: 'nowrap',
                        textAlign: link.subtitleAlign || 'center',
                      }}>
                        {link.label || 'Section'}
                      </span>
                      <div style={{ flex: 1, height: '1px', background: link.subtitleShowLine !== false ? 'rgba(255,255,255,0.12)' : 'transparent' }} />

                      {/* Edit button - right */}
                      {editMode && (
                        <button
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleElementClick(e, 'subtitle', { ...link, onDelete: removeLink })
                          }}
                          style={{
                            width: '22px', height: '22px', flexShrink: 0,
                            borderRadius: '50%',
                            background: 'rgba(0,255,136,0.15)',
                            border: '1.5px solid rgba(0,255,136,0.4)',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  )
                }

                const hasImage = link.imageUrl && link.imageUrl.trim() !== ''
                const arrowEnabled = link.arrowEnabled ?? state.buttonSettings.arrowEnabled ?? true
                const arrowOpacity = link.arrowOpacity ?? state.buttonSettings.arrowOpacity ?? 0.5
                const arrowEffect = link.arrowEffect || state.buttonSettings.arrowEffect || 'slide'
                const arrowType = link.arrowType || state.buttonSettings.arrowType || 'chevron'
                const showLeftArrow = arrowEnabled && !hasImage
                const showRightArrow = arrowEnabled
                
                // Corner radius - use numeric value directly
                const linkRadius = link.cornerRadius !== undefined ? `${link.cornerRadius}px` : `${state.buttonSettings.radius ?? state.globalRadius ?? 32}px`
                const linkAnimation = link.animation || 'none'
                
                const linkContent = (
                  <>
                    {/* Left arrow - only if arrow enabled AND no image */}
                    {showLeftArrow && (
                      <span className={`link-arrow link-arrow-left link-arrow-effect-${arrowEffect}`} style={{
                        position: 'absolute',
                        left: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'currentColor',
                        opacity: arrowOpacity,
                        pointerEvents: 'none',
                        transition: 'transform 0.3s ease, opacity 0.3s ease',
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {renderArrowIcon('left', arrowType)}
                        </svg>
                      </span>
                    )}
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
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <span style={{ 
                      fontSize: '16px', 
                      fontWeight: 500, 
                      flex: 1,
                      textAlign: 'center',
                      // Shift text right when left arrow is visible so it looks centered
                      paddingLeft: showLeftArrow ? '32px' : hasImage ? '0' : '0',
                      paddingRight: hasImage ? '44px' : showRightArrow ? '32px' : '0',
                    }}>
                      {link.label}
                    </span>
                    {/* Right arrow */}
                    {showRightArrow && (
                      <span className={`link-arrow link-arrow-right link-arrow-effect-${arrowEffect}`} style={{
                        position: 'absolute',
                        right: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'currentColor',
                        opacity: arrowOpacity,
                        pointerEvents: 'none',
                        transition: 'transform 0.3s ease, opacity 0.3s ease',
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {renderArrowIcon('right', arrowType)}
                        </svg>
                      </span>
                    )}
                    {editMode && (
                      <button 
                        className="edit-icon"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          handleElementClick(e, 'link', { ...link, onDelete: removeLink })
                        }}
                        style={{ 
                          border: 'none', 
                          position: 'absolute',
                          right: showRightArrow ? '40px' : '16px',
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
                  </>
                )
                
                const linkStyle = {
                  ...btnStyle,
                  borderRadius: linkRadius,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0',
                  padding: '0 16px',
                  height: '72px',
                  cursor: editMode ? 'move' : 'pointer',
                  textDecoration: 'none',
                  color: state.buttonSettings.textColor || theme.textColor,
                  transition: draggedIndex === index ? 'none' : 'transform 0.16s ease, box-shadow 0.16s ease',
                  position: 'relative',
                  opacity: 1,
                  transform: draggedIndex === index ? `translateY(${linkDragOffset}px) scale(1.01)` : 'translateY(0) scale(1)',
                  zIndex: draggedIndex === index ? 40 : 1,
                  boxShadow: draggedIndex === index
                    ? '0 20px 46px rgba(0,0,0,0.36)'
                    : btnStyle.boxShadow,
                }
                
                return (
                  <div
                    key={link.id}
                    data-link-index={index}
                    onPointerDown={(e) => {
                      if (editMode) handleLinkPointerDown(e, index)
                    }}
                    style={{
                      position: 'relative',
                      transition: draggedIndex === index ? 'none' : 'transform 0.16s ease',
                      zIndex: draggedIndex === index ? 40 : 1,
                      touchAction: editMode ? 'none' : 'auto',
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

              {/* Add Link + Add Sub Title Buttons */}
              {editMode && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addLink({
                        id: Date.now(),
                        label: 'New Link',
                        url: 'https://example.com',
                        icon: null,
                        type: 'link',
                      })
                    }}
                    style={{
                      ...btnStyle,
                      flex: 1,
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
                      boxShadow: editorActionButtonShadow,
                      transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
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
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Link
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setState(prev => ({
                        ...prev,
                        links: [{ id: Date.now(), label: 'Section', type: 'subtitle', subtitleFont: null, subtitleSize: 13, subtitleShowLine: true }, ...prev.links]
                      }))
                    }}
                    style={{
                      ...btnStyle,
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '14px 18px',
                      cursor: 'pointer',
                      border: '2px dashed rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 500,
                      fontSize: '15px',
                      boxShadow: editorActionButtonShadow,
                      transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                    </svg>
                    Add Sub Title
                  </button>
                </div>
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
            position: 'fixed',
            right: '30px',
            top: '60px',
            width: 'var(--editor-panel-w)',
            maxWidth: '500px',
            zIndex: 10,
          }}>
            <EditPopup
              key={`${popup.type}-${popup.data?.id || 'single'}`}
              type={popup.type}
              data={{
                ...popup.data,
                ...(popup.type === 'tabs' ? state.tabSettings : {}),
                themeMode: state.themeMode,
              }}
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
                    if (updates.avatarLayout !== undefined) updateProfile('avatarLayout', updates.avatarLayout)
                    if (updates.avatarShape !== undefined) updateProfile('avatarShape', updates.avatarShape)
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
                    if (updates.arrowEnabled !== undefined) updateLink(popup.data.id, 'arrowEnabled', updates.arrowEnabled)
                    if (updates.arrowEffect !== undefined) updateLink(popup.data.id, 'arrowEffect', updates.arrowEffect)
                    if (updates.arrowOpacity !== undefined) updateLink(popup.data.id, 'arrowOpacity', updates.arrowOpacity)
                    if (updates.arrowType !== undefined) updateLink(popup.data.id, 'arrowType', updates.arrowType)
                    break
                  case 'subtitle':
                    if (updates.label !== undefined) updateLink(popup.data.id, 'label', updates.label)
                    if (updates.subtitleFont !== undefined) updateLink(popup.data.id, 'subtitleFont', updates.subtitleFont)
                    if (updates.subtitleSize !== undefined) updateLink(popup.data.id, 'subtitleSize', updates.subtitleSize)
                    if (updates.subtitleShowLine !== undefined) updateLink(popup.data.id, 'subtitleShowLine', updates.subtitleShowLine)
                    if (updates.subtitleColor !== undefined) updateLink(popup.data.id, 'subtitleColor', updates.subtitleColor)
                    if (updates.subtitleOpacity !== undefined) updateLink(popup.data.id, 'subtitleOpacity', updates.subtitleOpacity)
                    if (updates.subtitleAlign !== undefined) updateLink(popup.data.id, 'subtitleAlign', updates.subtitleAlign)
                    break
                  case 'wallpaper':
                    setWallpaper(updates)
                    break
                  case 'cardBg':
                    setCardBg(updates)
                    break
                  case 'tabs':
                    setTabSettings({
                      style: updates.style,
                      bgColor: updates.bgColor,
                      activeColor: updates.activeColor,
                      activeTextColor: updates.activeTextColor,
                      inactiveTextColor: updates.inactiveTextColor,
                      borderWidth: updates.borderWidth,
                      borderColor: updates.borderColor,
                      blur: updates.blur,
                      hiddenTabs: updates.hiddenTabs,
                    })
                    break
                }
                // Don't close popup - keep it open for live preview
              }}
              theme={theme}
              cardBgStyle={editorPanelBgStyle}
              cardRadius={cardRadius}
              maxHeight={centerCardHeight}
            />
          </div>
        )}
      </div>
    </>
  )
}
