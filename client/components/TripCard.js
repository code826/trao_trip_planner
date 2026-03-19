import Link from 'next/link'
import { Calendar, DollarSign, ArrowRight } from 'lucide-react'
import Card from './ui/Card'
import { BUDGET_COLORS } from '@/lib/constants'

const TripCard = ({ trip, index = 0 }) => {
  const getBudgetColor = (budgetType) => {
    return BUDGET_COLORS[budgetType] || BUDGET_COLORS.economy
  }

  const getBudgetLabel = (budgetType) => {
    return budgetType.charAt(0).toUpperCase() + budgetType.slice(1)
  }

  // Get destination icon based on 6 unique travel icons, repeating every 6
  const getDestinationIcon = () => {
    const icons = ['🌍', '✈️', '🌤️', '🗺️', '📸', '🎒']
    return icons[index % 6]
  }

  // Get gradient based on interests or random
  const getGradient = () => {
    const dest = trip.destination.toLowerCase()
    if (dest.includes('paris')) return 'from-pink-400/20 via-rose-300/20 to-amber-200/20'
    if (dest.includes('london')) return 'from-blue-400/20 via-indigo-300/20 to-purple-200/20'
    if (dest.includes('tokyo')) return 'from-red-400/20 via-pink-300/20 to-orange-200/20'
    if (dest.includes('new york')) return 'from-yellow-400/20 via-orange-300/20 to-red-200/20'
    if (dest.includes('beach') || dest.includes('island')) return 'from-cyan-400/20 via-teal-300/20 to-emerald-200/20'
    if (dest.includes('mountain')) return 'from-emerald-400/20 via-green-300/20 to-teal-200/20'

    // Default gradients
    const gradients = [
      'from-terracotta/20 via-orange-300/20 to-amber-200/20',
      'from-sage/20 via-emerald-300/20 to-teal-200/20',
      'from-blue-400/20 via-indigo-300/20 to-purple-200/20',
      'from-pink-400/20 via-rose-300/20 to-amber-200/20',
    ]
    return gradients[trip._id.length % gradients.length]
  }

  return (
    <Link href={`/trips/${trip._id}`}>
      <Card hover padding="lg" className="h-full group overflow-hidden">
        {/* Destination Icon Section with Gradient */}
        <div className={`w-full h-48 bg-gradient-to-br ${getGradient()} rounded-xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300`}>
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-2 right-4 w-16 h-16 bg-white/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-6 w-12 h-12 bg-white/20 rounded-full blur-lg"></div>
          </div>

          {/* Main destination icon */}
          <span className="text-7xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10 drop-shadow-lg">
            {getDestinationIcon()}
          </span>

          {/* Decorative small icons */}
          <div className="absolute top-4 left-4 text-2xl opacity-40 group-hover:opacity-70 transition-opacity">
            ✨
          </div>
        </div>

        {/* Trip Details */}
        <div className="mb-3">
          <h3 className="text-2xl font-serif font-bold text-charcoal group-hover:text-terracotta transition-colors mb-1">
            {trip.destination}
          </h3>
          <p className="text-sm text-charcoal/60">
            {trip.days} {trip.days === 1 ? 'day' : 'days'} • {getBudgetLabel(trip.budgetType)}
          </p>
        </div>

        {/* Meta Info - Compact pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-charcoal/70 bg-cream px-3 py-1.5 rounded-full group-hover:bg-terracotta/10 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-terracotta" />
            {trip.days} {trip.days === 1 ? 'day' : 'days'}
          </div>
          <div className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full group-hover:opacity-90 transition-opacity ${getBudgetColor(trip.budgetType)}`}>
            <DollarSign className="w-3.5 h-3.5" />
            {getBudgetLabel(trip.budgetType)}
          </div>
        </div>

        {/* Interests */}
        <div className="flex flex-wrap gap-2 mb-5">
          {trip.interests?.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="text-xs font-medium text-terracotta/80 bg-terracotta/10 px-2.5 py-1 rounded-full group-hover:bg-terracotta/20 transition-colors"
            >
              {interest}
            </span>
          ))}
          {trip.interests?.length > 3 && (
            <span className="text-xs text-charcoal/60 group-hover:text-charcoal/80 transition-colors">
              +{trip.interests.length - 3} more
            </span>
          )}
        </div>

        {/* View Trip Link */}
        <div className="flex items-center text-terracotta font-semibold group-hover:translate-x-1 transition-transform duration-200">
          View Trip
          <ArrowRight className="w-4 h-4 ml-2" />
        </div>

        {/* Created Date */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-charcoal/50">
          Created {new Date(trip.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </Card>
    </Link>
  )
}

export default TripCard
