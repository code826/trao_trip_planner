import { AlertCircle } from 'lucide-react'

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
          className="text-sm font-semibold text-midnight-200 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-gold">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight-400">
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
          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 bg-midnight-800/50 text-white placeholder:text-midnight-500
            ${error
              ? 'border-rose-500/40 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15'
              : 'border-midnight-600 focus:border-gold focus:ring-2 focus:ring-gold/15 hover:border-midnight-500'
            }
            disabled:opacity-40 disabled:cursor-not-allowed
          `}
          {...props}
        />
        {error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-rose-400" />
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-rose-400 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}

      {hint && !error && (
        <p className="text-sm text-midnight-400">{hint}</p>
      )}
    </div>
  )
}

export default Input
