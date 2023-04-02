import { IconButton } from '@chakra-ui/react';
import { BiTargetLock } from 'react-icons/bi';

interface CurrentLocationButtonProps {
  onClick: () => void;
}

const CurrentLocationButton = ({ onClick }: CurrentLocationButtonProps) => {
  return (
    <IconButton
      aria-label="current location button"
      onClick={onClick}
      position="absolute"
      bottom={4}
      left={4}
      zIndex={10}
      icon={<BiTargetLock />}
    />
  );
};

export default CurrentLocationButton;
