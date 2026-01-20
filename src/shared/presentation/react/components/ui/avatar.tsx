import React from 'react'
import { cn } from '@/lib/utils'

export function Avatar({
  src,
  alt = 'Avatar',
  size = 'md'
}: {
  src: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizes = { sm: 'size-8', md: 'size-10', lg: 'size-16' }
  return (
    <div
      className={cn(
        sizes[size],
        'rounded-full border border-white/10 bg-cover bg-center'
      )}
      style={{ backgroundImage: `url('${src}')` }}
      aria-label={alt}
    />
  )
}
