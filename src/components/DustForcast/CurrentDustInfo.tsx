import { Box, Text, Flex } from '@chakra-ui/react';
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
    <Box flexGrow={1} borderX={{ base: 'none', sm: '1px solid #dfdfdf' }}>
      <Text as="p" fontSize={{ base: 16, sm: 22 }} fontWeight={600} mb={2}>
        {kindOfDust}
      </Text>
      <Flex justifyContent="center" alignItems="center">
        <Text as="p" fontSize={{ base: 24, sm: 48 }} fontWeight={800} mr={5}>
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
