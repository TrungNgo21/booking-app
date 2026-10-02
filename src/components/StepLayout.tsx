import type { ReactNode } from 'react'

interface StepLayoutProps {
  title: string
  subtitle?: string
  top?: ReactNode
  children: ReactNode
  footer: ReactNode
}

export function StepLayout({ title, subtitle, top, children, footer }: StepLayoutProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 px-6 pb-6 pt-6">
        {top && <div className="mb-6">{top}</div>}
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-2 text-base text-slate-500">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </div>
      <div className="sticky bottom-0 flex gap-3 border-t border-slate-200/70 bg-slate-50/90 px-6 pb-8 pt-4 backdrop-blur">
        {footer}
      </div>
    </div>
  )
}
