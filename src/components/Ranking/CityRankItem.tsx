import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Rank } from '@/components/common';
import type { CityDustInfo } from '@/types/dust';
import { ROUTE } from '@/utils/constants';

interface CityRankItemProps {
  rank: number;
  sido: string;
  city: CityDustInfo;
}

const CityRankItem = ({ rank, sido, city }: CityRankItemProps) => {
  const navigate = useNavigate();

  const handlePageNavigate = () => {
    navigate(`${ROUTE.DUST_FORCAST}?sido=${sido}&city=${city.cityName}`);
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      padding={3}
      borderRadius={6}
      transition="all 100ms ease-out"
      _hover={{ bg: '#dadada' }}
      onClick={handlePageNavigate}
    >
      <Rank rank={rank} title={city.cityName} dustFigures={city} />
    </Flex>
  );
};

export default CityRankItem;
