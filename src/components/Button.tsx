import { motion, type HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary'
type Size = 'md' | 'sm'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-300',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 disabled:opacity-50',
}

const sizes: Record<Size, string> = {
  md: 'h-14 rounded-2xl px-6 text-base',
  sm: 'h-12 rounded-xl px-4 text-sm',
}

const shadows: Record<Size, string> = {
  md: 'shadow-lg shadow-indigo-600/25 disabled:shadow-none',
  sm: '',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading
  return (
    <motion.button
      whileTap={isDisabled ? undefined : { scale: 0.95 }}
      disabled={isDisabled}
      className={`inline-flex shrink-0 items-center justify-center gap-2 font-semibold transition-colors disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]} ${variant === 'primary' ? shadows[size] : ''} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="h-5 w-5 animate-spin" />}
      {children as ReactNode}
    </motion.button>
  )
}
