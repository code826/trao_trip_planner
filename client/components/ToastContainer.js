'use client'

import { useEffect } from 'react'
import Toast from './ui/Toast'
import { useToastStore } from '@/store/toastStore'

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  useEffect(() => {
    createToastContainer()
  }, [])

  const createToastContainer = () => {
    if (typeof document === 'undefined') return

    let container = document.getElementById('toast-container')
    if (!container) {
      container = document.createElement('div')
      container.id = 'toast-container'
      container.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none'
      document.body.appendChild(container)
    }
  }

  if (toasts.length === 0) return null

  return (
    <div id="toast-container" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  )
}
