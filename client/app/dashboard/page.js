'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, LogOut, MapPin, Calendar, DollarSign, Compass, ArrowRight } from 'lucide-react'
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
      <div className="min-h-screen gradient-mesh flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-terracotta/30 border-t-terracotta rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const getBudgetColor = (budgetType) => {
    switch (budgetType) {
      case 'economy':
        return 'bg-green-100 text-green-800'
      case 'standard':
        return 'bg-blue-100 text-blue-800'
      case 'luxury':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getBudgetLabel = (budgetType) => {
    return budgetType.charAt(0).toUpperCase() + budgetType.slice(1)
  }

  // Extract name from email if name is not available
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
      <div className="min-h-screen gradient-mesh">
        <div className="container mx-auto px-6 py-12">
          {/* Dashboard Header Skeleton */}
          <div className="mb-12">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 h-32"></div>
            ))}
          </div>

          {/* Trips Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl h-64"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-mesh pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6 animate-slide-down">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-2">
              Welcome back, {getDisplayName()}!
            </h1>
            <p className="text-xl text-charcoal/60">
              Ready for your next adventure?
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              onClick={() => router.push('/trips/new')}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create New Trip
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 stagger-children">
          <div className="card-hover bg-white rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-terracotta" />
              </div>
              <div>
                <p className="text-3xl font-bold text-charcoal">{trips.length}</p>
                <p className="text-charcoal/60">Total Trips</p>
              </div>
            </div>
          </div>

          <div className="card-hover bg-white rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-sage" />
              </div>
              <div>
                <p className="text-3xl font-bold text-charcoal">
                  {trips.reduce((acc, trip) => acc + trip.days, 0)}
                </p>
                <p className="text-charcoal/60">Days Planned</p>
              </div>
            </div>
          </div>

          <div className="card-hover bg-white rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-terracotta" />
              </div>
              <div>
                <p className="text-3xl font-bold text-charcoal">3</p>
                <p className="text-charcoal/60">Budget Types</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trips Section */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-serif font-bold text-charcoal">
            Your Trips
          </h2>
        </div>

        {trips.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl p-12 text-center animate-scale-in">
            <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
              <Compass className="w-12 h-12 text-sage" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
              No trips yet
            </h3>
            <p className="text-charcoal/60 mb-8 max-w-md mx-auto">
              Start planning your first adventure! Our AI will create a personalized itinerary just for you.
            </p>
            <Button
              variant="primary"
              onClick={() => router.push('/trips/new')}
              className="inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Your First Trip
            </Button>
          </div>
        ) : (
          // Trips Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {trips.map((trip, index) => (
              <div key={trip._id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <TripCard trip={trip} index={index} />
              </div>
            ))}
          </div>
        )}

        {/* Quick Tips Section */}
        <div className="mt-16 bg-gradient-to-br from-terracotta/5 to-sage/5 rounded-2xl p-8 animate-slide-up">
          <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
            Quick Tips for Better Trips
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
              <p className="text-charcoal/70">
                Be specific with your interests to get more personalized recommendations
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
              <p className="text-charcoal/70">
                Regenerate any day to explore different experiences for the same destination
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
              <p className="text-charcoal/70">
                Compare budget options to find the perfect balance for your travel style
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
