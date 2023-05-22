import { useQuery } from '@tanstack/react-query';
import { getSidoDustInfos } from '@/apis/dustInfo';
import { SidoDustInfo, SortType } from '@/types/dust';
import { sortDustList } from '@/utils/constants/sortDustList';
import SidoRankItem from './SidoRankItem';

interface SidoRankListProps {
  sortType: SortType;
}

const SidoRankList = ({ sortType }: SidoRankListProps) => {
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
        <SidoRankItem key={sido.sidoName} rank={sidoIndex + 1} sido={sido} />
      ))}
    </>
  );
};

export default SidoRankList;
