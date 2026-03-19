'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Compass, Sparkles, MapPin, Heart, ArrowRight, User, Zap, Globe, Shield, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import ParticleField from '@/components/ParticleField'

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-midnight relative overflow-hidden">
      <ParticleField count={20} />

      {/* Hero Section */}
      <section className="relative py-28 md:py-40">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="aurora-bg animate-aurora opacity-30" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center reveal-group active">
            <div className="inline-flex items-center gap-2 glass-effect px-5 py-2.5 rounded-full text-midnight-300 mb-8">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">About Tripo-AI</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight">
              Travel Smarter with{' '}
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Tripo-AI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-midnight-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Your personal AI travel companion that creates perfect itineraries based on your unique interests, budget, and travel style.
            </p>
            <Link href={isAuthenticated ? "/trips/new" : "/register"}>
              <Button variant="primary" className="group pill-button shimmer-button py-4 px-10 text-base">
                {isAuthenticated ? "Launch New Voyage" : "Start Planning Now"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 border-y border-midnight-700/50 bg-midnight-800/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 reveal-group active">
              <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full text-midnight-300 mb-6">
                <Zap className="w-4 h-4 text-cyan" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase">Simple Process</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                How It Works
              </h2>
              <p className="text-lg text-midnight-300 max-w-2xl mx-auto">
                Three simple steps to your perfect trip
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-gold/30 via-cyan/30 to-gold/30" />

              {[
                { icon: MapPin, title: 'Tell Us Your Dream', desc: 'Share your destination, travel dates, interests, and budget. Our AI needs just a few details to get started.', color: 'gold', step: 1 },
                { icon: Sparkles, title: 'AI Creates Your Plan', desc: 'Our advanced neural engine analyzes millions of data points to craft a personalized itinerary with activities, hotels, and more.', color: 'cyan', step: 2 },
                { icon: Heart, title: 'Explore & Customize', desc: 'Review your complete trip plan with budget breakdowns, recommended hotels, and daily itineraries. Adjust as needed!', color: 'gold', step: 3 },
              ].map((item, i) => {
                const colorMap = {
                  gold: { bg: 'bg-gold/10', text: 'text-gold', border: 'border-gold/20', glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]' },
                  cyan: { bg: 'bg-cyan/10', text: 'text-cyan', border: 'border-cyan/20', glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]' },
                }
                const c = colorMap[item.color]

                return (
                  <div key={i} className={`text-center group ${c.glow} transition-shadow duration-500`}>
                    <div className={`w-20 h-20 ${c.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 ${c.border} border group-hover:scale-110 transition-transform duration-500`}>
                      <item.icon className={`w-9 h-9 ${c.text}`} />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-deep text-midnight-900 rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-midnight-300 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-28 relative z-10">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Beyond Conventional Planning
              </h2>
              <p className="text-lg text-midnight-300 max-w-2xl mx-auto">
                We make travel planning effortless and enjoyable
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Personalized Recommendations", icon: Compass, color: 'gold', text: "Every itinerary tailored to your unique interests — art, food, adventure, or relaxation." },
                { title: "Smart Budget Synthesis", icon: Shield, color: 'cyan', text: "Detailed budget breakdowns and cost estimates so you know exactly what to expect." },
                { title: "Curated Experiences", icon: MapPin, color: 'gold', text: "Handpicked accommodations and experiences that match your style and budget perfectly." },
                { title: "Stress-Free Navigation", icon: Heart, color: 'cyan', text: "Let AI handle the research and logistics. Focus on the excitement of your upcoming adventure." },
                { title: "Instant Intelligence", icon: Clock, color: 'gold', text: "Get a complete travel plan in seconds. No more hours of manual searching and planning." },
                { title: "Infinite Destinations", icon: Globe, color: 'cyan', text: "From bustling metropolises to serene retreats, plan trips to destinations worldwide." },
              ].map((feature, i) => {
                const isGold = feature.color === 'gold'
                return (
                  <div key={i} className={`glass-card group cursor-pointer ${isGold ? 'hover:border-gold/30' : 'hover:border-cyan/30'} transition-all duration-500`}>
                    <div className={`w-12 h-12 ${isGold ? 'bg-gold/10' : 'bg-cyan/10'} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                      <feature.icon className={`w-6 h-6 ${isGold ? 'text-gold' : 'text-cyan'}`} />
                    </div>
                    <h3 className="text-lg font-display font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-midnight-300 leading-relaxed text-sm">{feature.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto glass-card py-16 px-12 animate-neon">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-lg text-midnight-300 mb-10">
              Join thousands of travelers who have discovered their perfect trips with Tripo-AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href={isAuthenticated ? "/trips/new" : "/register"}>
                <Button variant="primary" className="pill-button shimmer-button px-10 py-4 text-base">
                  {isAuthenticated ? "Launch New Voyage" : "Get Started Free"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                <Button variant="outline" className="pill-button px-10 py-4 text-base">
                  {isAuthenticated ? "My Voyages" : "Sign In"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
