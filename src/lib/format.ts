import { format, parseISO } from 'date-fns'
import type { ProposedDate } from '../store/useBookingStore'

export const formatProposedDate = ({ date, time }: ProposedDate) =>
  `${format(parseISO(date), 'EEE, MMM d')} · ${time}`
