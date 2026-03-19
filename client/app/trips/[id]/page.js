'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, DollarSign, Calendar, Edit3, Globe, Sparkles } from 'lucide-react'
import ItineraryDay from '@/components/ItineraryDay'
import ItineraryEditPanel from '@/components/ItineraryEditPanel'
import BudgetChart from '@/components/BudgetChart'
import HotelCard from '@/components/HotelCard'
import { useAuthStore } from '@/store/authStore'
import { useCurrencyStore } from '@/store/currencyStore'

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

  const { fetchRates, convert } = useCurrencyStore()

  useEffect(() => {
    setMounted(true)
    fetchRates()
  }, [fetchRates])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login')
    }
  }, [mounted, isAuthenticated, router])

  const CURRENCY_SYMBOLS = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  }

  const convertCurrency = (amountUSD) => {
    return convert(amountUSD, selectedCurrency)
  }

  // Fetch trip data
  useEffect(() => {
    if (!mounted || !token) return

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
  }, [mounted, params.id, token])

  if (!mounted) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-20 overflow-hidden">
        <div className="aurora-bg animate-aurora opacity-50"></div>
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card h-64 skeleton mb-8"></div>
            <div className="h-12 w-full glass-card skeleton mb-8"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card h-48 skeleton"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center bg-grid">
        <div className="aurora-bg animate-aurora opacity-30"></div>
        <div className="glass-card text-center max-w-md relative z-10">
          <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Voyage Interrupted</h2>
          <p className="text-charcoal/50 mb-10 font-medium">{error}</p>
          <Link href="/dashboard" className="pill-button bg-charcoal text-white inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (!trip) return null

  return (
    <div className="min-h-screen bg-cream pt-20 relative overflow-hidden bg-grid font-jakarta">
      <div className="aurora-bg animate-aurora opacity-50"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header Action */}
          <div className="mb-10 reveal-group active">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-charcoal/50 hover:text-terracotta font-bold uppercase tracking-[0.2em] text-[10px] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Archive
            </button>
          </div>

          {/* Hero Section */}
          <div className="glass-card mb-12 relative overflow-hidden reveal-group active">
            <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/5 rounded-full blur-[100px] animate-orb"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 text-terracotta mb-4 font-bold uppercase tracking-widest text-xs">
                <MapPin className="w-4 h-4" />
                <span>Voyage Destination</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-serif font-bold text-charcoal mb-8 leading-none">
                {trip.destination}
              </h1>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md border border-white px-6 py-3 rounded-2xl shadow-sm">
                  <Calendar className="w-5 h-5 text-terracotta" />
                  <span className="font-bold text-charcoal/70">{trip.days} Days Explorations</span>
                </div>
                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md border border-white px-6 py-3 rounded-2xl shadow-sm">
                  <DollarSign className="w-5 h-5 text-accent-blue" />
                  <span className="font-bold text-charcoal/70 capitalize">{trip.budgetType} Budgeting</span>
                </div>
                {trip.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-6 py-3 glass-effect rounded-2xl font-bold text-sm text-charcoal/50 uppercase tracking-widest"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between mb-12 reveal-group active">
            <div className="inline-flex p-1.5 glass-effect rounded-[2rem] shadow-inner">
              {['itinerary', 'budget', 'hotels'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 ${activeTab === tab
                      ? 'bg-charcoal text-white shadow-lg scale-105'
                      : 'text-charcoal/40 hover:text-charcoal/70'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'itinerary' && (
              <button
                onClick={() => setShowEditModal(true)}
                className="pill-button bg-terracotta text-white flex items-center gap-2 shadow-xl hover:scale-105"
              >
                <Edit3 className="w-5 h-5" />
                Refine Journey
              </button>
            )}
          </div>

          {/* Content Area */}
          <div className="reveal-group active">
            {activeTab === 'itinerary' && (
              <div className="space-y-10">
                {trip.itinerary.map((day, index) => (
                  <div
                    key={day.dayNumber}
                    className="relative transition-all duration-700"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    {index !== trip.itinerary.length - 1 && (
                      <div className="absolute left-10 top-20 bottom-0 w-[1px] bg-gradient-to-b from-terracotta/20 to-transparent"></div>
                    )}
                    <ItineraryDay day={day} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'budget' && (
              <div className="glass-card animate-reveal">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div>
                    <h2 className="text-4xl font-serif font-bold text-charcoal mb-2">Financial Synthesis</h2>
                    <p className="text-charcoal/40 font-medium">Detailed allocation across voyage segments</p>
                  </div>

                  <div className="flex items-center gap-4 glass-effect p-2 rounded-2xl">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 ml-4">Currency</span>
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="bg-white border-0 rounded-xl px-4 py-2 font-bold text-xs focus:ring-0 cursor-pointer shadow-sm"
                    >
                      {Object.keys(CURRENCY_SYMBOLS).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <BudgetChart
                  budget={trip.budget}
                  days={trip.days}
                  selectedCurrency={selectedCurrency}
                  convertCurrency={convertCurrency}
                  currencySymbol={CURRENCY_SYMBOLS[selectedCurrency]}
                />
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="animate-reveal">
                <div className="mb-10">
                  <h2 className="text-4xl font-serif font-bold text-charcoal mb-2">Primary Residences</h2>
                  <p className="text-charcoal/40 font-medium">Hyper-curated stay recommendations</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {trip.hotels.map((hotel, index) => (
                    <div key={index} className="hover:scale-[1.02] transition-transform duration-500">
                      <HotelCard hotel={hotel} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-md" onClick={() => setShowEditModal(false)}></div>
          <div className="relative w-full max-w-2xl animate-reveal shadow-2xl">
            <ItineraryEditPanel
              tripId={trip._id}
              token={token}
              onUpdated={(updatedTrip) => {
                setTrip(updatedTrip)
                setShowEditModal(false)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
