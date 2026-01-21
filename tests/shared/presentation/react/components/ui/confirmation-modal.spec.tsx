// @vitest-environment jsdom
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ConfirmationModal } from '@/shared/presentation/react/components/ui/confirmation-modal'
import { vi, expect, describe, it, beforeEach } from 'vitest'

describe('ConfirmationModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn().mockResolvedValue(undefined),
    title: 'Confirm Action',
    message: 'Are you sure?',
    successMessage: 'Action successful!',
    errorMessage: 'Something went wrong.'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly when open', () => {
    render(<ConfirmationModal {...defaultProps} />)
    expect(screen.getByText('Confirm Action')).toBeInTheDocument()
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument()
  })

  it('should not render when closed', () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument()
  })

  it('should call onClose when cancel button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('should handle successful confirmation', async () => {
    vi.useRealTimers()
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout')
    render(<ConfirmationModal {...defaultProps} />)

    fireEvent.click(screen.getByRole('button', { name: /confirm/i }))

    expect(defaultProps.onConfirm).toHaveBeenCalled()

    // Use findByText to wait for appearance
    const successMsg = await screen.findByText(
      'Success!',
      {},
      { timeout: 2000 }
    )
    expect(successMsg).toBeInTheDocument()

    // Verify setTimeout was called

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 3000)

    // Manually run the timeout callback to verify onClose
    // Find the call with 3000ms delay
    const call = setTimeoutSpy.mock.calls.find((c) => c[1] === 3000)
    const timerCallback = call ? (call[0] as unknown as () => void) : () => {}

    act(() => {
      timerCallback()
    })

    expect(defaultProps.onClose).toHaveBeenCalled()
    setTimeoutSpy.mockRestore()
  })

  it('should handle error during confirmation', async () => {
    vi.useRealTimers()
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout')
    const errorProps = {
      ...defaultProps,
      onConfirm: vi.fn().mockRejectedValue(new Error('Async error'))
    }
    render(<ConfirmationModal {...errorProps} />)

    fireEvent.click(screen.getByRole('button', { name: /confirm/i }))

    const errorTitle = await screen.findByText('Error!')
    expect(errorTitle).toBeInTheDocument()
    expect(screen.getByText('Async error')).toBeInTheDocument()

    // Should NOT auto-close on error (setTimeout not called with 3000ms)
    expect(setTimeoutSpy).not.toHaveBeenCalledWith(expect.any(Function), 3000)
    expect(defaultProps.onClose).not.toHaveBeenCalled()
    setTimeoutSpy.mockRestore()
  })
})
