export default function TabNavigator({
  activeTab,
  onSwitch,
  theme,
  cornerRadius = '999px',
  scale = 1,
  fontSize = 13,
  tabGap = 0,
  paddingY = 13,
  settings = {},
}) {
  const styleType = settings.style || 'solid'
  const tabBg          = settings.bgColor || theme?.tabBg || '#767676'
  const tabActive      = settings.activeColor || theme?.tabActive || '#111111'
  const tabActiveText  = settings.activeTextColor || theme?.tabActiveText || '#ffffff'
  const tabInactiveText= settings.inactiveTextColor || theme?.tabInactiveText || '#000000'
  const borderWidth = settings.borderWidth || 0
  const borderColor = settings.borderColor || 'rgba(255,255,255,0.12)'
  const blurAmount = settings.blur || 12
  const visibleTabs = ['links', 'shop', 'collections'].filter(tab => !settings.hiddenTabs?.[tab])

  const numericRadius = Number.parseFloat(cornerRadius) || 0
  const outerRadiusValue = Math.max(10, Math.min(999, numericRadius + 14))
  const pillRadiusValue = Math.max(8, Math.min(999, numericRadius + 8))
  const outerRadius = `${outerRadiusValue}px`
  const pillRadius = `${pillRadiusValue}px`

  const tabs = visibleTabs
  if (tabs.length === 0) return null

  const activeIndex = Math.max(0, tabs.indexOf(activeTab))
  const tabCount = tabs.length
  
  // Calculate pill position - each tab is 33.333% width
  const pillTransform = `translateX(calc(${activeIndex * 100}% + ${activeIndex * tabGap}px))`
  const shellBackground = styleType === 'outline' ? 'transparent'
    : styleType === 'glass' ? 'rgba(255,255,255,0.10)'
    : styleType === 'blur' ? 'rgba(255,255,255,0.07)'
    : tabBg
  const activeBackground = styleType === 'outline' ? 'transparent' : tabActive

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
      <div style={{
        position: 'relative', 
        display: 'grid',
        gridTemplateColumns: `repeat(${tabCount}, 1fr)`,
        gap: `${tabGap}px`,
        background: shellBackground, 
        border: `${styleType === 'outline' ? Math.max(1, borderWidth || 1) : borderWidth}px solid ${borderColor}`,
        borderRadius: outerRadius,
        padding: '3px', 
        width: '100%',
        maxWidth: `${Math.round(500 * scale)}px`,
        backdropFilter: ['glass', 'blur'].includes(styleType) ? `blur(${blurAmount}px)` : 'none',
        WebkitBackdropFilter: ['glass', 'blur'].includes(styleType) ? `blur(${blurAmount}px)` : 'none',
      }}>
        {/* Sliding pill */}
        <div style={{
          position: 'absolute', 
          top: '3px', 
          left: '3px',
          right: '3px',
          height: 'calc(100% - 6px)', 
          width: `calc((100% - 6px - ${tabGap * Math.max(0, tabCount - 1)}px) / ${tabCount})`,
          background: activeBackground, 
          border: styleType === 'outline' ? `${Math.max(1, borderWidth || 1)}px solid ${borderColor}` : 'none',
          borderRadius: pillRadius,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: pillTransform,
        }} />
        {tabs.map(tab => (
          <button key={tab} onClick={() => onSwitch(tab)} className="lt-tab-btn" style={{
            position: 'relative', 
            zIndex: 1,
            padding: `${Math.round(paddingY * scale)}px ${Math.max(8, Math.round(8 * scale))}px`,
            borderRadius: pillRadius,
            fontSize: `${Math.round(fontSize * scale)}px`, 
            fontWeight: 600,
            cursor: 'pointer', 
            border: 'none',
            fontFamily: "'Inter', sans-serif",
            background: 'transparent',
            color: activeTab === tab ? tabActiveText : tabInactiveText,
            transition: 'color 0.3s ease',
            textTransform: 'capitalize',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: tab !== 'links' ? '-0.3px' : '0',
          }}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
