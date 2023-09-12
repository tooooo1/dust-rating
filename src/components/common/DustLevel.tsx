import { Flex, Box } from '@chakra-ui/react';
import theme from '@/styles/theme';

interface DustLevelProps {
  direction: 'row' | 'column';
}

export const DustLevel = ({ direction = 'row' }: DustLevelProps) => {
  return (
    <Flex
      flexDirection={direction}
      ml={2}
      fontSize={{ base: 12, sm: 14 }}
      fontWeight={500}
      textAlign="center"
      color="white"
      gap={1}
    >
      <Box
        backgroundColor={theme.colors.DANGER}
        borderRadius={20}
        p={3}
        py="0.3rem"
      >
        매우
      </Box>
      <Box
        backgroundColor={theme.colors.BAD}
        borderRadius={20}
        px={3}
        py="0.3rem"
      >
        나쁨
      </Box>
      <Box
        backgroundColor={theme.colors.NORMAL}
        borderRadius={20}
        px={3}
        py="0.3rem"
      >
        보통
      </Box>
      <Box
        backgroundColor={theme.colors.GOOD}
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
