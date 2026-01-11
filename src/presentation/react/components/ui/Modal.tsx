import React, { useEffect } from 'react'
import { Icon } from './icon'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
  maxWidth?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl'
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div
        className={`relative w-full ${maxWidth} animate-in fade-in zoom-in-95 flex max-h-[90vh] flex-col rounded-xl border border-[#324d67] bg-[#111a22] shadow-2xl duration-200`}
      >
        <div className="flex shrink-0 items-start justify-between rounded-t-xl border-b border-[#324d67] bg-[#151f2b]/50 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-[#92adc9]">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#92adc9] transition-colors hover:bg-[#324d67]/50 hover:text-white"
          >
            <Icon name="close" className="text-2xl" />
          </button>
        </div>
        <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
