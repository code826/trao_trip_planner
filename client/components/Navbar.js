'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, Compass, User, LogOut, Home, MapPin } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-terracotta rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold text-charcoal">
              Trao
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-charcoal hover:text-terracotta transition-colors font-medium link-hover"
                >
                  Dashboard
                </Link>
                <Link
                  href="/trips/new"
                  className="text-charcoal hover:text-terracotta transition-colors font-medium link-hover"
                >
                  Plan Trip
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-charcoal" />
                  </div>
                  <span className="text-charcoal font-medium">{user?.name || 'Traveler'}</span>
                  <button
                    onClick={handleLogout}
                    className="text-charcoal/60 hover:text-terracotta transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-charcoal hover:text-terracotta transition-colors font-medium link-hover"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-terracotta text-white px-6 py-2.5 rounded-full font-semibold hover:bg-terracottaDark transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-charcoal hover:text-terracotta transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-charcoal hover:text-terracotta transition-colors py-2"
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  href="/trips/new"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-charcoal hover:text-terracotta transition-colors py-2"
                >
                  <MapPin className="w-5 h-5" />
                  Plan New Trip
                </Link>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-charcoal" />
                    </div>
                    <div>
                      <p className="text-charcoal font-medium">{user?.name || 'Traveler'}</p>
                      <p className="text-charcoal/60 text-sm">{user?.email || ''}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="flex items-center gap-3 text-charcoal hover:text-terracotta transition-colors py-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-charcoal hover:text-terracotta transition-colors py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block bg-terracotta text-white px-6 py-3 rounded-full font-semibold hover:bg-terracottaDark transition-colors text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
