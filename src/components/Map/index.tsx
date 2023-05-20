/* global kakao */
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
import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSidoDustInfos, getCityDustInfos } from '@/apis/dustInfo';
import { getAllLocation } from '@/apis/location';
import DustLevel from '@/components/common/DustLevel';
import DustState from '@/components/common/DustState';
import useMap from '@/hooks/useMap';
import theme from '@/styles/theme';
import type { CityDustInfo, MarkerInfo } from '@/types/dust';
import type { MapAndMakers } from '@/types/map';
import {
  FINE_DUST,
  ULTRA_FINE_DUST,
  DUST_GRADE,
  CITY_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  COLOR_MARKER_MOUSE_OVER,
  COLOR_MARKER_MOUSE_OUT,
  ZINDEX_MARKER_MOUSE_OVER,
  ZINDEX_MARKER_MOUSE_OUT,
  ROUTE,
} from '@/utils/constants';
import { getDustAverageGrade } from '@/utils/dustGrade';
import ControlButton from './ControlButton';

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
  const navigate = useNavigate();

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

  const makeMarkerTemplate = ({
    name,
    fineDustScale,
    fineDustGrade,
    ultraFineDustScale,
    ultraFineDustGrade,
  }: MarkerInfo) => {
    const averageGrade = getDustAverageGrade(fineDustGrade, ultraFineDustGrade);
    const backgroundColor = theme.colors[DUST_GRADE[averageGrade]];

    return `
          <div class="dust-info-marker" id="${name}" data-finedustgrade="${fineDustGrade}" data-ultrafinedustgrade="${ultraFineDustGrade}" style="background-color: ${backgroundColor};">
            <p class="city-name">${name}</p>
            <div class="dust-info">
              <div>${fineDustScale}</div>
              <span class="divider">/</span>
              <div>${ultraFineDustScale}</div>  
            </div>            
          </div>
    `;
  };

  const setMakerToNull = ({ map, markers }: MapAndMakers) => {
    if (map && markers.length) {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
    }
  };

  useEffect(() => {
    if (!map || !sidoDustInfos || !allLocation) return;

    sidoDustInfos.forEach(
      ({
        sidoName,
        fineDustScale,
        fineDustGrade,
        ultraFineDustScale,
        ultraFineDustGrade,
      }) => {
        const { latitude, longitude } = allLocation.find(
          (scale) => scale.sidoName === sidoName
        ) || { latitude: 0, longitude: 0 };

        const template = makeMarkerTemplate({
          name: sidoName,
          fineDustScale,
          fineDustGrade,
          ultraFineDustScale,
          ultraFineDustGrade,
        });

        const marker = new kakao.maps.CustomOverlay({
          clickable: true,
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
      setMakerToNull({ map, markers: sidoDustInfoMarkers });
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
        fineDustGrade,
        ultraFineDustScale,
        ultraFineDustGrade,
      }) => {
        geocoder.addressSearch(cityName, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const latitude = Number(result[0].y);
            const longitude = Number(result[0].x);

            const template = makeMarkerTemplate({
              name: cityName,
              fineDustScale,
              fineDustGrade,
              ultraFineDustScale,
              ultraFineDustGrade,
            });

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
      setMakerToNull({ map, markers: cityDustInfoMarkers });
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

  const handleClickForeCastButton = () => {
    navigate(
      `${ROUTE.DUST_FORECAST}?sido=${encodeURIComponent(
        currentCity
      )}&city=${encodeURIComponent(city)}`
    );
  };

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
        <ControlButton
          type="current-location"
          onClick={handleCurrentLocationChange}
        />
        <ControlButton type="zoom-in" onClick={handleZoomIn} />
        <ControlButton type="zoom-out" onClick={handleZoomOut} />
        <ControlButton
          type="full-screen"
          onClick={() => handleFullScreenChange(cityDustInfoMarkers)}
        />
        {zoomLevel === MAX_ZOOM_LEVEL && sidoDustInfosIsLoading && <Spinner />}
      </VStack>
      {cityDustInfosIsLoading ? <Spinner zIndex={10} /> : ''}
      <Box position="absolute" bottom="1.5rem" zIndex={10}>
        <DustLevel direction="column" />
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
              onClick={handleClickForeCastButton}
              backgroundColor="#53caf2"
            >
              예보 페이지로 이동하기
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              backgroundColor="#53caf2"
            >
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Map;
