'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, MapPin, Compass, Globe, Plane, ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import PlaneGlobeAnimation from '@/components/PlaneGlobeAnimation'
import ParticleField from '@/components/ParticleField'
import AnimatedCounter from '@/components/AnimatedCounter'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-midnight selection:bg-gold/30">
      {/* ═══════ Hero Section ═══════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid" />
        <div className="aurora-bg animate-aurora" />
        <ParticleField count={35} />

        {/* Background orbs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] animate-orb" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[120px] animate-orb" style={{ animationDelay: '-7s' }} />

        {/* Globe animation (behind text) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none">
          <PlaneGlobeAnimation size={500} />
        </div>

        {/* Flying airplanes background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute animate-airplane"
              style={{
                top: `${15 + i * 18}%`,
                left: '-10%',
                animationDelay: `${i * 4}s`,
                animationDuration: `${14 + i * 3}s`,
              }}
            >
              <div className="relative">
                <Plane className="w-5 h-5 text-gold/20 rotate-[-35deg]" />
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-32 h-[1px] bg-gradient-to-l from-gold/15 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-4xl mx-auto text-center reveal-group active">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-effect px-5 py-2.5 rounded-full text-midnight-300 mb-10">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">AI-Powered Travel Intelligence</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[0.95] tracking-tight">
              Plan Journeys
              <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Beyond Imagination
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-midnight-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Our neural travel engine crafts hyper-personalized itineraries, analyzing millions of data points to design your perfect adventure.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link
                href={isAuthenticated ? "/trips/new" : "/register"}
                className="pill-button shimmer-button bg-gradient-to-r from-gold to-gold-deep text-midnight-900 hover:scale-105 shadow-[0_0_40px_rgba(245,158,11,0.2)] font-bold text-base"
              >
                {isAuthenticated ? "New Adventure" : "Start Planning Free"}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link
                href={isAuthenticated ? "/dashboard" : "/login"}
                className="pill-button glass-effect text-midnight-100 hover:border-gold/30 hover:text-gold transition-all"
              >
                {isAuthenticated ? "My Voyages" : "Sign In"}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-midnight-400">Scroll</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-gold/30 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gold animate-infinite-scroll" />
          </div>
        </div>
      </section>

      {/* ═══════ Stats Social Proof ═══════ */}
      <section className="py-16 border-y border-midnight-700/50 relative z-10 bg-midnight-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 12500, suffix: '+', label: 'Trips Planned' },
              { value: 98, suffix: '%', label: 'Satisfaction' },
              { value: 180, suffix: '+', label: 'Destinations' },
              { value: 50, suffix: 'K+', label: 'Happy Travelers' },
            ].map((stat, i) => (
              <div key={i} className="group">
                <p className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-midnight-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Features Section ═══════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="aurora-bg animate-aurora opacity-30" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full text-midnight-300 mb-6">
              <Zap className="w-4 h-4 text-cyan" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">Why Tripo-AI</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Designed for those who{' '}
              <span className="bg-gradient-to-r from-gold to-cyan bg-clip-text text-transparent">seek more</span>
            </h2>
            <p className="text-lg text-midnight-300">
              Enterprise-grade intelligence meets effortless travel planning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: 'Neural Intelligence',
                desc: 'Our AI processes millions of data points to identify the perfect balance between iconic landmarks and hidden local gems.',
                color: 'gold',
              },
              {
                icon: Compass,
                title: 'Zero-Friction Planning',
                desc: 'Flights, hotels, and day-by-day activities synthesized into a single, elegant interface. No tab-juggling needed.',
                color: 'cyan',
              },
              {
                icon: Shield,
                title: 'Smart Budgeting',
                desc: 'Detailed cost breakdowns and budget optimization so you always know exactly what to expect financially.',
                color: 'emerald',
              },
              {
                icon: Globe,
                title: 'Global Coverage',
                desc: 'From bustling metropolises to serene retreats — Tripo-AI covers destinations worldwide with localized insights.',
                color: 'gold',
              },
              {
                icon: Clock,
                title: 'Instant Results',
                desc: 'Complete personalized travel plans generated in seconds. No waiting, no manual research required.',
                color: 'cyan',
              },
              {
                icon: MapPin,
                title: 'Curated Experiences',
                desc: 'Handpicked accommodations and experiences matched precisely to your travel style and budget preferences.',
                color: 'gold',
              },
            ].map((feature, i) => {
              const colorMap = {
                gold: { bg: 'bg-gold/10', text: 'text-gold', border: 'hover:border-gold/30' },
                cyan: { bg: 'bg-cyan/10', text: 'text-cyan', border: 'hover:border-cyan/30' },
                emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'hover:border-emerald-500/30' },
              }
              const c = colorMap[feature.color]

              return (
                <div
                  key={i}
                  className={`glass-card group cursor-pointer ${c.border} transition-all duration-500`}
                >
                  <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className={`w-6 h-6 ${c.text}`} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-midnight-300 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════ Globe Feature Showcase ═══════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
                Your AI travel copilot,{' '}
                <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  always ready
                </span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-2">AI-Synthesized Logic</h3>
                    <p className="text-midnight-300 leading-relaxed text-sm">
                      Our models analyze travel patterns, seasonal data, and user preferences to craft uniquely personalized itineraries.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Compass className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-2">Unified Experience</h3>
                    <p className="text-midnight-300 leading-relaxed text-sm">
                      Hotels, activities, budgets, and timelines — everything in one beautiful dashboard, fully customizable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <PlaneGlobeAnimation size={380} />
                {/* Floating accent cards */}
                <div className="absolute -top-4 -right-4 glass-effect px-4 py-3 rounded-xl animate-float text-sm">
                  <MapPin className="w-4 h-4 text-gold inline mr-2" />
                  <span className="text-midnight-200 font-medium">180+ Destinations</span>
                </div>
                <div className="absolute -bottom-4 -left-4 glass-effect px-4 py-3 rounded-xl animate-float text-sm" style={{ animationDelay: '-3s' }}>
                  <Sparkles className="w-4 h-4 text-cyan inline mr-2" />
                  <span className="text-midnight-200 font-medium">AI-Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA Section ═══════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-800/50 to-midnight" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-none">
            Your next adventure is
            <br />
            <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
              one click
            </span>{' '}
            away
          </h2>
          <p className="text-lg text-midnight-300 mb-10 max-w-xl mx-auto">
            Join thousands of travelers who plan smarter with Tripo-AI.
          </p>
          <Link
            href="/register"
            className="pill-button shimmer-button bg-gradient-to-r from-gold to-gold-deep text-midnight-900 hover:scale-105 shadow-[0_0_60px_rgba(245,158,11,0.2)] inline-flex items-center gap-3 text-lg font-bold"
          >
            Start Planning Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
