import { Button } from '@chakra-ui/react';
import { PropsWithChildren, ReactElement } from 'react';

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
      color="#3a9cbd"
      borderColor="#3a9cbd"
      fontSize={14}
      borderWidth={2}
      bg="#ffffff"
      opacity={0.8}
      borderRadius={20}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default ChoiceNavigateButton;
