import PixelAvatar from './PixelAvatar'

export default function ProfileSection({ name, bio, theme }) {
  const text = theme?.textColor || '#ffffff'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{
        width: '110px', height: '110px', borderRadius: '50%',
        background: '#fff', marginBottom: '14px',
        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <PixelAvatar bg="#ffffff" fg="#111111" size={90} />
      </div>

      <div style={{
        fontSize: '20px', fontWeight: 700, color: text,
        letterSpacing: '-0.3px', marginBottom: '6px',
        fontFamily: "'Inter', sans-serif",
      }}>
        {name}
      </div>

      <div style={{
        fontSize: '14px', fontWeight: 400, color: text,
        textAlign: 'center', lineHeight: 1.5, maxWidth: '420px',
        fontFamily: "'Inter', sans-serif",
      }}>
        {bio.split('\n').map((line, i, arr) => (
          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
        ))}
      </div>
    </div>
  )
}
