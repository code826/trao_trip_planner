'use client'

import Link from 'next/link'
import { ArrowRight, Compass, Sparkles, MapPin } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-terracotta/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-sage/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-terracotta/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="stagger-children">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-sage mb-6 animate-slide-up">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Travel Planning</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-charcoal mb-6 animate-slide-up leading-tight">
                Your Journey
                <br />
                <span className="text-terracotta">Begins Here</span>
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-charcoal/70 mb-10 max-w-2xl mx-auto animate-slide-up">
                Create personalized travel itineraries in seconds. Just tell us where you want to go,
                and we'll craft the perfect adventure for you.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                <Link
                  href="/register"
                  className="btn-hover focus-ring bg-terracotta text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2"
                >
                  Start Planning
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/login"
                  className="btn-hover focus-ring bg-white text-charcoal px-8 py-4 rounded-full font-semibold text-lg border-2 border-charcoal/10 hover:border-charcoal/20"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-charcoal/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-charcoal/40 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 stagger-children">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4 animate-slide-up">
              Why Choose Trao?
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto animate-slide-up">
              Intelligent travel planning that understands your unique style and preferences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto stagger-children">
            {/* Feature 1 */}
            <div className="card-hover bg-cream rounded-2xl p-8 text-center animate-slide-up">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">
                AI-Powered
              </h3>
              <p className="text-charcoal/70">
                Our intelligent algorithm creates personalized itineraries based on your interests,
                budget, and travel style.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-hover bg-cream rounded-2xl p-8 text-center animate-slide-up">
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="w-8 h-8 text-sage" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">
                Curated Experiences
              </h3>
              <p className="text-charcoal/70">
                Discover hidden gems and local favorites carefully selected to match your unique
                preferences.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-hover bg-cream rounded-2xl p-8 text-center animate-slide-up">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">
                Detailed Planning
              </h3>
              <p className="text-charcoal/70">
                Get day-by-day itineraries, hotel recommendations, budget breakdowns, and more—all
                in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 hero-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 stagger-children">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4 animate-slide-up">
              How It Works
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto animate-slide-up">
              Plan your perfect trip in three simple steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex items-start gap-6 mb-12 stagger-children">
              <div className="w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl animate-slide-up">
                1
              </div>
              <div className="flex-grow animate-slide-up">
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">
                  Tell Us About Your Trip
                </h3>
                <p className="text-charcoal/70 text-lg">
                  Enter your destination, travel dates, budget range, and interests to help us
                  understand your preferences.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-6 mb-12 stagger-children">
              <div className="w-12 h-12 bg-sage text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl animate-slide-up">
                2
              </div>
              <div className="flex-grow animate-slide-up">
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">
                  Let AI Create Your Itinerary
                </h3>
                <p className="text-charcoal/70 text-lg">
                  Our AI analyzes millions of data points to create a personalized day-by-day plan
                  tailored to your needs.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-6 stagger-children">
              <div className="w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl animate-slide-up">
                3
              </div>
              <div className="flex-grow animate-slide-up">
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">
                  Explore and Customize
                </h3>
                <p className="text-charcoal/70 text-lg">
                  Review your itinerary, explore hotel options, and regenerate any day if you want a
                  different experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-terracotta">
        <div className="container mx-auto px-6 text-center">
          <div className="stagger-children">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 animate-slide-up">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-slide-up">
              Join thousands of travelers who have discovered their perfect journeys with Trao.
            </p>
            <Link
              href="/register"
              className="btn-hover focus-ring bg-white text-terracotta px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2 animate-slide-up"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
