import { Box } from '@chakra-ui/react';
import { DUST_SCALE_COLOR } from '@/utils/map';

export const AirPollutionLevels = () => {
  return (
    <Box
      textAlign="center"
      marginLeft="0.6rem"
      fontSize="1rem"
      minWidth="3rem"
      minHeight="5rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      color="#ffffff"
    >
      <Box
        backgroundColor={DUST_SCALE_COLOR.DANGER}
        borderRadius="1rem"
        padding="0.2rem 0 0.2rem 0"
      >
        매우
      </Box>
      <Box
        backgroundColor={DUST_SCALE_COLOR.BAD}
        borderRadius="1rem"
        padding="0.2rem 0 0.2rem 0"
      >
        나쁨
      </Box>
      <Box
        backgroundColor={DUST_SCALE_COLOR.NORMAL}
        borderRadius="1rem"
        padding="0.2rem 0 0.2rem 0"
      >
        보통
      </Box>
      <Box
        backgroundColor={DUST_SCALE_COLOR.GOOD}
        borderRadius="1rem"
        padding="0.2rem 0 0.2rem 0"
      >
        좋음
      </Box>
    </Box>
  );
};

export default AirPollutionLevels;
