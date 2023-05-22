import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MarkerModalButtonProps {
  handleClick: () => void;
  children: ReactNode;
}

export const MarkerModalButton = ({
  handleClick,
  children,
}: MarkerModalButtonProps) => {
  return (
    <Button
      colorScheme="blue"
      mr={3}
      onClick={handleClick}
      backgroundColor="#53caf2"
    >
      {children}
    </Button>
  );
};

export default MarkerModalButton;
