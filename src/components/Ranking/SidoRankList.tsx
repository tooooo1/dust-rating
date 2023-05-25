import { useQuery } from '@tanstack/react-query';
import { getSidoDustInfos } from '@/apis/dustInfo';
import { useSort } from '@/store/sort';
import type { SidoDustInfo } from '@/types/dust';
import { ROUTE } from '@/utils/constants';
import { sortDustList } from '@/utils/sortDustList';
import RankItem from './RankItem';

const SidoRankList = () => {
  const { sortType } = useSort();

  const { data: sidoDustInfos } = useQuery(
    ['sido-dust-infos', sortType],
    getSidoDustInfos,
    {
      select: (data) => sortDustList<SidoDustInfo>(sortType, data),
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      suspense: true,
    }
  );

  return (
    <>
      {sidoDustInfos?.map((sido, sidoIndex) => (
        <RankItem
          key={sido.sidoName}
          rankNumber={sidoIndex + 1}
          rankTitle={sido.sidoName}
          rankInfo={sido}
          location={`${ROUTE.RANKING}/${sido.sidoName}`}
        />
      ))}
    </>
  );
};

export default SidoRankList;
