'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Compass, Sparkles, MapPin, Heart, ArrowRight, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden bg-grid">
      <div className="aurora-bg animate-aurora opacity-50"></div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center reveal-group active">
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/40 px-5 py-2 rounded-full text-charcoal/60 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-bold tracking-widest uppercase">The Future of Exploration</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-charcoal mb-8 leading-tight">
              Travel Smarter with <br />
              <span className="text-terracotta">Tripo-AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/60 mb-12 max-w-2xl mx-auto font-medium">
              Your personal AI travel companion that creates perfect itineraries based on your unique interests,
              budget, and travel style.
            </p>
            <Link href={isAuthenticated ? "/trips/new" : "/register"}>
              <Button variant="primary" className="group pill-button py-6 px-10 text-lg">
                {isAuthenticated ? "Launch New Voyage" : "Start Planning Now"}
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white/50 backdrop-blur-xl border-y border-charcoal/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 reveal-group active">
              <h2 className="text-5xl font-serif font-bold text-charcoal mb-6">
                How It Works
              </h2>
              <p className="text-xl text-charcoal/50 max-w-2xl mx-auto font-medium">
                Three simple steps to your perfect trip
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-terracotta/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-terracotta group-hover:text-white transition-all duration-500 shadow-sm border border-terracotta/20">
                  <MapPin className="w-10 h-10 transition-transform group-hover:scale-110" />
                </div>
                <div className="inline-block bg-charcoal text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
                  Tell Us Your Dream
                </h3>
                <p className="text-charcoal/50 leading-relaxed font-medium">
                  Share your destination, travel dates, interests, and budget. Our AI needs just a few details to get started.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-sage/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-sage group-hover:text-white transition-all duration-500 shadow-sm border border-sage/20">
                  <Sparkles className="w-10 h-10 transition-transform group-hover:scale-110" />
                </div>
                <div className="inline-block bg-charcoal text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
                  AI Creates Your Plan
                </h3>
                <p className="text-charcoal/50 leading-relaxed font-medium">
                  Our advanced neural engine analyzes millions of data points to craft a personalized itinerary with activities, hotels, and more.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-charcoal/5 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-charcoal group-hover:text-white transition-all duration-500 shadow-sm border border-charcoal/10">
                  <Heart className="w-10 h-10 transition-transform group-hover:scale-110" />
                </div>
                <div className="inline-block bg-charcoal text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
                  Explore & Customize
                </h3>
                <p className="text-charcoal/50 leading-relaxed font-medium">
                  Review your complete trip plan with budget breakdowns, recommended hotels, and daily itineraries. Adjust as needed!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 text-reveal active">
              <h2 className="text-5xl font-serif font-bold text-charcoal mb-6">
                Beyond Conventional Planning
              </h2>
              <p className="text-xl text-charcoal/50 max-w-2xl mx-auto font-medium">
                We make travel planning effortless and enjoyable
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Personalized Recommendations", icon: Compass, color: "terracotta", text: "Every itinerary is tailored to your unique interests, whether you're into art, food, adventure, or relaxation." },
                { title: "Smart Budget Synthesis", icon: Sparkles, color: "sage", text: "Get high-end budget breakdowns and cost estimates so you know exactly what to expect on your journey." },
                { title: "Curated Experiences", icon: MapPin, color: "charcoal", text: "Discover handpicked accommodations and experiences that match your enterprise style and budget perfectly." },
                { title: "Stress-Free Navigation", icon: Heart, color: "terracotta", text: "Let AI handle the research and logistics. Focus on the excitement of your upcoming premium adventure." },
                { title: "Instant Intelligence", icon: Sparkles, color: "sage", text: "Get a complete travel plan in seconds utilizing our next-gen travel agents. No more manual searching." },
                { title: "Infinite Destinations", icon: Compass, color: "charcoal", text: "From bustling cosmopolises to serene retreats, Tripo-AI plans trips to destinations worldwide." },
              ].map((feature, i) => (
                <div key={i} className="glass-card hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className={`w-14 h-14 bg-white/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/40`}>
                    <feature.icon className={`w-7 h-7 text-charcoal`} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-charcoal/60 leading-relaxed font-medium">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-sage/5"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto glass-card py-20 px-12 animate-glow">
            <h2 className="text-5xl font-serif font-bold text-charcoal mb-8">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-charcoal/50 mb-10 font-medium">
              Join thousands of travelers who have discovered their perfect trips with Tripo-AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={isAuthenticated ? "/trips/new" : "/register"}>
                <Button variant="primary" className="pill-button px-10 py-6 text-lg">
                  {isAuthenticated ? "Launch New Voyage" : "Get Started Free"}
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
              <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                <Button variant="outline" className="pill-button px-10 py-6 text-lg border-charcoal/10">
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
