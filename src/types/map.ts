import { CityDustInfo, SidoDustInfo } from '@/types/dust';

export interface MapAndMarkers {
  map: kakao.maps.Map | null;
  markers: kakao.maps.CustomOverlay[];
  dustInfoList: CityDustInfo[] | SidoDustInfo[];
}
