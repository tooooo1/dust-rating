import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface AlertBoxProps {
  children?: ReactNode;
  title: string;
  description?: string;
}

const AlertBox = ({ children, title, description }: AlertBoxProps) => {
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
      <AlertIcon boxSize={6} mb={3} />
      <AlertTitle fontSize={{ base: 16, sm: 18 }}>{title}</AlertTitle>
      {description && <AlertDescription fontSize={16} fontWeight={400} />}
      {children}
    </Alert>
  );
};

export default AlertBox;
