import React, { useState } from 'react'
import { Modal } from './modal'
import { Button } from './button'
import { Icon } from './icon'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void> | void
  title: string
  message: string
  successMessage?: string
  errorMessage?: string
  confirmLabel?: string
  cancelLabel?: string
}

type ModalStatus = 'idle' | 'loading' | 'success' | 'error'

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  successMessage = 'Action successful',
  errorMessage = 'An error occurred',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel'
}: ConfirmationModalProps) {
  const [status, setStatus] = useState<ModalStatus>('idle')
  const [internalError, setInternalError] = useState<string>(errorMessage)
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen)

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen)
    if (isOpen) {
      setStatus('idle')
      // setInternalError(errorMessage) // If needed strictly
    }
  }

  const handleConfirm = async () => {
    setStatus('loading')
    try {
      await onConfirm()
      setStatus('success')
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        setInternalError(error.message)
      }
      setStatus('error')
    }
  }

  const renderContent = () => {
    if (status === 'success') {
      return (
        <div className="animate-in zoom-in flex flex-col items-center justify-center p-6 text-center duration-300">
          <div className="mb-4 rounded-full bg-green-500/20 p-4">
            <Icon name="check_circle" className="text-6xl text-green-500" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-white">Success!</h3>
          <p className="text-[#92adc9]">{successMessage}</p>
          <div className="mt-6 w-full">
            <Button
              variant="primary"
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Close
            </Button>
          </div>
        </div>
      )
    }

    if (status === 'error') {
      return (
        <div className="animate-in shake flex flex-col items-center justify-center p-6 text-center duration-300">
          <div className="mb-4 rounded-full bg-red-500/20 p-4">
            <Icon name="error" className="text-6xl text-red-500" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-white">Error!</h3>
          <p className="text-red-400">{internalError}</p>
          <div className="mt-6 flex w-full gap-3">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button variant="danger" onClick={handleConfirm} className="flex-1">
              Try Again
            </Button>
          </div>
        </div>
      )
    }

    // Idle or Loading
    return (
      <div className="p-1">
        <p className="mb-6 text-lg leading-relaxed text-[#92adc9]">{message}</p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={status === 'loading'}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="primary" // Assuming primary is okay for confirm, or use danger if destructive.
            // Ideally prop could control variant, but sticking to spec.
            onClick={handleConfirm}
            disabled={status === 'loading'}
            className="min-w-[100px]"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <Icon name="progress_activity" className="animate-spin" />
                Processing
              </span>
            ) : (
              confirmLabel
            )}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={status === 'loading' ? () => {} : onClose}
      title={status === 'idle' || status === 'loading' ? title : ''}
      maxWidth="max-w-md"
    >
      {renderContent()}
    </Modal>
  )
}
