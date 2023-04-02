import Map from '@/components/Map';
import styled from '@emotion/styled';

const DustMapPage = () => {
  return (
    <MapContainer>
      <Map />
    </MapContainer>
  );
};

export default DustMapPage;

const MapContainer = styled.div`
  max-width: 520px;
  width: 100vw;
  height: 100vh;
`;
