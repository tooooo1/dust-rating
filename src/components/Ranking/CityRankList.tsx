import { Box } from '@chakra-ui/react';
import { useCityDustInfoList } from '@/hooks/useDustInfo';
import { useSort } from '@/store/sort';
import type { CityDustInfo } from '@/types/dust';
import { sortDustList } from '@/utils/sortDustList';
import RankItem from './RankItem';

interface CityRankListProps {
  sido: string;
}

const CityRankList = ({ sido }: CityRankListProps) => {
  const { sortType } = useSort();

  const cityDustInfoList = useCityDustInfoList(sido, {
    select: (data: CityDustInfo[]) =>
      sortDustList<CityDustInfo>(sortType, data),
    suspense: true,
  });

  return (
    <Box flex="1" width="100%" borderRadius={10} cursor="pointer">
      {cityDustInfoList?.map((city, cityIndex) => (
        <RankItem key={city.location} rank={cityIndex + 1} info={city} />
      ))}
    </Box>
  );
};

export default CityRankList;
