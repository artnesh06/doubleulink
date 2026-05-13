export default function TabNavigator({ activeTab, onSwitch, theme, cornerRadius = '999px' }) {
  const tabBg          = theme?.tabBg          || '#767676'
  const tabActive      = theme?.tabActive      || '#111111'
  const tabActiveText  = theme?.tabActiveText  || '#ffffff'
  const tabInactiveText= theme?.tabInactiveText|| '#000000'

  // Map cornerRadius to actual tab radius values
  const outerRadius = cornerRadius === '0px' ? '6px'
    : cornerRadius === '8px'  ? '12px'
    : cornerRadius === '16px' ? '20px'
    : '999px' // full

  const pillRadius = cornerRadius === '0px' ? '4px'
    : cornerRadius === '8px'  ? '10px'
    : cornerRadius === '16px' ? '16px'
    : '999px' // full

  const tabs = ['links', 'shop', 'collection']
  const activeIndex = tabs.indexOf(activeTab)
  
  // Calculate pill position - each tab is 33.333% width
  const pillTransform = `translateX(${activeIndex * 100}%)`

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
      <div style={{
        position: 'relative', 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0',
        background: tabBg, 
        borderRadius: outerRadius,
        padding: '3px', 
        width: '100%',
        maxWidth: '500px',
      }}>
        {/* Sliding pill */}
        <div style={{
          position: 'absolute', 
          top: '3px', 
          left: '3px',
          right: '3px',
          height: 'calc(100% - 6px)', 
          width: 'calc((100% - 6px) / 3)',
          background: tabActive, 
          borderRadius: pillRadius,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: pillTransform,
        }} />
        {tabs.map(tab => (
          <button key={tab} onClick={() => onSwitch(tab)} className="lt-tab-btn" style={{
            position: 'relative', 
            zIndex: 1,
            padding: '13px 8px', 
            borderRadius: pillRadius,
            fontSize: '13px', 
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
          }}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
