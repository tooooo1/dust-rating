import { useQuery } from '@tanstack/react-query';
import { getSidoDustInfos } from '@/apis/dustInfo';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import SidoRankItem from './SidoRankItem';

interface SidoRankListProps {
  sortType: string;
}

const SidoRankList = ({ sortType }: SidoRankListProps) => {
  const { data: sidoDustInfos } = useQuery(
    ['sido-dust-infos', sortType],
    getSidoDustInfos,
    {
      select: (data) => {
        if (sortType === FINE_DUST) {
          return data?.sort(
            (prev, cur) => prev.fineDustScale - cur.fineDustScale
          );
        }
        if (sortType === ULTRA_FINE_DUST) {
          return data?.sort(
            (prev, cur) => prev.ultraFineDustScale - cur.ultraFineDustScale
          );
        }
      },
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
