import { useState, useEffect } from 'react'
import { useTripsStore } from '@/store/tripsStore'
import { api } from '@/services/api'
import { useAuthStore } from '@/store/authStore'

export function useTrips() {
  const { trips, setTrips, addTrip, updateTrip, deleteTrip, loading, setLoading, setError, clearError } = useTripsStore()
  const { isAuthenticated } = useAuthStore()
  const [error, setErrorState] = useState(null)

  useEffect(() => {
    if (isAuthenticated && trips.length === 0) {
      fetchTrips()
    }
  }, [isAuthenticated])

  const fetchTrips = async () => {
    setLoading(true)
    setErrorState(null)
    try {
      const data = await api.getTrips()
      setTrips(data)
    } catch (err) {
      setErrorState(err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createTrip = async (tripData) => {
    setLoading(true)
    setErrorState(null)
    try {
      const data = await api.createTrip(tripData)
      addTrip(data)
      return data
    } catch (err) {
      setErrorState(err.message)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateTripById = async (id, tripData) => {
    setLoading(true)
    setErrorState(null)
    try {
      const data = await api.updateTrip(id, tripData)
      updateTrip(id, data)
      return data
    } catch (err) {
      setErrorState(err.message)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const removeTrip = async (id) => {
    setLoading(true)
    setErrorState(null)
    try {
      await api.deleteTrip(id)
      deleteTrip(id)
    } catch (err) {
      setErrorState(err.message)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const regenerateTripDay = async (tripId, dayNumber) => {
    setLoading(true)
    setErrorState(null)
    try {
      const data = await api.regenerateDay(tripId, dayNumber)
      updateTrip(tripId, data)
      return data
    } catch (err) {
      setErrorState(err.message)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    trips,
    loading,
    error,
    fetchTrips,
    createTrip,
    updateTrip: updateTripById,
    removeTrip,
    regenerateDay: regenerateTripDay,
  }
}

export function useTrip(id) {
  const { trips, setCurrentTrip, loading, setLoading, setError } = useTripsStore()
  const [trip, setTrip] = useState(null)
  const [error, setErrorState] = useState(null)

  useEffect(() => {
    const existingTrip = trips.find((t) => t._id === id)

    if (existingTrip) {
      setTrip(existingTrip)
      setCurrentTrip(existingTrip)
    } else if (id) {
      fetchTrip(id)
    }
  }, [id, trips])

  const fetchTrip = async (tripId) => {
    setLoading(true)
    setErrorState(null)
    try {
      const data = await api.getTrip(tripId)
      setTrip(data)
      setCurrentTrip(data)
    } catch (err) {
      setErrorState(err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    trip,
    loading,
    error,
    refetch: () => fetchTrip(id),
  }
}
