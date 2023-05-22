import { CityDustInfo, SidoDustInfo, SortType } from '@/types/dust';
import { FINE_DUST, ULTRA_FINE_DUST } from './constants/dust';

export const sortDustList = <T extends SidoDustInfo | CityDustInfo>(
  sortType: SortType,
  data: T[]
) => {
  if (sortType === FINE_DUST) {
    return data?.sort((prev, cur) => prev.fineDustScale - cur.fineDustScale);
  }
  if (sortType === ULTRA_FINE_DUST) {
    return data?.sort(
      (prev, cur) => prev.ultraFineDustScale - cur.ultraFineDustScale
    );
  }
};
