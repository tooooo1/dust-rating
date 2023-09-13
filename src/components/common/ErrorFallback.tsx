import { Alert, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import theme from '@/styles/theme';
import { FallbackSizeType, fallbackSize } from '@/types/error';
import { ROUTE, ERROR_MESSAGE } from '@/utils/constants';

interface ErrorFallbackProps {
  size?: FallbackSizeType;
  errorMessage: (typeof ERROR_MESSAGE)[keyof typeof ERROR_MESSAGE];
}

const ErrorFallback = ({
  size = fallbackSize.CARD,
  errorMessage,
}: ErrorFallbackProps) => {
  const navigate = useNavigate();

  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius={8}
      py={6}
      height={size !== fallbackSize.FULL ? '100vh' : undefined}
    >
      <AlertIcon boxSize={6} m={0} />
      <AlertTitle fontSize={{ base: 14, sm: 16 }} mt={4} mr={0}>
        {errorMessage}
      </AlertTitle>
      <Button
        colorScheme="yellow"
        variant="outline"
        mt={4}
        borderWidth={2}
        bg="white"
        opacity={1}
        fontSize={14}
        borderRadius={20}
        _hover={{ bg: theme.backgroundColors.NONE }}
        onClick={() => navigate(ROUTE.HOME)}
      >
        메인으로 돌아가기
      </Button>
    </Alert>
  );
};
export default ErrorFallback;
