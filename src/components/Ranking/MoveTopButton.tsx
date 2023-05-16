import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

export const MoveTopButton = () => {
  const handleGoTopButtonClick = () => {
    document
      .getElementById('root')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleMoveScroll = () => {
    (scrollY / innerHeight) * 100 >= 60
      ? document
          .querySelector('#goTop')
          ?.setAttribute('style', 'visibility:visible')
      : document
          .querySelector('#goTop')
          ?.setAttribute('style', 'visibility:hidden');
  };

  useEffect(() => {
    window.addEventListener('scroll', () => handleMoveScroll());
    return window.removeEventListener('scroll', handleMoveScroll);
  }, []);

  return (
    <Button
      id="goTop"
      width="10%"
      sx={{ position: 'sticky', zIndex: '9', top: '90%', left: '3%' }}
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
