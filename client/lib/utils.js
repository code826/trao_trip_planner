// Utility functions for formatting

export function formatDate(dateString, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return new Date(dateString).toLocaleDateString('en-US', {
    ...defaultOptions,
    ...options,
  })
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num)
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncate(str, length = 100) {
  if (str.length <= length) return str
  return str.slice(0, length).trim() + '...'
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
