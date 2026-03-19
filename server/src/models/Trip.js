import mongoose from 'mongoose';

// Activity Schema
const ActivitySchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  estimatedCost: {
    type: Number,
    required: true,
  },
});

// Day Schema
const DaySchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  activities: {
    type: [ActivitySchema],
    required: true,
  },
});

// Budget Schema
const BudgetSchema = new mongoose.Schema({
  breakdown: [{
    category: {
      type: String,
      required: true,
    },
    estimatedCost: {
      type: Number,
      required: true,
    },
  }],
  totalEstimatedCost: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
  },
});

// Hotel Schema
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bookingUrl: {
    type: String,
    required: false,
  },
});

// Main Trip Schema
const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  budgetType: {
    type: String,
    required: true,
    enum: ['economy', 'standard', 'luxury'],
  },
  interests: {
    type: [String],
    default: [],
  },
  itinerary: {
    type: [DaySchema],
    required: true,
  },
  budget: {
    type: BudgetSchema,
    required: true,
  },
  hotels: {
    type: [HotelSchema],
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Trip', tripSchema);
