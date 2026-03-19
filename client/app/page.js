'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowFastForward, Sparkles, MapPin, Compass, Globe, Plane, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-cream selection:bg-terracotta/30">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-grid">
        {/* Animated Background Elements */}
        <div className="aurora-bg animate-aurora"></div>

        {/* Floating Orb */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-terracotta/10 rounded-full blur-[100px] animate-orb"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-sage/10 rounded-full blur-[100px] animate-orb" style={{ animationDelay: '-5s' }}></div>

        {/* The Globe Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none">
          <div className="w-full h-full border-[1px] border-charcoal/10 rounded-full animate-globe flex items-center justify-center relative">
            <div className="absolute w-[90%] h-[90%] border-[1px] border-charcoal/5 rounded-full rotate-45"></div>
            <div className="absolute w-[90%] h-[90%] border-[1px] border-charcoal/5 rounded-full -rotate-45"></div>
            <Globe className="w-64 h-64 text-charcoal/20" strokeWidth={0.5} />
          </div>
        </div>

        {/* Flying Airplanes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute animate-airplane"
              style={{
                top: `${20 + i * 15}%`,
                left: '-10%',
                animationDelay: `${i * 3}s`,
                animationDuration: `${10 + i * 2}s`
              }}
            >
              <div className="relative">
                <Plane className="w-6 h-6 text-terracotta/40 rotate-90" />
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-48 h-[1px] bg-gradient-to-l from-terracotta/20 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-4xl mx-auto text-center reveal-group active">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/40 px-5 py-2 rounded-full text-charcoal/60 mb-10 shadow-sm">
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-bold tracking-widest uppercase">The Future of Exploration</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-charcoal mb-8 leading-[0.9]">
              Next-Gen <br />
              <span className="text-terracotta relative">
                Itineraries
                <span className="absolute -right-12 -top-8 text-sm font-sans font-normal text-outline uppercase tracking-tighter opacity-50">Enterprise</span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-charcoal/60 mb-12 max-w-2xl mx-auto font-medium">
              We leverage neural travel agents to craft hyper-personalized journeys tailored to your soul's destination.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href={isAuthenticated ? "/trips/new" : "/register"}
                className="pill-button bg-charcoal text-white hover:bg-terracotta hover:scale-105 shadow-2xl animate-glow"
              >
                {isAuthenticated ? "New Adventure" : "Plan Your Journey"}
              </Link>
              <Link
                href={isAuthenticated ? "/dashboard" : "/login"}
                className="pill-button glass-effect text-charcoal hover:bg-white/50"
              >
                {isAuthenticated ? "My Voyages" : "Sign In"}
              </Link>
            </div>
          </div>
        </div>

        {/* Refined Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/30">Scroll Down</span>
          <div className="h-16 w-[1px] bg-gradient-to-b from-charcoal/20 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-terracotta animate-infinite-scroll"></div>
          </div>
        </div>
      </section>

      {/* Features Section - Glassmorphic implementation */}
      <section className="py-32 relative bg-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-8 leading-tight">
                Designed for those who <br />
                <span className="text-terracotta">seek more.</span>
              </h2>
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Sparkles className="w-6 h-6 text-terracotta" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">AI-Synthesized Logic</h3>
                    <p className="text-charcoal/60 leading-relaxed">Our models process millions of travel data points to identify the perfect balance between popular landmarks and local secrets.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Compass className="w-6 h-6 text-terracotta" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Zero-Friction Planning</h3>
                    <p className="text-charcoal/60 leading-relaxed">No more juggling tabs. Flights, hotels, and day-by-day activities are synthesized into a single, elegant interface.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[4rem] bg-gradient-to-tr from-cream to-white overflow-hidden shadow-inner border border-charcoal/5 relative group">
                {/* Decorative background for the image placeholder */}
                <div className="absolute inset-0 bg-grid opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl animate-float">
                    <Globe className="w-16 h-16 text-terracotta" />
                  </div>
                </div>
                {/* Visual accents */}
                <div className="absolute top-10 right-10 p-6 glass-effect rounded-2xl animate-orb">
                  <MapPin className="w-6 h-6 text-terracotta" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern High-Impact CTA */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-10 leading-none">
            Your next adventure <br />
            is one <span className="text-terracotta">click</span> away.
          </h2>
          <Link
            href="/register"
            className="pill-button bg-terracotta text-white hover:scale-110 shadow-[0_0_50px_rgba(196,93,62,0.3)] inline-flex items-center gap-3 text-xl"
          >
            Start Planning Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
