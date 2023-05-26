import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getCityDustInfos,
  getSidoDustInfo,
  getSidoDustInfos,
} from '@/apis/dustInfo';
import { CityDustInfo, SidoDustInfo } from '@/types/dust';

export const useSidoDustInfoQuery = (place: string) => {
  const { data: sidoDustInfo } = useQuery(
    ['sido-dust-info', place],
    () => getSidoDustInfo(place),
    { staleTime: 1000 * 60 * 5 }
  );

  return sidoDustInfo;
};

export const useSidoDustInfoListQuery = (
  options?: UseQueryOptions<SidoDustInfo[]>
) => {
  const { data: sidoDustInfoList } = useQuery<SidoDustInfo[]>(
    ['sido-dust-info-list'],
    getSidoDustInfos,
    {
      ...options,
      staleTime: 1000 * 60 * 5,
    }
  );

  return sidoDustInfoList;
};

export const useCityDustInfoListQuery = (
  place: string,
  options?: UseQueryOptions<CityDustInfo[]>
) => {
  const { data: cityDustInfoList } = useQuery<CityDustInfo[]>(
    ['city-dust-info-list', place],
    () => getCityDustInfos(place),
    {
      ...options,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );

  return cityDustInfoList;
};
