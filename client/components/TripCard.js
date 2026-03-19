import Link from 'next/link'
import { MapPin, Calendar, DollarSign, ArrowRight } from 'lucide-react'
import Card from './ui/Card'
import { BUDGET_COLORS } from '@/lib/constants'

const TripCard = ({ trip }) => {
  const getBudgetColor = (budgetType) => {
    return BUDGET_COLORS[budgetType] || BUDGET_COLORS.economy
  }

  const getBudgetLabel = (budgetType) => {
    return budgetType.charAt(0).toUpperCase() + budgetType.slice(1)
  }

  return (
    <Link href={`/trips/${trip._id}`}>
      <Card hover padding="lg" className="h-full group">
        {/* Destination Image/Gradient Placeholder */}
        <div className="w-full h-40 bg-gradient-to-br from-terracotta/20 to-sage/20 rounded-xl mb-6 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
          <MapPin className="w-12 h-12 text-terracotta/40" />
        </div>

        {/* Trip Details */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-serif font-bold text-charcoal group-hover:text-terracotta transition-colors">
            {trip.destination}
          </h3>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-charcoal/70 bg-cream px-3 py-1.5 rounded-full">
            <Calendar className="w-4 h-4 text-terracotta" />
            {trip.days} {trip.days === 1 ? 'day' : 'days'}
          </div>
          <div className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full ${getBudgetColor(trip.budgetType)}`}>
            <DollarSign className="w-4 h-4" />
            {getBudgetLabel(trip.budgetType)}
          </div>
        </div>

        {/* Interests */}
        <div className="flex flex-wrap gap-2 mb-4">
          {trip.interests?.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="text-xs font-medium text-terracotta/80 bg-terracotta/10 px-2.5 py-1 rounded-full"
            >
              {interest}
            </span>
          ))}
          {trip.interests?.length > 3 && (
            <span className="text-xs text-charcoal/60">
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
