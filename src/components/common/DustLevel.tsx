import { Flex, Box } from '@chakra-ui/react';
import { DUST_SCALE_COLOR } from '@/utils/map';

interface DustLevelProps {
  direction: 'row' | 'column';
}

export const DustLevel = ({ direction = 'row' }: DustLevelProps) => {
  return (
    <Flex
      flexDirection={direction}
      ml={2}
      fontSize={14}
      fontWeight={500}
      textAlign="center"
      color="#ffffff"
      gap={1}
    >
      <Box
        backgroundColor={DUST_SCALE_COLOR.DANGER}
        borderRadius={20}
        p={3}
        py="0.3rem"
      >
        매우
      </Box>
      <Box
        backgroundColor={DUST_SCALE_COLOR.BAD}
        borderRadius={20}
        px={3}
        py="0.3rem"
      >
        나쁨
      </Box>
      <Box
        backgroundColor={DUST_SCALE_COLOR.NORMAL}
        borderRadius={20}
        px={3}
        py="0.3rem"
      >
        보통
      </Box>
      <Box
        backgroundColor={DUST_SCALE_COLOR.GOOD}
        borderRadius={20}
        px={3}
        py="0.3rem"
      >
        좋음
      </Box>
    </Flex>
  );
};

export default DustLevel;
