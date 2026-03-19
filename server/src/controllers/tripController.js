import Trip from '../models/Trip.js';
import { generateTravelItinerary, regenerateDayItinerary, updateItinerary as updateItineraryAI } from '../services/agent/travelAgent.js';

export const getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json(trips);
  } catch (error) {
    next(error);
  }
};

export const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Verify ownership
    if (trip.userId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(trip);
  } catch (error) {
    next(error);
  }
};

export const createTrip = async (req, res, next) => {
  try {
    const { destination, days, budgetType, interests } = req.body;

    // Validate input
    if (!destination || !days || !budgetType) {
      return res.status(400).json({ error: 'Destination, days, and budgetType are required' });
    }

    if (days < 1 || days > 30) {
      return res.status(400).json({ error: 'Days must be between 1 and 30' });
    }

    const validBudgetTypes = ['economy', 'standard', 'luxury'];
    if (!validBudgetTypes.includes(budgetType)) {
      return res.status(400).json({ error: 'Invalid budgetType. Must be economy, standard, or luxury' });
    }

    // Generate itinerary using AI
    let itineraryData;
    try {
      itineraryData = await generateTravelItinerary(
        destination,
        days,
        budgetType,
        interests || []
      );
    } catch (aiError) {
      console.error('AI generation failed:', aiError);
      return res.status(500).json({
        error: 'Failed to generate itinerary. Please try again later.',
        details: aiError.message,
      });
    }

    // Create trip
    const trip = await Trip.create({
      userId: req.user.userId,
      destination,
      days,
      budgetType,
      interests: interests || [],
      itinerary: itineraryData.itinerary,
      budget: itineraryData.budget,
      hotels: itineraryData.hotels,
    });

    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

export const regenerateDay = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { dayIndex, feedback } = req.body;

    // Validate input
    if (dayIndex === undefined || dayIndex === null) {
      return res.status(400).json({ error: 'dayIndex is required' });
    }

    if (typeof dayIndex !== 'number' || dayIndex < 0) {
      return res.status(400).json({ error: 'dayIndex must be a non-negative number' });
    }

    // Find trip
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Verify ownership
    if (trip.userId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check if dayIndex is valid
    if (dayIndex >= trip.itinerary.length) {
      return res.status(400).json({ error: 'Invalid dayIndex' });
    }

    // Get previous days for context
    const previousDays = trip.itinerary.slice(0, dayIndex);
    const dayNumber = trip.itinerary[dayIndex].dayNumber;

    // Regenerate single day using AI
    let newDayData;
    try {
      newDayData = await regenerateDayItinerary(
        trip.destination,
        trip.budgetType,
        trip.interests,
        previousDays,
        dayNumber
      );
    } catch (aiError) {
      console.error('AI regeneration failed:', aiError);
      return res.status(500).json({
        error: 'Failed to regenerate day. Please try again later.',
        details: aiError.message,
      });
    }

    // Update the specific day
    trip.itinerary[dayIndex] = {
      dayNumber: newDayData.dayNumber,
      theme: newDayData.theme,
      activities: newDayData.activities,
    };

    await trip.save();

    res.json(trip);
  } catch (error) {
    next(error);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Verify ownership
    if (trip.userId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateItinerary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userRequest } = req.body;

    if (!userRequest || !userRequest.trim()) {
      return res.status(400).json({ error: 'userRequest is required' });
    }

    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (trip.userId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let updatedData;
    try {
      updatedData = await updateItineraryAI(trip, userRequest.trim());
    } catch (aiError) {
      console.error('AI update failed:', aiError);
      return res.status(500).json({
        error: 'Failed to update itinerary. Please try again.',
        details: aiError.message,
      });
    }

    // Apply AI updates — including days count if it changed
    trip.itinerary = updatedData.itinerary;
    trip.budget = updatedData.budget;
    if (updatedData.hotels && updatedData.hotels.length > 0) {
      trip.hotels = updatedData.hotels;
    }
    if (updatedData.days && typeof updatedData.days === 'number') {
      trip.days = updatedData.days;
    } else {
      // Derive from actual itinerary length if AI didn't explicitly return it
      trip.days = updatedData.itinerary.length;
    }

    await trip.save();
    res.json(trip);
  } catch (error) {
    next(error);
  }
};
