import type { ReactNode } from 'react'

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[393px] mx-auto min-h-screen shadow-2xl relative overflow-x-clip bg-slate-50 flex flex-col">
      {children}
    </div>
  )
}
