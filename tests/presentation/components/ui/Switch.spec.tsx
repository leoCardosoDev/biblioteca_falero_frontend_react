import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { Switch } from '@/presentation/react/components/ui/switch'

describe('Switch Component', () => {
  test('Should render correctly', () => {
    render(<Switch checked={false} onChange={vi.fn()} label="Test Label" description="Test Desc" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Test Desc')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  test('Should call onChange when clicked', () => {
    const onChange = vi.fn()
    render(<Switch checked={false} onChange={onChange} />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  test('Should be checked when checked prop is true', () => {
    render(<Switch checked={true} onChange={vi.fn()} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})
