import type {
  CityDustInfo,
  SidoDustInfo,
  DustType,
  SortType,
} from '@/types/dust';
import { FINE_DUST } from './constants/dust';
import { ASCENDING } from './constants';

export const sortDustList = <T extends SidoDustInfo | CityDustInfo>(
  DustType: DustType,
  sortType: SortType,
  data: T[]
) => {
  const scaleKey =
    DustType === FINE_DUST ? 'fineDustScale' : 'ultraFineDustScale';

  return data.sort((a, b) => {
    const A = a[scaleKey];
    const B = b[scaleKey];
    return sortType === ASCENDING ? A - B : B - A;
  });
};
