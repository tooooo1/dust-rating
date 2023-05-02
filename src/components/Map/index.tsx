import { useEffect, useRef, useState, useCallback } from 'react';
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
import { useQuery } from '@tanstack/react-query';
import MapButton from './MapButton';
import AirPollutionLevels from '@/components/Map/AirPollutionLevels';
import DustState from '@/components/Dust/DustState';
import { getAllLocation } from '@/apis/location';
import { getSidoDustInfos, getCityDustInfos } from '@/apis/dustInfo';
import { getDustScaleColor } from '@/utils/map';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import {
  COLOR_MARKER_MOUSE_OUT,
  COLOR_MARKER_MOUSE_OVER,
  ZINDEX_MARKER_MOUSE_OUT,
  ZINDEX_MARKER_MOUSE_OVER,
} from '@/utils/map';
import useMap from '@/hooks/useMap';
import { MAX_ZOOM_LEVEL, CITY_ZOOM_LEVEL } from '@/utils/map';
import type { CityDustInfo } from '@/types/dust';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const sidoDustInfoMarkers: kakao.maps.CustomOverlay[] = [];
  const [cityDustInfoMarkers, setCityDustInfoMarkers] = useState<
    kakao.maps.CustomOverlay[]
  >([]);
  const [city, setCity] = useState('동네 정보를 받아오지 못했어요');
  const [fineDustScale, setFineDustScale] = useState(0);
  const [ultraFineDustScale, setUltraFineDustScale] = useState(0);
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
  } = useMap({ mapRef, cityDustInfoMarkers });

  const { data: sidoDustInfos, isLoading: sidoDustInfosIsLoading } = useQuery(
    ['sido-dust-infos'],
    getSidoDustInfos,
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: cityDustInfos, isLoading: cityDustInfosIsLoading } = useQuery<
    CityDustInfo[]
  >(['city-dust-infos', currentCity], () => getCityDustInfos(currentCity), {
    staleTime: 1000 * 60 * 5,
  });

  const { data: allLocation } = useQuery(['all-location'], getAllLocation, {
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!map || !sidoDustInfos || !allLocation) return;

    sidoDustInfos.forEach(({ sidoName, fineDustScale, ultraFineDustScale }) => {
      const { latitude, longitude } = allLocation.filter(
        (scale) => scale.sidoName === sidoName
      )[0];

      const backgroundColor = getDustScaleColor(fineDustScale);
      const template = `
          <div class="dust-info-marker" style="background-color: ${backgroundColor};">
            <p class="city-name">${sidoName}</p>
            <div class="dust-info">
              <div>${fineDustScale}</div>
              <span class="divider">&sol;</span>
              <div>${ultraFineDustScale}</div>  
            </div>
          </div>`;

      const marker = new kakao.maps.CustomOverlay({
        clickable: true,
        position: new kakao.maps.LatLng(latitude, longitude),
        content: template,
      });

      sidoDustInfoMarkers.push(marker);
    });

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
  }, [sidoDustInfos, allLocation, sidoDustInfoMarkers]);

  useEffect(() => {
    if (
      !map ||
      !cityDustInfos ||
      cityDustInfosIsLoading ||
      (CITY_ZOOM_LEVEL <= zoomLevel && zoomLevel <= MAX_ZOOM_LEVEL)
    )
      return;

    const geocoder = new kakao.maps.services.Geocoder();

    cityDustInfos.forEach(
      ({
        cityName,
        fineDustScale,
        ultraFineDustScale,
        fineDustGrade,
        ultraFineDustGrade,
      }) => {
        geocoder.addressSearch(cityName, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const latitude = Number(result[0].y);
            const longitude = Number(result[0].x);
            const backgroundColor = getDustScaleColor(fineDustScale);
            const template = `
                  <div class="dust-info-marker" id="${cityName}" data-finedustgrade="${fineDustGrade}" data-ultrafinedustgrade="${ultraFineDustGrade}" style="background-color: ${backgroundColor};" >
                    <span>${fineDustScale}/${ultraFineDustScale}</span>                  
                    <p class="city-name">${cityName}</p>                  
                  </div>`;

            const marker = new kakao.maps.CustomOverlay({
              map,
              position: new kakao.maps.LatLng(latitude, longitude),
              content: template,
            });

            if (
              !cityDustInfoMarkers.find(
                (value) => value.getPosition() === marker.getPosition()
              )
            )
              setCityDustInfoMarkers((prev) => [...prev, marker]);
          }
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
  }, [cityDustInfos]);

  const handleClickMarker = useCallback((city: HTMLDivElement) => {
    setCity(city.id);
    if (city.dataset.finedustgrade) {
      setFineDustScale(+city.dataset.finedustgrade);
    }
    if (city.dataset.ultrafinedustgrade) {
      setUltraFineDustScale(+city.dataset.ultrafinedustgrade);
    }
    onOpen();
  }, []);

  const handleMouseOverMarker = useCallback((city: HTMLDivElement) => {
    city.style.color = COLOR_MARKER_MOUSE_OVER;
    if (city.parentElement) {
      city.parentElement.style.zIndex = ZINDEX_MARKER_MOUSE_OVER;
    }
  }, []);

  const handleMouseOutMarker = useCallback((city: HTMLDivElement) => {
    city.style.color = COLOR_MARKER_MOUSE_OUT;
    if (city.parentElement) {
      city.parentElement.style.zIndex = ZINDEX_MARKER_MOUSE_OUT;
    }
  }, []);

  useEffect(() => {
    document
      .querySelectorAll<HTMLDivElement>('.dust-info-marker')
      .forEach((city) => {
        city.onclick = () => handleClickMarker(city);
        city.onmouseover = () => handleMouseOverMarker(city);
        city.onmouseout = () => handleMouseOutMarker(city);
      });

    return () => {
      document
        .querySelectorAll<HTMLDivElement>('.dust-info-marker')
        .forEach((city) => {
          city.removeEventListener('click', () => handleClickMarker(city));
          city.removeEventListener('mouseover', () =>
            handleMouseOverMarker(city)
          );
          city.removeEventListener('mouseout', () =>
            handleMouseOutMarker(city)
          );
        });
    };
  }, [cityDustInfoMarkers, currentLocation, zoomLevel]);

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
        <MapButton
          type="full-screen"
          onClick={() => handleFullScreenChange(cityDustInfoMarkers)}
        />
        {zoomLevel === MAX_ZOOM_LEVEL && sidoDustInfosIsLoading && <Spinner />}
      </VStack>
      {cityDustInfosIsLoading ? <Spinner zIndex={10} /> : ''}
      <Box position="absolute" bottom="1.5rem" zIndex={10}>
        <AirPollutionLevels direction="column" />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{city}</ModalHeader>
          <ModalCloseButton borderColor={'#ffffff'} />
          <ModalBody>
            {FINE_DUST}
            <DustState dustGrade={fineDustScale} />
            {ULTRA_FINE_DUST}
            <DustState dustGrade={ultraFineDustScale} />
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
