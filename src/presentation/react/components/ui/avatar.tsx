import React from 'react';
import { cn } from '@/lib/utils';

export const Avatar: React.FC<{ src: string; alt?: string; size?: 'sm' | 'md' | 'lg' }> = ({ src, alt = "Avatar", size = 'md' }) => {
  const sizes = { sm: "size-8", md: "size-10", lg: "size-16" };
  return (
    <div
      className={cn(sizes[size], "rounded-full bg-cover bg-center border border-white/10")}
      style={{ backgroundImage: `url('${src}')` }}
      aria-label={alt}
    />
  );
};
