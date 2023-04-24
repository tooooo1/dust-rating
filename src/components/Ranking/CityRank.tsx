import { useQuery } from '@tanstack/react-query';
import { Box } from '@chakra-ui/react';
import RankItem from './RankItem';
import { getCityAirQualities } from '@/apis/airQuality';
import type { CityAirQuality } from '@/types/dust';

interface CityRankProps {
  sido: string;
  isShow: boolean;
}

const CityRank = ({ sido, isShow }: CityRankProps) => {
  const { data: cityAirQualities } = useQuery<CityAirQuality[]>(
    ['city-air-qualities', sido],
    () => getCityAirQualities(sido),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Box
      width="98%"
      margin="0 auto"
      bg="#dfdfdf"
      borderRadius={10}
      px={4}
      cursor="pointer"
    >
      {isShow &&
        cityAirQualities &&
        cityAirQualities.map((city, cityIndex) => (
          <RankItem
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

export default CityRank;
