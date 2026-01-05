import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { ErrorBoundary } from '@/presentation/react/components/ui/error-boundary';

describe('ErrorBoundary', () => {
  let consoleSpy: any;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    vi.clearAllMocks();
  });

  test('Should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('Should render error message when an error occurs', () => {
    const ThrowError = () => {
      React.useEffect(() => {
        throw new Error('Test Error');
      }, []);
      return null;
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
  });

  test('Should reload page when reload button is clicked', () => {
    const ThrowError = () => {
      React.useEffect(() => {
        throw new Error('Test Error');
      }, []);
      return null;
    };

    const { location } = window;
    // @ts-expect-error: JSDOM location is read-only and required to be Location type
    delete window.location;
    window.location = { ...location, reload: vi.fn() } as any;

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByText('Recarregar Página');
    reloadButton.click();

    expect(window.location.reload).toHaveBeenCalled();

    window.location = location;
  });

  test('Should render fallback component when provided and error occurs', () => {
    const ThrowError = () => {
      React.useEffect(() => {
        throw new Error('Test Error');
      }, []);
      return null;
    };

    render(
      <ErrorBoundary fallback={<div>Custom Fallback</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Fallback')).toBeInTheDocument();
    expect(screen.queryByText('Algo deu errado')).not.toBeInTheDocument();
  });
});
