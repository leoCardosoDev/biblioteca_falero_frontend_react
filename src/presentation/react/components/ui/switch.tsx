import React from 'react'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
}
export function Switch({ checked, onChange, label, description }: SwitchProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex flex-col">
        {label && (
          <span className="text-sm font-medium text-white">{label}</span>
        )}
        {description && (
          <span className="text-xs text-slate-400">{description}</span>
        )}
      </div>
      <label className="relative flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`h-6 w-11 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-slate-700'}`}
        ></div>
        <div
          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        ></div>
      </label>
    </div>
  )
}
