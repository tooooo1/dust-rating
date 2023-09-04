import type { SetStateAction, Dispatch } from 'react';
import MarkerTemplate from '@/components/Map/MarkerTemplate';
import type { MapAndMarkers } from '@/types/map';

interface MakeCityMarker extends MapAndMarkers {
  setCityDustInfoMarkers: Dispatch<SetStateAction<kakao.maps.CustomOverlay[]>>;
}

interface MakeSidoMarker extends MapAndMarkers {
  allLocation: {
    location: string;
    latitude: number;
    longitude: number;
  }[];
}

export const makeCityMarker = ({
  map,
  dustInfoList,
  markers,
  setCityDustInfoMarkers,
}: MakeCityMarker) => {
  if (!map) return;

  const geocoder = new kakao.maps.services.Geocoder();

  dustInfoList.forEach((dustInfoItem) => {
    geocoder.addressSearch(dustInfoItem.location, (result, status) => {
      if (status !== kakao.maps.services.Status.OK) return;

      const latitude = Number(result[0].y);
      const longitude = Number(result[0].x);

      const template = MarkerTemplate(dustInfoItem);

      const marker = new kakao.maps.CustomOverlay({
        map,
        position: new kakao.maps.LatLng(latitude, longitude),
        content: template,
      });

      if (
        !markers.find((value) => value.getPosition() === marker.getPosition())
      )
        setCityDustInfoMarkers((prev) => [...prev, marker]);
    });
  });
};

export const makeSidoMarker = ({
  map,
  dustInfoList,
  allLocation,
  markers,
}: MakeSidoMarker) => {
  if (!map || !dustInfoList || !allLocation) return;

  dustInfoList.forEach((dustInfoItem) => {
    const { latitude, longitude } = allLocation.find(
      (scale) => scale.location === dustInfoItem.location
    ) || { latitude: 0, longitude: 0 };

    const template = MarkerTemplate(dustInfoItem);

    const marker = new kakao.maps.CustomOverlay({
      clickable: true,
      position: new kakao.maps.LatLng(latitude, longitude),
      content: template,
    });

    markers.push(marker);
  });

  markers.forEach((marker) => {
    marker.setMap(map);
  });
};

export const removeMarker = ({
  map,
  markers,
}: Omit<MapAndMarkers, 'dustInfoList'>) => {
  if (map && markers.length) {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
  }
};
