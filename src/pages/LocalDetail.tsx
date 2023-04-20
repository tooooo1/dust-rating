import { useLocation } from 'react-router-dom';
import { DustState } from '@/components/Dust';
import type { LocalDustDetail } from '@/type';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import useFetchDustForecast from '@/hooks/useFetchDustForecast';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, useMediaQuery } from '@chakra-ui/react';

const LocalDetail = () => {
  const location = useLocation();
  const {
    stationName,
    fineDustScale,
    fineDustGrade,
    ultraFineDustScale,
    ultraFineDustGrade,
    dataTime,
  }: LocalDustDetail = location.state;

  const { fetchDustForecast } = useFetchDustForecast();

  useEffect(() => {
    fetchDustForecast();
  }, [stationName]);

  const { data: dustForecast, isLoading } = useQuery({
    queryKey: [stationName],
    queryFn: fetchDustForecast,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  });

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  if (!dustForecast || isLoading)
    return (
      <Box
        fontSize={isLargerThan768 ? '3.3vw' : '24px'}
        margin="0 0 1.5rem 0"
        textAlign="center"
        fontWeight="100"
        color="white"
      >
        Loading...
      </Box>
    );

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        alignItems="center"
        marginTop="8vh"
        fontSize={isLargerThan768 ? '4vw' : '30px'}
        borderRadius="20px"
        textAlign="center"
        fontWeight="400"
        color="white"
        backgroundColor="#53caf2"
      >
        {stationName}의 {FINE_DUST} 농도는 다음과 같습니다.
      </Box>
      <Box
        fontSize={isLargerThan768 ? '3.3vw' : '24px'}
        margin="0 0 1.5rem 0"
        textAlign="center"
        fontWeight="100"
        color="white"
      >
        {dataTime} 기준
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="50%"
        justifyContent="center"
        textAlign="center"
        backgroundColor="white"
        borderRadius="10px 10px 0px 0px"
      >
        <div>온도 {20}</div>
        <div>습도 {20}</div>
      </Box>
      <Box width="50%" alignItems="center" backgroundColor="white">
        <Box
          display="flex"
          margin="0 auto"
          width="70%"
          justifyContent="center"
          marginTop="4vh"
          marginBottom="2vh"
          padding={isLargerThan768 ? '1vh 3vw' : '10px 40px'}
          backgroundColor="#44b7f7"
          borderRadius="20px"
          fontSize={isLargerThan768 ? '3.5vw' : '20px'}
          color="white"
          textAlign="center"
          fontWeight="400"
        >
          지역 상세 날씨
        </Box>
        <DustState
          fineDust={fineDustGrade}
          ultraFineDust={ultraFineDustGrade}
          kindOfDust="avg"
        />
        <Box
          marginTop="3rem"
          marginBottom="3rem"
          display="flex"
          flexDirection="row"
        >
          <Box padding="0 10% 0 10%" width="100%">
            <div>{FINE_DUST}</div>
            <DustState
              fineDust={fineDustGrade}
              ultraFineDust={ultraFineDustGrade}
              kindOfDust="fineDust"
            />
          </Box>
          <Box padding="0 10% 0 10%" width="100%">
            <div>{ULTRA_FINE_DUST}</div>
            <DustState
              fineDust={fineDustGrade}
              ultraFineDust={ultraFineDustGrade}
              kindOfDust="ultraFineDust"
            />
          </Box>
        </Box>
        <Box padding="10%" display="flex" flexWrap="wrap" alignItems="center">
          <div>{dustForecast.informOverall}</div>
          <img src={dustForecast.imageUrl1} alt="기상 이미지를 준비중입니다." />
        </Box>
      </Box>
    </Box>
  );
};

export default LocalDetail;
