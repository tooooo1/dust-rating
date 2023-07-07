import type { ComponentProps, PropsWithChildren } from 'react';
import { ErrorBoundary as Error_Boundary } from 'react-error-boundary';
import { ERROR_MESSAGE } from '@/utils/constants/message';
import ErrorFallback from './ErrorFallback';

type Fallback = 'fallback';

type Error_BoundaryProps = Omit<
  ComponentProps<typeof Error_Boundary>,
  Fallback
>;

interface ErrorBoundaryProps extends Error_BoundaryProps {
  rejectFallback?: ComponentProps<typeof Error_Boundary>[Fallback];
}

const ErrorBoundary = ({
  children,
  rejectFallback,
}: PropsWithChildren<ErrorBoundaryProps>) => {
  return (
    <Error_Boundary
      fallback={
        rejectFallback || <ErrorFallback errorMessage={ERROR_MESSAGE.DEFAULT} />
      }
    >
      {children}
    </Error_Boundary>
  );
};

export default ErrorBoundary;
