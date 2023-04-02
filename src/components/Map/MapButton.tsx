import { IconButton } from '@chakra-ui/react';
import { BiTargetLock, BiPlus, BiMinus } from 'react-icons/bi';

type buttonType = 'current-location' | 'zoom-in' | 'zoom-out';

interface MapButtonProps {
  type: buttonType;
  onClick: () => void;
}

const MapButton = ({ type, onClick }: MapButtonProps) => {
  return (
    <IconButton
      aria-label={type}
      onClick={onClick}
      backgroundColor="#b4e9fa"
      _hover={{ bg: '#86e0fc' }}
      background
      icon={
        type === 'current-location' ? (
          <BiTargetLock />
        ) : type === 'zoom-in' ? (
          <BiPlus />
        ) : (
          <BiMinus />
        )
      }
    />
  );
};

export default MapButton;
