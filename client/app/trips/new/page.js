'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Calendar, DollarSign, Sparkles, Loader2, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { INTERESTS, BUDGET_TYPES, MAX_TRIP_DAYS, MIN_TRIP_DAYS } from '@/lib/constants'
import ParticleField from '@/components/ParticleField'

export default function NewTripPage() {
  const router = useRouter()
  const { isAuthenticated, token } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    destination: '',
    days: 5,
    budgetType: 'standard',
    interests: [],
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login')
    }
  }, [mounted, isAuthenticated, router])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const handleDaysChange = (delta) => {
    const newDays = Math.min(MAX_TRIP_DAYS, Math.max(MIN_TRIP_DAYS, formData.days + delta))
    setFormData({ ...formData, days: newDays })
  }

  const toggleInterest = (interestId) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.destination.trim()) {
      setError('Please enter a destination')
      return
    }

    if (formData.interests.length === 0) {
      setError('Please select at least one interest')
      return
    }

    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

      const response = await fetch(`${API_URL}/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          destination: formData.destination,
          days: formData.days,
          budgetType: formData.budgetType,
          interests: formData.interests,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to create trip')
      }

      router.push(`/trips/${data._id}`)
    } catch (err) {
      console.error('Error creating trip:', err)
      setError(err.message || 'Failed to create trip. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-midnight pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="aurora-bg animate-aurora opacity-15" />
      <ParticleField count={15} />

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 animate-slide-down">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
            Plan Your Next{' '}
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">Adventure</span>
          </h1>
          <p className="text-lg text-midnight-300">
            Let our AI create a personalized itinerary for you
          </p>
        </div>

        {loading ? (
          <div className="glass-card p-16 text-center animate-scale-in max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Loader2 className="w-12 h-12 text-gold animate-spin" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Crafting Your Itinerary...
            </h2>
            <p className="text-midnight-300 text-lg">
              Our AI is analyzing your preferences and creating the perfect trip
            </p>
            <div className="mt-8 w-64 h-1 bg-midnight-700 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold to-cyan rounded-full" style={{ animation: 'shimmer 1.5s ease-in-out infinite', width: '60%' }} />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            {error && (
              <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300 animate-slide-down">
                <p className="font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-10">
              {/* Destination */}
              <div className="glass-card animate-slide-up">
                <label className="block text-sm font-semibold text-midnight-200 mb-3 flex items-center gap-2 uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-gold" />
                  Destination
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="e.g., Paris, France"
                  className="w-full px-5 py-4 rounded-xl border-2 border-midnight-600 bg-midnight-800/50 text-white placeholder:text-midnight-500 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-lg"
                  required
                />
              </div>

              {/* Number of Days */}
              <div className="glass-card animate-slide-up">
                <label className="block text-sm font-semibold text-midnight-200 mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-gold" />
                  Trip Duration
                </label>
                <div className="flex items-center gap-6">
                  <button
                    type="button"
                    onClick={() => handleDaysChange(-1)}
                    disabled={formData.days <= MIN_TRIP_DAYS}
                    className="w-14 h-14 rounded-full glass-effect text-midnight-200 hover:text-gold hover:border-gold/30 transition-all text-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-5xl font-display font-bold text-white">{formData.days}</span>
                    <span className="text-midnight-400 ml-3 text-lg">
                      {formData.days === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDaysChange(1)}
                    disabled={formData.days >= MAX_TRIP_DAYS}
                    className="w-14 h-14 rounded-full glass-effect text-midnight-200 hover:text-gold hover:border-gold/30 transition-all text-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Budget Type */}
              <div className="glass-card animate-slide-up">
                <label className="block text-sm font-semibold text-midnight-200 mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <DollarSign className="w-4 h-4 text-gold" />
                  Budget Type
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {BUDGET_TYPES.map((budget) => (
                    <button
                      key={budget.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, budgetType: budget.id })}
                      className={`p-5 rounded-xl border-2 transition-all text-left ${formData.budgetType === budget.id
                          ? 'border-gold bg-gold/10 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                          : 'border-midnight-600 hover:border-midnight-500 bg-midnight-800/30'
                        }`}
                    >
                      <div className="text-2xl mb-2">
                        {budget.id === 'economy' && '💵'}
                        {budget.id === 'standard' && '💳'}
                        {budget.id === 'luxury' && '💎'}
                      </div>
                      <h3 className="text-base font-semibold text-white mb-1">{budget.label}</h3>
                      <p className="text-sm text-midnight-400">{budget.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="glass-card animate-slide-up">
                <label className="block text-sm font-semibold text-midnight-200 mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-gold" />
                  Interests
                  <span className="text-xs font-normal text-midnight-400 normal-case tracking-normal">
                    (Select at least one)
                  </span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${formData.interests.includes(interest.id)
                          ? 'border-gold bg-gold/10 shadow-[0_0_15px_rgba(245,158,11,0.08)]'
                          : 'border-midnight-600 hover:border-midnight-500 bg-midnight-800/30'
                        }`}
                    >
                      <div className="text-2xl mb-1">{interest.icon}</div>
                      <div className="text-sm font-medium text-midnight-200">{interest.label}</div>
                    </button>
                  ))}
                </div>
                {formData.interests.length > 0 && (
                  <div className="mt-5 flex items-center gap-2 flex-wrap">
                    {formData.interests.map((id) => {
                      const interest = INTERESTS.find((i) => i.id === id)
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold/10 text-gold rounded-full text-sm border border-gold/20"
                        >
                          {interest.icon} {interest.label}
                          <button type="button" onClick={() => toggleInterest(id)} className="hover:text-gold-light ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 animate-slide-up">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  className="py-5 text-lg shimmer-button"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Itinerary
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
