// Toast notification utility
// Uses Zustand store for React-compatible toast management

import { useToastStore } from '@/store/toastStore'

export function toast({ message, type = 'info', duration = 3000 }) {
  if (typeof window === 'undefined') return

  // Get the store outside React component
  const { addToast } = useToastStore.getState()
  addToast({ message, type, duration })
}

export const success = (message, duration) => toast({ message, type: 'success', duration })
export const error = (message, duration) => toast({ message, type: 'error', duration })
export const info = (message, duration) => toast({ message, type: 'info', duration })
export const warning = (message, duration) => toast({ message, type: 'warning', duration })
