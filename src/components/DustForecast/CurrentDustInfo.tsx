import { Box, Text, Flex } from '@chakra-ui/react';
import theme from '@/styles/theme';
import DustState from '../common/DustState';

interface CurrentDustInfoProps {
  kindOfDust: string;
  dustScale: number;
  dustGrade: number;
}

export const CurrentDustInfo = ({
  kindOfDust,
  dustScale,
  dustGrade,
}: CurrentDustInfoProps) => {
  return (
    <Box
      flexGrow={1}
      borderX={{ base: 'none', sm: `1px solid ${theme.colors.BEIGE}` }}
    >
      <Text as="p" fontSize={{ base: 18, sm: 20 }} fontWeight={600} mb={2}>
        {kindOfDust}
      </Text>
      <Flex justifyContent="center" alignItems="center">
        <Text as="p" fontSize={{ base: 30, sm: 42 }} fontWeight={800} mr={5}>
          {dustScale}
        </Text>
        <Box my={3}>
          <DustState dustGrade={dustGrade} />
        </Box>
      </Flex>
    </Box>
  );
};
export default CurrentDustInfo;
