import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { VStack, Box, Spinner } from '@chakra-ui/react';
import MapButton from './MapButton';
import { getAirQuality, getAirQualityByCity } from '@/api/airQuality';
import { getAllLocation } from '@/api/location';
import { INIT_LOCATION, CENTER_LOCATION } from '@/utils/constants';
import { getDustScaleColor } from '@/utils/map';
import AirPollutionLevels from '@/components/Map/AirPollutionLevels';

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

const INIT_ZOOM_LEVEL = 5;
const MAX_ZOOM_LEVEL = 8;

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const dustInfoMarkersBySido: kakao.maps.CustomOverlay[] = [];
  const dustInfoMarkersByCity: kakao.maps.CustomOverlay[] = [];
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [location, setLocation] = useState(INIT_LOCATION);
  const [zoomLevel, setZoomLevel] = useState(INIT_ZOOM_LEVEL);
  const [currentCity, setCurrentCity] = useState('서울');

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

      const geocoder = new kakao.maps.services.Geocoder();

      kakao.maps.event.addListener(map, 'dragend', function () {
        const coords = map.getCenter();

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
    });
  }, [map]);

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
    kakao.maps.load(() => {
      if (!map) return;
      if (!airQualityBySido) return;
      if (!allLocation) return;

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
    kakao.maps.load(() => {
      if (!map) return;
      if (!airQualityByCity) return;

      const geocoder = new kakao.maps.services.Geocoder();
      airQualityByCity.forEach(
        ({ cityName, fineDustScale, ultraFineDustScale }) => {
          geocoder.addressSearch(cityName, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const latitude = Number(result[0].y);
              const longitude = Number(result[0].x);

              const backgroundColor = getDustScaleColor(fineDustScale);
              const template = `
              <div class="dust-info-marker" style="background-color: ${backgroundColor};">
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
      dustInfoMarkersByCity.forEach((marker) => {
        marker.setMap(map);
      });
    });
    return () => {
      if (map && dustInfoMarkersByCity.length) {
        dustInfoMarkersByCity.forEach((marker) => {
          marker.setMap(null);
        });
      }
    };
  }, [airQualityByCity]);

  const handleCurrentLocationChange = () => {
    kakao.maps.load(() => {
      if (!map) return;

      map.setLevel(INIT_ZOOM_LEVEL, { animate: true });
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
      map.setCenter(
        new kakao.maps.LatLng(
          CENTER_LOCATION.latitude,
          CENTER_LOCATION.longitude
        )
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
