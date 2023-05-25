import { Flex, Text, Box } from '@chakra-ui/react';
import { DustState } from '@/components/common';
import type { DustFigures } from '@/types/dust';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';

interface RankProps {
  rank: number;
  title: string;
  dustFigures: DustFigures;
}

const Rank = ({ rank, title, dustFigures }: RankProps) => {
  return (
    <Flex flex={1} alignItems="center">
      <Text
        as="span"
        fontSize={{ base: 14, sm: 16 }}
        fontWeight={400}
        mr={4}
        color="#9dadb6"
        width="8%"
      >
        {rank}
      </Text>
      <Text
        as="p"
        width="30%"
        fontSize={{ base: 16, sm: 18 }}
        fontWeight={700}
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {title}
      </Text>
      <Box width="26%" mr={8}>
        <DustState dustGrade={dustFigures.fineDustGrade} />
      </Box>
      <Flex direction="column" justifyContent="center" flexGrow={1}>
        <Flex justifyContent="space-between" alignItems="center" py={1}>
          <Text
            as="p"
            mr={2}
            fontSize={{ base: 12, sm: 14 }}
            fontWeight={500}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {FINE_DUST}
          </Text>
          <Text as="p" fontSize={{ base: 10, sm: 12 }} fontWeight={800}>
            {dustFigures.fineDustScale}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" py={1}>
          <Text
            as="p"
            mr={2}
            fontSize={{ base: 12, sm: 14 }}
            fontWeight={500}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {ULTRA_FINE_DUST}
          </Text>
          <Text as="p" fontSize={{ base: 10, sm: 12 }} fontWeight={800}>
            {dustFigures.ultraFineDustScale}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Rank;
