import { useEffect, useState, RefObject } from 'react';
import { INIT_LOCATION, CENTER_LOCATION, SIDO_GROUP } from '@/utils/constants';

const INIT_ZOOM_LEVEL = 5;
const MAX_ZOOM_LEVEL = 8;

interface useMapProps {
  mapRef: RefObject<HTMLElement>;
}

const useMap = ({ mapRef }: useMapProps) => {
  const [myDeviceLocation, setMyDeviceLocation] = useState(INIT_LOCATION);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [zoomLevel, setZoomLevel] = useState(INIT_ZOOM_LEVEL);
  const [currentCity, setCurrentCity] = useState(SIDO_GROUP[0].sidoName); // 서울
  const [currentLocation, setCurrentLocation] = useState(INIT_LOCATION); // 지도를 움직이면 변화하는 위치

  useEffect(() => {
    kakao.maps.load(() => {
      const success = (pos: GeolocationPosition) => {
        if (!mapRef.current) return;

        setMyDeviceLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          pos.coords.longitude,
          pos.coords.latitude,
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              setCurrentCity(result[0].address.address_name.split(' ')[0]);
            }
          }
        );

        const options = {
          center: new kakao.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
          ),
          level: INIT_ZOOM_LEVEL,
        };

        const kakaoMap = new kakao.maps.Map(mapRef.current, options);

        const currentLocationMarker = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
          ),
          content: `<div class="circle-marker" />`,
        });

        currentLocationMarker.setMap(kakaoMap);
        kakaoMap.setMaxLevel(MAX_ZOOM_LEVEL);
        setMap(kakaoMap);
      };

      const error = () => {
        if (!mapRef.current) return;

        const options = {
          center: new kakao.maps.LatLng(
            INIT_LOCATION.latitude,
            INIT_LOCATION.longitude
          ),
          level: INIT_ZOOM_LEVEL,
        };

        const kakaoMap = new kakao.maps.Map(mapRef.current, options);

        const currentLocationMarker = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(
            INIT_LOCATION.latitude,
            INIT_LOCATION.longitude
          ),
          content: `<div class="circle-marker" />`,
        });

        currentLocationMarker.setMap(kakaoMap);
        kakaoMap.setMaxLevel(MAX_ZOOM_LEVEL);
        setMap(kakaoMap);
      };
      navigator.geolocation.getCurrentPosition(success, error);
    });
  }, []);

  useEffect(() => {
    if (!map) return;

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      const zoomLevel = map.getLevel();
      setZoomLevel(zoomLevel);
    });

    const geocoder = new kakao.maps.services.Geocoder();

    kakao.maps.event.addListener(map, 'dragend', () => {
      const coords = map.getCenter();
      const [latitude, longitude] = [coords.getLat(), coords.getLng()];
      setCurrentLocation({ latitude, longitude });

      geocoder.coord2Address(
        coords.getLng(),
        coords.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setCurrentCity(result[0].address.address_name.split(' ')[0]);
          }
        }
      );
    });
  }, [map]);

  const handleCurrentLocationChange = () => {
    if (!map) return;

    map.setLevel(INIT_ZOOM_LEVEL, { animate: true });
    map.setCenter(
      new kakao.maps.LatLng(
        myDeviceLocation.latitude,
        myDeviceLocation.longitude
      )
    );
  };

  const handleZoomIn = () => {
    if (!map) return;

    const zoomLevel = map.getLevel();
    map.setLevel(zoomLevel - 1, { animate: true });
  };

  const handleZoomOut = () => {
    if (!map) return;

    const zoomLevel = map.getLevel();
    map.setLevel(zoomLevel + 1, { animate: true });
  };

  const handleFullScreenChange = () => {
    if (!map) return;

    map.setLevel(MAX_ZOOM_LEVEL, { animate: true });
    map.setCenter(
      new kakao.maps.LatLng(CENTER_LOCATION.latitude, CENTER_LOCATION.longitude)
    );
  };

  return {
    map,
    zoomLevel,
    currentCity,
    currentLocation,
    handleCurrentLocationChange,
    handleZoomIn,
    handleZoomOut,
    handleFullScreenChange,
  };
};

export default useMap;
