'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, LogOut, Globe } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'
import ParticleField from '@/components/ParticleField'

export default function RegisterPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { isAuthenticated, user, logout } = useAuthStore()
  const login = useAuthStore((state) => state.login)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long'
    }
    return ''
  }

  const handleLogout = () => {
    logout()
    router.push('/register')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const passwordError = validatePassword(formData.password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      login(data.token, data.user)
      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  if (success) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center py-12 px-4">
        <div className="aurora-bg animate-aurora opacity-20" />
        <div className="max-w-md w-full text-center animate-scale-in relative z-10 glass-card p-12">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Voyage Initiated!
          </h2>
          <p className="text-midnight-300 mb-6">
            Your account is ready. Redirecting to your dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="aurora-bg animate-aurora opacity-20" />
      <ParticleField count={20} />

      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] animate-orb" />
      <div className="absolute bottom-1/3 -right-20 w-[300px] h-[300px] bg-cyan/5 rounded-full blur-[120px] animate-orb" style={{ animationDelay: '-7s' }} />

      <div className="max-w-md w-full space-y-8 animate-reveal relative z-10">
        {isAuthenticated ? (
          <div className="glass-card text-center py-12 px-8">
            <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-float">
              <User className="w-10 h-10 text-gold" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Logout to Re-register
            </h2>
            <p className="text-midnight-300 mb-10">
              You are currently logged in as <span className="text-gold font-bold">{user?.email || 'traveler'}</span>. To create a new account, please logout first.
            </p>
            <button
              onClick={handleLogout}
              className="pill-button shimmer-button bg-gradient-to-r from-gold to-gold-deep text-midnight-900 w-full flex items-center justify-center gap-2 font-bold"
            >
              <LogOut className="w-5 h-5" />
              Logout Current Session
            </button>
            <Link href="/dashboard" className="block mt-6 text-midnight-400 hover:text-gold font-semibold uppercase tracking-[0.2em] text-[10px] transition-colors">
              Return to Archive
            </Link>
          </div>
        ) : (
          <div className="glass-card p-8 sm:p-12">
            {/* Decorative globe */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan/20 to-cyan/5 rounded-2xl flex items-center justify-center animate-float">
                <Globe className="w-7 h-7 text-cyan" />
              </div>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-4xl font-display font-bold text-white mb-3">
                Join the Voyage
              </h2>
              <p className="text-midnight-300">
                Start planning your perfect journey today
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
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  icon={<User className="w-5 h-5" />}
                  required
                  disabled={loading}
                />

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
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    icon={<Lock className="w-5 h-5" />}
                    required
                    disabled={loading}
                    hint="Minimum 8 characters"
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

                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    icon={<Lock className="w-5 h-5" />}
                    required
                    disabled={loading}
                    error={
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? 'Passwords do not match'
                        : ''
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[38px] text-midnight-400 hover:text-gold transition-colors focus:outline-none"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading || (formData.password !== formData.confirmPassword && formData.confirmPassword)}
                className="py-4 text-base shimmer-button"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>

              <p className="text-center text-midnight-400 mt-8">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-gold hover:text-gold-light transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
