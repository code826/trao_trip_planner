import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEFAULT_RATES = {
    USD: 1,
    INR: 83,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149,
}

export const useCurrencyStore = create(
    persist(
        (set, get) => ({
            rates: DEFAULT_RATES,
            lastUpdated: null,
            isLoading: false,
            error: null,

            fetchRates: async () => {
                // Only fetch once every 24 hours
                const now = Date.now()
                const lastUpdated = get().lastUpdated
                if (lastUpdated && now - lastUpdated < 24 * 60 * 60 * 1000) {
                    return
                }

                set({ isLoading: true, error: null })
                try {
                    const response = await fetch('https://api.frankfurter.dev/v1/latest?base=USD')
                    if (!response.ok) throw new Error('Failed to fetch rates')

                    const data = await response.json()
                    const newRates = {
                        USD: 1,
                        ...data.rates
                    }

                    set({
                        rates: newRates,
                        lastUpdated: now,
                        isLoading: false
                    })
                } catch (err) {
                    console.error('Currency API Error:', err)
                    set({
                        error: 'Failed to update rates. Using cached/default values.',
                        isLoading: false
                    })
                }
            },

            convert: (amount, targetCurrency) => {
                const rates = get().rates
                const rate = rates[targetCurrency] || DEFAULT_RATES[targetCurrency] || 1
                return Math.round(amount * rate)
            }
        }),
        {
            name: 'currency-storage',
        }
    )
)
