import { Center, Spinner } from '@chakra-ui/react';
import { Suspense, type ComponentProps, type PropsWithChildren } from 'react';
import ErrorBoundary from './ErrorBoundary';

type Fallback = 'fallback';

type SuspenseProps = Omit<ComponentProps<typeof Suspense>, Fallback>;

interface AsyncBoundaryProps
  extends ComponentProps<typeof ErrorBoundary>,
    SuspenseProps {
  pendingFallback?: ComponentProps<typeof Suspense>[Fallback];
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
    <ErrorBoundary rejectFallback={rejectFallback}>
      <Suspense fallback={pendingFallback || spinnerFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
