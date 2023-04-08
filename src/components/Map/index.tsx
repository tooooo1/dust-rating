import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MapButton from './MapButton';
import DustInfo from './DustInfo';
import { VStack, Box, Spinner } from '@chakra-ui/react';
import { getAirQuality } from '@/api/airQuality';
import { INIT_LOCATION } from '@/utils/constance';

declare global {
  interface Window {
    kakao: any;
  }
}

const MAX_ZOOM_LEVEL = 13;
const INIT_ZOOM_LEVEL = 5;

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [location, setLocation] = useState(INIT_LOCATION);
  const [zoomLevel, setZoomLevel] = useState(INIT_ZOOM_LEVEL);

  useEffect(() => {
    kakao.maps.load(() => {
      if (!mapRef.current) return;

      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: INIT_ZOOM_LEVEL,
      };

      const kakaoMap = new kakao.maps.Map(mapRef.current, options);

      kakaoMap.setCenter(
        new kakao.maps.LatLng(location.latitude, location.longitude)
      );

      navigator.geolocation &&
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation(position.coords);

          const { latitude, longitude } = position.coords;

          const currentLocationMarker = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(latitude, longitude),
            content: `<div class="circle-marker" />`,
          });

          currentLocationMarker.setMap(kakaoMap);

          kakaoMap.setCenter(new kakao.maps.LatLng(latitude, longitude));
        });

      kakaoMap.setMaxLevel(MAX_ZOOM_LEVEL);

      setMap(kakaoMap);
    });
  }, []);

  useEffect(() => {
    kakao.maps.load(() => {
      if (!map) return;

      kakao.maps.event.addListener(map, 'zoom_changed', () => {
        const zoomLevel = map.getLevel();
        setZoomLevel(zoomLevel);
      });
    });
  }, [map]);

  const { data, isLoading } = useQuery(['airQuality'], getAirQuality, {
    enabled: zoomLevel === MAX_ZOOM_LEVEL,
  });

  const handleCurrentLocationChange = () => {
    kakao.maps.load(() => {
      if (!map) return;

      map.setCenter(
        new kakao.maps.LatLng(location.latitude, location.longitude)
      );
    });
  };

  const handleZoomIn = () => {
    kakao.maps.load(() => {
      if (!map) return;

      const zoomLevel = map.getLevel();
      map.setLevel(zoomLevel - 1, { animate: true });
    });
  };

  const handleZoomOut = () => {
    kakao.maps.load(() => {
      if (!map) return;

      const zoomLevel = map.getLevel();
      map.setLevel(zoomLevel + 1, { animate: true });
    });
  };

  const handleFullScreenChange = () => {
    kakao.maps.load(() => {
      if (!map) return;

      map.setLevel(MAX_ZOOM_LEVEL, { animate: true });
    });
  };

  return (
    <Box position="relative" width="100%" height="100%">
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <VStack position="absolute" top="1rem" right="1rem" zIndex={10}>
        <MapButton
          type="current-location"
          onClick={handleCurrentLocationChange}
        />
        <MapButton type="zoom-in" onClick={handleZoomIn} />
        <MapButton type="zoom-out" onClick={handleZoomOut} />
        <MapButton type="full-screen" onClick={handleFullScreenChange} />
        {zoomLevel === MAX_ZOOM_LEVEL && isLoading && <Spinner />}
        {zoomLevel === MAX_ZOOM_LEVEL &&
          !isLoading &&
          data &&
          data.map((v) => (
            <DustInfo
              key={v.cityName}
              area={v.cityName}
              fineDust={v.fineDustScale}
              ultraFineDust={v.ultraFineDustScale}
            />
          ))}
      </VStack>
    </Box>
  );
};

export default Map;
