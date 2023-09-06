import { IconButton } from '@chakra-ui/react';
import { AiOutlineFullscreenExit, AiOutlineArrowLeft } from 'react-icons/ai';
import { BiTargetLock, BiPlus, BiMinus } from 'react-icons/bi';
import theme from '@/styles/theme';

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
      backgroundColor={theme.backgroundColors.MAP_ICON_BACKGROUND}
      icon={icons[type]}
      _hover={{ bg: theme.backgroundColors.MAP_ICON_HOVER_MAP_ICON_BACKGROUND }}
    />
  );
};

export default ControlButton;
