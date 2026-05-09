import { useState } from 'react'
import { Link } from 'react-router-dom'
import { defaultLinks, defaultShopItems } from '../data/data'

const inputStyle = {
  width: '100%',
  background: '#111111',
  border: '1px solid #2a2a2a',
  borderRadius: '10px',
  padding: '11px 14px',
  color: '#ffffff',
  fontSize: '14px',
  outline: 'none',
  fontFamily: "'Inter', sans-serif",
}

const labelStyle = {
  fontSize: '12px',
  fontWeight: 500,
  color: '#777777',
  display: 'block',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}

const sectionTitle = {
  fontSize: '16px',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: '20px',
}

const divider = {
  borderTop: '1px solid #2a2a2a',
  margin: '24px 0',
}

const NAV_ITEMS = [
  { id: 'profile',    label: 'Profile',    icon: '👤' },
  { id: 'links',      label: 'Links',      icon: '🔗' },
  { id: 'shop',       label: 'Shop',       icon: '🛍️' },
  { id: 'appearance', label: 'Appearance', icon: '🎨' },
]

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [profile, setProfile] = useState({
    name: 'Artnesh',
    bio: 'NFT artist and developer @oddslaunchpad.\nCreating art and building in Web3.',
    instagram: 'https://instagram.com/artnesh06',
    pinterest: 'https://pinterest.com/artnesh',
    twitter: 'https://x.com/artnesh',
  })
  const [links, setLinks]     = useState(defaultLinks)
  const [shopItems]           = useState(defaultShopItems)
  const [saved, setSaved]     = useState(false)

  function updateProfile(field, value) {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  function addLink() {
    setLinks(prev => [...prev, { id: Date.now(), label: 'New Link', url: 'https://', hasThumb: false }])
  }

  function updateLink(id, field, value) {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l))
  }

  function removeLink(id) {
    setLinks(prev => prev.filter(l => l.id !== id))
  }

  function handleSave() {
    // TODO: save to Supabase
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      color: '#ffffff',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── Top nav ── */}
      <nav style={{
        background: '#111111',
        borderBottom: '1px solid #2a2a2a',
        padding: '0 24px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <span style={{
          fontFamily: "'Lora', 'Georgia', serif",
          fontSize: '18px',
          fontStyle: 'italic',
          color: '#ffffff',
        }}>
          /w/
        </span>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/artnesh" target="_blank" style={{
            color: '#777777',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            View page
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </Link>
          <button onClick={handleSave} style={{
            background: saved ? '#1a2e1a' : '#ffffff',
            color: saved ? '#6bcb77' : '#000000',
            border: 'none',
            borderRadius: '999px',
            padding: '8px 20px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            transition: 'all 0.2s',
          }}>
            {saved ? '✓ Saved' : 'Save'}
          </button>
        </div>
      </nav>

      {/* ── Body ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', height: 'calc(100vh - 56px)' }}>

        {/* ── Sidebar ── */}
        <div style={{
          width: '200px',
          flexShrink: 0,
          background: '#111111',
          borderRight: '1px solid #2a2a2a',
          padding: '16px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}>
          {NAV_ITEMS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                background: activeSection === s.id ? '#2a2a2a' : 'transparent',
                border: 'none',
                color: activeSection === s.id ? '#ffffff' : '#666666',
                padding: '10px 14px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSection === s.id ? 600 : 400,
                textAlign: 'left',
                width: '100%',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: '16px' }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* ── Editor panel ── */}
        <div style={{
          width: '380px',
          flexShrink: 0,
          padding: '28px 24px',
          overflowY: 'auto',
          borderRight: '1px solid #2a2a2a',
        }}>

          {/* Profile */}
          {activeSection === 'profile' && (
            <div>
              <p style={sectionTitle}>Profile</p>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Display name</label>
                <input style={inputStyle} value={profile.name}
                  onChange={e => updateProfile('name', e.target.value)} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Bio</label>
                <textarea
                  style={{ ...inputStyle, height: '88px', resize: 'vertical', lineHeight: 1.5 }}
                  value={profile.bio}
                  onChange={e => updateProfile('bio', e.target.value)}
                />
                <p style={{ fontSize: '11px', color: '#444444', marginTop: '5px' }}>
                  Use a new line for line breaks.
                </p>
              </div>

              <div style={divider} />

              <p style={{ fontSize: '13px', fontWeight: 600, color: '#aaaaaa', marginBottom: '16px' }}>
                Social links
              </p>

              {[
                { field: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
                { field: 'twitter',   label: 'X / Twitter', placeholder: 'https://x.com/...' },
                { field: 'pinterest', label: 'Pinterest', placeholder: 'https://pinterest.com/...' },
              ].map(s => (
                <div key={s.field} style={{ marginBottom: '14px' }}>
                  <label style={labelStyle}>{s.label}</label>
                  <input
                    style={inputStyle}
                    value={profile[s.field]}
                    placeholder={s.placeholder}
                    onChange={e => updateProfile(s.field, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Links */}
          {activeSection === 'links' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <p style={{ ...sectionTitle, marginBottom: 0 }}>Links</p>
                <button onClick={addLink} style={{
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '7px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  + Add
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map((link, i) => (
                  <div key={link.id} style={{
                    background: '#1e1e1e',
                    border: '1px solid #2a2a2a',
                    borderRadius: '14px',
                    padding: '16px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', color: '#555555', fontWeight: 600 }}>Link {i + 1}</span>
                      <button onClick={() => removeLink(link.id)} style={{
                        background: 'none',
                        border: 'none',
                        color: '#555555',
                        cursor: 'pointer',
                        fontSize: '18px',
                        lineHeight: 1,
                        padding: '0 4px',
                      }}>×</button>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <label style={labelStyle}>Label</label>
                      <input style={inputStyle} value={link.label}
                        onChange={e => updateLink(link.id, 'label', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>URL</label>
                      <input style={inputStyle} value={link.url}
                        onChange={e => updateLink(link.id, 'url', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shop */}
          {activeSection === 'shop' && (
            <div>
              <p style={sectionTitle}>Shop</p>
              <div style={{
                background: '#1e1e1e',
                border: '1px solid #2a2a2a',
                borderRadius: '14px',
                padding: '24px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛍️</div>
                <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>Shop editor coming soon</p>
                <p style={{ fontSize: '13px', color: '#555555', lineHeight: 1.6 }}>
                  You'll be able to add NFTs, prints, and products here.
                </p>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeSection === 'appearance' && (
            <div>
              <p style={sectionTitle}>Appearance</p>
              <div style={{
                background: '#1e1e1e',
                border: '1px solid #2a2a2a',
                borderRadius: '14px',
                padding: '24px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎨</div>
                <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>Theme editor coming soon</p>
                <p style={{ fontSize: '13px', color: '#555555', lineHeight: 1.6 }}>
                  Custom colors, fonts, and backgrounds will be available here.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Live preview (center) ── */}
        <div style={{
          flex: 1,
          background: '#0d0d0d',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'auto',
          padding: '32px 24px',
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#444444',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            Live preview
          </p>
          <div style={{
            width: '100%',
            maxWidth: '380px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}>
            {/* Avatar */}
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: '#2a2a2a', border: '2px solid #333333',
              overflow: 'hidden',
            }}>
              <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=artnesh" alt="" style={{ width: '100%', height: '100%' }} />
            </div>

            {/* Name + Bio */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>{profile.name}</p>
              <p style={{ fontSize: '13px', color: '#777777', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{profile.bio}</p>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
              {profile.instagram && <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" width="14" height="14"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/></svg>
              </div>}
              {profile.pinterest && <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="#999" width="14" height="14"><circle cx="12" cy="12" r="10"/></svg>
              </div>}
              {profile.twitter && <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="#999" width="12" height="12"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.841L1.254 2.25H8.08l4.259 5.629 5.905-5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>}
            </div>

            {/* Link cards */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.map(link => (
                <div key={link.id} style={{
                  background: '#171717',
                  border: '1px solid #2a2a2a',
                  borderRadius: '14px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#ffffff' }}>{link.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right panel — Cards only ── */}
        <div style={{
          width: '260px',
          flexShrink: 0,
          background: '#111111',
          borderLeft: '1px solid #2a2a2a',
          padding: '20px 14px',
          overflowY: 'auto',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#444444', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Cards
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {links.map((link, i) => (
              <div key={link.id} style={{
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                padding: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '8px',
                    background: '#2a2a2a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', color: '#888888', fontWeight: 600, flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {link.label}
                    </p>
                    <p style={{ fontSize: '10px', color: '#555555', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {link.url}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {shopItems.length > 0 && (
              <>
                <div style={{ borderTop: '1px solid #2a2a2a', margin: '6px 0' }} />
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#444444', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Shop
                </p>
                {shopItems.map(item => (
                  <div key={item.id} style={{
                    background: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px',
                    padding: '10px 12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '6px',
                        background: item.bg || '#1a0a2e',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', color: item.fg || '#c77dff', fontWeight: 700,
                      }}>
                        {item.badge?.[0] || '🛍'}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.name}
                        </p>
                        <p style={{ fontSize: '10px', color: '#555555', margin: '1px 0 0' }}>
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}