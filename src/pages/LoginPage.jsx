import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

const inputStyle = {
  width: '100%',
  background: '#111111',
  border: '1px solid #2a2a2a',
  borderRadius: '12px',
  padding: '13px 16px',
  color: '#ffffff',
  fontSize: '15px',
  outline: 'none',
  fontFamily: "'Inter', sans-serif",
  transition: 'border-color 0.2s',
}

const labelStyle = {
  fontSize: '13px',
  fontWeight: 500,
  color: '#aaaaaa',
  display: 'block',
  marginBottom: '7px',
}

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const [isSignup, setIsSignup] = useState(searchParams.get('signup') === 'true')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    // TODO: Supabase auth
    setTimeout(() => {
      if (isSignup) {
        navigate('/onboarding')
      } else {
        // Check if user already completed onboarding
        try {
          const saved = localStorage.getItem('doubleulink_page_state')
          if (saved) {
            const state = JSON.parse(saved)
            if (state.onboarded) {
              // Go directly to their profile page
              const name = state.profile?.name || 'user'
              navigate('/' + name.toLowerCase().replace(/[^a-z0-9]/g, ''))
              return
            }
          }
        } catch (e) { console.warn('Check onboarding failed:', e) }
        navigate('/onboarding')
      }
    }, 800)
  }

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      color: '#ffffff',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>

      {/* Logo */}
      <Link to="/" style={{
        fontFamily: "'Lora', 'Georgia', serif",
        fontSize: '22px',
        fontStyle: 'italic',
        color: '#ffffff',
        textDecoration: 'none',
        marginBottom: '40px',
        display: 'block',
      }}>
        /w/
      </Link>

      {/* Card */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'linear-gradient(180deg, #2a2a2a 0%, #222222 100%)',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid #2a2a2a',
      }}>

        {/* Heading */}
        <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h1>
        <p style={{ fontSize: '14px', color: '#777777', marginBottom: '28px', lineHeight: 1.5 }}>
          {isSignup
            ? 'Start building your page for free.'
            : 'Log in to manage your page.'}
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: '#2e1a1a',
            color: '#ff6b6b',
            padding: '12px 16px',
            borderRadius: '10px',
            fontSize: '14px',
            marginBottom: '20px',
            lineHeight: 1.5,
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {isSignup && (
            <div>
              <label style={labelStyle}>Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="yourname"
                required
                style={inputStyle}
              />
              <p style={{ fontSize: '12px', color: '#555555', marginTop: '6px' }}>
                doubleulink.com/<span style={{ color: '#aaaaaa' }}>{username || 'yourname'}</span>
              </p>
            </div>
          )}

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              borderRadius: '999px',
              padding: '14px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              marginTop: '4px',
              fontFamily: "'Inter', sans-serif",
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Loading...' : isSignup ? 'Create account' : 'Log in'}
          </button>
        </form>

        {/* Toggle */}
        <p style={{
          fontSize: '14px',
          color: '#777777',
          textAlign: 'center',
          marginTop: '24px',
        }}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => { setIsSignup(!isSignup); setError('') }}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              padding: 0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>

      {/* Footer */}
      <p style={{ fontSize: '12px', color: '#444444', marginTop: '32px' }}>
        By continuing, you agree to our{' '}
        <a href="#" style={{ color: '#555555' }}>Terms</a> and{' '}
        <a href="#" style={{ color: '#555555' }}>Privacy Policy</a>.
      </p>
    </div>
  )
}
