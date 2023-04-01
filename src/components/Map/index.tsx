import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map = ({ latitude, longitude }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    kakao.maps.load(() => {
      if (!mapRef.current) return;

      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 5,
      };

      const kakaoMap = new kakao.maps.Map(mapRef.current, options);
    });
  }, [latitude, longitude]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Map;
