import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Input } from '@/presentation/react/components/ui/Input';
import React from 'react';

describe('Input Component', () => {
  test('Should render correctly', () => {
    render(<Input placeholder="any_placeholder" />);
    expect(screen.getByPlaceholderText('any_placeholder')).toBeInTheDocument();
  });

  test('Should render with label', () => {
    render(<Input label="any_label" placeholder="any_placeholder" />);
    expect(screen.getByText('any_label')).toBeInTheDocument();
  });

  test('Should render with icon', () => {
    // Icon is a material icon name, we check if it's rendered by its name or class if needed
    // But since it's just a string prop to Icon component, we can check if the icon container exists
    render(<Input icon="person" />);
    expect(screen.getByText('person')).toBeInTheDocument(); // Material symbols usually render the text
  });

  test('Should render error message', () => {
    render(<Input error="any_error" />);
    expect(screen.getByText('any_error')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });

  test('Should forward ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('Should apply custom className to container', () => {
    const { container } = render(<Input className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
