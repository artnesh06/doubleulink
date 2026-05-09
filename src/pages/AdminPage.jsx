import { useState } from 'react'
import { Link } from 'react-router-dom'

const demoUsers = [
  { id: 1, username: 'artnesh',  email: 'artnesh@email.com',  links: 3, joined: '2026-05-01', active: true },
  { id: 2, username: 'user2',    email: 'user2@email.com',    links: 5, joined: '2026-05-03', active: true },
  { id: 3, username: 'testuser', email: 'test@email.com',     links: 1, joined: '2026-05-07', active: false },
]

const statCards = (users) => [
  { label: 'Total users',  value: users.length,                              icon: '👥' },
  { label: 'Active users', value: users.filter(u => u.active).length,        icon: '✅' },
  { label: 'Total links',  value: users.reduce((a, u) => a + u.links, 0),    icon: '🔗' },
]

export default function AdminPage() {
  const [users]  = useState(demoUsers)
  const [search, setSearch] = useState('')

  const filtered = users.filter(u =>
    u.username.includes(search.toLowerCase()) ||
    u.email.includes(search.toLowerCase())
  )

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      color: '#ffffff',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* ── Top nav ── */}
      <nav style={{
        background: '#111111',
        borderBottom: '1px solid #2a2a2a',
        padding: '0 28px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontFamily: "'Lora', 'Georgia', serif",
            fontSize: '18px',
            fontStyle: 'italic',
            color: '#ffffff',
          }}>
            /w/
          </span>
          <span style={{
            background: '#ff6b6b',
            color: '#000000',
            fontSize: '10px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '999px',
            letterSpacing: '0.05em',
          }}>
            ADMIN
          </span>
        </div>

        <Link to="/" style={{
          color: '#555555',
          textDecoration: 'none',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          ← Back to site
        </Link>
      </nav>

      {/* ── Content ── */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '36px 24px' }}>

        {/* Page title */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>Dashboard</h1>
          <p style={{ fontSize: '14px', color: '#555555' }}>Overview of all users and activity.</p>
        </div>

        {/* ── Stats ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '32px',
        }}>
          {statCards(users).map(stat => (
            <div key={stat.label} style={{
              background: 'linear-gradient(180deg, #2a2a2a 0%, #222222 100%)',
              borderRadius: '16px',
              padding: '22px 24px',
              border: '1px solid #2a2a2a',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>{stat.icon}</div>
              <div style={{ fontSize: '30px', fontWeight: 700, lineHeight: 1, marginBottom: '6px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: '#555555' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── Users table ── */}
        <div style={{
          background: 'linear-gradient(180deg, #2a2a2a 0%, #222222 100%)',
          borderRadius: '20px',
          border: '1px solid #2a2a2a',
          overflow: 'hidden',
        }}>
          {/* Table header */}
          <div style={{
            padding: '18px 24px',
            borderBottom: '1px solid #2a2a2a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '2px' }}>Users</h2>
              <p style={{ fontSize: '12px', color: '#555555' }}>{filtered.length} total</p>
            </div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              style={{
                background: '#111111',
                border: '1px solid #2a2a2a',
                borderRadius: '10px',
                padding: '9px 14px',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none',
                width: '200px',
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                {['User', 'Email', 'Links', 'Joined', 'Status', ''].map((h, i) => (
                  <th key={i} style={{
                    padding: '11px 24px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#444444',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid #222222' : 'none',
                }}>
                  <td style={{ padding: '15px 24px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>@{user.username}</div>
                  </td>
                  <td style={{ padding: '15px 24px', fontSize: '13px', color: '#777777' }}>
                    {user.email}
                  </td>
                  <td style={{ padding: '15px 24px', fontSize: '14px' }}>
                    {user.links}
                  </td>
                  <td style={{ padding: '15px 24px', fontSize: '13px', color: '#555555' }}>
                    {user.joined}
                  </td>
                  <td style={{ padding: '15px 24px' }}>
                    <span style={{
                      background: user.active ? '#0d1f0d' : '#1f0d0d',
                      color: user.active ? '#6bcb77' : '#ff6b6b',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      letterSpacing: '0.03em',
                    }}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '15px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/${user.username}`} target="_blank" style={{
                        color: '#777777',
                        textDecoration: 'none',
                        fontSize: '12px',
                        padding: '5px 12px',
                        border: '1px solid #2a2a2a',
                        borderRadius: '8px',
                        fontWeight: 500,
                      }}>
                        View
                      </Link>
                      <button style={{
                        background: 'none',
                        border: '1px solid #2a2a2a',
                        color: '#ff6b6b',
                        fontSize: '12px',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                      }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
