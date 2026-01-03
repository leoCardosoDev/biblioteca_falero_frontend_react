import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, Button, Icon } from '@/presentation/react/components/ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-background-light p-4 dark:bg-background-dark">
          <Card className="max-w-md p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                <Icon name="error" className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
              Algo deu errado
            </h2>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
              Ocorreu um erro inesperado. Tente recarregar a página.
            </p>
            <Button onClick={this.handleReload} className="w-full">
              Recarregar Página
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
