import { useState } from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  selected: Date | null
  onSelect: (date: Date) => void
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export function Calendar({ selected, onSelect }: CalendarProps) {
  const today = startOfDay(new Date())
  const [month, setMonth] = useState(() => startOfMonth(selected ?? today))
  const canGoBack = isBefore(startOfMonth(today), month)

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  })

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, -1))}
          disabled={!canGoBack}
          aria-label="Previous month"
          className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-slate-900">{format(month, 'MMMM yyyy')}</span>
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          aria-label="Next month"
          className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((day) => {
          const outside = !isSameMonth(day, month)
          const past = isBefore(day, today)
          const isSelected = selected !== null && isSameDay(day, selected)
          const disabled = past || outside

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(day)}
              className={[
                'aspect-square rounded-xl text-sm font-medium transition-colors',
                outside && 'invisible',
                past && !outside && 'text-slate-300 line-through decoration-slate-200',
                !disabled && !isSelected && 'text-slate-700 hover:bg-indigo-50',
                isSelected && 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30',
                isToday(day) && !isSelected && 'ring-1 ring-inset ring-indigo-300',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}
