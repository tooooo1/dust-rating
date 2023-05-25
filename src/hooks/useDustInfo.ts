import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getSidoDustInfos } from '@/apis/dustInfo';
import { SidoDustInfo } from '@/types/dust';

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
