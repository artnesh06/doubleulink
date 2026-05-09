import { Link } from 'react-router-dom'
import PixelAvatar from '../components/linktree/PixelAvatar'

const Logo = () => (
  <span style={{
    fontFamily: "'Lora', 'Georgia', serif",
    fontSize: '20px',
    fontStyle: 'italic',
    color: '#ffffff',
    letterSpacing: '-0.3px',
  }}>
    /w/
  </span>
)

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', color: '#ffffff', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 32px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <Logo />
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/login" style={{
            color: '#aaaaaa',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            padding: '8px 16px',
          }}>
            Log in
          </Link>
          <Link to="/login?signup=true" style={{
            background: '#ffffff',
            color: '#000000',
            padding: '10px 22px',
            borderRadius: '999px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 700,
          }}>
            Get started
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '80px 24px 60px',
      }}>
        {/* Eyebrow */}
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#555555',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '28px',
        }}>
          Your link in bio, upgraded
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(36px, 7vw, 72px)',
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: '-2px',
          maxWidth: '760px',
          marginBottom: '24px',
        }}>
          One link.{' '}
          <span style={{ color: '#555555' }}>Everything you are.</span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: '17px',
          color: '#777777',
          maxWidth: '440px',
          lineHeight: 1.65,
          marginBottom: '40px',
        }}>
          Share your links, social profiles, and shop items — all in one beautiful page.
        </p>

        {/* CTA */}
        <Link to="/login?signup=true" style={{
          background: '#ffffff',
          color: '#000000',
          padding: '15px 36px',
          borderRadius: '999px',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: 700,
        }}>
          Create your page — it's free
        </Link>

        {/* ── Preview card ── */}
        <div style={{
          marginTop: '72px',
          width: '100%',
          maxWidth: '340px',
          background: 'linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 40%, #1a1a1a 100%)',
          borderRadius: '24px',
          padding: '24px 24px 32px',
          border: '1px solid #2a2a2a',
        }}>
          {/* mini topbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: '#2e2e2e', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: "'Lora', serif", fontSize: '13px', fontStyle: 'italic', color: '#fff' }}>/w/</span>
            </div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3a3a3a' }} />
          </div>

          {/* avatar + name */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: '#fff', marginBottom: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            }}>
              <PixelAvatar bg="#ffffff" fg="#111111" size={58} />
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>yourname</div>
            <div style={{ fontSize: '12px', color: '#777777' }}>Your bio goes here</div>
          </div>

          {/* mini links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Link one', 'Link two', 'Link three'].map(l => (
              <div key={l} style={{
                background: '#0d0d0d',
                borderRadius: '10px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 500,
                color: '#ffffff',
              }}>
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 24px 100px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
      }}>
        {[
          { icon: '🔗', title: 'Custom links', desc: 'Add any link — social, portfolio, shop, or anything else.' },
          { icon: '🛍️', title: 'Shop tab', desc: 'Showcase your products or NFTs with a built-in shop grid.' },
          { icon: '🎨', title: 'Your style', desc: 'Personalize your page to match your brand and vibe.' },
        ].map(f => (
          <div key={f.title} style={{
            background: '#2a2a2a',
            borderRadius: '16px',
            padding: '24px',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{f.title}</div>
            <div style={{ fontSize: '14px', color: '#777777', lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div style={{
        borderTop: '1px solid #2a2a2a',
        padding: '24px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1100px',
        margin: '0 auto',
        fontSize: '13px',
        color: '#555555',
      }}>
        <Logo />
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Privacy', 'Contact', 'Report'].map(l => (
            <a key={l} href="#" style={{ color: '#555555', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>

    </div>
  )
}
