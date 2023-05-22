import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getCityDustInfos } from '@/apis/dustInfo';
import type { CityDustInfo, SortType } from '@/types/dust';
import { FINE_DUST } from '@/utils/constants';
import { sortDustList } from '@/utils/sortDustList';
import CityRankItem from './CityRankItem';

interface CityRankListProps {
  sido: string;
  isShow?: boolean;
  sortType?: SortType;
}

const CityRankList = ({
  sortType = FINE_DUST,
  sido,
  isShow = true,
}: CityRankListProps) => {
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
    <Box flex="1" borderRadius={10} my={isShow ? 4 : 0} cursor="pointer">
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
