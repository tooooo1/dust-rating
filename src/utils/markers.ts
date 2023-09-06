import type { SetStateAction, Dispatch } from 'react';
import type { MapAndMarkers } from '@/types/map';
import { NOT_FOUND_LOCATION } from '@/utils/constants';
import makeMarkerTemplate from '@/utils/makeMarkerTemplate';

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
    geocoder.addressSearch(dustInfoItem.location, ([result], status) => {
      if (status !== kakao.maps.services.Status.OK) return;

      const latitude = Number(result.y);
      const longitude = Number(result.x);

      const template = makeMarkerTemplate(dustInfoItem);

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
    const { latitude, longitude } =
      allLocation.find((scale) => scale.location === dustInfoItem.location) ||
      NOT_FOUND_LOCATION;

    const template = makeMarkerTemplate(dustInfoItem);

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
