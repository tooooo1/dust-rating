import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface AlertBoxProps {
  title: string;
  description?: string;
}

const AlertBox = ({
  children,
  title,
  description,
}: PropsWithChildren<AlertBoxProps>) => {
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
      {children}
    </Alert>
  );
};

export default AlertBox;
