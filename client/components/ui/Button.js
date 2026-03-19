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
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-midnight disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]'

  const variantStyles = {
    primary: 'bg-gradient-to-r from-gold to-gold-deep text-midnight-900 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:scale-[1.02] focus:ring-gold/40',
    secondary: 'bg-gradient-to-r from-cyan to-cyan-light text-midnight-900 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:scale-[1.02] focus:ring-cyan/40',
    outline: 'bg-transparent border-2 border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 focus:ring-gold/30',
    ghost: 'bg-transparent text-midnight-200 hover:bg-midnight-700/50 hover:text-white focus:ring-midnight-600',
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
