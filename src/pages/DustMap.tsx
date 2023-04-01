import { useState, useEffect } from 'react';
import Map from '@/components/Map';
import styled from '@emotion/styled';

const DEFAULT_LOC = { latitude: 37.5665, longitude: 126.978 };

const DustMapPage = () => {
  const [latitude, setLatitude] = useState(DEFAULT_LOC.latitude);
  const [longitude, setLongitude] = useState(DEFAULT_LOC.longitude);

  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      });
  }, []);

  return (
    <MapContainer>
      <Map latitude={latitude} longitude={longitude} />
    </MapContainer>
  );
};

export default DustMapPage;

const MapContainer = styled.div`
  max-width: 520px;
  width: 100vw;
  height: 100vh;
`;
