import { Loader2 } from 'lucide-react'

const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2 className={`${sizes[size]} text-terracotta animate-spin`} />
      {text && <p className="text-charcoal/60">{text}</p>}
    </div>
  )
}

export default Loader
