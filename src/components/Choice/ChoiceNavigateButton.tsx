import { Button } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { HiArrowRight } from 'react-icons/hi';

interface ChoiceNavigateButtonProps {
  handleClick: () => void;
}

export const ChoiceNavigateButton = ({
  handleClick,
  children,
}: PropsWithChildren<ChoiceNavigateButtonProps>) => {
  return (
    <Button
      rightIcon={<HiArrowRight />}
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
