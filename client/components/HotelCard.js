import { Star, MapPin, ExternalLink, Loader2 } from 'lucide-react'
import Button from './ui/Button'

const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover h-full flex flex-col">
      {/* Hotel Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-terracotta/10 to-sage/10 flex items-center justify-center">
        <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center">
          <MapPin className="w-8 h-8 text-terracotta/60" />
        </div>
      </div>

      {/* Hotel Info */}
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-serif font-bold text-charcoal">
            {hotel.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(hotel.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-charcoal">
            {hotel.rating}
          </span>
        </div>

        {/* Description */}
        <p className="text-charcoal/70 mb-4 line-clamp-3">
          {hotel.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-charcoal">
              ${hotel.pricePerNight}
            </span>
            <span className="text-charcoal/60 ml-1">/night</span>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="p-6 pt-0 mt-auto">
        <Button
          variant="primary"
          fullWidth
          size="sm"
          onClick={() => window.open(hotel.bookingUrl || '#', '_blank')}
          className="flex items-center justify-center gap-2"
        >
          Book Now
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default HotelCard
