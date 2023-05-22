import { Button } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface MarkerModalButtonProps {
  handleClick: () => void;
}

export const MarkerModalButton = ({
  handleClick,
  children,
}: PropsWithChildren<MarkerModalButtonProps>) => {
  return (
    <Button
      colorScheme="blue"
      mr={3}
      backgroundColor="#53caf2"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default MarkerModalButton;
