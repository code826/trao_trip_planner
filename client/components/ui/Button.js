import { Loader2 } from 'lucide-react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary: 'bg-terracotta text-white hover:bg-terracottaDark hover:shadow-lg focus:ring-terracotta/50',
    secondary: 'bg-sage text-white hover:bg-sageDark hover:shadow-lg focus:ring-sage/50',
    outline: 'bg-transparent border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white focus:ring-terracotta/50',
    ghost: 'bg-transparent text-charcoal hover:bg-cream hover:text-charcoal focus:ring-cream',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  )
}

export default Button
