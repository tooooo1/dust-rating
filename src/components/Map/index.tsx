/* global kakao */
import { VStack, Box, Spinner, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLocation } from '@/apis/location';
import { DustLevel } from '@/components/common';
import MakerModal from '@/components/Map/MarkerModal';
import {
  useCityDustInfoListQuery,
  useSidoDustInfoListQuery,
} from '@/hooks/useDustInfoQuery';
import useMap from '@/hooks/useMap';
import type { MapAndMakers } from '@/types/map';
import {
  CITY_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  COLOR_MARKER_MOUSE_OVER,
  COLOR_MARKER_MOUSE_OUT,
  ZINDEX_MARKER_MOUSE_OVER,
  ZINDEX_MARKER_MOUSE_OUT,
  ROUTE,
  SIDO_NAMES,
} from '@/utils/constants';
import { makeCityMaker, makeSidoMaker } from '@/utils/makers';
import ControlButton from './ControlButton';

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [cityDustInfoMarkers, setCityDustInfoMarkers] = useState<
    kakao.maps.CustomOverlay[]
  >([]);
  const [city, setCity] = useState('동네 정보를 받아오지 못했어요');
  const [dustInfo, setDustInfo] = useState({
    fineDustScale: 0,
    fineDustGrade: 0,
    ultraFineDustScale: 0,
    ultraFineDustGrade: 0,
  });
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

  const { data: allLocation } = useQuery(['all-location'], getAllLocation, {
    staleTime: 1000 * 60 * 5,
  });

  const setMakerToNull = ({ map, markers }: MapAndMakers) => {
    if (map && markers.length) {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
    }
  };

  useEffect(() => {
    if (!map || !sidoDustInfoList || !allLocation) return;

    const sidoDustInfoMarkers: kakao.maps.CustomOverlay[] = [];

    makeSidoMaker({
      map,
      sidoDustInfoList,
      allLocation,
      sidoDustInfoMarkers,
    });

    return () => {
      setMakerToNull({ map, markers: sidoDustInfoMarkers });
    };
  }, [sidoDustInfoList, allLocation]);

  useEffect(() => {
    if (
      !map ||
      !cityDustInfoList ||
      (CITY_ZOOM_LEVEL <= zoomLevel && zoomLevel <= MAX_ZOOM_LEVEL)
    )
      return;

    makeCityMaker({
      map,
      cityDustInfoList,
      cityDustInfoMarkers,
      setCityDustInfoMarkers,
    });

    return () => {
      setMakerToNull({ map, markers: cityDustInfoMarkers });
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
    setCity(city.id);

    const nextDustInfo = {
      fineDustScale: Number(city.dataset.finedustscale || 1),
      fineDustGrade: Number(city.dataset.finedustgrade || 1),
      ultraFineDustScale: Number(city.dataset.ultrafinedustscale || 1),
      ultraFineDustGrade: Number(city.dataset.ultrafinedustgrade || 1),
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
    SIDO_NAMES.includes(city)
      ? navigate(`${ROUTE.RANKING}/${city}`)
      : navigate(`${ROUTE.DUST_FORECAST}?sido=${currentSido}&city=${city}`);
  };

  const handleClickGoBack = () => {
    navigate(-1);
  };

  return (
    <Box position="relative" width="100%" height="100%" ref={mapRef}>
      <Box position="absolute" top="1rem" left="1rem" zIndex={10}>
        <ControlButton type="go-back" onClick={handleClickGoBack} />
      </Box>
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
        {zoomLevel === MAX_ZOOM_LEVEL && !sidoDustInfoList && <Spinner />}
      </VStack>
      {!cityDustInfoList ? <Spinner zIndex={10} /> : ''}
      <Box position="absolute" bottom="1.5rem" zIndex={10}>
        <DustLevel direction="column" />
      </Box>
      <MakerModal
        city={city}
        dustInfo={dustInfo}
        handleClickForeCastButton={handleClickForeCastButton}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default Map;
