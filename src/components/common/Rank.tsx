import { Flex, Text, Box } from '@chakra-ui/react';
import DustState from '@/components/common/DustState';
import type { DustFigures } from '@/types/dust';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import { getDustAverageGrade } from '@/utils/dustGrade';

interface RankProps {
  type: 'sido' | 'city';
  rank: number;
  title: string;
  dustFigures: DustFigures;
}

const Rank = ({ type, rank, title, dustFigures }: RankProps) => {
  const dustAverageGrade = getDustAverageGrade(
    dustFigures.fineDustGrade,
    dustFigures.ultraFineDustGrade
  );

  return (
    <Flex flex={1} alignItems="center">
      <Text
        as="span"
        fontSize={{ base: 16, sm: 18 }}
        fontWeight={400}
        mr={4}
        color="#9dadb6"
      >
        {rank}
      </Text>
      <Text
        as="p"
        width="30%"
        fontSize={type === 'sido' ? { base: 20, sm: 24 } : { base: 18, sm: 20 }}
        fontWeight={type === 'sido' ? 700 : 500}
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {title}
      </Text>
      <Box width={type === 'sido' ? '26%' : '28%'} mr={8}>
        <DustState dustGrade={dustAverageGrade} />
      </Box>
      <Flex direction="column" justifyContent="center" flexGrow={1}>
        <Flex justifyContent="space-between" alignItems="center" py={1}>
          <Text
            as="p"
            mr={2}
            fontSize={
              type === 'sido' ? { base: 14, sm: 16 } : { base: 12, sm: 14 }
            }
            fontWeight={500}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {FINE_DUST}
          </Text>
          <Text
            as="p"
            fontSize={
              type === 'sido' ? { base: 14, sm: 16 } : { base: 12, sm: 14 }
            }
            fontWeight={800}
          >
            {dustFigures.fineDustScale}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" py={1}>
          <Text
            as="p"
            mr={2}
            fontSize={
              type === 'sido' ? { base: 14, sm: 16 } : { base: 12, sm: 14 }
            }
            fontWeight={500}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {ULTRA_FINE_DUST}
          </Text>
          <Text
            as="p"
            fontSize={
              type === 'sido' ? { base: 14, sm: 16 } : { base: 12, sm: 14 }
            }
            fontWeight={800}
          >
            {dustFigures.ultraFineDustScale}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Rank;
