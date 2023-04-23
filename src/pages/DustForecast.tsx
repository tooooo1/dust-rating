import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Center, Box, Text, Flex, Image } from '@chakra-ui/react';
import { DustState } from '@/components/Dust';
import DustChart from '@/components/DustChart';
import AirPollutionLevels from '@/components/Map/AirPollutionLevels';
import { getDustForcast } from '@/apis/dustForecast';
import { getDustHistory } from '@/apis/dustHistory';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import type { CityAirQuality } from '@/types/dust';

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
      refetchOnWindowFocus: false,
    }
  );

  const { data: dustHistory } = useQuery(
    ['dust-history', cityName],
    () => getDustHistory(cityName),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    }
  );

  if (!dustForecast || !dustHistory) {
    return (
      <Center height="100vh" fontSize={28} fontWeight={100} color="#ffffff">
        로딩 중...
      </Center>
    );
  }

  return (
    <Box textAlign="center">
      <Text
        as="h1"
        fontSize={30}
        fontWeight={600}
        color="#ffffff"
        mt={20}
        mb={4}
      >
        {cityName}의 미세먼지 농도는 다음과 같습니다.
      </Text>
      <Text as="p" fontSize={20} fontWeight={300} color="#ffffff" mb={6}>
        {dataTime} 기준
      </Text>
      <Box borderRadius={10} mb={20} py={10} px={8} bg="#ffffff">
        <Flex
          alignItems="center"
          pb={10}
          mb={14}
          borderBottom="1px solid #dfdfdf"
        >
          <Box flexGrow={1} borderRight="1px solid #dfdfdf">
            <Text as="p" fontSize={22} fontWeight={600} mb={2}>
              {FINE_DUST}
            </Text>
            <Flex justifyContent="center" alignItems="center">
              <Text as="p" fontSize={48} fontWeight={800} mr={5}>
                {fineDustScale}
              </Text>
              <Box my={3}>
                <DustState dustGrade={fineDustGrade} />
              </Box>
            </Flex>
          </Box>
          <Box flexGrow={1}>
            <Text as="p" fontSize={22} fontWeight={600} mb={2}>
              {ULTRA_FINE_DUST}
            </Text>
            <Flex justifyContent="center" alignItems="center">
              <Text as="p" fontSize={48} fontWeight={800} mr={5}>
                {ultraFineDustScale}
              </Text>
              <Box my={3}>
                <DustState dustGrade={ultraFineDustGrade} />
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Box mb={14}>
          <Flex direction="column" alignItems="center" mb={4}>
            <Text as="p" fontSize={22} fontWeight={600} textAlign="center">
              시간별 미세먼지 농도
            </Text>
            <Text
              as="p"
              fontSize={16}
              fontWeight={400}
              textAlign="center"
              mt={2}
              mb={4}
            >
              {dataTime.split(' ')[0]}
            </Text>
            <AirPollutionLevels direction="row" />
          </Flex>
          <DustChart history={dustHistory} />
        </Box>
        <Flex direction="column" mt={10}>
          <Text as="p" fontSize={22} fontWeight={600} textAlign="center" mb={6}>
            기상 예보
          </Text>
          <Text
            fontSize={16}
            fontWeight={400}
            textAlign="left"
            lineHeight={1.4}
          >
            {dustForecast.informOverall}
          </Text>
          <Text
            fontSize={16}
            fontWeight={400}
            textAlign="left"
            lineHeight={1.4}
          >
            {dustForecast.informCause}
          </Text>
          <Image
            src={dustForecast.imageUrl1}
            alt="기상 이미지를 준비중입니다."
            mt={8}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default DustForecast;
