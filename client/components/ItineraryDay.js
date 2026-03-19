import { Clock } from 'lucide-react'
import Card from './ui/Card'

const ItineraryDay = ({ day }) => {
  return (
    <Card padding="lg" className="h-full">
      {/* Day Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-deep text-midnight-900 rounded-xl flex items-center justify-center font-bold animate-dot-pulse">
              {day.dayNumber}
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              Day {day.dayNumber}
            </h3>
          </div>
          <p className="text-midnight-300 text-base">{day.theme}</p>
        </div>
      </div>

      {/* Activities Timeline */}
      <div className="space-y-4">
        {day.activities.map((activity, index) => (
          <div key={index} className="flex gap-4 relative group">
            {/* Timeline Line */}
            {index < day.activities.length - 1 && (
              <div className="absolute left-[19px] top-10 w-[2px] h-full bg-gradient-to-b from-gold/25 to-transparent" />
            )}

            {/* Time Marker */}
            <div className="shrink-0">
              <div className="w-10 h-10 bg-midnight-700 rounded-xl flex items-center justify-center border border-gold/15 group-hover:border-gold/40 transition-colors duration-300">
                <Clock className="w-5 h-5 text-gold" />
              </div>
            </div>

            {/* Activity Content */}
            <div className="flex-grow pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold text-gold">
                      {activity.time}
                    </span>
                    <span className="text-lg font-display font-bold text-white">
                      {activity.title}
                    </span>
                  </div>
                  <p className="text-midnight-300 mb-2 text-sm leading-relaxed">
                    {activity.description}
                  </p>
                  {activity.estimatedCost > 0 && (
                    <div className="inline-flex items-center gap-1.5 text-sm text-gold bg-gold/10 px-3 py-1.5 rounded-full border border-gold/15">
                      <span className="font-medium">
                        ${activity.estimatedCost}
                      </span>
                      <span className="text-midnight-400">estimated</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Day Total */}
      <div className="mt-6 pt-6 border-t border-midnight-700/50">
        <div className="flex items-center justify-between">
          <span className="text-midnight-400 font-medium">Day Total</span>
          <span className="text-2xl font-display font-bold text-white">
            ${day.activities.reduce((sum, a) => sum + (a.estimatedCost || 0), 0)}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default ItineraryDay
