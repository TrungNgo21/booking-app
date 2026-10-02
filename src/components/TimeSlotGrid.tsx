import { motion } from 'framer-motion'

const START_MINUTES = 9 * 60
const END_MINUTES = 21 * 60
const STEP_MINUTES = 30

export const TIME_SLOTS = Array.from(
  { length: (END_MINUTES - START_MINUTES) / STEP_MINUTES + 1 },
  (_, i) => {
    const total = START_MINUTES + i * STEP_MINUTES
    const h = String(Math.floor(total / 60)).padStart(2, '0')
    const m = String(total % 60).padStart(2, '0')
    return `${h}:${m}`
  },
)

interface TimeSlotGridProps {
  selected: string | null
  onSelect: (time: string) => void
  isDisabled?: (time: string) => boolean
}

export function TimeSlotGrid({ selected, onSelect, isDisabled }: TimeSlotGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {TIME_SLOTS.map((time) => {
        const disabled = isDisabled?.(time) ?? false
        const active = selected === time
        return (
          <motion.button
            key={time}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(time)}
            whileHover={disabled ? undefined : { scale: 1.02 }}
            whileTap={disabled ? undefined : { scale: 0.95 }}
            className={[
              'h-11 rounded-xl border text-sm font-medium tabular-nums transition-colors',
              disabled
                ? 'cursor-not-allowed border-slate-100 bg-slate-100 text-slate-300'
                : active
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300',
            ].join(' ')}
          >
            {time}
          </motion.button>
        )
      })}
    </div>
  )
}
