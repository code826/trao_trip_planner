'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, LogOut, User, Plane } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'
import ParticleField from '@/components/ParticleField'

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
    <div className="min-h-screen bg-midnight flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="aurora-bg animate-aurora opacity-20" />
      <ParticleField count={20} />

      {/* Background orbs */}
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] animate-orb" />
      <div className="absolute bottom-1/3 -right-20 w-[300px] h-[300px] bg-cyan/5 rounded-full blur-[120px] animate-orb" style={{ animationDelay: '-7s' }} />

      <div className="max-w-md w-full space-y-8 animate-reveal relative z-10">
        {isAuthenticated ? (
          <div className="glass-card text-center py-12 px-8">
            <div className="w-20 h-20 bg-cyan/10 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-float">
              <User className="w-10 h-10 text-cyan" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Switch Accounts?
            </h2>
            <p className="text-midnight-300 mb-10">
              You are currently logged in as <span className="text-gold font-bold">{user?.email || 'traveler'}</span>. To sign in with a different account, please logout first.
            </p>
            <button
              onClick={handleLogout}
              className="pill-button shimmer-button bg-gradient-to-r from-gold to-gold-deep text-midnight-900 w-full flex items-center justify-center gap-2 font-bold"
            >
              <LogOut className="w-5 h-5" />
              Logout Current Session
            </button>
            <Link href="/dashboard" className="block mt-6 text-midnight-400 hover:text-gold font-semibold uppercase tracking-[0.2em] text-[10px] transition-colors">
              Back to Dashboard
            </Link>
          </div>
        ) : (
          <div className="glass-card p-8 sm:p-12">
            {/* Decorative plane */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl flex items-center justify-center animate-float">
                <Plane className="w-7 h-7 text-gold" />
              </div>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-4xl font-display font-bold text-white mb-3">
                Welcome Back
              </h2>
              <p className="text-midnight-300">
                Sign in to access your travel plans
              </p>
            </div>

            {error && (
              <div className="mb-8 bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <p className="text-rose-300 text-sm">{error}</p>
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
                    className="absolute right-3 top-[38px] text-midnight-400 hover:text-gold transition-colors focus:outline-none"
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
                    className="h-4 w-4 rounded border-midnight-600 bg-midnight-700 text-gold focus:ring-gold/30"
                    disabled={loading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-midnight-400">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="/forgot-password" title="Coming soon" className="font-semibold text-gold hover:text-gold-light transition-colors">
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
                className="py-4 text-base shimmer-button"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>

              <p className="text-center text-midnight-400 mt-8">
                Don't have an account?{' '}
                <Link href="/register" className="font-semibold text-gold hover:text-gold-light transition-colors">
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
