export function ImagePlaceholder({ className = 'h-48' }: { className?: string }) {
  return (
    <div
      className={`w-full ${className} bg-slate-200 animate-pulse rounded-xl flex items-center justify-center text-slate-400`}
    >
      Image Placeholder
    </div>
  )
}
