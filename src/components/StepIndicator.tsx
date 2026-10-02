import { motion } from 'framer-motion'

const TOTAL = 4

export function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 gap-1.5">
        {Array.from({ length: TOTAL }, (_, i) => (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="h-full rounded-full bg-indigo-600"
              initial={false}
              animate={{ width: i < step ? '100%' : '0%' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
        ))}
      </div>
      <span className="text-xs font-medium tabular-nums text-slate-500">
        {step}/{TOTAL}
      </span>
    </div>
  )
}
