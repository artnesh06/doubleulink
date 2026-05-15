// API Client for DOUBLEULINK

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

class ApiClient {
  constructor() {
    this.baseURL = API_URL
    this.token = localStorage.getItem('token')
  }

  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }

  getToken() {
    return this.token || localStorage.getItem('token')
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    const token = this.getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const config = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Request failed')
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Auth
  async register(email, password, username) {
    const data = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
    })
    this.setToken(data.token)
    return data
  }

  async login(email, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    this.setToken(data.token)
    return data
  }

  async checkUsername(username) {
    return this.request(`/api/auth/check-username/${username}`)
  }

  logout() {
    this.setToken(null)
  }

  // Profiles
  async getPublicProfile(username) {
    return this.request(`/api/profiles/${username}`)
  }

  async getMyProfile() {
    return this.request('/api/profiles/me/profile')
  }

  async updateProfile(data) {
    return this.request('/api/profiles/me/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Links
  async createLink(data) {
    return this.request('/api/links', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateLink(id, data) {
    return this.request(`/api/links/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteLink(id) {
    return this.request(`/api/links/${id}`, {
      method: 'DELETE',
    })
  }

  async reorderLinks(linkIds) {
    return this.request('/api/links/reorder', {
      method: 'PUT',
      body: JSON.stringify({ linkIds }),
    })
  }

  async trackLinkClick(id) {
    return this.request(`/api/links/${id}/click`, {
      method: 'POST',
    })
  }

  // Shop
  async createShopItem(data) {
    return this.request('/api/shop', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateShopItem(id, data) {
    return this.request(`/api/shop/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteShopItem(id) {
    return this.request(`/api/shop/${id}`, {
      method: 'DELETE',
    })
  }

  async reorderShopItems(itemIds) {
    return this.request('/api/shop/reorder', {
      method: 'PUT',
      body: JSON.stringify({ itemIds }),
    })
  }

  async trackShopClick(id) {
    return this.request(`/api/shop/${id}/click`, {
      method: 'POST',
    })
  }

  // Analytics
  async getAnalyticsSummary(days = 30) {
    return this.request(`/api/analytics/summary?days=${days}`)
  }

  async getDetailedAnalytics(params = {}) {
    const query = new URLSearchParams(params).toString()
    return this.request(`/api/analytics/detailed?${query}`)
  }

  // Upload
  async uploadAvatar(file) {
    const formData = new FormData()
    formData.append('avatar', file)

    const token = this.getToken()
    const response = await fetch(`${this.baseURL}/api/upload/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Upload failed')
    }

    return data
  }

  async uploadShopImage(file) {
    const formData = new FormData()
    formData.append('image', file)

    const token = this.getToken()
    const response = await fetch(`${this.baseURL}/api/upload/shop-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Upload failed')
    }

    return data
  }
}

export const api = new ApiClient()
