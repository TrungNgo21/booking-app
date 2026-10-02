import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { format, isToday } from 'date-fns'
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react'
import { Button } from '../components/Button'
import { Calendar } from '../components/Calendar'
import { StepLayout } from '../components/StepLayout'
import { TIME_SLOTS, TimeSlotGrid } from '../components/TimeSlotGrid'
import { formatProposedDate } from '../lib/format'
import { useBookingStore } from '../store/useBookingStore'

export function StepDates() {
  const dates = useBookingStore((s) => s.dates)
  const addDate = useBookingStore((s) => s.addDate)
  const removeDate = useBookingStore((s) => s.removeDate)
  const setStep = useBookingStore((s) => s.setStep)

  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const isPastSlot = (time: string) => {
    if (!selectedDay || !isToday(selectedDay)) return false
    return time <= format(new Date(), 'HH:mm')
  }

  const dayKey = selectedDay ? format(selectedDay, 'yyyy-MM-dd') : null
  const alreadyAdded =
    dayKey !== null && dates.some((d) => d.date === dayKey && d.time === selectedTime)
  const canAdd = dayKey !== null && selectedTime !== null && !alreadyAdded

  const handleSelectDay = (day: Date) => {
    setSelectedDay(day)
    if (selectedTime && isToday(day) && selectedTime <= format(new Date(), 'HH:mm')) {
      setSelectedTime(null)
    }
  }

  const handleAdd = () => {
    if (!canAdd || dayKey === null || selectedTime === null) return
    addDate({ date: dayKey, time: selectedTime })
    setSelectedTime(null)
  }

  return (
    <StepLayout
      title="When are you free?"
      subtitle="Pick a date and time. You can propose several options."
      footer={
        <>
          <Button variant="secondary" onClick={() => setStep(1, -1)} aria-label="Back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button onClick={() => setStep(3, 1)} disabled={dates.length === 0} className="flex-1">
            Next <ArrowRight className="h-5 w-5" />
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <Calendar selected={selectedDay} onSelect={handleSelectDay} />

        <AnimatePresence initial={false}>
          {selectedDay && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <h2 className="mb-3 text-sm font-semibold text-slate-500">
                Times on {format(selectedDay, 'EEEE, MMM d')}
              </h2>
              {TIME_SLOTS.every(isPastSlot) && (
                <p className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-700">
                  No more times available today. Try another date.
                </p>
              )}
              <TimeSlotGrid
                selected={selectedTime}
                onSelect={setSelectedTime}
                isDisabled={isPastSlot}
              />
            </motion.section>
          )}
        </AnimatePresence>

        <Button variant="secondary" onClick={handleAdd} disabled={!canAdd} className="w-full">
          <Plus className="h-5 w-5" />
          {alreadyAdded ? 'Already added' : 'Add Date'}
        </Button>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-500">
            Proposed times {dates.length > 0 && `(${dates.length})`}
          </h2>
          {dates.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 px-4 py-5 text-center text-sm text-slate-400">
              No times added yet.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              <AnimatePresence initial={false}>
                {dates.map((d) => (
                  <motion.li
                    key={`${d.date}-${d.time}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 py-1.5 pl-3 pr-1.5 text-sm font-medium text-indigo-700 transition-colors"
                  >
                    {formatProposedDate(d)}
                    <button
                      type="button"
                      onClick={() => removeDate(d)}
                      aria-label={`Remove ${formatProposedDate(d)}`}
                      className="rounded-full p-1 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-indigo-700"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </section>
      </div>
    </StepLayout>
  )
}
