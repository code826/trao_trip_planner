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

  const getDisplayName = () => {
    if (user?.name) return user.name
    if (user?.email) {
      return user.email.split('@')[0]
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    }
    return 'Traveler'
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-midnight-800/90 backdrop-blur-xl border-b border-midnight-700/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-deep rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Compass className="w-5 h-5 text-midnight-900" />
            </div>
            <span className="text-xl font-display font-bold text-white">
              Tripo<span className="text-gold">-AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-midnight-200 hover:text-gold transition-colors font-medium text-sm link-hover">
              Home
            </Link>
            <Link href="/about" className="text-midnight-200 hover:text-gold transition-colors font-medium text-sm link-hover">
              About
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-midnight-200 hover:text-gold transition-colors font-medium text-sm link-hover">
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 ml-2">
                  <div className="w-9 h-9 bg-midnight-700 rounded-full flex items-center justify-center border border-midnight-600">
                    <User className="w-4 h-4 text-midnight-300" />
                  </div>
                  <span className="text-midnight-200 font-medium text-sm">{getDisplayName()}</span>
                  <button
                    onClick={handleLogout}
                    className="text-midnight-400 hover:text-gold transition-colors ml-1"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-midnight-200 hover:text-gold transition-colors font-medium text-sm link-hover">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-gold to-gold-deep text-midnight-900 px-5 py-2 rounded-full font-semibold text-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-midnight-200 hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-midnight-800/95 backdrop-blur-xl border-t border-midnight-700/50 animate-slide-down">
          <div className="container mx-auto px-6 py-6 space-y-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="block text-midnight-200 hover:text-gold transition-colors py-2 font-medium">
              Home
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block text-midnight-200 hover:text-gold transition-colors py-2 font-medium">
              About
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-midnight-200 hover:text-gold transition-colors py-2 font-medium"
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </Link>
                <div className="border-t border-midnight-700 pt-4 mt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-midnight-700 rounded-full flex items-center justify-center border border-midnight-600">
                      <User className="w-5 h-5 text-midnight-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{getDisplayName()}</p>
                      <p className="text-midnight-400 text-sm">{user?.email || ''}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false) }}
                    className="flex items-center gap-3 text-midnight-200 hover:text-gold transition-colors py-2 font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="block text-midnight-200 hover:text-gold transition-colors py-2 font-medium">
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block bg-gradient-to-r from-gold to-gold-deep text-midnight-900 px-6 py-3 rounded-full font-semibold text-center hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all"
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
