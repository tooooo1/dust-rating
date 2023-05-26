import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getCityDustInfos } from '@/apis/dustInfo';
import { useSort } from '@/store/sort';
import type { CityDustInfo } from '@/types/dust';
import { ROUTE } from '@/utils/constants';
import { sortDustList } from '@/utils/sortDustList';
import RankItem from './RankItem';

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
        <RankItem key={city.location} rank={cityIndex + 1} info={city} />
      ))}
    </Box>
  );
};

export default CityRankList;
