import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { Button } from '../components/Button'
import thankYouImage from '../assets/thank-you.jpg'
import { useBookingStore } from '../store/useBookingStore'

export function StepThankYou() {
  const resetStore = useBookingStore((s) => s.resetStore)
  const setStep = useBookingStore((s) => s.setStep)
  const [guestName] = useState(() => useBookingStore.getState().name.trim())

  useEffect(() => {
    resetStore(5)
  }, [resetStore])

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-12">
      <div className="flex flex-1 flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 shadow-xl shadow-indigo-600/30"
        >
          <svg viewBox="0 0 52 52" className="h-12 w-12" fill="none">
            <motion.path
              d="M14 27 L23 36 L39 18"
              stroke="white"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Thank you!</h1>
          <p className="mt-2 text-lg text-slate-500">
            Your appointment is confirmed{guestName ? `, ${guestName}` : ''}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 w-full"
        >
          <img
            src={thankYouImage}
            alt="Thumbs up selfie"
            className="h-[420px] w-full rounded-xl object-cover object-[center_60%] shadow-sm"
          />
        </motion.div>
      </div>

      <Button onClick={() => setStep(1, -1)} className="mt-8 w-full">
        <RotateCcw className="h-5 w-5" /> Book Another
      </Button>
    </div>
  )
}
