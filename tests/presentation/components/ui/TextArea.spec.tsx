import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { TextArea } from '@/presentation/react/components/ui/TextArea';
import React from 'react';

describe('TextArea Component', () => {
  test('Should render correctly', () => {
    render(<TextArea placeholder="any_placeholder" />);
    expect(screen.getByPlaceholderText('any_placeholder')).toBeInTheDocument();
  });

  test('Should render with label', () => {
    render(<TextArea label="any_label" />);
    expect(screen.getByText('any_label')).toBeInTheDocument();
  });

  test('Should render error message', () => {
    render(<TextArea error="any_error" />);
    expect(screen.getByText('any_error')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });

  test('Should forward ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
