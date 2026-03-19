'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, MapPin, DollarSign, Star, Loader2, Home, Calendar, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'
import ItineraryDay from '@/components/ItineraryDay'
import BudgetChart from '@/components/BudgetChart'
import HotelCard from '@/components/HotelCard'

const MOCK_TRIP = {
  _id: 'mock-trip-id',
  destination: 'Paris, France',
  days: 3,
  budgetType: 'standard',
  interests: ['art', 'food', 'history'],
  createdAt: '2024-03-15',
  itinerary: [
    {
      dayNumber: 1,
      theme: 'Arrival and Eiffel Tower',
      activities: [
        { time: '10:00 AM', title: 'Check-in', description: 'Arrive at hotel and settle in.', estimatedCost: 0 },
        { time: '01:00 PM', title: 'Eiffel Tower', description: 'Visit the iconic Eiffel Tower. Take the elevator to the top for panoramic views of Paris.', estimatedCost: 30 },
        { time: '04:00 PM', title: 'Seine River Cruise', description: 'Relaxing boat tour along the Seine with views of major landmarks.', estimatedCost: 25 },
        { time: '08:00 PM', title: 'Dinner in Le Marais', description: 'Enjoy traditional French cuisine at a bistro in the historic Le Marais district.', estimatedCost: 45 },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Art and Culture',
      activities: [
        { time: '09:00 AM', title: 'Louvre Museum', description: 'Explore world-famous art including the Mona Lisa and Venus de Milo.', estimatedCost: 22 },
        { time: '02:00 PM', title: 'Musée d\'Orsay', description: 'Admire Impressionist masterpieces in this former railway station.', estimatedCost: 18 },
        { time: '05:00 PM', title: 'Montmartre Walk', description: 'Wander through the artistic neighborhood of Montmartre, visit Place du Tertre.', estimatedCost: 0 },
        { time: '07:30 PM', title: 'Sacré-Cœur', description: 'Visit the basilica and enjoy sunset views over Paris.', estimatedCost: 0 },
      ],
    },
    {
      dayNumber: 3,
      theme: 'History and Departure',
      activities: [
        { time: '09:00 AM', title: 'Notre-Dame Cathedral', description: 'Marvel at Gothic architecture of this iconic cathedral.', estimatedCost: 0 },
        { time: '11:00 AM', title: 'Luxembourg Gardens', description: 'Stroll through beautiful gardens and visit the Medicis Fountain.', estimatedCost: 0 },
        { time: '01:00 PM', title: 'Latin Quarter Lunch', description: 'Enjoy lunch in this lively student district.', estimatedCost: 35 },
        { time: '03:00 PM', title: 'Shopping at Galeries Lafayette', description: 'Browse luxury goods and enjoy the stunning dome.', estimatedCost: 0 },
        { time: '06:00 PM', title: 'Departure', description: 'Head to the airport for your flight home.', estimatedCost: 0 },
      ],
    },
  ],
  budget: {
    breakdown: [
      { category: 'Accommodation', estimatedCost: 450 },
      { category: 'Food', estimatedCost: 200 },
      { category: 'Activities', estimatedCost: 150 },
      { category: 'Transport', estimatedCost: 100 },
    ],
    totalEstimatedCost: 900,
    currency: 'USD',
  },
  hotels: [
    { name: 'Hotel de Paris', rating: 4.5, pricePerNight: 150, description: 'Beautiful hotel near the city center with stunning views of the Eiffel Tower.', bookingUrl: '#' },
    { name: 'Le Grand Monarque', rating: 4.2, pricePerNight: 135, description: 'Elegant hotel in the 7th arrondissement, close to major museums.', bookingUrl: '#' },
    { name: 'Boutique Montmartre', rating: 4.7, pricePerNight: 165, description: 'Charming boutique hotel in the artistic Montmartre district.', bookingUrl: '#' },
  ],
}

export default function TripDetailsPage() {
  const router = useRouter()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('itinerary')
  const [regeneratingDay, setRegeneratingDay] = useState(null)

  useEffect(() => {
    // Mock loading
    setTimeout(() => {
      setTrip(MOCK_TRIP)
      setLoading(false)
    }, 1000)
  }, [])

  const handleRegenerateDay = async (dayNumber) => {
    setRegeneratingDay(dayNumber)

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/trips/${trip._id}/regenerate/${dayNumber}`, {
      //   method: 'POST',
      //   headers: { 'Authorization': `Bearer ${token}` },
      // })
      // const data = await response.json()

      // Mock regeneration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update the specific day
      setTrip((prev) => ({
        ...prev,
        itinerary: prev.itinerary.map((day) =>
          day.dayNumber === dayNumber
            ? {
                ...day,
                theme: `New Experience ${dayNumber}`,
                activities: day.activities.map((activity) => ({
                  ...activity,
                  description: 'Updated activity with new suggestions',
                })),
              }
            : day
        ),
      }))
    } catch (error) {
      console.error('Error regenerating day:', error)
      alert('Failed to regenerate day. Please try again.')
    } finally {
      setRegeneratingDay(null)
    }
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

  if (!trip) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center">
        <div className="text-center">
          <p className="text-charcoal/60 mb-4">Trip not found</p>
          <Link href="/dashboard" className="text-terracotta hover:underline">
            Back to Dashboard
          </Link>
        </div>
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

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {['itinerary', 'budget', 'hotels'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-terracotta text-white'
                    : 'bg-white text-charcoal hover:bg-cream'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'itinerary' && (
              <div className="space-y-6 stagger-children">
                {trip.itinerary.map((day, index) => (
                  <div
                    key={day.dayNumber}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ItineraryDay
                      day={day}
                      onRegenerate={() => handleRegenerateDay(day.dayNumber)}
                      isRegenerating={regeneratingDay === day.dayNumber}
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'budget' && (
              <div className="animate-scale-in">
                <div className="bg-white rounded-2xl p-8">
                  <h2 className="text-3xl font-serif font-bold text-charcoal mb-6">
                    Budget Breakdown
                  </h2>
                  <BudgetChart budget={trip.budget} />
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
    </div>
  )
}
