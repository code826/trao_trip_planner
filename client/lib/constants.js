// Constants for the application

export const INTERESTS = [
  { id: 'art', label: 'Art', icon: '🎨' },
  { id: 'food', label: 'Food & Cuisine', icon: '🍽️' },
  { id: 'history', label: 'History', icon: '🏛️' },
  { id: 'adventure', label: 'Adventure', icon: '🏔️' },
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'wellness', label: 'Wellness', icon: '💆' },
]

export const BUDGET_TYPES = [
  { id: 'economy', label: 'Economy', description: 'Budget-friendly options' },
  { id: 'standard', label: 'Standard', description: 'Comfortable travel' },
  { id: 'luxury', label: 'Luxury', description: 'Premium experiences' },
]

export const MAX_TRIP_DAYS = 14
export const MIN_TRIP_DAYS = 1

export const BUDGET_COLORS = {
  economy: 'bg-green-100 text-green-800',
  standard: 'bg-blue-100 text-blue-800',
  luxury: 'bg-purple-100 text-purple-800',
}

export const TOAST_DURATION = 3000
export const API_TIMEOUT = 10000
