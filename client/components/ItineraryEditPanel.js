'use client'

import { useState } from 'react'
import { Send, Loader2, Sparkles, X } from 'lucide-react'

const QUICK_SUGGESTIONS = [
    'Reduce the budget',
    'Add more activities to Day 1',
    'Make Day 2 more relaxed',
    'Include more food experiences',
    'Add outdoor activities',
    'Extend trip by 1 day',
    'Shorten trip by 1 day',
    'Focus more on local culture',
]

const ItineraryEditPanel = ({ tripId, token, onUpdated }) => {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (request) => {
        const userRequest = (request || input).trim()
        if (!userRequest) return

        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
            const response = await fetch(`${API_URL}/trips/${tripId}/update-itinerary`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userRequest }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update itinerary')
            }

            setSuccess('Itinerary updated successfully!')
            setInput('')
            onUpdated(data)

            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="glass-card overflow-hidden p-0">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-gold/10 to-cyan/5 border-b border-midnight-700/50">
                <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-deep rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-midnight-900" />
                </div>
                <div>
                    <h3 className="font-display font-bold text-white text-lg">Edit your itinerary</h3>
                    <p className="text-midnight-400 text-xs">Type a request or pick a suggestion below</p>
                </div>
            </div>

            <div className="p-6 space-y-5">
                {/* Quick suggestions */}
                <div className="flex flex-wrap gap-2">
                    {QUICK_SUGGESTIONS.map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => !loading && handleSubmit(suggestion)}
                            disabled={loading}
                            className="px-3 py-1.5 rounded-full text-sm border border-gold/20 text-gold hover:bg-gold/10 hover:border-gold/40 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-midnight-700/50" />
                    <span className="text-xs text-midnight-500 font-medium">or write your own</span>
                    <div className="flex-1 h-px bg-midnight-700/50" />
                </div>

                {/* Free-text input */}
                <div className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSubmit()
                                }
                            }}
                            placeholder="e.g. Shorten trip to 3 days, keep the best activities..."
                            rows={2}
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-xl border border-midnight-600 bg-midnight-800/50 text-white placeholder-midnight-500 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold resize-none text-sm disabled:opacity-60 transition-all"
                        />
                    </div>

                    <button
                        onClick={() => handleSubmit()}
                        disabled={loading || !input.trim()}
                        className="h-11 w-11 shrink-0 flex items-center justify-center bg-gradient-to-r from-gold to-gold-deep text-midnight-900 rounded-xl hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Loading message */}
                {loading && (
                    <div className="flex items-center gap-2 text-sm text-midnight-300 animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin text-gold" />
                        <span>AI is updating your itinerary…</span>
                    </div>
                )}

                {/* Success message */}
                {success && (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm text-emerald-400">
                        <span>✓</span>
                        <span>{success}</span>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-sm text-rose-400">
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="shrink-0">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ItineraryEditPanel
