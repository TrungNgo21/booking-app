import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ProposedDate {
  date: string
  time: string
}

interface BookingState {
  step: number
  direction: 1 | -1
  name: string
  dates: ProposedDate[]
  activities: string[]
  setStep: (step: number, direction?: 1 | -1) => void
  setName: (name: string) => void
  addDate: (entry: ProposedDate) => void
  removeDate: (entry: ProposedDate) => void
  toggleActivity: (activity: string) => void
  addCustomActivity: (activity: string) => void
  resetStore: (step?: number) => void
}

const initialState = {
  step: 1,
  direction: 1 as const,
  name: '',
  dates: [] as ProposedDate[],
  activities: [] as string[],
}

const sameDate = (a: ProposedDate, b: ProposedDate) => a.date === b.date && a.time === b.time

const compareDates = (a: ProposedDate, b: ProposedDate) =>
  `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step, direction = 1) => set({ step, direction }),
      setName: (name) => set({ name }),
      addDate: (entry) =>
        set((state) =>
          state.dates.some((d) => sameDate(d, entry))
            ? state
            : { dates: [...state.dates, entry].sort(compareDates) },
        ),
      removeDate: (entry) =>
        set((state) => ({ dates: state.dates.filter((d) => !sameDate(d, entry)) })),
      toggleActivity: (activity) =>
        set((state) => ({
          activities: state.activities.includes(activity)
            ? state.activities.filter((a) => a !== activity)
            : [...state.activities, activity],
        })),
      addCustomActivity: (activity) =>
        set((state) => {
          const trimmed = activity.trim()
          const exists = state.activities.some((a) => a.toLowerCase() === trimmed.toLowerCase())
          if (!trimmed || exists) return state
          return { activities: [...state.activities, trimmed] }
        }),
      resetStore: (step = initialState.step) => set({ ...initialState, step }),
    }),
    {
      name: 'booking-cache',
      partialize: ({ step, direction, name, dates, activities }) => ({
        step: step > 4 ? 1 : step,
        direction,
        name,
        dates,
        activities,
      }),
    },
  ),
)
