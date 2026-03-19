# 🌌 Tripo-AI — Next-Gen AI Travel Intelligence

![Tripo-AI Banner](https://img.shields.io/badge/Tripo--AI-Luxury%20Aviation-0B1120?style=for-the-badge&logo=spacex&logoColor=F59E0B)

> **The future of travel planning is here.** Tripo-AI is a premium, enterprise-grade travel planning suite that transforms your aspirations into hyper-personalized, legendary itineraries using advanced neural engines and a world-class "Luxury Aviation" aesthetic.

---

## ✨ Project Overview

Tripo-AI solves the "planning paralysis" by synthesizing millions of data points into a single, cohesive travel experience. From flights and hotels to minute-by-minute itineraries, everything is crafted by AI and presented through a high-performance, animated dark interface designed to WOW the modern traveler.

## 🛠 Chosen Tech Stack & Justification

| Layer | Technology | Justification |
|-------|------------|---------------|
| **Frontend** | **Next.js 14 (App Router)** | Best-in-class performance, SEO optimization, and file-based routing. |
| **Styling** | **TailwindCSS + CSS Modules** | Rapid development with precise control over the "Luxury Aviation" design tokens. |
| **Animations** | **Framer Motion + CSS Orbitals** | Combined for high-performance SVG animations and smooth staggered reveals. |
| **State** | **Zustand** | Lightweight, high-performance state management for auth and currency persistence. |
| **Backend** | **Node.js + Express** | Scalable, asynchronous runtime perfect for handling AI completion overhead. |
| **Database** | **MongoDB** | Flexible document schema allows for complex, varying AI-generated itinerary structures. |
| **AI Layer** | **z.ai (Large Language Model)** | State-of-the-art reasoning for logical sequence mapping and budget estimation. |

---

## 🚀 Setup Instructions

### Local Development

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd trao_trip_planner
   ```

2. **Backend Configuration**
   - Navigate to `/server`
   - Create `.env` from `.env.example`
   - Required keys: `MONGODB_URI`, `JWT_SECRET`, `ZAI_API_KEY`
   ```bash
   npm install
   npm run dev
   ```

3. **Frontend Configuration**
   - Navigate to `/client`
   - Create `.env.local`
   - Set `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
   ```bash
   npm install
   npm run dev
   ```

### Deployment
- **Frontend**: Best deployed on **Vercel** for Next.js native optimization.
- **Backend**: Deploy on **Render** or **AWS EC2** with a MongoDB Atlas cloud instance.

---

## 🏛 High-Level Architecture

Tripo-AI follows a decoupled client-server architecture. Below are the visual flows demonstrating the system intelligence:

### 1. User Journey Flow
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

### 2. Physical Architecture
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

### 3. Intelligence Generation Engine (Trip Creation)
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

### 4. Post-Planning: Edit & Customize Strategy
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

## 🔐 Authentication & Authorization

We implement a rigorous **JWT (JSON Web Token)** based security model:
- **Strategy**: Passwords hashed with `bcrypt` (10 salt rounds).
- **Bearer Auth**: Every sensitive API request requires a valid JWT in the Authorization header.
- **User Isolation**: A custom MongoDB middleware ensures users can strictly only access/modify trips where `userId` matches their authenticated session.
- **Persistence**: Auth state is managed via Zustand with `localStorage` persistence, enabling seamless session recovery.

---

## 🤖 AI Agent Design & Purpose

The core "Travel Agent" is a sophisticated prompt-engineered entity designed to:
- **Contextual Reasoning**: Interpret user interests (e.g., "Art + Food") to find thematic overlaps.
- **Logical Sequencing**: Map activities in a geographic and temporal order that makes sense (no cross-city zig-zagging).
- **Financial Synthesis**: Estimate costs based on the user's selected `budgetType` (Economy, Standard, Luxury).
- **Self-Correction**: The backend includes retry logic and JSON schema validation to ensure the AI output always meets the UI requirements.

---

## 💎 Creativity Requirement: Dynamic Intelligence Conversion

### The Feature: Multi-Currency Sync Engine
We recognized that travelers often struggle with mental math when looking at AI-generated costs.

**Why we built this?**
To solve the "Currency Friction" problem. Users need to see costs in their home currency (e.g., Rupees/INR) to make real-world decisions.

**Technical Implementation:**
- **Dynamic API Architecture**: integrated the `frankfurter.dev` API to fetch real-time global exchange rates.
- **Smart Persistence**: We implemented a 24-hour cache strategy using Zustand Middleware. Since global rates only fluctuate significantly daily, we save the rates to `localStorage` and only trigger a network call once every 24 hours.
- **Efficiency**: This minimizes API calls (enhancing performance) while keeping the user experience "always live".
- **UX Integration**: All cost badges in the `BudgetChart` and `ItineraryDay` components automatically sync when the user toggles the currency selector.

---

## 🎨 Key Design Decisions & Trade-offs

1.  **Theme Selection**: Moved from a generic light theme to a **"Luxury Aviation" Dark Theme** (Midnight Blue & Gold). 
    - *Decision*: Dark themes feel more premium and enterprise-grade.
    - *Trade-off*: Requires more careful contrast management for accessibility.
2.  **Typography**: Used **Outfit** (Display) and **Space Grotesk** (Body).
    - *Decision*: Gives a technical, aviation-inspired feel.
3.  **Animations**: Implemented a CSS-based **Orbital Globe** centerpiece.
    - *Decision*: CSS animations are more performant than heavy 3D libraries (Three.js) for this use case, keeping the bundle size small.

---

## ⚠️ Known Limitations & Future Roadmap

- **Model Context Window**: Current AI generations are limited by the model's token limit.
- **Rating Synthesis**: While the agent recommends hotels, these are AI-curated and would benefit from a live integration with live review systems (like TripAdvisor/Yelp).
- **Personalization Engine**: **Future work** includes a rating system for past trips, allowing the AI to learn from "What did the user actually like?" to refine the *next* generated voyage.
- **Integration**: Adding live flight booking APIs would move this from a "Planner" to an "Actionable Booking Engine".

---

<div align="center">
  <p><strong>Built with ❤️ for travelers who dream big</strong></p>
  <p>© 2026 Tripo-AI — AI Travel Redefined</p>
</div>
