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

            // Clear success message after 3s
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-charcoal/10 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-terracotta/10 to-sage/10 border-b border-charcoal/10">
                <div className="w-8 h-8 bg-terracotta rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h3 className="font-serif font-bold text-charcoal text-lg">Edit your itinerary</h3>
                    <p className="text-charcoal/50 text-xs">Type a request or pick a suggestion below</p>
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
                            className="px-3 py-1.5 rounded-full text-sm border border-terracotta/30 text-terracotta hover:bg-terracotta hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-charcoal/10" />
                    <span className="text-xs text-charcoal/40 font-medium">or write your own</span>
                    <div className="flex-1 h-px bg-charcoal/10" />
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
                            className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta text-charcoal placeholder-charcoal/30 resize-none text-sm bg-cream/50 disabled:opacity-60"
                        />
                    </div>

                    <button
                        onClick={() => handleSubmit()}
                        disabled={loading || !input.trim()}
                        className="h-11 w-11 shrink-0 flex items-center justify-center bg-terracotta text-white rounded-xl hover:bg-terracottaDark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                    <div className="flex items-center gap-2 text-sm text-charcoal/60 animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin text-terracotta" />
                        <span>AI is updating your itinerary…</span>
                    </div>
                )}

                {/* Success message */}
                {success && (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
                        <span>✓</span>
                        <span>{success}</span>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
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
