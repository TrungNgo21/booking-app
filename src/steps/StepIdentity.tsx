import type { FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '../components/Button'
import { StepLayout } from '../components/StepLayout'
import { useBookingStore } from '../store/useBookingStore'

export function StepIdentity() {
  const name = useBookingStore((s) => s.name)
  const setName = useBookingStore((s) => s.setName)
  const setStep = useBookingStore((s) => s.setStep)
  const canContinue = name.trim().length > 0

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (canContinue) setStep(2, 1)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
      <StepLayout
        title="Let's get started. What's your name?"
        subtitle="We'll use this to confirm your appointment."
        footer={
          <Button type="submit" disabled={!canContinue} className="flex-1">
            Next <ArrowRight className="h-5 w-5" />
          </Button>
        }
      >
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-1 pb-3 text-2xl font-medium text-slate-900 placeholder:text-slate-300 transition-colors focus:border-indigo-600 focus:outline-none"
        />
      </StepLayout>
    </form>
  )
}
