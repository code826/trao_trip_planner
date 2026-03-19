# Trao Travel Planner - Frontend

Next.js 14 frontend application for AI-powered travel planning.

## Features

- 🎨 Beautiful "Wanderlust Explorer" design theme
- ✨ AI-powered itinerary generation
- 🔐 User authentication with JWT
- 📊 Interactive budget visualization
- 📱 Fully responsive design
- ⚡ State management with Zustand
- 🎭 Smooth animations and transitions

## Design System

### Color Palette
- **Terracotta**: `#C45D3E` - Primary accent color
- **Sage**: `#7D8B75` - Secondary accent
- **Cream**: `#F5F0E8` - Background
- **Charcoal**: `#2D2A26` - Text

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: DM Sans (sans-serif)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Start production server**
   ```bash
   npm start
   ```

## Project Structure

```
client/
├── app/                      # Next.js 14 App Router
│   ├── dashboard/           # Dashboard page
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── trips/               # Trip management pages
│   │   ├── new/            # Create new trip
│   │   └── [id]/           # Trip details
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Landing page
├── components/              # React components
│   ├── ui/                 # UI primitives
│   │   ├── Button.js
│   │   ├── Card.js
│   │   └── Input.js
│   ├── BudgetChart.js      # Budget visualization
│   ├── Footer.js
│   ├── HotelCard.js        # Hotel display card
│   ├── ItineraryDay.js     # Day itinerary
│   ├── Navbar.js
│   └── TripCard.js         # Trip display card
├── hooks/                   # Custom React hooks
│   └── useTrips.js         # Trip operations
├── lib/                     # Utility functions
│   ├── toast.js            # Toast notifications
│   └── utils.js            # Helper functions
├── services/                # API services
│   └── api.js              # API client
├── store/                   # Zustand stores
│   ├── authStore.js        # Authentication state
│   └── tripsStore.js       # Trip state
└── MOCK_DATA.json          # Mock data for development
```

## Key Components

### Pages
- **Landing Page**: Hero section, features, and CTA
- **Login/Register**: Authentication forms
- **Dashboard**: User's trip overview
- **Create Trip**: Form to generate new itinerary
- **Trip Details**: Full trip view with tabs

### Components
- **Navbar**: Responsive navigation with auth state
- **TripCard**: Trip display with hover effects
- **ItineraryDay**: Day-by-day timeline view
- **BudgetChart**: Interactive pie chart
- **HotelCard**: Hotel recommendations
- **Button/Input/Card**: Reusable UI components

## State Management

### Auth Store
```javascript
const { token, user, isAuthenticated, login, logout } = useAuthStore()
```

### Trips Store
```javascript
const { trips, addTrip, updateTrip, deleteTrip } = useTripsStore()
```

## API Integration

Mock data is used by default. To connect to the real API:

1. Set environment variable:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

2. Remove mock data references in components

3. The API service (`services/api.js`) will automatically handle requests

## Development Notes

- Uses Next.js 14 App Router
- Tailwind CSS with custom theme
- Zustand for state management (persisted to localStorage)
- Lucide React for icons
- Recharts for data visualization
- Fully responsive with mobile-first approach

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
