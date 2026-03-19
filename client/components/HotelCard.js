import { Star, MapPin, ExternalLink, Loader2, Hotel } from 'lucide-react'
import Button from './ui/Button'

const HotelCard = ({ hotel }) => {
  return (
    <div className="glass-card overflow-hidden group hover:border-gold/30 transition-all duration-500 p-0">
      {/* Hotel Image Placeholder with shimmer */}
      <div className="h-48 bg-gradient-to-br from-gold/5 to-cyan/5 flex items-center justify-center relative overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="w-16 h-16 glass-effect rounded-xl flex items-center justify-center">
          <span className="text-4xl">🏨</span>
        </div>
      </div>

      {/* Hotel Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-display font-bold text-white group-hover:text-gold transition-colors">
            {hotel.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(hotel.rating)
                    ? 'fill-gold text-gold'
                    : 'text-midnight-600'
                  }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-midnight-200">
            {hotel.rating}
          </span>
        </div>

        {/* Description */}
        <p className="text-midnight-300 mb-5 line-clamp-3 text-sm leading-relaxed">
          {hotel.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-2xl font-display font-bold text-white">
              ${hotel.pricePerNight}
            </span>
            <span className="text-midnight-400 ml-1 text-sm">/night</span>
          </div>
        </div>

        {/* Book Button */}
        <Button
          variant="primary"
          fullWidth
          size="sm"
          onClick={() => window.open(hotel.bookingUrl || '#', '_blank')}
          className="flex items-center justify-center gap-2 shimmer-button"
        >
          Book Now
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default HotelCard
