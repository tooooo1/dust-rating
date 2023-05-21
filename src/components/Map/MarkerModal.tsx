import { Button } from '@chakra-ui/react';

interface MarkerModalProps {
  handleClick: () => void;
  content: string;
}

export const MarkerModal = ({ handleClick, content }: MarkerModalProps) => {
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

export default MarkerModal;
