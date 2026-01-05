import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Icon } from '@/presentation/react/components/ui/icon';

describe('Icon Component', () => {
  test('Should render with correct name', () => {
    render(<Icon name="home" />);
    const icon = screen.getByText('home');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('material-symbols-outlined');
    expect(icon).not.toHaveClass('icon-fill');
  });

  test('Should render with icon-fill class when fill is true', () => {
    render(<Icon name="settings" fill={true} />);
    const icon = screen.getByText('settings');
    expect(icon).toHaveClass('material-symbols-outlined');
    expect(icon).toHaveClass('icon-fill');
  });

  test('Should render with custom class name', () => {
    render(<Icon name="person" className="custom-class" />);
    const icon = screen.getByText('person');
    expect(icon).toHaveClass('material-symbols-outlined');
    expect(icon).toHaveClass('custom-class');
  });
});
