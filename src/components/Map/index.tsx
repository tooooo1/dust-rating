import {
  VStack,
  Box,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MapButton from './MapButton';
import { getAirQuality, getAirQualityByCity } from '@/api/airQuality';
import { getAllLocation } from '@/api/location';
import { getDustScaleColor } from '@/utils/map';
import AirPollutionLevels from '@/components/Map/AirPollutionLevels';
import useMap from '@/hooks/useMap';
import DustState from '@/components/Dust/DustState';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';

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
  const mapRef = useRef<HTMLDivElement | null>(null);
  const sidoDustInfoMarkers: kakao.maps.CustomOverlay[] = [];
  const cityDustInfoMarkers: kakao.maps.CustomOverlay[] = [];
  const [city, setCity] = useState('동네 정보를 받아오지 못했어요');
  const [fineDustScale, setFineDustScale] = useState('측정중');
  const [ultraFineDustScale, setUltraFineDustScale] = useState('측정중');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    map,
    zoomLevel,
    currentCity,
    currentLocation,
    handleCurrentLocationChange,
    handleZoomIn,
    handleZoomOut,
    handleFullScreenChange,
  } = useMap({ mapRef });

  const { data: airQualityBySido, isLoading } = useQuery(
    ['air-quality'],
    getAirQuality,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: airQualityByCity } = useQuery<AirQuality[]>(
    ['city-air-quality', currentCity],
    () => getAirQualityByCity(currentCity)
  );

  const { data: allLocation } = useQuery(['all-location'], getAllLocation);

  useEffect(() => {
    document.querySelectorAll('.dust-info-marker').forEach((city) => {
      city.addEventListener('click', onOpen);
      if (city instanceof HTMLElement) {
        setCity(city.id);
        city.dataset.finedustscale
          ? setFineDustScale(city.dataset.finedustscale)
          : '';
        city.dataset.ultrafinedustscale
          ? setUltraFineDustScale(city.dataset.ultrafinedustscale)
          : '';
      }
    });

    return () => {
      document.querySelectorAll('.dust-info-marker').forEach((city) => {
        city.removeEventListener('click', onOpen);
      });
    };
  }, [currentLocation]);

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

        sidoDustInfoMarkers.push(marker);
      }
    );
    sidoDustInfoMarkers.forEach((marker) => {
      marker.setMap(map);
    });

    return () => {
      if (map && sidoDustInfoMarkers.length) {
        sidoDustInfoMarkers.forEach((marker) => {
          marker.setMap(null);
        });
      }
    };
  }, [airQualityBySido, allLocation, sidoDustInfoMarkers]);

  useEffect(() => {
    if (!map || !airQualityByCity) return;

    const geocoder = new kakao.maps.services.Geocoder();

    airQualityByCity.forEach(
      async ({ cityName, fineDustScale, ultraFineDustScale }) => {
        return new Promise(() => {
          geocoder.addressSearch(cityName, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const latitude = Number(result[0].y);
              const longitude = Number(result[0].x);
              const backgroundColor = getDustScaleColor(fineDustScale);
              const template = `
                    <div class="dust-info-marker" id="${cityName}" data-finedustscale="${fineDustScale}" data-ultrafinedustscale="${ultraFineDustScale}" style="background-color: ${backgroundColor};" >
                      <span>${fineDustScale}/${ultraFineDustScale}</span>
                      <p class="city-name">${cityName}</p>
                    </div>`;

              const marker = new kakao.maps.CustomOverlay({
                map,
                position: new kakao.maps.LatLng(latitude, longitude),
                content: template,
              });

              cityDustInfoMarkers.push(marker);
            }
          });
        });
      }
    );

    return () => {
      if (map && cityDustInfoMarkers.length) {
        cityDustInfoMarkers.forEach((marker) => {
          marker.setMap(null);
        });
      }
    };
  }, [airQualityByCity]);

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{city}</ModalHeader>
          <ModalCloseButton borderColor={'#ffffff'} />
          <ModalBody>
            {FINE_DUST}
            <DustState dustDensity={fineDustScale} kindOfDust={'fineDust'} />
            {ULTRA_FINE_DUST}
            <DustState
              dustDensity={ultraFineDustScale}
              kindOfDust={'ultraFineDust'}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              backgroundColor="#53caf2"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Map;
