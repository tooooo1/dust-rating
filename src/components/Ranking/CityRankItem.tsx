import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { CityDustInfo } from '@/types/dust';
import { ROUTE } from '@/utils/constants';
import Rank from '../common/Rank';

interface CityRankItemProps {
  rank: number;
  city: CityDustInfo;
}

const CityRankItem = ({ rank, city }: CityRankItemProps) => {
  const navigate = useNavigate();

  const handlePageNavigate = () => {
    navigate(ROUTE.DUST_FORECAST, {
      state: {
        cityName: city.cityName,
        fineDustScale: city.fineDustScale,
        fineDustGrade: city.fineDustGrade,
        ultraFineDustScale: city.ultraFineDustScale,
        ultraFineDustGrade: city.ultraFineDustGrade,
        dataTime: city.dataTime,
      },
    });
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
