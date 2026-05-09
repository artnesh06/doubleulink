import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'doubleulink_page_state'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [linkLabel, setLinkLabel] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [animating, setAnimating] = useState(false)

  function nextStep() {
    setAnimating(true)
    setTimeout(() => {
      setStep(prev => prev + 1)
      setAnimating(false)
    }, 300)
  }

  function handleFinish() {
    // Save to localStorage so the profile page picks it up
    try {
      const existing = localStorage.getItem(STORAGE_KEY)
      const state = existing ? JSON.parse(existing) : {}
      state.profile = {
        ...(state.profile || {}),
        name: name || 'User',
      }
      if (linkLabel.trim() && linkUrl.trim()) {
        state.links = [
          { id: Date.now(), label: linkLabel, url: linkUrl, icon: null },
        ]
      }
      state.onboarded = true
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.warn('Failed to save onboarding:', e)
    }
    // Go directly to their profile page
    const slug = (name || 'user').toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9_]/g, '')
    navigate('/' + (slug || 'user'))
  }

  function handleSkip() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY)
      const state = existing ? JSON.parse(existing) : {}
      state.onboarded = true
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.warn('Failed to save onboarding:', e)
    }
    navigate('/user')
  }

  const inputStyle = {
    width: '100%',
    background: '#111111',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    padding: '14px 16px',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    fontSize: '13px',
    fontWeight: 500,
    color: '#888888',
    display: 'block',
    marginBottom: '8px',
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
      <div style={{
        fontFamily: "'Lora', 'Georgia', serif",
        fontSize: '22px',
        fontStyle: 'italic',
        color: '#ffffff',
        marginBottom: '48px',
      }}>
        /w/
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            width: s === step ? '24px' : '8px',
            height: '8px',
            borderRadius: '4px',
            background: s <= step ? '#ffffff' : '#333333',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* Card */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: 'linear-gradient(180deg, #222222 0%, #1e1e1e 100%)',
        borderRadius: '24px',
        padding: '36px 32px',
        border: '1px solid #2a2a2a',
        opacity: animating ? 0 : 1,
        transform: animating ? 'translateY(10px)' : 'translateY(0)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}>

        {/* Step 1: Name */}
        {step === 1 && (
          <div>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>👋</div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>
              What's your name?
            </h1>
            <p style={{ fontSize: '14px', color: '#666666', marginBottom: '28px', lineHeight: 1.5 }}>
              This will be displayed on your page.
            </p>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Display name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                autoFocus
                style={inputStyle}
                onKeyDown={e => { if (e.key === 'Enter' && name.trim()) nextStep() }}
              />
            </div>

            <button
              onClick={nextStep}
              disabled={!name.trim()}
              style={{
                width: '100%',
                background: name.trim() ? '#ffffff' : '#333333',
                color: name.trim() ? '#000000' : '#666666',
                border: 'none',
                borderRadius: '999px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: name.trim() ? 'pointer' : 'not-allowed',
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.2s',
              }}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: First link */}
        {step === 2 && (
          <div>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔗</div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>
              Add your first link
            </h1>
            <p style={{ fontSize: '14px', color: '#666666', marginBottom: '28px', lineHeight: 1.5 }}>
              What do you want to share with the world?
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Link title</label>
              <input
                type="text"
                value={linkLabel}
                onChange={e => setLinkLabel(e.target.value)}
                placeholder="e.g. Follow on Instagram"
                autoFocus
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>URL</label>
              <input
                type="url"
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                placeholder="https://instagram.com/yourname"
                style={inputStyle}
                onKeyDown={e => { if (e.key === 'Enter' && linkLabel.trim() && linkUrl.trim()) nextStep() }}
              />
            </div>

            <button
              onClick={nextStep}
              disabled={!linkLabel.trim() || !linkUrl.trim()}
              style={{
                width: '100%',
                background: (linkLabel.trim() && linkUrl.trim()) ? '#ffffff' : '#333333',
                color: (linkLabel.trim() && linkUrl.trim()) ? '#000000' : '#666666',
                border: 'none',
                borderRadius: '999px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: (linkLabel.trim() && linkUrl.trim()) ? 'pointer' : 'not-allowed',
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.2s',
                marginBottom: '12px',
              }}
            >
              Continue
            </button>

            <button
              onClick={nextStep}
              style={{
                width: '100%',
                background: 'none',
                color: '#555555',
                border: 'none',
                padding: '10px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Skip for now
            </button>
          </div>
        )}

        {/* Step 3: Done */}
        {step === 3 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
              You're all set, {name}!
            </h1>
            <p style={{ fontSize: '14px', color: '#666666', marginBottom: '32px', lineHeight: 1.6 }}>
              Your page is ready. Customize it however you want.
            </p>

            <button
              onClick={handleFinish}
              style={{
                width: '100%',
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                borderRadius: '999px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.2s',
              }}
            >
              Go to my page →
            </button>
          </div>
        )}
      </div>

      {/* Skip all */}
      {step < 3 && (
        <button
          onClick={handleSkip}
          style={{
            background: 'none',
            border: 'none',
            color: '#444444',
            fontSize: '13px',
            cursor: 'pointer',
            marginTop: '24px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Skip setup
        </button>
      )}
    </div>
  )
}
