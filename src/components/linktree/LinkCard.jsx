const DotsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <circle cx="12" cy="5" r="1" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.841L1.254 2.25H8.08l4.259 5.629 5.905-5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
)

const iconConfig = {
  instagram: { Icon: InstagramIcon, bg: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff' },
  x:         { Icon: XIcon,         bg: '#000000', color: '#fff' },
  pinterest: { Icon: PinterestIcon, bg: '#E60023', color: '#fff' },
}

export default function LinkCard({ label, url, icon }) {
  const cfg = iconConfig[icon]

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#0d0d0d',
        borderRadius: '14px',
        padding: '0 16px',
        height: '56px',
        width: '100%',
        position: 'relative',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      {/* Icon thumbnail — fixed 40x40 */}
      {cfg && (
        <div
          style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            borderRadius: '10px',
            background: cfg.bg,
            color: cfg.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <cfg.Icon />
        </div>
      )}

      {/* Label — centered in remaining space */}
      <span
        style={{
          flex: 1,
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 500,
          color: '#ffffff',
          fontFamily: "'Inter', sans-serif",
          paddingRight: cfg ? '40px' : '0',
        }}
      >
        {label}
      </span>

      {/* Dots */}
      <span
        style={{
          position: 'absolute',
          right: '16px',
          color: '#666666',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <DotsIcon />
      </span>
    </a>
  )
}
