import type { ComponentType } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { PhoneShell } from './components/PhoneShell'
import { StepIndicator } from './components/StepIndicator'
import { useBookingStore } from './store/useBookingStore'
import { StepIdentity } from './steps/StepIdentity'
import { StepDates } from './steps/StepDates'
import { StepActivities } from './steps/StepActivities'
import { StepReview } from './steps/StepReview'
import { StepThankYou } from './steps/StepThankYou'

const slide: Variants = {
  enter: (d: number) => ({ x: 100 * d, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: -100 * d, opacity: 0 }),
}

const steps: Record<number, ComponentType> = {
  1: StepIdentity,
  2: StepDates,
  3: StepActivities,
  4: StepReview,
  5: StepThankYou,
}

export default function App() {
  const step = useBookingStore((s) => s.step)
  const direction = useBookingStore((s) => s.direction)
  const Current = steps[step] ?? StepIdentity

  return (
    <PhoneShell>
      {step <= 4 && (
        <div className="px-6 pt-8">
          <StepIndicator step={step} />
        </div>
      )}
      <main className="relative flex flex-1 flex-col">
        <AnimatePresence
          mode="wait"
          custom={direction}
          initial={false}
          onExitComplete={() => window.scrollTo({ top: 0 })}
        >
          <motion.div
            key={step}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-1 flex-col"
          >
            <Current />
          </motion.div>
        </AnimatePresence>
      </main>
    </PhoneShell>
  )
}
