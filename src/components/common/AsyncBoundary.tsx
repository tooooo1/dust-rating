import { Center, Spinner } from '@chakra-ui/react';
import { PropsWithChildren, Suspense, type ComponentProps } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ERROR_MESSAGE } from '@/utils/constants/message';
import ErrorFallback from './ErrorFallback';

type ErrorBoundaryProps = Omit<
  ComponentProps<typeof ErrorBoundary>,
  'fallback'
>;

type SuspenseProps = Omit<ComponentProps<typeof Suspense>, 'fallback'>;

interface AsyncBoundaryProps extends ErrorBoundaryProps, SuspenseProps {
  rejectFallback?: ComponentProps<typeof ErrorBoundary>['fallback'];
  pendingFallback?: ComponentProps<typeof Suspense>['fallback'];
}

const AsyncBoundary = ({
  children,
  rejectFallback,
  pendingFallback,
}: PropsWithChildren<AsyncBoundaryProps>) => {
  const spinnerFallback = (
    <Center height="100vh">
      <Spinner />
    </Center>
  );

  return (
    <ErrorBoundary
      fallback={
        rejectFallback || <ErrorFallback errorMessage={ERROR_MESSAGE.DEFAULT} />
      }
    >
      <Suspense fallback={pendingFallback || spinnerFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
