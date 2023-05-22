import { Text, Box, keyframes } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { AiFillPauseCircle } from 'react-icons/ai';
import { getDustForcast } from '@/apis/dustForecast';

interface ForcastInfoProps {
  cityName: string;
}

const ForcastInfo = ({ cityName }: ForcastInfoProps) => {
  const { data: dustForecast } = useQuery(
    ['dust-forcast', cityName],
    getDustForcast,
    {
      staleTime: 1000 * 60 * 5,
      suspense: true,
    }
  );

  const animationKeyframes = keyframes`
  0% { background-image: url(${dustForecast.imageUrl1}); }
  50% { background-image: url(${dustForecast.imageUrl2}); }
  100% { background-image: url(${dustForecast.imageUrl3}); }
`;
  const animation = `${animationKeyframes} 3s ease infinite`;

  return (
    <>
      <Text fontSize={16} fontWeight={400} textAlign="left" lineHeight={1.4}>
        {dustForecast.informOverall}
      </Text>
      <Text fontSize={16} fontWeight={400} textAlign="left" lineHeight={1.4}>
        {dustForecast.informCause}
      </Text>
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
    </>
  );
};

export default ForcastInfo;
