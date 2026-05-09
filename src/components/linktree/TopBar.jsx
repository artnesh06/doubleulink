export default function TopBar({ editMode = false, onToggleEdit = null, isOwner = false, theme }) {
  const text   = theme?.textColor || '#ffffff'

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      {/* Logo /w/ */}
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%',
        background: '#000000',
        border: '1px solid #767676',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Lora', 'Georgia', serif",
          fontSize: '18px', fontStyle: 'italic',
          fontWeight: 400, color: text, lineHeight: 1,
        }}>
          /w/
        </span>
      </div>

      {/* Right button */}
      {isOwner ? (
        <button
          onClick={onToggleEdit}
          title={editMode ? 'Close settings' : 'Edit page'}
          style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: editMode ? '#c0392b' : '#000000',
            border: editMode ? 'none' : '1px solid #767676',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: editMode ? '#fff' : '#00ff88',
            transition: 'background 0.25s ease',
            flexShrink: 0,
          }}
        >
          <svg
            width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{
              animation: editMode
                ? 'none'
                : 'gear-spin 4s linear infinite, live-pulse 1.5s ease-in-out infinite',
              filter: editMode ? 'none' : 'drop-shadow(0 0 4px #00ff88)',
            }}
          >
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </button>
      ) : (
        <button style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: '#000000', border: '1px solid #767676',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: text,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
        </button>
      )}

      <style>{`
        @keyframes gear-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes live-pulse {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 4px #00ff88); }
          50%       { opacity: 0.4; filter: drop-shadow(0 0 1px #00ff88); }
        }
      `}</style>
    </div>
  )
}
