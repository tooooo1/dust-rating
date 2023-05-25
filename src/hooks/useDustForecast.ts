import { useQuery } from '@tanstack/react-query';
import { getDustForecast } from '@/apis/dustForecast';

export const useDustForecast = (place: string) => {
  const { data: dustForecast } = useQuery(
    ['dust-forecast', place],
    getDustForecast,
    {
      staleTime: 1000 * 60 * 5,
      suspense: true,
    }
  );

  return dustForecast;
};
