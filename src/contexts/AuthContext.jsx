import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = api.getToken()
    if (token) {
      // Verify token by fetching user profile
      api.getMyProfile()
        .then(data => {
          setUser({
            profile: data.profile,
            links: data.links,
            shopItems: data.shopItems,
          })
        })
        .catch(() => {
          // Token invalid, clear it
          api.logout()
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const data = await api.login(email, password)
    setUser({
      profile: data.user.profile,
      email: data.user.email,
    })
    return data
  }

  const register = async (email, password, username) => {
    const data = await api.register(email, password, username)
    setUser({
      profile: data.user.profile,
      email: data.user.email,
    })
    return data
  }

  const logout = () => {
    api.logout()
    setUser(null)
  }

  const refreshProfile = async () => {
    const data = await api.getMyProfile()
    setUser({
      profile: data.profile,
      links: data.links,
      shopItems: data.shopItems,
    })
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      refreshProfile,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
