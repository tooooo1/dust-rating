import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MarkerModalButtonPropsWithChildren {
  handleClick: () => void;
  children: ReactNode;
}

export const MarkerModalButton = ({
  handleClick,
  children,
}: MarkerModalButtonPropsWithChildren) => {
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
