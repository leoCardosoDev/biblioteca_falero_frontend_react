import React from 'react';

export const Icon: React.FC<{ name: string; className?: string; fill?: boolean }> = ({ name, className = "", fill = false }) => (
  <span className={`material-symbols-outlined ${fill ? 'icon-fill' : ''} ${className} select-none`}>
    {name}
  </span>
);
