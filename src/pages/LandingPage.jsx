import { Link } from 'react-router-dom'
import PixelAvatar from '../components/linktree/PixelAvatar'

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span style={{
      fontFamily: "'Lora', 'Georgia', serif",
      fontSize: '28px',
      fontStyle: 'italic',
      color: '#000000',
      letterSpacing: '-0.5px',
      fontWeight: 700,
    }}>
      /w/
    </span>
  </div>
)

export default function LandingPage() {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
      minHeight: '100vh', 
      color: '#000000', 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Animated background overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 1 }}>

      {/* ── Navbar ── */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '0 0 24px 24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <Logo />
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/login" style={{
            color: '#000000',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 600,
            padding: '10px 24px',
            transition: 'opacity 0.2s',
          }}>
            Login
          </Link>
          <Link to="/login?signup=true" style={{
            background: '#5B4FFF',
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: '999px',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 700,
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 16px rgba(91, 79, 255, 0.4)',
          }}>
            Start for free
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
        maxWidth: '1400px',
        margin: '0 auto',
      }}>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(48px, 10vw, 96px)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-4px',
          maxWidth: '1000px',
          marginBottom: '32px',
          color: '#000000',
          textShadow: '0 2px 40px rgba(255,255,255,0.5)',
        }}>
          The Link in Bio That Gets You{' '}
          <span style={{ 
            color: '#ffffff',
            textShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}>
            Brand Deals
          </span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: '20px',
          color: '#1a1a1a',
          maxWidth: '600px',
          lineHeight: 1.6,
          marginBottom: '48px',
          fontWeight: 500,
          textShadow: '0 1px 2px rgba(255,255,255,0.5)',
        }}>
          Turn your followers into income. Connect with brands, sell products, and grow your business — all from one link.
        </p>

        {/* Username claim box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderRadius: '999px',
          padding: '8px 8px 8px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          marginBottom: '24px',
          maxWidth: '500px',
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: 1,
          }}>
            <span style={{
              fontFamily: "'Lora', serif",
              fontSize: '18px',
              fontStyle: 'italic',
              fontWeight: 700,
            }}>
              /w/
            </span>
            <input 
              type="text" 
              placeholder="username"
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '16px',
                fontWeight: 500,
                flex: 1,
                color: '#000000',
              }}
            />
          </div>
          <Link to="/login?signup=true" style={{
            background: '#5B4FFF',
            color: '#ffffff',
            padding: '14px 32px',
            borderRadius: '999px',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 700,
            boxShadow: '0 4px 16px rgba(91, 79, 255, 0.4)',
            whiteSpace: 'nowrap',
          }}>
            Claim your username
          </Link>
        </div>

        <p style={{
          fontSize: '13px',
          color: '#1a1a1a',
          fontWeight: 500,
          marginBottom: '80px',
        }}>
          ✨ Free forever. No credit card required.
        </p>

        {/* ── Preview card with carousel effect ── */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          marginTop: '40px',
        }}>
          {/* Main card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '32px 28px 40px',
            border: '2px solid rgba(255,255,255,0.8)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
            position: 'relative',
            zIndex: 3,
          }}>
            {/* mini topbar */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '28px' 
            }}>
              <div style={{
                width: '40px', 
                height: '40px', 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
              }}>
                <span style={{ 
                  fontFamily: "'Lora', serif", 
                  fontSize: '16px', 
                  fontStyle: 'italic', 
                  color: '#fff',
                  fontWeight: 700,
                }}>
                  /w/
                </span>
              </div>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                boxShadow: '0 4px 12px rgba(240, 147, 251, 0.4)',
              }} />
            </div>

            {/* avatar + name */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              marginBottom: '24px' 
            }}>
              <div style={{
                width: '96px', 
                height: '96px', 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                marginBottom: '16px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                overflow: 'hidden',
                border: '4px solid rgba(255,255,255,0.5)',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
              }}>
                <PixelAvatar bg="transparent" fg="#ffffff" size={72} />
              </div>
              <div style={{ 
                fontSize: '20px', 
                fontWeight: 800, 
                marginBottom: '6px',
                color: '#000000',
              }}>
                @yourname
              </div>
              <div style={{ 
                fontSize: '14px', 
                color: '#666666',
                fontWeight: 500,
              }}>
                Creator • Entrepreneur • Influencer
              </div>
            </div>

            {/* mini links with gradient */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: '🎬 Latest Video', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                { label: '🛍️ Shop My Favorites', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
                { label: '📧 Newsletter', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
              ].map((link, i) => (
                <div key={i} style={{
                  background: link.gradient,
                  borderRadius: '16px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#ffffff',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s',
                }}>
                  {link.label}
                </div>
              ))}
            </div>
          </div>

          {/* Background cards for depth */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            right: '16px',
            bottom: '-16px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '32px',
            zIndex: 2,
            transform: 'rotate(-2deg)',
          }} />
          <div style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            right: '32px',
            bottom: '-32px',
            background: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '32px',
            zIndex: 1,
            transform: 'rotate(-4deg)',
          }} />
        </div>
      </div>

      {/* ── Features ── */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 24px 120px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
      }}>
        {[
          { 
            icon: '💰', 
            title: 'Monetize Your Audience', 
            desc: 'Connect with brands and turn your content into income with built-in sponsorship tools.',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          },
          { 
            icon: '🛍️', 
            title: 'Sell Anything', 
            desc: 'Showcase products, digital downloads, or services with a beautiful shop grid.',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          },
          { 
            icon: '📊', 
            title: 'Track Your Growth', 
            desc: 'Get insights on clicks, engagement, and revenue to optimize your strategy.',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          },
        ].map((f, i) => (
          <div key={i} style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255,255,255,0.8)',
            borderRadius: '24px',
            padding: '40px 32px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}>
            <div style={{ 
              fontSize: '48px', 
              marginBottom: '20px',
              background: f.gradient,
              width: '72px',
              height: '72px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}>
              {f.icon}
            </div>
            <div style={{ 
              fontSize: '22px', 
              fontWeight: 800, 
              marginBottom: '12px',
              color: '#000000',
            }}>
              {f.title}
            </div>
            <div style={{ 
              fontSize: '16px', 
              color: '#555555', 
              lineHeight: 1.7,
              fontWeight: 500,
            }}>
              {f.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA Section ── */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto 80px',
        padding: '60px 40px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        textAlign: 'center',
        boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
        border: '2px solid rgba(255,255,255,0.8)',
      }}>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 900,
          marginBottom: '20px',
          color: '#000000',
          letterSpacing: '-2px',
        }}>
          Ready to grow your brand?
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#555555',
          marginBottom: '32px',
          fontWeight: 500,
        }}>
          Join thousands of creators already making money with their link in bio.
        </p>
        <Link to="/login?signup=true" style={{
          background: '#5B4FFF',
          color: '#ffffff',
          padding: '18px 48px',
          borderRadius: '999px',
          textDecoration: 'none',
          fontSize: '17px',
          fontWeight: 700,
          boxShadow: '0 8px 24px rgba(91, 79, 255, 0.4)',
          display: 'inline-block',
        }}>
          Get started for free
        </Link>
      </div>

      {/* ── Footer ── */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '2px solid rgba(255,255,255,0.8)',
        padding: '32px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        fontSize: '14px',
        color: '#666666',
      }}>
        <Logo />
        <div style={{ display: 'flex', gap: '32px' }}>
          {['For Creators', 'For Brands', 'Privacy', 'Contact'].map(l => (
            <a 
              key={l} 
              href="#" 
              style={{ 
                color: '#000000', 
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'opacity 0.2s',
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      </div>
    </div>
  )
}
