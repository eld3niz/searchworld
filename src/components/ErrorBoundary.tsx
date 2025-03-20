import React from 'react';
import { Alert, Container } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Alert severity="error">
            Something went wrong. Please refresh the page or try again later.
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}
