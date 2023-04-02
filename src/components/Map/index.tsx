import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import CurrentLocationButton from './currentLocationButton';

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LOCATION = { latitude: 37.5665, longitude: 126.978 };

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [location, setLocation] = useState(DEFAULT_LOCATION);

  useEffect(() => {
    kakao.maps.load(() => {
      if (!mapRef.current) return;

      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 5,
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
            content: `<div class="circle-marker"></div>`,
          });

          currentLocationMarker.setMap(kakaoMap);

          kakaoMap.setCenter(new kakao.maps.LatLng(latitude, longitude));
        });

      kakaoMap.setMaxLevel(10);

      setMap(kakaoMap);
    });
  }, []);

  const handleCurrentLocationChange = () => {
    kakao.maps.load(() => {
      if (!map) return;

      map.setCenter(
        new kakao.maps.LatLng(location.latitude, location.longitude)
      );
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
      <CurrentLocationButton onClick={handleCurrentLocationChange} />
    </Box>
  );
};

export default Map;
