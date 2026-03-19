'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight, MapPin } from 'lucide-react'

const BUDGET_COLORS = {
  economy: 'text-sage bg-sage/10',
  standard: 'text-accent-blue bg-accent-blue/10',
  luxury: 'text-terracotta bg-terracotta/10',
}

const TripCard = ({ trip, index = 0 }) => {
  const getBudgetColor = (budgetType) => {
    return BUDGET_COLORS[budgetType] || BUDGET_COLORS.standard
  }

  const getBudgetLabel = (budgetType) => {
    return budgetType.charAt(0).toUpperCase() + budgetType.slice(1)
  }

  // Get destination icon based on 6 unique travel icons, repeating every 6
  const getDestinationIcon = () => {
    const icons = ['🌍', '✈️', '🌤️', '🗺️', '📸', '🎒']
    return icons[index % 6]
  }

  return (
    <Link href={`/trips/${trip._id}`} className="group block h-full">
      <div className="glass-card h-full flex flex-col relative overflow-hidden group-hover:scale-[1.03] transition-all duration-500 hover:shadow-2xl">
        {/* Animated Background Accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-terracotta/5 rounded-full blur-3xl group-hover:bg-terracotta/20 transition-all duration-700"></div>

        <div className="flex flex-col h-full relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm glass-effect ${getBudgetColor(trip.budgetType)}`}>
              {getBudgetLabel(trip.budgetType)}
            </div>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform duration-500">
              {getDestinationIcon()}
            </div>
            <div>
              <h3 className="text-3xl font-serif font-bold text-charcoal leading-none group-hover:text-terracotta transition-colors duration-300">
                {trip.destination}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-charcoal/40 font-bold uppercase tracking-widest text-[10px]">
                <Calendar className="w-3 h-3" />
                {trip.days} Days Explorations
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-charcoal/5 flex items-center justify-between">
            <div className="flex -space-x-2">
              {trip.interests.slice(0, 3).map((interest, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white glass-effect flex items-center justify-center text-[10px] font-bold bg-cream shadow-sm"
                  title={interest}
                >
                  {interest.charAt(0).toUpperCase()}
                </div>
              ))}
              {trip.interests.length > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-charcoal text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                  +{trip.interests.length - 3}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-terracotta font-bold text-xs group-hover:gap-4 transition-all duration-300">
              Explore Voyage
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TripCard
