import React from 'react'
import { cn } from '@/lib/utils'

export function Card({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/5 bg-card-dark shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
