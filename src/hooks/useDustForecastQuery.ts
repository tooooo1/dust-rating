import { useQuery } from '@tanstack/react-query';
import { getDustForecast } from '@/apis/dustForecast';
import { INIT_STALE_TIME } from '@/utils/constants';

const useDustForecastQuery = (place: string) => {
  const { data: dustForecast } = useQuery(
    ['dust-forecast', place],
    getDustForecast,
    {
      suspense: true,
    }
  );

  return dustForecast;
};

export default useDustForecastQuery;
