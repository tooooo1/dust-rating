import { Center, Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { PropsWithChildren, Suspense, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

interface AsyncBoundaryProps {
  title: string;
  description?: string;
  isCenter?: boolean;
  suspenseFallback?: ReactNode;
}

const AsyncBoundary = ({
  children,
  title,
  description,
  isCenter = false,
  suspenseFallback,
}: PropsWithChildren<AsyncBoundaryProps>) => {
  const spinnerFallback = (
    <Center height="100vh">
      <Spinner />
    </Center>
  );

  return (
    <Wrapper isCenter={isCenter}>
      <ErrorBoundary
        fallback={<ErrorFallback title={title} description={description} />}
      >
        <Suspense
          fallback={suspenseFallback ? suspenseFallback : spinnerFallback}
        >
          {children}
        </Suspense>
      </ErrorBoundary>
    </Wrapper>
  );
};

export default AsyncBoundary;

const Wrapper = styled.div<{ isCenter: boolean }>`
  width: ${({ isCenter }) => (isCenter ? null : '100%')};
  height: ${({ isCenter }) => (isCenter ? '100%' : null)};
  display: ${({ isCenter }) => (isCenter ? 'flex' : null)};
  justify-content: ${({ isCenter }) => (isCenter ? 'center' : null)};
  align-items: ${({ isCenter }) => (isCenter ? 'center' : null)};
  margin: ${({ isCenter }) => (isCenter ? '0 12rem' : null)};
`;
