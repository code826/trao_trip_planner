'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, DollarSign, Star, Loader2, Home, Calendar, Edit3 } from 'lucide-react'
import Button from '@/components/ui/Button'
import ItineraryDay from '@/components/ItineraryDay'
import ItineraryEditPanel from '@/components/ItineraryEditPanel'
import BudgetChart from '@/components/BudgetChart'
import HotelCard from '@/components/HotelCard'
import { useAuthStore } from '@/store/authStore'

export default function TripDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated, token } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('itinerary')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login')
    }
  }, [mounted, isAuthenticated, router])

  // Currency conversion rates
  const CURRENCY_RATES = {
    USD: 1,
    INR: 83,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149,
  }

  const CURRENCY_SYMBOLS = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  }

  const convertCurrency = (amountUSD) => {
    const converted = amountUSD * CURRENCY_RATES[selectedCurrency]
    return Math.round(converted)
  }

  // Fetch trip data
  useEffect(() => {
    if (!mounted || !isAuthenticated) return

    const fetchTrip = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/trips/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Trip not found')
        }

        const data = await response.json()
        setTrip(data)
      } catch (err) {
        console.error('Error fetching trip:', err)
        setError(err.message || 'Failed to load trip')
      } finally {
        setLoading(false)
      }
    }

    fetchTrip()
  }, [mounted, isAuthenticated, params.id, token])

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

  if (loading) {
    return (
      <div className="min-h-screen gradient-mesh">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero Skeleton */}
            <div className="bg-white rounded-2xl p-8 mb-8">
              <div className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>

            {/* Tabs Skeleton */}
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse mb-6"></div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 h-64 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">!</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">Error Loading Trip</h2>
          <p className="text-charcoal/60 mb-6">{error}</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-white rounded-xl hover:bg-terracottaDark transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-terracotta/30 border-t-terracotta rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-down">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-terracotta/10 to-sage/10 rounded-2xl p-8 mb-8 animate-scale-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-terracotta mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">{trip.destination}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
                  {trip.destination}
                </h1>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full">
                    <Calendar className="w-4 h-4 text-terracotta" />
                    <span className="text-sm font-medium">{trip.days} days</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full">
                    <DollarSign className="w-4 h-4 text-terracotta" />
                    <span className="text-sm font-medium capitalize">{trip.budgetType}</span>
                  </div>
                  {trip.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 bg-white rounded-full text-sm font-medium text-charcoal/70"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs + Edit button */}
          <div className="flex items-center justify-between gap-2 mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2">
              {['itinerary', 'budget', 'hotels'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === tab
                    ? 'bg-terracotta text-white'
                    : 'bg-white text-charcoal hover:bg-cream'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === 'itinerary' && (
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-charcoal text-white hover:bg-charcoal/80 transition-all whitespace-nowrap shrink-0"
              >
                <Edit3 className="w-4 h-4" />
                Edit Itinerary
              </button>
            )}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                {/* Days */}
                <div className="space-y-6 stagger-children">
                  {trip.itinerary.map((day, index) => (
                    <div
                      key={day.dayNumber}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ItineraryDay day={day} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'budget' && (
              <div className="animate-scale-in">
                <div className="bg-white rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-serif font-bold text-charcoal">
                      Budget Breakdown
                    </h2>
                    <div className="flex items-center gap-3">
                      <label htmlFor="currency" className="text-sm font-medium text-charcoal/70">
                        Currency:
                      </label>
                      <select
                        id="currency"
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="INR">INR (₹)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                      </select>
                    </div>
                  </div>
                  <BudgetChart
                    budget={trip.budget}
                    selectedCurrency={selectedCurrency}
                    convertCurrency={convertCurrency}
                    currencySymbol={CURRENCY_SYMBOLS[selectedCurrency]}
                  />
                </div>
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="animate-scale-in">
                <div className="bg-white rounded-2xl p-8">
                  <h2 className="text-3xl font-serif font-bold text-charcoal mb-6">
                    Recommended Hotels
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {trip.hotels.map((hotel, index) => (
                      <div
                        key={index}
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <HotelCard hotel={hotel} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowEditModal(false) }}
        >
          <div className="bg-transparent w-full max-w-lg animate-slide-up">
            <ItineraryEditPanel
              tripId={trip._id}
              token={token}
              onUpdated={(updatedTrip) => {
                setTrip(updatedTrip)
                setShowEditModal(false)
              }}
            />
            <button
              onClick={() => setShowEditModal(false)}
              className="w-full mt-3 py-3 rounded-xl text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
