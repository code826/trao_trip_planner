'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Calendar, DollarSign, Sparkles, Loader2, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { INTERESTS, BUDGET_TYPES, MAX_TRIP_DAYS, MIN_TRIP_DAYS } from '@/lib/constants'

export default function NewTripPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
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
      <div className="min-h-screen gradient-mesh flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-terracotta/30 border-t-terracotta rounded-full animate-spin"></div>
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

    if (!formData.destination.trim()) {
      alert('Please enter a destination')
      return
    }

    if (formData.interests.length === 0) {
      alert('Please select at least one interest')
      return
    }

    setLoading(true)

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/trips', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(formData),
      // })
      // const data = await response.json()

      // Mock generation delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Navigate to trip details with mock ID
      router.push('/trips/mock-trip-id')
    } catch (error) {
      console.error('Error creating trip:', error)
      alert('Failed to create trip. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 animate-slide-down">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-2">
            Plan Your Next Adventure
          </h1>
          <p className="text-xl text-charcoal/60">
            Let our AI create a personalized itinerary for you
          </p>
        </div>

        {loading ? (
          // Loading State
          <div className="bg-white rounded-2xl p-16 text-center animate-scale-in">
            <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mx-auto mb-8 animate-spin-slow">
              <Loader2 className="w-12 h-12 text-terracotta" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
              Crafting Your Itinerary...
            </h2>
            <p className="text-charcoal/60 text-lg">
              Our AI is analyzing your preferences and creating the perfect trip
            </p>
          </div>
        ) : (
          // Form
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="space-y-10">
              {/* Destination */}
              <div className="animate-slide-up">
                <label className="block text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-terracotta" />
                  Destination
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="e.g., Paris, France"
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all text-lg bg-white"
                  required
                />
              </div>

              {/* Number of Days */}
              <div className="animate-slide-up">
                <label className="block text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-terracotta" />
                  Trip Duration
                </label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDaysChange(-1)}
                    disabled={formData.days <= MIN_TRIP_DAYS}
                    className="w-12 h-12 rounded-full p-0"
                  >
                    -
                  </Button>
                  <div className="flex-1 text-center">
                    <span className="text-4xl font-bold text-charcoal">{formData.days}</span>
                    <span className="text-charcoal/60 ml-2">
                  {formData.days === 1 ? 'day' : 'days'}
                </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDaysChange(1)}
                    disabled={formData.days >= MAX_TRIP_DAYS}
                    className="w-12 h-12 rounded-full p-0"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Budget Type */}
              <div className="animate-slide-up">
                <label className="block text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-terracotta" />
                  Budget Type
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {BUDGET_TYPES.map((budget) => (
                    <button
                      key={budget.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, budgetType: budget.id })}
                      className={`p-6 rounded-xl border-2 transition-all text-left card-hover ${
                        formData.budgetType === budget.id
                          ? 'border-terracotta bg-terracotta/5'
                          : 'border-gray-200 hover:border-terracotta/50 bg-white'
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {budget.id === 'economy' && '💵'}
                        {budget.id === 'standard' && '💳'}
                        {budget.id === 'luxury' && '💎'}
                      </div>
                      <h3 className="text-lg font-semibold text-charcoal mb-1">{budget.label}</h3>
                      <p className="text-sm text-charcoal/60">{budget.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="animate-slide-up">
                <label className="block text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-terracotta" />
                  Interests
                  <span className="text-sm font-normal text-charcoal/60">
                    (Select at least one)
                  </span>
                </label>
                <div className="grid md:grid-cols-4 gap-3">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center card-hover ${
                        formData.interests.includes(interest.id)
                          ? 'border-terracotta bg-terracotta/5'
                          : 'border-gray-200 hover:border-terracotta/50 bg-white'
                      }`}
                    >
                      <div className="text-2xl mb-1">{interest.icon}</div>
                      <div className="text-sm font-medium text-charcoal">{interest.label}</div>
                    </button>
                  ))}
                </div>
                {formData.interests.length > 0 && (
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    {formData.interests.map((id) => {
                      const interest = INTERESTS.find((i) => i.id === id)
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-terracotta/10 text-terracotta rounded-full text-sm"
                        >
                          {interest.icon} {interest.label}
                          <button
                            type="button"
                            onClick={() => toggleInterest(id)}
                            className="hover:text-terracottaDark"
                          >
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
                  className="py-5 text-lg"
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
