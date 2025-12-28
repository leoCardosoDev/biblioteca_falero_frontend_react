import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-card-dark rounded-xl border border-white/5 shadow-sm ${className}`}>
    {children}
  </div>
);
