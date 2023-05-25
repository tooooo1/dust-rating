import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getCityDustInfos } from '@/apis/dustInfo';
import { useSort } from '@/store/sort';
import type { CityDustInfo } from '@/types/dust';
import { sortDustList } from '@/utils/sortDustList';
import CityRankItem from './CityRankItem';

interface CityRankListProps {
  sido: string;
}

const CityRankList = ({ sido }: CityRankListProps) => {
  const { sortType } = useSort();

  const { data: cityDustInfos } = useQuery(
    ['city-dust-infos', sido],
    () => getCityDustInfos(sido),
    {
      select: (data: CityDustInfo[]) =>
        sortDustList<CityDustInfo>(sortType, data),
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );

  return (
    <Box flex="1" width="100%" borderRadius={10} cursor="pointer">
      {cityDustInfos?.map((city, cityIndex) => (
        <CityRankItem
          key={city.cityName}
          rank={cityIndex + 1}
          sido={sido}
          city={city}
        />
      ))}
    </Box>
  );
};

export default CityRankList;
