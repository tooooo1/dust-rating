import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { VStack, Box, Spinner } from '@chakra-ui/react';
import MapButton from './MapButton';
import { getAirQuality, getAirQualityByCity } from '@/api/airQuality';
import { getAllLocation } from '@/api/location';
import { getDustScaleColor } from '@/utils/map';
import AirPollutionLevels from '@/components/Map/AirPollutionLevels';
import useMap from '@/hooks/useMap';

declare global {
  interface Window {
    kakao: any;
  }
}

interface AirQuality {
  cityName: string;
  fineDustScale: number;
  ultraFineDustScale: number;
}

const MAX_ZOOM_LEVEL = 8;

const Map = () => {
  console.log('재랜더링');
  const mapRef = useRef<HTMLDivElement | null>(null);
  const dustInfoMarkersBySido: kakao.maps.CustomOverlay[] = [];
  const dustInfoMarkersByCity: kakao.maps.CustomOverlay[] = [];

  const {
    map,
    zoomLevel,
    currentCity,
    currentLocation,
    handleCurrentLocationChange,
    handleZoomIn,
    handleZoomOut,
    handleFullScreenChange,
  } = useMap({ mapRef: mapRef });

  const { data: airQualityBySido, isLoading } = useQuery(
    ['air-quality'],
    getAirQuality,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: airQualityByCity, refetch } = useQuery<AirQuality[]>(
    ['city-air-quality'],
    () => getAirQualityByCity(currentCity)
  );

  useEffect(() => {
    refetch();
  }, [currentCity]);

  const { data: allLocation } = useQuery(['all-location'], getAllLocation);

  useEffect(() => {
    if (!map || !airQualityBySido || !allLocation) return;

    airQualityBySido.forEach(
      ({ cityName, fineDustScale, ultraFineDustScale }) => {
        const { latitude, longitude } = allLocation.filter(
          (scale) => scale.cityName === cityName
        )[0];

        const backgroundColor = getDustScaleColor(fineDustScale);
        const template = `
          <div class="dust-info-marker" style="background-color: ${backgroundColor};">
            <p class="city-name">${cityName}</p>
            <div class="dust-info">
              <div>${fineDustScale}</div>
              <span class="divider">&sol;</span>
              <div>${ultraFineDustScale}</div>  
            </div>
          </div>`;

        const marker = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(latitude, longitude),
          content: template,
        });

        dustInfoMarkersBySido.push(marker);
      }
    );
    dustInfoMarkersBySido.forEach((marker) => {
      marker.setMap(map);
    });

    return () => {
      if (map && dustInfoMarkersBySido.length) {
        dustInfoMarkersBySido.forEach((marker) => {
          marker.setMap(null);
        });
      }
    };
  }, [airQualityBySido, allLocation, dustInfoMarkersBySido]);

  useEffect(() => {
    if (!map || !airQualityByCity) return;

    const geocoder = new kakao.maps.services.Geocoder();

    airQualityByCity.forEach(
      ({ cityName, fineDustScale, ultraFineDustScale }) => {
        geocoder.addressSearch(cityName, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const latitude = Number(result[0].y);
            const longitude = Number(result[0].x);
            const backgroundColor = getDustScaleColor(fineDustScale);
            const template = `
                  <div class="dust-info-marker" style="background-color: ${backgroundColor};" >
                    <span>${fineDustScale}/${ultraFineDustScale}</span>
                    <p class="city-name">${cityName}</p>
                  </div>`;

            const marker = new kakao.maps.CustomOverlay({
              map,
              position: new kakao.maps.LatLng(latitude, longitude),
              content: template,
            });

            dustInfoMarkersByCity.push(marker);
          }
        });
      }
    );

    return () => {
      if (map && dustInfoMarkersByCity.length) {
        dustInfoMarkersByCity.forEach((marker) => {
          marker.setMap(null);
        });
      }
    };
  }, [airQualityByCity]);

  const tempClick = () => {
    alert('clicked');
  };

  useEffect(() => {
    if (!document.querySelectorAll('.dust-info-marker')) return;

    document.querySelectorAll('.dust-info-marker').forEach((value) => {
      value.removeEventListener('click', tempClick);
      value.addEventListener('click', tempClick);
    });
  }, [currentLocation]);

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
      </VStack>
      <Box position="absolute" bottom="1.5rem" zIndex={10}>
        <AirPollutionLevels />
      </Box>
    </Box>
  );
};

export default Map;
