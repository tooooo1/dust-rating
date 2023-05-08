import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

interface AlertBoxProps {
  title: string;
  description: string;
}

const AlertBox = ({ title, description }: AlertBoxProps) => {
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
      <AlertDescription fontSize={16} fontWeight={400}>
        {description}
      </AlertDescription>
    </Alert>
  );
};

export default AlertBox;
