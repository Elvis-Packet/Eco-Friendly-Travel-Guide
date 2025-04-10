import { Component } from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: #f8f9fa;
`;

const ErrorTitle = styled.h1`
  color: #e53935;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #424242;
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  background-color: #2e7d32;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1b5e20;
  }
`;

// Error boundary class component for catching rendering errors
class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but an unexpected error occurred. Our team has been notified.
          </ErrorMessage>
          <HomeButton to="/">Return to Home</HomeButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

// Router error component
function RouterError() {
  const error = useRouteError();
  
  let errorMessage = 'An unexpected error occurred';
  let statusText = 'Error';
  let status = '500';
  
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
    statusText = error.statusText;
    status = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <ErrorContainer>
      <ErrorTitle>{status} - {statusText}</ErrorTitle>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <HomeButton to="/">Return to Home</HomeButton>
    </ErrorContainer>
  );
}

// Combined error boundary component
function ErrorBoundary() {
  return <RouterError />;
}

export { ErrorBoundaryClass };
export default ErrorBoundary;