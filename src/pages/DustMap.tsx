import styled from '@emotion/styled';
import Map from '@/components/Map';

const DustMapPage = () => {
  return (
    <MapContainer>
      <Map />
    </MapContainer>
  );
};

export default DustMapPage;

const MapContainer = styled.div`
  max-width: 37.5rem;
  width: 100vw;
  height: 100vh;
`;
