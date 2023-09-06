import { useQuery } from '@tanstack/react-query';
import { getDustHistory } from '@/apis/dustHistory';
import { DustHistory } from '@/types/dust';
import { INIT_STALE_TIME } from '@/utils/constants';

const useDustHistoryQuery = (place: string) => {
  const { data: dustHistories } = useQuery<DustHistory[]>(
    ['dust-history', place],
    () => getDustHistory(place)
  );

  return dustHistories;
};

export default useDustHistoryQuery;
