import { Clock, RefreshCw, Loader2 } from 'lucide-react'
import Button from './ui/Button'
import Card from './ui/Card'

const ItineraryDay = ({ day, onRegenerate, isRegenerating }) => {
  return (
    <Card padding="lg" className="h-full">
      {/* Day Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-terracotta text-white rounded-xl flex items-center justify-center font-bold">
              {day.dayNumber}
            </div>
            <h3 className="text-2xl font-serif font-bold text-charcoal">
              Day {day.dayNumber}
            </h3>
          </div>
          <p className="text-charcoal/60 text-lg">{day.theme}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          loading={isRegenerating}
          disabled={isRegenerating}
          className="shrink-0"
        >
          {isRegenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Regenerating...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate Day
            </>
          )}
        </Button>
      </div>

      {/* Activities Timeline */}
      <div className="space-y-4">
        {day.activities.map((activity, index) => (
          <div
            key={index}
            className="flex gap-4 relative"
          >
            {/* Timeline Line */}
            {index < day.activities.length - 1 && (
              <div className="absolute left-[19px] top-10 w-0.5 h-full bg-gradient-to-b from-terracotta/30 to-transparent"></div>
            )}

            {/* Time Marker */}
            <div className="shrink-0">
              <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center border-2 border-terracotta/20">
                <Clock className="w-5 h-5 text-terracotta" />
              </div>
            </div>

            {/* Activity Content */}
            <div className="flex-grow pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold text-terracotta">
                      {activity.time}
                    </span>
                    <span className="text-xl font-serif font-bold text-charcoal">
                      {activity.title}
                    </span>
                  </div>
                  <p className="text-charcoal/70 mb-2">
                    {activity.description}
                  </p>
                  {activity.estimatedCost > 0 && (
                    <div className="inline-flex items-center gap-1.5 text-sm text-charcoal/60 bg-cream px-3 py-1.5 rounded-full">
                      <span className="font-medium">
                        ${activity.estimatedCost}
                      </span>
                      <span>estimated</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Day Total */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-charcoal/60 font-medium">Day Total</span>
          <span className="text-2xl font-bold text-charcoal">
            ${day.activities.reduce((sum, a) => sum + (a.estimatedCost || 0), 0)}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default ItineraryDay
