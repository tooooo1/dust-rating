import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { CityDustInfo } from '@/types/dust';
import { ROUTE } from '@/utils/constants';
import Rank from '../common/Rank';

interface CityRankItemProps extends CityDustInfo {
  rank: number;
}

const CityRankItem = ({
  rank,
  cityName,
  fineDustScale,
  fineDustGrade,
  ultraFineDustScale,
  ultraFineDustGrade,
  dataTime,
}: CityRankItemProps) => {
  const navigate = useNavigate();

  const handlePageNavigate = () => {
    navigate(ROUTE.DUST_FORECAST, {
      state: {
        cityName,
        fineDustScale,
        fineDustGrade,
        ultraFineDustScale,
        ultraFineDustGrade,
        dataTime,
      },
    });
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      py={3}
      onClick={handlePageNavigate}
    >
      <Rank
        type="city"
        rank={rank}
        cityName={cityName}
        fineDustScale={fineDustScale}
        fineDustGrade={fineDustGrade}
        ultraFineDustScale={ultraFineDustScale}
        ultraFineDustGrade={ultraFineDustGrade}
      />
    </Flex>
  );
};

export default CityRankItem;
