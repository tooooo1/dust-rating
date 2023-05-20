import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Rank from '@/components/common/Rank';
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
    navigate(
      `${ROUTE.DUST_FORECAST}?sido=${encodeURIComponent(
        sido
      )}&city=${encodeURIComponent(city.cityName)}`
    );
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
      <Rank type="city" rank={rank} title={city.cityName} dustFigures={city} />
    </Flex>
  );
};

export default CityRankItem;
