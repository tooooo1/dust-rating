import { CityDustInfo, SidoDustInfo } from '@/types/dust';

export interface MapAndMakers {
  map: kakao.maps.Map | null;
  markers: kakao.maps.CustomOverlay[];
  dustInfoList: CityDustInfo[] | SidoDustInfo[];
}
