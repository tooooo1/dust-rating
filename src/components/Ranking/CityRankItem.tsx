import { Flex } from '@chakra-ui/react';
import { Rank } from '@/components/common';
import type { CityDustInfo } from '@/types/dust';

interface CityRankItemProps {
  rank: number;
  sido: string;
  city: CityDustInfo;
}

const CityRankItem = ({ rank, sido, city }: CityRankItemProps) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      padding={3}
      borderRadius={6}
      transition="all 100ms ease-out"
      _hover={{ bg: '#dadada' }}
    >
      <Rank rank={rank} title={city.cityName} dustFigures={city} />
    </Flex>
  );
};

export default CityRankItem;
