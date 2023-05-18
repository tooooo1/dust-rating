import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import AlertBox from '@/components/common/AlertBox';
import { ROUTE } from '@/utils/constants';

interface ErrorFallbackProps {
  title: string;
  description?: string;
  isCenter?: boolean;
}

const ErrorFallback = ({
  title,
  description,
  isCenter = false,
}: ErrorFallbackProps) => {
  const navigate = useNavigate();

  return (
    <Center isCenter={isCenter}>
      <AlertBox title={title} description={description}>
        <Button
          colorScheme="yellow"
          variant="outline"
          mt={4}
          borderWidth={2}
          bg="#ffffff"
          opacity={1}
          borderRadius={20}
          _hover={{ bg: '#ffffff8f' }}
          onClick={() => navigate(ROUTE.HOME)}
        >
          메인으로 돌아가기
        </Button>
      </AlertBox>
    </Center>
  );
};
export default ErrorFallback;

const Center = styled.div<{ isCenter: boolean }>`
  width: ${({ isCenter }) => (isCenter ? null : '100%')};
  height: ${({ isCenter }) => (isCenter ? '100%' : null)};
  display: ${({ isCenter }) => (isCenter ? 'flex' : null)};
  justify-content: ${({ isCenter }) => (isCenter ? 'center' : null)};
  align-items: ${({ isCenter }) => (isCenter ? 'center' : null)};
  margin: ${({ isCenter }) => (isCenter ? '0 12rem' : null)};
`;
