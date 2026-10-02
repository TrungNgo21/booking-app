import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Plus } from 'lucide-react'
import { Button } from '../components/Button'
import activitiesImage from '../assets/activities.jpg'
import { StepLayout } from '../components/StepLayout'
import { useBookingStore } from '../store/useBookingStore'

const PRESET_ACTIVITIES = [
  { label: 'Movies', emoji: '🎬' },
  { label: 'Cafe', emoji: '☕️' },
  { label: 'Lunch', emoji: '🍱' },
  { label: 'Dinner', emoji: '🍝' },
  { label: 'Walk', emoji: '🚶' },
  { label: 'Shopping', emoji: '🛍️' },
  { label: 'Games', emoji: '🎮' },
  { label: 'Karaoke', emoji: '🎤' },
]

const presetLabels = new Set(PRESET_ACTIVITIES.map((a) => a.label.toLowerCase()))

export function StepActivities() {
  const activities = useBookingStore((s) => s.activities)
  const toggleActivity = useBookingStore((s) => s.toggleActivity)
  const addCustomActivity = useBookingStore((s) => s.addCustomActivity)
  const setStep = useBookingStore((s) => s.setStep)
  const [custom, setCustom] = useState('')

  const customActivities = activities.filter((a) => !presetLabels.has(a.toLowerCase()))
  const cards = [
    ...PRESET_ACTIVITIES,
    ...customActivities.map((label) => ({ label, emoji: '✨' })),
  ]

  const handleAddCustom = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = custom.trim()
    if (!trimmed) return
    const preset = PRESET_ACTIVITIES.find((a) => a.label.toLowerCase() === trimmed.toLowerCase())
    if (preset) {
      if (!activities.includes(preset.label)) toggleActivity(preset.label)
    } else {
      addCustomActivity(trimmed)
    }
    setCustom('')
  }

  return (
    <StepLayout
      title="What should we do?"
      subtitle="Pick as many as you like."
      top={
        <img
          src={activitiesImage}
          alt="Friend holding a Highlands Coffee drink"
          className="h-56 w-full rounded-xl object-cover object-[center_12%] shadow-sm"
        />
      }
      footer={
        <>
          <Button variant="secondary" onClick={() => setStep(2, -1)} aria-label="Back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => setStep(4, 1)}
            disabled={activities.length === 0}
            className="flex-1"
          >
            Next <ArrowRight className="h-5 w-5" />
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3">
        {cards.map(({ label, emoji }) => {
          const active = activities.includes(label)
          return (
            <motion.button
              key={label}
              type="button"
              role="checkbox"
              aria-checked={active}
              layout
              onClick={() => toggleActivity(label)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={[
                'relative flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition-colors',
                active
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300',
              ].join(' ')}
            >
              <span className="text-3xl leading-none">{emoji}</span>
              <span className="w-full truncate font-semibold">{label}</span>
              <span
                className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
                  active ? 'bg-indigo-600 text-white' : 'border border-slate-300'
                }`}
              >
                {active && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
            </motion.button>
          )
        })}
      </div>

      <form onSubmit={handleAddCustom} className="mt-6 flex gap-2">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Something else?"
          maxLength={40}
          className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:outline-none"
        />
        <Button type="submit" size="sm" disabled={!custom.trim()}>
          <Plus className="h-4 w-4" /> Add
        </Button>
      </form>
    </StepLayout>
  )
}
