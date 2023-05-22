import { Box, keyframes } from '@chakra-ui/react';
import { AiFillPauseCircle } from 'react-icons/ai';
import { DustForcast } from '@/types/dust';

interface ForcastImageProps {
  dustForcast: DustForcast;
}

const ForcastImages = ({ dustForcast }: ForcastImageProps) => {
  const animationKeyframes = keyframes`
  0% { background-image: url(${dustForcast.imageUrl1}); }
  50% { background-image: url(${dustForcast.imageUrl2}); }
  100% { background-image: url(${dustForcast.imageUrl3}); }
`;

  const animation = `${animationKeyframes} 3s ease infinite`;

  return (
    <Box
      className="forecast-img"
      width="100%"
      height={800}
      position="relative"
      animation={animation}
      mt={8}
      _hover={{ animationPlayState: 'paused' }}
    >
      <Box
        opacity={0}
        position="absolute"
        top={20}
        right={4}
        color="#ffffffed"
        fontSize={50}
        transition="all 100ms ease-in-out"
        sx={{
          '.forecast-img:hover &': {
            opacity: '1',
          },
        }}
      >
        <AiFillPauseCircle
          style={{
            filter: 'drop-shadow(0px 3px 10px rgba(48, 48, 48, 0.4))',
          }}
        />
      </Box>
    </Box>
  );
};

export default ForcastImages;
