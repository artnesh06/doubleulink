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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
      <div style={{
        position: 'relative', display: 'flex',
        background: tabBg, borderRadius: outerRadius,
        padding: '3px', width: 'fit-content',
      }}>
        {/* Sliding pill */}
        <div style={{
          position: 'absolute', top: '3px', left: '3px',
          height: 'calc(100% - 6px)', width: 'calc(50% - 3px)',
          background: tabActive, borderRadius: pillRadius,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: activeTab === 'shop' ? 'translateX(100%)' : 'translateX(0%)',
        }} />
        {['links', 'shop'].map(tab => (
          <button key={tab} onClick={() => onSwitch(tab)} style={{
            position: 'relative', zIndex: 1,
            padding: '11px 24px', borderRadius: pillRadius,
            fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', border: 'none',
            fontFamily: "'Inter', sans-serif",
            background: 'transparent',
            color: activeTab === tab ? tabActiveText : tabInactiveText,
            transition: 'color 0.3s ease',
            textTransform: 'capitalize',
          }}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
