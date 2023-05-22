import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@/utils/constants';

interface ErrorFallbackProps {
  title: string;
  description?: string;
}

const ErrorFallback = ({ title, description }: ErrorFallbackProps) => {
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
    >
      <AlertIcon boxSize={6} m={0} />
      <AlertTitle fontSize={{ base: 16, sm: 18 }} mt={4} mr={0}>
        {title}
      </AlertTitle>
      {description ? (
        <AlertDescription fontSize={16} fontWeight={400}>
          {description}
        </AlertDescription>
      ) : null}
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
    </Alert>
  );
};
export default ErrorFallback;
