import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { FormSection } from '@/presentation/react/components/ui/FormSection';
import React from 'react';

describe('FormSection Component', () => {
  test('Should render correctly with title and children', () => {
    render(
      <FormSection title="any_title">
        <div data-testid="child">child</div>
      </FormSection>
    );
    expect(screen.getByText('any_title')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('Should apply custom className', () => {
    const { container } = render(
      <FormSection title="any_title" className="custom-class">
        <div>child</div>
      </FormSection>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
