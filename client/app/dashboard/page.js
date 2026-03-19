'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, LogOut, MapPin, Calendar, DollarSign, Compass, ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import TripCard from '@/components/TripCard'
import { useAuthStore } from '@/store/authStore'

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, user, logout, token } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [trips, setTrips] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login')
      return
    }

    if (isAuthenticated) {
      fetchTrips()
    }
  }, [mounted, isAuthenticated, router])

  const fetchTrips = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${API_URL}/trips`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch trips')
      }

      const data = await response.json()
      setTrips(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching trips:', err)
      setError(err.message || 'Failed to load trips')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-terracotta/30 border-t-terracotta rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const getDisplayName = () => {
    if (user?.name) {
      return user.name
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0]
      return emailName
        .split(/[._-]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    }
    return 'Traveler'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="h-8 w-64 skeleton rounded mb-2"></div>
          <div className="h-4 w-96 skeleton rounded mb-12"></div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card h-32 skeleton"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-20 relative overflow-hidden bg-grid">
      <div className="aurora-bg animate-aurora opacity-50"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-8 reveal-group active">
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-4">
              Welcome back, <span className="text-terracotta">{getDisplayName()}</span>
            </h1>
            <p className="text-xl text-charcoal/50 font-medium">
              Where shall your next curiosity lead you?
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/trips/new')}
              className="pill-button bg-charcoal text-white hover:bg-terracotta hover:scale-105 shadow-xl flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Journey
            </button>
            <button
              onClick={handleLogout}
              className="w-12 h-12 glass-effect rounded-full flex items-center justify-center text-charcoal/60 hover:text-terracotta transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 reveal-group active">
          <div className="glass-card hover:scale-105 transition-transform duration-500">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center">
                <Compass className="w-8 h-8 text-terracotta" />
              </div>
              <div>
                <p className="text-4xl font-bold text-charcoal">{trips.length}</p>
                <p className="text-charcoal/40 font-bold uppercase tracking-widest text-xs">Total Trips</p>
              </div>
            </div>
          </div>

          <div className="glass-card hover:scale-105 transition-transform duration-500" style={{ transitionDelay: '0.1s' }}>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-sage" />
              </div>
              <div>
                <p className="text-4xl font-bold text-charcoal">
                  {trips.reduce((acc, trip) => acc + trip.days, 0)}
                </p>
                <p className="text-charcoal/40 font-bold uppercase tracking-widest text-xs">Days Explored</p>
              </div>
            </div>
          </div>

          <div className="glass-card hover:scale-105 transition-transform duration-500" style={{ transitionDelay: '0.2s' }}>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-accent-blue" />
              </div>
              <div>
                <p className="text-4xl font-bold text-charcoal">Active</p>
                <p className="text-charcoal/40 font-bold uppercase tracking-widest text-xs">Intelligence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trips Section */}
        <div className="mb-10 reveal-group active">
          <h2 className="text-4xl font-serif font-bold text-charcoal mb-2">
            Your Archive
          </h2>
          <div className="w-20 h-1 bg-terracotta rounded-full"></div>
        </div>

        {trips.length === 0 ? (
          <div className="glass-card py-20 text-center reveal-group active">
            <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mx-auto mb-8 animate-orb">
              <Compass className="w-10 h-10 text-terracotta" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-charcoal mb-4">
              A blank canvas awaits.
            </h3>
            <p className="text-charcoal/50 mb-10 max-w-sm mx-auto font-medium">
              You haven't initiated any voyages yet. Let's start with something legendary.
            </p>
            <button
              onClick={() => router.push('/trips/new')}
              className="pill-button bg-terracotta text-white hover:scale-110 shadow-lg"
            >
              Create Your First Voyage
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip, index) => (
              <div key={trip._id} className="reveal-group active" style={{ transitionDelay: `${index * 0.1}s` }}>
                <TripCard trip={trip} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
