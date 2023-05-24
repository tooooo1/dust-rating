import { IconButton } from '@chakra-ui/react';
import { AiOutlineFullscreenExit, AiOutlineArrowLeft } from 'react-icons/ai';
import { BiTargetLock, BiPlus, BiMinus } from 'react-icons/bi';

const icons = {
  'current-location': <BiTargetLock />,
  'zoom-in': <BiPlus />,
  'zoom-out': <BiMinus />,
  'full-screen': <AiOutlineFullscreenExit />,
  'go-back': <AiOutlineArrowLeft />,
};

type iconType = keyof typeof icons;
interface ControlButtonProps {
  type: iconType;
  onClick: () => void;
}

const ControlButton = ({ type, onClick }: ControlButtonProps) => {
  return (
    <IconButton
      aria-label={type}
      onClick={onClick}
      backgroundColor="#b4e9fa"
      icon={icons[type]}
      _hover={{ bg: '#86e0fc' }}
    />
  );
};

export default ControlButton;
