import { Center, Spinner } from '@chakra-ui/react';
import { Suspense, type ComponentProps, type PropsWithChildren } from 'react';
import CustomErrorBoundary from './CustomErrorBoundary';

type Fallback = 'fallback';

type SuspenseProps = Omit<ComponentProps<typeof Suspense>, Fallback>;

interface AsyncBoundaryProps
  extends ComponentProps<typeof CustomErrorBoundary>,
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
    <CustomErrorBoundary rejectFallback={rejectFallback}>
      <Suspense fallback={pendingFallback || spinnerFallback}>
        {children}
      </Suspense>
    </CustomErrorBoundary>
  );
};

export default AsyncBoundary;
