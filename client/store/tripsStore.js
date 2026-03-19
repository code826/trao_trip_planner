import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTripsStore = create(
  persist(
    (set, get) => ({
      trips: [],
      currentTrip: null,
      loading: false,
      error: null,

      setTrips: (trips) => set({ trips }),
      setCurrentTrip: (trip) => set({ currentTrip: trip }),

      addTrip: (trip) => set((state) => ({
        trips: [...state.trips, trip],
        currentTrip: trip,
      })),

      updateTrip: (tripId, updates) => set((state) => ({
        trips: state.trips.map((trip) =>
          trip._id === tripId ? { ...trip, ...updates } : trip
        ),
        currentTrip: state.currentTrip?._id === tripId
          ? { ...state.currentTrip, ...updates }
          : state.currentTrip,
      })),

      deleteTrip: (tripId) => set((state) => ({
        trips: state.trips.filter((trip) => trip._id !== tripId),
        currentTrip: state.currentTrip?._id === tripId ? null : state.currentTrip,
      })),

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'trips-storage',
    }
  )
)
