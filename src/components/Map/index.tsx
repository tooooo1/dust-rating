/* global kakao */
import { VStack, Box, Spinner, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLocation } from '@/apis/location';
import { DustLevel } from '@/components/common';
import MarkerModal from '@/components/Map/MarkerModal';
import {
  useCityDustInfoListQuery,
  useSidoDustInfoListQuery,
} from '@/hooks/useDustInfoQuery';
import useMap from '@/hooks/useMap';
import {
  CITY_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  COLOR_MARKER_MOUSE_OVER,
  COLOR_MARKER_MOUSE_OUT,
  ZINDEX_MARKER_MOUSE_OVER,
  ZINDEX_MARKER_MOUSE_OUT,
  ROUTE,
  SIDO_NAMES,
  INIT_DUST_INFO,
  INIT_DUST_SCALE,
  INIT_DUST_GRADE,
  ERROR_MESSAGE,
  INIT_ZINDEX,
} from '@/utils/constants';
import { makeCityMarker, makeSidoMarker, removeMarker } from '@/utils/markers';
import ControlButton from './ControlButton';

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [cityDustInfoMarkers, setCityDustInfoMarkers] = useState<
    kakao.maps.CustomOverlay[]
  >([]);
  const [selectedSidoOrCity, setSelectedSidoOrCity] = useState<string>(
    ERROR_MESSAGE.NO_CITY_DATA
  );
  const [dustInfo, setDustInfo] = useState(INIT_DUST_INFO);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    map,
    zoomLevel,
    currentSido,
    currentLocation,
    handleCurrentLocationChange,
    handleZoomIn,
    handleZoomOut,
    handleFullScreenChange,
  } = useMap({ mapRef, cityDustInfoMarkers });
  const navigate = useNavigate();

  const sidoDustInfoList = useSidoDustInfoListQuery({
    refetchOnWindowFocus: false,
  });

  const cityDustInfoList = useCityDustInfoListQuery(currentSido);

  const { data: allLocation } = useQuery(['all-location'], getAllLocation);

  useEffect(() => {
    if (!map || !sidoDustInfoList || !allLocation) return;

    const sidoDustInfoMarkers: kakao.maps.CustomOverlay[] = [];

    makeSidoMarker({
      map,
      markers: sidoDustInfoMarkers,
      dustInfoList: sidoDustInfoList,
      allLocation,
    });

    return () => {
      removeMarker({ map, markers: sidoDustInfoMarkers });
    };
  }, [sidoDustInfoList, allLocation]);

  useEffect(() => {
    if (
      !map ||
      !cityDustInfoList ||
      (CITY_ZOOM_LEVEL <= zoomLevel && zoomLevel <= MAX_ZOOM_LEVEL)
    )
      return;

    makeCityMarker({
      map,
      markers: cityDustInfoMarkers,
      dustInfoList: cityDustInfoList,
      setCityDustInfoMarkers,
    });

    return () => {
      removeMarker({ map, markers: cityDustInfoMarkers });
    };
  }, [cityDustInfoList]);

  // 마커에 이벤트 추가, 제거
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
  }, [currentLocation, cityDustInfoMarkers, zoomLevel]);

  const handleClickMarker = useCallback((city: HTMLDivElement) => {
    setSelectedSidoOrCity(city.id);

    const nextDustInfo = {
      fineDustScale: Number(city.dataset.finedustscale) || INIT_DUST_SCALE,
      fineDustGrade: Number(city.dataset.finedustgrade) || INIT_DUST_GRADE,
      ultraFineDustScale: Number(
        city.dataset.ultrafinedustscale || INIT_DUST_SCALE
      ),
      ultraFineDustGrade: Number(
        city.dataset.ultrafinedustgrade || INIT_DUST_GRADE
      ),
    };

    setDustInfo(nextDustInfo);
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
    SIDO_NAMES.includes(selectedSidoOrCity)
      ? navigate(`${ROUTE.RANKING}/${selectedSidoOrCity}`)
      : navigate(
          `${ROUTE.DUST_FORECAST}?sido=${currentSido}&city=${selectedSidoOrCity}`
        );
  };

  const handleClickGoBack = () => {
    navigate(-1);
  };

  return (
    <Box position="relative" width="100%" height="100%" ref={mapRef}>
      <Box position="absolute" top="1rem" left="1rem" zIndex={INIT_ZINDEX}>
        <ControlButton type="go-back" onClick={handleClickGoBack} />
      </Box>
      <VStack position="absolute" top="1rem" right="1rem" zIndex={INIT_ZINDEX}>
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
        {zoomLevel === MAX_ZOOM_LEVEL && !sidoDustInfoList && <Spinner />}
      </VStack>
      {!cityDustInfoList ? <Spinner zIndex={INIT_ZINDEX} /> : ''}
      <Box position="absolute" bottom="1.5rem" zIndex={INIT_ZINDEX}>
        <DustLevel direction="column" />
      </Box>
      <MarkerModal
        city={selectedSidoOrCity}
        dustInfo={dustInfo}
        handleClickForeCastButton={handleClickForeCastButton}
        isOpen={isOpen}
        handleClose={onClose}
      />
    </Box>
  );
};

export default Map;
