import { Box, keyframes } from '@chakra-ui/react';
import { AiFillPauseCircle } from 'react-icons/ai';
import { DustForecast } from '@/types/dust';

interface ForecastImageProps {
  dustForecast: DustForecast;
}

const ForecastImages = ({ dustForecast }: ForecastImageProps) => {
  const animationKeyframes = keyframes`
  0% { background-image: url(${dustForecast.imageUrl1}); }
  50% { background-image: url(${dustForecast.imageUrl2}); }
  100% { background-image: url(${dustForecast.imageUrl3}); }
`;

  const animation = `${animationKeyframes} 3s ease infinite`;

  return (
    <Box
      className="forcast-img"
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
          '.forcast-img:hover &': {
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

export default ForecastImages;
