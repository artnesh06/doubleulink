import { useState } from 'react'
import { THEMES } from '../data/themes'
import { defaultLinks, defaultShopItems, PFP_URL } from '../data/data'

const STORAGE_KEY = 'doubleulink_page_state'

const defaultBgLayer = {
  style: 'fill',
  color: '#1a1a1a',
  gradientDeg: 135,
  gradientColor2: '#2a2a2a',
  imageUrl: null,
  effect: 'none',
  tint: 0,
  animation: { id: 'none', params: {} },
  colors: { background: '#1a1a1a', buttons: '#171717', buttonText: '#ffffff', pageText: '#ffffff', titleText: '#ffffff' },
}

const defaultState = {
  profile: {
    name: 'Artnesh',
    bio: 'NFT artist and developer @oddslaunchpad.\nCreating art and building in Web3.',
    instagram: 'https://www.instagram.com/artnesh_/',
    pinterest: 'https://id.pinterest.com/artnesh_/_created/',
    twitter: 'https://x.com/artnesh',
    avatarUrl: PFP_URL,
  },
  links: defaultLinks,
  shopItems: defaultShopItems,
  themeId: 'chrome',
  wallpaper: { ...defaultBgLayer, color: '#1a1a1a' },
  cardBg: { ...defaultBgLayer, color: '#242424' },
  textSettings: { font: 'Inter', color: '#ffffff', titleSize: 'small' },
  buttonSettings: { style: 'solid', roundness: 'full', shadow: 'none', color: '#171717', textColor: '#ffffff' },
  customColors: { background: '#1a1a1a', buttons: '#171717', buttonText: '#ffffff', pageText: '#ffffff', titleText: '#ffffff' },
  spacing: { 
    cardPadding: 40, 
    linkGap: 12, 
    avatarSize: 100, 
    hoverZoom: 1,
    sectionGap: 14
  },
  cornerRadius: 'full',
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        ...defaultState,
        ...parsed,
        profile: { ...defaultState.profile, ...(parsed.profile || {}) },
        wallpaper: { ...defaultState.wallpaper, ...(parsed.wallpaper || {}) },
        cardBg: { ...defaultState.cardBg, ...(parsed.cardBg || {}) },
        textSettings: { ...defaultState.textSettings, ...(parsed.textSettings || {}) },
        buttonSettings: { ...defaultState.buttonSettings, ...(parsed.buttonSettings || {}) },
        customColors: { ...defaultState.customColors, ...(parsed.customColors || {}) },
        spacing: { ...defaultState.spacing, ...(parsed.spacing || {}) },
        cornerRadius: parsed.cornerRadius ?? defaultState.cornerRadius,
      }
    }
  } catch (e) {
    console.warn('Corrupt localStorage, resetting:', e)
    localStorage.removeItem(STORAGE_KEY)
  }
  return defaultState
}

export function usePageState() {
  const [state, setState] = useState(loadState)

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return true }
    catch (e) { console.warn('Failed to save:', e); return false }
  }

  function reset() {
    setState(defaultState)
    try { 
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) { 
      console.warn('Failed to reset:', e) 
    }
  }

  function updateProfile(field, value) {
    setState(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }))
  }

  function setThemeId(id) {
    const newTheme = THEMES.find(t => t.id === id) || THEMES[0]
    setState(prev => ({
      ...prev,
      themeId: id,
      wallpaper: { ...prev.wallpaper, color: newTheme.pageBg },
      textSettings: { ...prev.textSettings, color: newTheme.textColor },
      buttonSettings: { ...prev.buttonSettings, color: newTheme.linkBg, textColor: newTheme.textColor },
      customColors: {
        background: newTheme.pageBg, buttons: newTheme.linkBg,
        buttonText: newTheme.textColor, pageText: newTheme.textColor, titleText: newTheme.textColor,
      },
    }))
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

  function setButtonSettings(updates) {
    setState(prev => ({ ...prev, buttonSettings: { ...prev.buttonSettings, ...updates } }))
  }

  function setCustomColors(updates) {
    setState(prev => ({ ...prev, customColors: { ...prev.customColors, ...updates } }))
  }

  function setSpacing(updates) {
    setState(prev => ({ ...prev, spacing: { ...prev.spacing, ...updates } }))
  }

  function setCornerRadius(value) {
    setState(prev => ({ ...prev, cornerRadius: value }))
  }

  // Links
  function addLink() {
    setState(prev => ({
      ...prev,
      links: [...prev.links, { id: Date.now(), label: 'New Link', url: 'https://', icon: null }],
    }))
  }

  function updateLink(id, field, value) {
    setState(prev => ({ ...prev, links: prev.links.map(l => l.id === id ? { ...l, [field]: value } : l) }))
  }

  function removeLink(id) {
    setState(prev => ({ ...prev, links: prev.links.filter(l => l.id !== id) }))
  }

  // Shop
  function addShopItem(item) {
    setState(prev => ({
      ...prev,
      shopItems: [...prev.shopItems, {
        id: Date.now(),
        name: item.name || 'New Item',
        price: item.price || '0.00',
        badge: item.badge || 'NFT',
        bg: item.bg || '#1a0a2e',
        fg: item.fg || '#c77dff',
        url: item.url || '#',
        imageUrl: item.imageUrl || null,
        type: item.type || 'nft',
      }],
    }))
  }

  function updateShopItem(id, field, value) {
    setState(prev => ({ ...prev, shopItems: prev.shopItems.map(s => s.id === id ? { ...s, [field]: value } : s) }))
  }

  function removeShopItem(id) {
    setState(prev => ({ ...prev, shopItems: prev.shopItems.filter(s => s.id !== id) }))
  }

  return {
    state, save, reset,
    updateProfile, setThemeId,
    setWallpaper, setCardBg,
    setTextSettings, setButtonSettings, setCustomColors,
    setSpacing, setCornerRadius,
    addLink, updateLink, removeLink,
    addShopItem, updateShopItem, removeShopItem,
  }
}
