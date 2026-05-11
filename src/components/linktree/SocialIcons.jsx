export default function SocialIcons({ instagram, pinterest, twitter, theme, hoverZoom = 1 }) {
  const color = theme?.textColor || '#ffffff'
  const iconStyle = { width: '22px', height: '22px', color, cursor: 'pointer', display: 'block' }
  const linkStyle = {
    display: 'inline-flex',
    transition: 'transform 0.2s ease',
  }

  return (
    <div style={{ display: 'flex', gap: '18px', margin: '18px 0 28px', alignItems: 'center', justifyContent: 'center' }}>
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={e => e.currentTarget.style.transform = `scale(${hoverZoom})`}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
        </a>
      )}
      {pinterest && (
        <a href={pinterest} target="_blank" rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={e => e.currentTarget.style.transform = `scale(${hoverZoom})`}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg style={iconStyle} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        </a>
      )}
      {twitter && (
        <a href={twitter} target="_blank" rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={e => e.currentTarget.style.transform = `scale(${hoverZoom})`}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg style={iconStyle} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.841L1.254 2.25H8.08l4.259 5.629 5.905-5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
      )}
    </div>
  )
}
