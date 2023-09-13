import { Button } from '@chakra-ui/react';
import { PropsWithChildren, ReactElement } from 'react';
import theme from '@/styles/theme';

interface ChoiceNavigateButtonProps {
  icon?: ReactElement;
  handleClick: () => void;
}

export const ChoiceNavigateButton = ({
  icon,
  handleClick,
  children,
}: PropsWithChildren<ChoiceNavigateButtonProps>) => {
  return (
    <Button
      rightIcon={icon}
      mt="0.5rem"
      color={theme.colors.SECONDARY}
      borderColor={theme.colors.SECONDARY}
      fontSize={14}
      borderWidth={2}
      bg="white"
      opacity={0.8}
      borderRadius={20}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default ChoiceNavigateButton;
