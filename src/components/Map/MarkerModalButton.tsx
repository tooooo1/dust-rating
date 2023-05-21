import { Button } from '@chakra-ui/react';

interface MarkerModalButtonProps {
  handleClick: () => void;
  content: string;
}

export const MarkerModalButton = ({
  handleClick,
  content,
}: MarkerModalButtonProps) => {
  return (
    <Button
      colorScheme="blue"
      mr={3}
      onClick={handleClick}
      backgroundColor="#53caf2"
    >
      {content}
    </Button>
  );
};

export default MarkerModalButton;
