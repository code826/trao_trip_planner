import Link from 'next/link'
import { Compass, Sparkles, MapPin, Heart, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <div className="min-h-screen gradient-mesh">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Powered by AI</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-6">
              Travel Smarter with
              <span className="text-terracotta block">Tripo-AI</span>
            </h1>
            <p className="text-xl text-charcoal/70 mb-8 max-w-2xl mx-auto">
              Your personal AI travel companion that creates perfect itineraries based on your unique interests,
              budget, and travel style.
            </p>
            <Link href="/register">
              <Button variant="primary" className="group">
                Start Planning Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-charcoal mb-4">
                How It Works
              </h2>
              <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
                Three simple steps to your perfect trip
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-terracotta" />
                </div>
                <div className="inline-block bg-terracotta text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">
                  Tell Us Your Dream
                </h3>
                <p className="text-charcoal/70">
                  Share your destination, travel dates, interests, and budget. Our AI needs just a few details to get started.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-sage" />
                </div>
                <div className="inline-block bg-sage text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">
                  AI Creates Your Plan
                </h3>
                <p className="text-charcoal/70">
                  Our intelligent AI analyzes millions of data points to craft a personalized itinerary with activities, hotels, and more.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-charcoal" />
                </div>
                <div className="inline-block bg-charcoal text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">
                  Explore & Customize
                </h3>
                <p className="text-charcoal/70">
                  Review your complete trip plan with budget breakdowns, recommended hotels, and daily itineraries. Adjust as needed!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-charcoal mb-4">
                Why Travelers Choose Tripo-AI
              </h2>
              <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
                We make travel planning effortless and enjoyable
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6 text-terracotta" />
                </div>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                  Personalized Recommendations
                </h3>
                <p className="text-charcoal/70">
                  Every itinerary is tailored to your interests, whether you're into art, food, adventure, or relaxation.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-sage" />
                </div>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                  Smart Budget Management
                </h3>
                <p className="text-charcoal/70">
                  Get detailed budget breakdowns and cost estimates so you know exactly what to expect.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-charcoal" />
                </div>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                  Curated Hotel Options
                </h3>
                <p className="text-charcoal/70">
                  Discover handpicked accommodations that match your style and budget perfectly.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-terracotta" />
                </div>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                  Stress-Free Planning
                </h3>
                <p className="text-charcoal/70">
                  Let AI handle the research and logistics. Focus on the excitement of your upcoming adventure.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-sage" />
                </div>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                  Instant Results
                </h3>
                <p className="text-charcoal/70">
                  Get a complete travel plan in seconds, not hours. No more endless searching and planning.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6 text-charcoal" />
                </div>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                  Travel Anywhere
                </h3>
                <p className="text-charcoal/70">
                  From bustling cities to serene beaches, Tripo-AI plans trips to destinations worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-terracotta/10 to-sage/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-charcoal mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-charcoal/70 mb-8">
              Join thousands of travelers who have discovered their perfect trips with Tripo-AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button variant="primary" className="group">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
