import express from 'express';
import auth from '../middleware/auth.js';
import {
  getAllTrips,
  getTripById,
  createTrip,
  regenerateDay,
  updateItinerary,
  deleteTrip,
} from '../controllers/tripController.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

router.get('/', getAllTrips);
router.get('/:id', getTripById);
router.post('/', createTrip);
router.put('/:id/regenerate-day', regenerateDay);
router.put('/:id/update-itinerary', updateItinerary);
router.delete('/:id', deleteTrip);

export default router;
