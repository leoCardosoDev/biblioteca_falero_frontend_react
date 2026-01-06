import React from 'react'
import { Modal } from './Modal'
import { Icon } from './icon'
import { Button } from './button'

interface StatusModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'success' | 'error'
  title: string
  description: string
  buttonLabel?: string
}

export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  description,
  buttonLabel = 'Entendi'
}) => {
  const isSuccess = type === 'success'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="max-w-md">
      <div className="flex flex-col items-center py-4 text-center">
        <div
          className={`mb-6 flex size-20 items-center justify-center rounded-full ${
            isSuccess
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-red-500/10 text-red-500'
          }`}
        >
          <Icon
            name={isSuccess ? 'check_circle' : 'error'}
            className="text-5xl"
          />
        </div>

        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <p className="mb-8 text-slate-400">{description}</p>

        <Button
          onClick={onClose}
          className="w-full"
          variant={isSuccess ? 'primary' : 'secondary'}
        >
          {buttonLabel}
        </Button>
      </div>
    </Modal>
  )
}
