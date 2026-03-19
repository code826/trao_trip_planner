const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  getHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-storage') : null
    const headers = {
      'Content-Type': 'application/json',
    }

    if (token) {
      try {
        const auth = JSON.parse(token)
        if (auth?.state?.token) {
          headers['Authorization'] = `Bearer ${auth.state.token}`
        }
      } catch (error) {
        console.error('Error parsing auth token:', error)
      }
    }

    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Request failed')
      }

      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Auth Endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(name, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  }

  // Trip Endpoints
  async getTrips() {
    return this.request('/trips')
  }

  async getTrip(id) {
    return this.request(`/trips/${id}`)
  }

  async createTrip(tripData) {
    return this.request('/trips', {
      method: 'POST',
      body: JSON.stringify(tripData),
    })
  }

  async updateTrip(id, tripData) {
    return this.request(`/trips/${id}`, {
      method: 'PUT',
      body: JSON.stringify(tripData),
    })
  }

  async deleteTrip(id) {
    return this.request(`/trips/${id}`, {
      method: 'DELETE',
    })
  }

  async regenerateDay(tripId, dayNumber) {
    return this.request(`/trips/${tripId}/regenerate/${dayNumber}`, {
      method: 'POST',
    })
  }
}

export const api = new ApiService()
