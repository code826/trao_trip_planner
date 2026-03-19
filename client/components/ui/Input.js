import { Eye, EyeOff, AlertCircle } from 'lucide-react'

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  icon,
  required = false,
  disabled = false,
  error = '',
  hint = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-semibold text-charcoal flex items-center gap-1"
        >
          {label}
          {required && <span className="text-terracotta">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40">
          {icon}
        </div>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white text-charcoal placeholder:charcoal/40
            ${error
              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
              : 'border-gray-200 focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 hover:border-gray-300'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          {...props}
        />
        {error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}

      {hint && !error && (
        <p className="text-sm text-charcoal/60">{hint}</p>
      )}
    </div>
  )
}

export default Input
