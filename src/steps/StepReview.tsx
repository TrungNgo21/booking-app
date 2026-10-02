import { useState, type ReactNode } from 'react'
import { AlertCircle, ArrowLeft, CalendarDays, Sparkles, User } from 'lucide-react'
import { Button } from '../components/Button'
import { StepLayout } from '../components/StepLayout'
import { formatProposedDate } from '../lib/format'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { useBookingStore } from '../store/useBookingStore'

function Section({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  )
}

export function StepReview() {
  const name = useBookingStore((s) => s.name)
  const dates = useBookingStore((s) => s.dates)
  const activities = useBookingStore((s) => s.activities)
  const setStep = useBookingStore((s) => s.setStep)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    setError(null)
    if (!supabase) {
      setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.')
      return
    }
    setSubmitting(true)
    const { error: insertError } = await supabase.from('appointments').insert({
      guest_name: name.trim(),
      proposed_dates: dates,
      activities,
    })
    setSubmitting(false)
    if (insertError) {
      setError(insertError.message || 'Something went wrong. Please try again.')
      return
    }
    setStep(5, 1)
  }

  return (
    <StepLayout
      title="Does this look right?"
      subtitle="Review your details before confirming."
      footer={
        <>
          <Button
            variant="secondary"
            onClick={() => setStep(3, -1)}
            disabled={submitting}
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button onClick={handleConfirm} loading={submitting} className="flex-1">
            {submitting ? 'Confirming...' : 'Confirm Appointment'}
          </Button>
        </>
      }
    >
      <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <Section icon={<User className="h-5 w-5" />} label="Name">
          <p className="truncate text-lg font-semibold text-slate-900">{name}</p>
        </Section>

        <Section icon={<CalendarDays className="h-5 w-5" />} label="Proposed times">
          <ul className="space-y-1.5">
            {dates.map((d) => (
              <li key={`${d.date}-${d.time}`} className="font-medium text-slate-900">
                {formatProposedDate(d)}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={<Sparkles className="h-5 w-5" />} label="Activities">
          <div className="flex flex-wrap gap-2">
            {activities.map((a) => (
              <span
                key={a}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
              >
                {a}
              </span>
            ))}
          </div>
        </Section>
      </div>

      {!isSupabaseConfigured && !error && (
        <p className="mt-4 text-center text-xs text-slate-400">
          Supabase environment variables are missing; submission will fail.
        </p>
      )}

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </StepLayout>
  )
}
