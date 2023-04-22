import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Center, Box } from '@chakra-ui/react';
import { DustState } from '@/components/Dust';
import { getDustForcast } from '@/api/dustForecast';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import type { CityAirQuality } from '@/type';

const DustForecast = () => {
  const location = useLocation();
  const {
    cityName,
    fineDustScale,
    fineDustGrade,
    ultraFineDustScale,
    ultraFineDustGrade,
    dataTime,
  }: CityAirQuality = location.state;

  const { data: dustForecast } = useQuery(
    ['dust-forcast', cityName],
    getDustForcast,
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
    }
  );

  if (!dustForecast) {
    return (
      <Center height="100vh" fontSize={28} fontWeight={100} color="#ffffff">
        로딩 중...
      </Center>
    );
  }

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
        borderRadius="20px"
        textAlign="center"
        fontWeight="400"
        color="white"
        backgroundColor="#53caf2"
      >
        {cityName}의 {FINE_DUST} 농도는 다음과 같습니다.
      </Box>
      <Box
        margin="0 0 1.5rem 0"
        textAlign="center"
        fontWeight="100"
        color="white"
      >
        {dataTime} 기준
      </Box>
      <Box width="50%" alignItems="center" backgroundColor="white">
        <Box
          marginTop="3rem"
          marginBottom="3rem"
          display="flex"
          flexDirection="row"
        >
          <Box padding="0 10% 0 10%" width="100%">
            <div>{FINE_DUST}</div>
            <div>{fineDustScale}</div>
            <DustState
              fineDust={fineDustGrade}
              ultraFineDust={ultraFineDustGrade}
              kindOfDust="fineDust"
            />
          </Box>
          <Box padding="0 10% 0 10%" width="100%">
            <div>{ULTRA_FINE_DUST}</div>
            <div>{ultraFineDustScale}</div>
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

export default DustForecast;
