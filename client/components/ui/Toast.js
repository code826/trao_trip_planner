'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  }

  const colors = {
    success: 'bg-emerald-500/90 border-emerald-400/30',
    error: 'bg-rose-500/90 border-rose-400/30',
    info: 'bg-cyan/90 border-cyan-light/30',
    warning: 'bg-gold/90 border-gold-light/30',
  }

  if (!isVisible) return null

  return (
    <div
      className={`${colors[type]} backdrop-blur-xl border text-white px-6 py-4 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] max-w-sm flex items-start gap-3 transition-all duration-300 animate-slide-down`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {icons[type]}
      </div>
      <div className="flex-grow">
        <p className="font-medium text-sm">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="flex-shrink-0 hover:opacity-80 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default Toast
