import { SetStateAction, Dispatch } from 'react';
import MarkerTemplate from '@/components/Map/MakerTemplate';
import { CityDustInfo } from '@/types/dust';

interface makeCityMakerProps {
  map: kakao.maps.Map | null;
  cityDustInfoList: CityDustInfo[];
  cityDustInfoMarkers: kakao.maps.CustomOverlay[];
  setCityDustInfoMarkers: Dispatch<SetStateAction<kakao.maps.CustomOverlay[]>>;
}

export const makeCityMaker = ({
  map,
  cityDustInfoList,
  cityDustInfoMarkers,
  setCityDustInfoMarkers,
}: makeCityMakerProps) => {
  if (!map) return;

  const geocoder = new kakao.maps.services.Geocoder();

  cityDustInfoList.forEach(
    ({
      location,
      fineDustScale,
      fineDustGrade,
      ultraFineDustScale,
      ultraFineDustGrade,
    }) => {
      geocoder.addressSearch(location, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const latitude = Number(result[0].y);
          const longitude = Number(result[0].x);

          const template = MarkerTemplate({
            location,
            fineDustScale,
            fineDustGrade,
            ultraFineDustScale,
            ultraFineDustGrade,
          });

          const marker = new kakao.maps.CustomOverlay({
            map,
            position: new kakao.maps.LatLng(latitude, longitude),
            content: template,
          });

          if (
            !cityDustInfoMarkers.find(
              (value) => value.getPosition() === marker.getPosition()
            )
          )
            setCityDustInfoMarkers((prev) => [...prev, marker]);
        }
      });
    }
  );
};
