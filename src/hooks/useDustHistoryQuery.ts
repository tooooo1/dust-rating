import { useQuery } from '@tanstack/react-query';
import { getDustHistory } from '@/apis/dustHistory';
import { DustHistory } from '@/types/dust';

const useDustHistoryQuery = (place: string) => {
  const { data: dustHistories } = useQuery<DustHistory[]>(
    ['dust-history', place],
    () => getDustHistory(place),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  return dustHistories;
};

export default useDustHistoryQuery;
