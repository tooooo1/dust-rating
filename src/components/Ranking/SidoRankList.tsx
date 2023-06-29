import { useSidoDustInfoListQuery } from '@/hooks/useDustInfoQuery';
import { useSort } from '@/store/sort';
import type { SidoDustInfo } from '@/types/dust';
import { sortDustList } from '@/utils/sortDustList';
import RankItem from './RankItem';

const SidoRankList = () => {
  const { dustType, sortType } = useSort();

  const sidoDustInfoList = useSidoDustInfoListQuery({
    select: (data) => sortDustList<SidoDustInfo>(dustType, sortType, data),
    keepPreviousData: true,
    suspense: true,
  });

  return (
    <>
      {sidoDustInfoList?.map((sido, sidoIndex) => (
        <RankItem key={sido.location} rank={sidoIndex + 1} info={sido} />
      ))}
    </>
  );
};

export default SidoRankList;
