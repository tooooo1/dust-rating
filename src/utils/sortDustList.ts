import type { CityDustInfo, SidoDustInfo, SortType } from '@/types/dust';
import { FINE_DUST } from './constants/dust';

export const sortDustList = <T extends SidoDustInfo | CityDustInfo>(
  sortType: SortType,
  data: T[]
) => {
  const scaleKey =
    sortType === FINE_DUST ? 'fineDustScale' : 'ultraFineDustScale';

  return data.sort((a, b) => a[scaleKey] - b[scaleKey]);
};
