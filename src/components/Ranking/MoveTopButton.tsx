import { Button } from '@chakra-ui/react';
import { AiOutlineArrowUp } from 'react-icons/ai';

export const MoveTopButton = () => {
  const handleGoTopButtonClick = () => {
    document
      .getElementById('root')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Button
      width="10%"
      sx={{ position: 'sticky', zIndex: '9', top: '90%', left: '3%' }}
      backgroundColor="transparent"
      onClick={handleGoTopButtonClick}
      _hover={{
        backgroundColor: '#dfdfdf',
        paddingX: '0.8rem',
        opacity: 0.8,
      }}
    >
      <AiOutlineArrowUp />
      위로
    </Button>
  );
};

export default MoveTopButton;
