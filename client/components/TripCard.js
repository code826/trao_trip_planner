'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight, MapPin } from 'lucide-react'

const BUDGET_COLORS = {
  economy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  standard: 'text-cyan bg-cyan/10 border-cyan/20',
  luxury: 'text-gold bg-gold/10 border-gold/20',
}

const TripCard = ({ trip, index = 0 }) => {
  const getBudgetColor = (budgetType) => {
    return BUDGET_COLORS[budgetType] || BUDGET_COLORS.standard
  }

  const getBudgetLabel = (budgetType) => {
    return budgetType.charAt(0).toUpperCase() + budgetType.slice(1)
  }

  const getDestinationIcon = () => {
    const icons = ['🌍', '✈️', '🌤️', '🗺️', '📸', '🎒']
    return icons[index % 6]
  }

  return (
    <Link href={`/trips/${trip._id}`} className="group block h-full">
      <div className="glass-card h-full flex flex-col relative overflow-hidden group-hover:border-gold/30 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(245,158,11,0.08)]">
        {/* Animated background accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/15 transition-all duration-700" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-cyan/5 rounded-full blur-3xl group-hover:bg-cyan/10 transition-all duration-700" />

        <div className="flex flex-col h-full relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className={`px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] border ${getBudgetColor(trip.budgetType)}`}>
              {getBudgetLabel(trip.budgetType)}
            </div>
          </div>

          <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 glass-effect rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
              {getDestinationIcon()}
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-white leading-none group-hover:text-gold transition-colors duration-300">
                {trip.destination}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-midnight-400 font-semibold uppercase tracking-widest text-[10px]">
                <Calendar className="w-3 h-3" />
                {trip.days} Days
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-midnight-700/50 flex items-center justify-between">
            <div className="flex -space-x-2">
              {trip.interests.slice(0, 3).map((interest, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-midnight-800 glass-effect flex items-center justify-center text-[10px] font-semibold text-midnight-300"
                  title={interest}
                >
                  {interest.charAt(0).toUpperCase()}
                </div>
              ))}
              {trip.interests.length > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-midnight-800 bg-gold text-midnight-900 flex items-center justify-center text-[10px] font-bold">
                  +{trip.interests.length - 3}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-gold font-semibold text-xs group-hover:gap-4 transition-all duration-300">
              Explore
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TripCard
