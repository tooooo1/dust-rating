import type { CityDustInfo, SidoDustInfo, DustType } from '@/types/dust';
import { FINE_DUST } from './constants/dust';

export const sortDustList = <T extends SidoDustInfo | CityDustInfo>(
  DustType: DustType,
  data: T[]
) => {
  const scaleKey =
    DustType === FINE_DUST ? 'fineDustScale' : 'ultraFineDustScale';

  return data.sort((a, b) => a[scaleKey] - b[scaleKey]);
};
