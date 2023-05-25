import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getCityDustInfos,
  getSidoDustInfo,
  getSidoDustInfos,
} from '@/apis/dustInfo';
import { CityDustInfo, SidoDustInfo } from '@/types/dust';

export const useSidoDustInfo = (
  place: string,
  options?: UseQueryOptions<CityDustInfo>
) => {
  const { data: sidoDustInfo } = useQuery<CityDustInfo>(
    ['sido-dust-info', place],
    () => getSidoDustInfo(place),
    { ...options, staleTime: 1000 * 60 * 5 }
  );

  return sidoDustInfo;
};

export const useSidoDustInfoList = (
  options?: UseQueryOptions<SidoDustInfo[]>
) => {
  const { data: sidoDustInfoList } = useQuery<SidoDustInfo[]>(
    ['sido-dust-infos'],
    getSidoDustInfos,
    {
      ...options,
      staleTime: 1000 * 60 * 5,
    }
  );

  return sidoDustInfoList;
};

export const useCityDustInfoList = (
  place: string,
  options?: UseQueryOptions<CityDustInfo[]>
) => {
  const { data: cityDustInfoList } = useQuery<CityDustInfo[]>(
    ['city-dust-infos', place],
    () => getCityDustInfos(place),
    {
      ...options,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );

  return cityDustInfoList;
};
