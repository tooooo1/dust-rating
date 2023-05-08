import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getCityDustInfos } from '@/apis/dustInfo';
import type { CityDustInfo } from '@/types/dust';
import CityRankItem from './CityRankItem';

interface CityRankListProps {
  sido: string;
  isShow: boolean;
}

const CityRankList = ({ sido, isShow }: CityRankListProps) => {
  const { data: cityDustInfos } = useQuery<CityDustInfo[]>(
    ['city-dust-infos', sido],
    () => getCityDustInfos(sido),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Box
      flex="1"
      bg="#dfdfdf"
      borderRadius={10}
      my={isShow ? 4 : 0}
      px={{ base: 3, sm: 4 }}
      cursor="pointer"
    >
      {isShow &&
        cityDustInfos &&
        cityDustInfos.map((city, cityIndex) => (
          <CityRankItem
            key={city.cityName}
            cityName={city.cityName}
            rank={cityIndex + 1}
            fineDustScale={city.fineDustScale}
            fineDustGrade={city.fineDustGrade}
            ultraFineDustScale={city.ultraFineDustScale}
            ultraFineDustGrade={city.ultraFineDustGrade}
            dataTime={city.dataTime}
          />
        ))}
    </Box>
  );
};

export default CityRankList;
