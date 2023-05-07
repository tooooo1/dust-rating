import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import DustState from '@/components/common/DustState';
import type { DustFigures } from '@/types/dust';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import { getDustAverageGrade } from '@/utils/dustGrade';
import CityRank from './CityRank';

interface SidoRankProps extends DustFigures {
  rank: number;
  sidoName: string;
}

const SidoRank = ({
  rank,
  sidoName,
  fineDustScale,
  ultraFineDustScale,
  fineDustGrade,
  ultraFineDustGrade,
}: SidoRankProps) => {
  const [isShow, setIsShow] = useState(false);
  const dustAverageGrade = getDustAverageGrade(
    fineDustGrade,
    ultraFineDustGrade
  );

  const handleSidoClick = () => {
    setIsShow((isShow) => !isShow);
  };

  return (
    <Box
      width="100%"
      borderRadius={10}
      py={3}
      borderBottom="1px solid #dfdfdf"
      transition="all 100ms ease-in"
      cursor="pointer"
      _hover={{ backgroundColor: '#dfdfdf', paddingX: '0.8rem', opacity: 0.8 }}
      onClick={handleSidoClick}
    >
      <Flex alignItems="center">
        <Text as="span" fontSize={20} fontWeight={600} mr={4} color="#9dadb6">
          {rank}
        </Text>
        <Text
          as="p"
          width="30%"
          fontSize={26}
          fontWeight={700}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {sidoName}
        </Text>
        <Box width="26%" mr={8}>
          <DustState dustGrade={dustAverageGrade} />
        </Box>
        <Flex direction="column" justifyContent="center" flexGrow={1}>
          <Flex justifyContent="space-between" py={1}>
            <Text as="p" fontSize={16} fontWeight={500}>
              {FINE_DUST}
            </Text>
            <Text as="p" fontSize={16} fontWeight={800}>
              {fineDustScale}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" py={1}>
            <Text as="p" fontSize={16} fontWeight={500}>
              {ULTRA_FINE_DUST}
            </Text>
            <Text as="p" fontSize={16} fontWeight={800}>
              {ultraFineDustScale}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <CityRank sido={sidoName} isShow={isShow} />
    </Box>
  );
};

export default SidoRank;
