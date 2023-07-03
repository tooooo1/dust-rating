import type { ComponentProps, PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ERROR_MESSAGE } from '@/utils/constants/message';
import ErrorFallback from './ErrorFallback';

type Fallback = 'fallback';

type ErrorBoundaryProps = Omit<ComponentProps<typeof ErrorBoundary>, Fallback>;

interface CustomErrorBoundaryProps extends ErrorBoundaryProps {
  rejectFallback?: ComponentProps<typeof ErrorBoundary>[Fallback];
}

const CustomErrorBoundary = ({
  children,
  rejectFallback,
}: PropsWithChildren<CustomErrorBoundaryProps>) => {
  return (
    <ErrorBoundary
      fallback={
        rejectFallback || <ErrorFallback errorMessage={ERROR_MESSAGE.DEFAULT} />
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
