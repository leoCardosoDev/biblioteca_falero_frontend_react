import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Select } from '@/presentation/react/components/ui/Select';
import React from 'react';

describe('Select Component', () => {
  test('Should render correctly', () => {
    render(
      <Select defaultValue="option1">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('Should render with label', () => {
    render(<Select label="any_label"><option>any</option></Select>);
    expect(screen.getByText('any_label')).toBeInTheDocument();
  });

  test('Should render with icon', () => {
    render(<Select icon="person"><option>any</option></Select>);
    expect(screen.getByText('person')).toBeInTheDocument();
  });

  test('Should render error message', () => {
    render(<Select error="any_error"><option>any</option></Select>);
    expect(screen.getByText('any_error')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveClass('border-red-500');
  });

  test('Should forward ref', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select ref={ref}><option>any</option></Select>);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
