'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, LogOut, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { isAuthenticated, user, logout } = useAuthStore()
  const login = useAuthStore((state) => state.login)

  // Prevent hydration issues and handle already logged-in users
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Invalid email or password')
      }

      // Store the real token from API
      login(data.token, data.user)
      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-grid">
      <div className="aurora-bg animate-aurora opacity-50"></div>

      <div className="max-w-md w-full space-y-8 animate-reveal relative z-10">
        {/* Already Logged In Check */}
        {isAuthenticated ? (
          <div className="glass-card text-center py-12 px-8">
            <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-orb">
              <User className="w-10 h-10 text-sage" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
              Switch Accounts?
            </h2>
            <p className="text-charcoal/50 mb-10 font-medium">
              You are currently logged in as <span className="text-terracotta font-bold">{user?.email || 'traveler'}</span>. To sign in with a different account, please logout first.
            </p>
            <button
              onClick={handleLogout}
              className="pill-button bg-charcoal text-white w-full flex items-center justify-center gap-2 hover:bg-terracotta"
            >
              <LogOut className="w-5 h-5" />
              Logout Current Session
            </button>
            <Link href="/dashboard" className="block mt-6 text-charcoal/40 hover:text-charcoal font-bold uppercase tracking-[0.2em] text-[10px]">
              Back to Dashboard
            </Link>
          </div>
        ) : (
          <div className="glass-card p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-5xl font-serif font-bold text-charcoal mb-4">
                Welcome Back
              </h2>
              <p className="text-charcoal/50 font-medium">
                Sign in to access your travel plans
              </p>
            </div>

            {error && (
              <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  icon={<Mail className="w-5 h-5" />}
                  required
                  disabled={loading}
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    icon={<Lock className="w-5 h-5" />}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-charcoal/40 hover:text-charcoal transition-colors focus:outline-none"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-terracotta focus:ring-terracotta border-gray-300 rounded"
                    disabled={loading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-charcoal/60">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" title="Coming soon" className="font-semibold text-terracotta hover:text-terracottaDark transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
                className="py-4 text-lg"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>

              <p className="text-center text-charcoal/60 mt-8">
                Don't have an account?{' '}
                <Link href="/register" className="font-semibold text-terracotta hover:text-terracottaDark transition-colors link-hover">
                  Create one now
                </Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
