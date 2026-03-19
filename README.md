# 🌍 Tripo-AI - AI-Powered Travel Planner

![Tripo-AI Banner](https://img.shields.io/badge/Tripo--AI-Travel%20Planner-C45D3E?style=for-the-badge&logo=airplanemodeactive&logoColor=white)

> Transform your travel dreams into detailed itineraries with the power of AI. Tripo-AI creates personalized travel plans based on your interests, budget, and preferences.

## ✨ Features

### 🤖 AI-Powered Trip Generation
- **Smart Itinerary Creation**: Generate complete day-by-day travel itineraries in seconds
- **Budget Planning**: Get detailed budget breakdowns with category-wise spending
- **Hotel Recommendations**: Receive curated hotel suggestions matching your budget
- **Interest-Based Planning**: Personalize your trip based on interests like art, food, adventure, etc.
- **Edit & Revise Itinerary**: After trip creation, edit your itinerary anytime - add activities, modify details, or customize your plan

### 💱 Dynamic Currency Conversion
- View budgets in your preferred currency
- Supports: USD, INR, EUR, GBP, JPY
- Real-time conversion with clear price comparisons

### 📱 Modern UI/UX
- Beautiful "Wanderlust Explorer" design theme
- Responsive design for all devices
- Smooth animations and transitions
- Interactive itinerary viewer
- Colorful budget visualization with category icons

### 🔐 Authentication & Security
- JWT-based authentication
- Protected routes for authenticated users
- User-specific data isolation
- Secure password hashing

---

## 🚀 How It Works

### 1. User Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Sign Up   │────▶│ Create Trip │────▶│ AI Generates│
└─────────────┘     └─────────────┘     └─────────────┘
                                                │
                                                ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   View &    │◀────│   Trip      │◀────│  Detailed   │
│   Explore   │     │  Details    │     │ Itinerary   │
└─────────────┘     └─────────────┘     └─────────────┘
                                                │
                                                ▼
                                        ┌─────────────┐
                                        │   Edit &    │
                                        │  Customize  │
                                        │ Itinerary   │
                                        └─────────────┘
```

### 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│                    (Next.js + Tailwind)                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐  │
│  │ Landing │  │ Login/  │  │Dashboard│  │ Trip Detail │  │
│  │  Page   │  │Register │  │         │  │   Page     │  │
│  └─────────┘  └─────────┘  └─────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                               │
│                   (Node.js + Express)                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐  │
│  │  Auth   │  │  Trip   │  │Travel   │  │   Error     │  │
│  │Routes   │  │ Routes  │  │ Agent   │  │  Handler    │  │
│  └─────────┘  └─────────┘  └─────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ AI Request
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     AI LAYER                                │
│                     (z.ai LLM)                              │
│         Generates itineraries, budgets & hotels              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE                                │
│                    (MongoDB)                                │
│              Stores users & trips securely                   │
└─────────────────────────────────────────────────────────────┘
```

### 3. Trip Creation Flow

```
User Input                    Backend Process                    AI Processing
───────────                  ──────────────                    ─────────────

destination: "Paris"         ┌─────────────────┐
days: 3                      │  Validate Input  │─────────────▶ Error Handling
budgetType: "standard"       └────────┬────────┘
interests: ["art", "food"]            │
                                      ▼
                            ┌─────────────────┐
                            │  Build Prompt   │
                            │  for AI Model   │
                            └────────┬────────┘
                                      │
                                      ▼
                            ┌─────────────────┐
                            │  Call z.ai API  │─────────────▶ z.ai LLM
                            │  (3 retries)    │                    │
                            └────────┬────────┘                    │
                                      │                            │
                                      ◀────────────────────────────┘
                                      │ JSON Response
                                      ▼
                            ┌─────────────────┐
                            │ Validate JSON   │
                            │ Structure       │─────────────▶ Invalid JSON?
                            └────────┬────────┘                  Retry
                                      │
                                      ▼
                            ┌─────────────────┐
                            │  Save to DB    │
                            │  Return Trip   │
                            └─────────────────┘
```

### 4. Post-Planning: Edit & Customize Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     VIEW TRIP DETAILS                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │Itinerary │  │  Budget  │  │  Hotels  │  │   Edit  │     │
│  └────┬─────┘  └──────────┘  └──────────┘  └────┬─────┘     │
│       │                                         │               │
│       ▼                                         ▼               │
│  Day-by-Day                              Click "Edit           │
│  Timeline View                           Your Itinerary"       │
│                                                                  │
│  ┌─────────────────────────────────────────────────────┐      │
│  │  📅 Day 1: Arrival & Exploration                    │      │
│  │     🕐 09:00 AM - Check-in                        │      │
│  │     🕐 01:00 PM - Eiffel Tower Visit              │      │
│  │     🕐 04:00 PM - Seine River Cruise             │      │
│  │                                                      │      │
│  │  📅 Day 2: Art & Culture                          │      │
│  │     🕐 09:00 AM - Louvre Museum                   │      │
│  │     🕐 02:00 PM - Musée d'Orsay                   │      │
│  └─────────────────────────────────────────────────────┘      │
│                                                                  │
│  💡 Use the AI-generated plan as your base, then customize       │
│     according to your preferences!                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose

### AI Integration
- **LLM Provider**: z.ai
- **Retry Logic**: 3 attempts with exponential backoff

---

## 📁 Project Structure

```
trao_trip_planner/
├── server/                          # Backend API
│   ├── src/
│   │   ├── index.js                 # Entry point
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js             # User schema
│   │   │   └── Trip.js             # Trip schema
│   │   ├── middleware/
│   │   │   ├── auth.js             # JWT authentication
│   │   │   └── errorHandler.js     # Global error handling
│   │   ├── controllers/
│   │   │   ├── authController.js   # Auth logic
│   │   │   └── tripController.js   # Trip CRUD logic
│   │   ├── routes/
│   │   │   ├── auth.js             # Auth routes
│   │   │   └── trips.js            # Trip routes
│   │   └── services/
│   │       └── agent/
│   │           └── travelAgent.js  # AI integration
│   ├── .env                        # Environment variables
│   └── package.json
│
├── client/                          # Frontend App
│   ├── app/
│   │   ├── page.js                 # Landing page
│   │   ├── about/page.js           # About us
│   │   ├── login/page.js           # Login page
│   │   ├── register/page.js        # Register page
│   │   ├── dashboard/page.js       # User dashboard
│   │   └── trips/
│   │       ├── new/page.js         # Create trip form
│   │       └── [id]/page.js       # Trip details
│   ├── components/
│   │   ├── Navbar.js               # Navigation
│   │   ├── Footer.js               # Footer
│   │   ├── TripCard.js             # Trip card
│   │   ├── ItineraryDay.js         # Day itinerary
│   │   ├── BudgetChart.js           # Budget visualization
│   │   ├── HotelCard.js            # Hotel info
│   │   └── ui/                     # UI components
│   ├── store/
│   │   ├── authStore.js            # Auth state
│   │   └── toastStore.js           # Toast notifications
│   └── services/
│       └── api.js                   # API client
│
├── CONTRACT_SPEC.md                 # Project specification
├── SCHEMA_MODEL.md                 # Database schemas
└── PROGRESS_TRACKER.md             # Development tracker
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Trips (Protected - Requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trips` | Get all user trips |
| GET | `/api/trips/:id` | Get specific trip with full details |
| POST | `/api/trips` | Create new trip (AI generates itinerary) |
| PUT | `/api/trips/:id/regenerate-day` | Regenerate single day with AI |
| DELETE | `/api/trips/:id` | Delete trip |

### What You Get After Trip Creation
Each trip includes:
- **Itinerary**: Day-by-day activities with times, titles, descriptions, costs
- **Budget**: Category-wise breakdown (Accommodation, Food, Transport, etc.)
- **Hotels**: 3 AI-recommended hotels with ratings and prices
- **Edit Access**: View and customize your itinerary anytime

### Example: Create Trip
```bash
curl -X POST http://localhost:5000/api/trips \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "destination": "Paris, France",
    "days": 3,
    "budgetType": "standard",
    "interests": ["art", "food", "history"]
  }'
```

### Example Response
```json
{
  "_id": "60f7b2c8e4b0a1234567890a",
  "destination": "Paris, France",
  "days": 3,
  "budgetType": "standard",
  "interests": ["art", "food", "history"],
  "itinerary": [
    {
      "dayNumber": 1,
      "theme": "Arrival & Iconic Sights",
      "activities": [
        {
          "time": "09:00 AM",
          "title": "Check-in",
          "description": "Arrive at hotel and settle in",
          "estimatedCost": 0
        },
        {
          "time": "01:00 PM",
          "title": "Eiffel Tower",
          "description": "Visit the iconic landmark",
          "estimatedCost": 30
        }
      ]
    }
  ],
  "budget": {
    "breakdown": [
      { "category": "Accommodation", "estimatedCost": 450 },
      { "category": "Food", "estimatedCost": 200 },
      { "category": "Activities", "estimatedCost": 150 }
    ],
    "totalEstimatedCost": 800,
    "currency": "USD"
  },
  "hotels": [
    {
      "name": "Hotel de Paris",
      "rating": 4.5,
      "pricePerNight": 150,
      "description": "Beautiful hotel near city center"
    }
  ]
}
```

---

## 💱 Currency Conversion

### Supported Currencies
| Currency | Code | Conversion Rate (from USD) |
|----------|------|----------------------------|
| US Dollar | USD | 1.00 |
| Indian Rupee | INR | 83.00 |
| Euro | EUR | 0.92 |
| British Pound | GBP | 0.79 |
| Japanese Yen | JPY | 149.00 |

### Supported Interests
| Interest | Icon | Description |
|----------|------|-------------|
| Art | 🎨 | Museums, galleries, street art |
| Food | 🍽️ | Restaurants, street food, cooking |
| History | 🏛️ | Temples, monuments, heritage sites |
| Adventure | 🧗 | Outdoor activities, sports |
| Nature | 🌿 | Parks, gardens, wildlife |
| Nightlife | 🌃 | Bars, clubs, evening entertainment |
| Shopping | 🛍️ | Markets, malls, local crafts |
| Wellness | 🧘 | Spas, yoga, relaxation |

### How It Works
1. AI generates budget in USD
2. User selects preferred currency
3. Frontend converts and displays amounts
4. Original USD price shown for reference

### Example Display
```
🍽️ Food & Dining
   ₹1,660 / ₹2,000 (Original: $20)
```

---

## 📋 Database Schema

### User
```javascript
{
  _id: ObjectId,
  email: String (unique),
  passwordHash: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Trip (Complete Structure)
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  
  // Trip Info
  destination: String,           // e.g., "Paris, France"
  days: Number,                // e.g., 3
  budgetType: String,           // "economy" | "standard" | "luxury"
  interests: [String],          // ["art", "food", "history"]
  
  // AI-Generated Itinerary
  itinerary: [{
    dayNumber: Number,         // 1, 2, 3...
    theme: String,              // "Arrival & Exploration"
    activities: [{
      time: String,             // "09:00 AM"
      title: String,           // "Eiffel Tower"
      description: String,      // "Visit the iconic landmark"
      estimatedCost: Number    // 30 (in USD)
    }]
  }],
  
  // AI-Generated Budget
  budget: {
    breakdown: [{               // Category-wise spending
      category: String,         // "Accommodation", "Food", "Transport"
      estimatedCost: Number
    }],
    totalEstimatedCost: Number,  // Total trip cost
    currency: String            // "USD"
  },
  
  // AI-Generated Hotel Recommendations
  hotels: [{
    name: String,               // "Hotel de Paris"
    rating: Number,             // 4.5
    pricePerNight: Number,      // 150
    description: String,        // "Beautiful hotel near city center"
    bookingUrl: String         // Optional booking link
  }],
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### What Each Trip Contains
| Section | Description |
|---------|-------------|
| `itinerary` | Day-by-day plan with themes and activities |
| `activities` | Each activity has time, title, description, cost |
| `budget` | Total cost + category breakdown |
| `hotels` | 3 AI-recommended accommodations |

---

## 🎨 Design Theme: "Wanderlust Explorer"

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Terracotta | `#C45D3E` | Primary accent, CTAs |
| Sage | `#7D8B75` | Secondary accent |
| Cream | `#F5F0E8` | Background |
| Charcoal | `#2D2A26` | Text |

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: DM Sans (sans-serif)

### Design Principles
- Warm, inviting travel magazine aesthetic
- Generous whitespace
- Smooth animations and transitions
- Responsive for all devices
- Accessible color contrasts

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- z.ai API key

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd trao_trip_planner
```

2. **Setup Backend**
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

3. **Setup Frontend**
```bash
cd client
npm install
npm run dev
```

4. **Configure Environment Variables**

**Server (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trao_travel_planner
JWT_SECRET=your-super-secret-jwt-key
ZAI_API_URL=https://api.z.ai/api/paas/v4/
ZAI_API_KEY=your-zai-api-key
FRONTEND_URL=http://localhost:3000
```

**Client (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the App

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### After Running - Complete User Journey

1. **Sign Up / Login**
   - Create account or login
   - Access your personal dashboard

2. **Create New Trip**
   - Enter destination (e.g., "Paris, France")
   - Select number of days (1-14)
   - Choose budget type (Economy / Standard / Luxury)
   - Select interests (multiple allowed)
   - Click "Generate Itinerary"

3. **AI Generates Your Trip**
   - Wait for AI to create personalized itinerary
   - View complete day-by-day plan
   - See budget breakdown
   - Check hotel recommendations

4. **View & Edit Trip**
   - Navigate to trip details
   - View itinerary tab for daily schedule
   - Switch to Budget tab for spending breakdown
   - Switch to Hotels tab for accommodation options
   - Click "Edit Your Itinerary" to customize

5. **Dashboard Management**
   - View all your trips
   - See statistics
   - Create more trips

---

## 🔧 Features in Detail

### 1. Smart Trip Creation
- Input destination, duration, budget, and interests
- AI analyzes preferences and generates personalized itinerary
- Includes specific times, locations, costs, and descriptions
- Multiple interests supported: Art, Food, History, Adventure, Nature, Nightlife, Shopping, Wellness

### 2. Interactive Itinerary View
- Day-by-day timeline with activities
- Color-coded themes for each day
- Time slots and estimated costs
- Easy-to-read layout

### 3. Post-Planning: Edit & Customize
- **Edit Your Itinerary** button at top of trip details
- View your complete day-by-day plan
- Add personal notes or modifications
- Customize activities based on your preferences
- Use AI-generated plan as a starting point and refine it

### 4. Visual Budget Breakdown
- **Pie Chart**: Visual representation of spending
- **Category Icons**: 🏨 🛏️ 🍽️ 🚗 🎭
- **Multi-Currency**: Convert to INR, EUR, GBP, JPY
- **Detailed List**: Category-wise spending

### 4. Hotel Recommendations
- AI-suggested hotels matching budget
- Star ratings and prices
- Location descriptions
- Booking information

### 5. Post-Planning: Edit & Customize Your Itinerary
After your AI-generated trip is ready, you have full control to customize it:

- **Edit Your Itinerary**: Click "Edit Your Itinerary" button at the top of trip details
- **Modify Activities**: View and understand your day-by-day plan
- **Add Personal Touches**: Use the AI-generated itinerary as a base and customize
- **Plan Your Day**: Review suggested activities, times, and costs
- **Save Changes**: Your edits are preserved with the trip

> 💡 **Tip**: The AI creates a perfect starting point. You can always refine it based on your personal preferences!

### 6. User Dashboard
- View all created trips
- Quick stats (total trips, days planned)
- Easy navigation to trip details
- Create new trip CTA

---

## 🛡️ Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Tokens**: 7-day expiration with secure signing
- **User Isolation**: Users can only access their own trips (ownership verified on every request)
- **Input Validation**: All inputs validated and sanitized
- **CORS Protection**: Configured for frontend origin only
- **Error Handling**: No sensitive data leaked in error messages
- **Protected Routes**: All trip endpoints require valid JWT token

## 📊 Complete Feature Summary

| Feature | Description |
|---------|-------------|
| 🤖 AI Generation | z.ai creates complete itineraries |
| 📅 Day-by-Day Plan | Detailed schedule for each day |
| 💰 Budget Breakdown | Category-wise cost estimation |
| 🏨 Hotel Picks | 3 AI-recommended accommodations |
| 💱 Multi-Currency | View prices in USD, INR, EUR, GBP, JPY |
| ✏️ Edit Itinerary | Customize your plan after generation |
| 📊 Visual Charts | Colorful pie charts with icons |
| 🔐 User Auth | JWT-based secure authentication |
| 📱 Responsive | Works on mobile, tablet, desktop |
| 🎨 Beautiful UI | "Wanderlust Explorer" design theme |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this project for learning and development.

---

## 🙏 Acknowledgments

- **AI Provider**: z.ai for LLM capabilities
- **Design Inspiration**: Travel magazines and modern UI trends
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, DM Sans)

---

<div align="center">
  <p><strong>Built with ❤️ for travelers who dream big</strong></p>
  <p>Tripo-AI - Your AI Travel Companion</p>
</div>
