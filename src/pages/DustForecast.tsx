import { useLocation } from 'react-router-dom';
import { Box, Text, Flex } from '@chakra-ui/react';
import DustState from '@/components/common/DustState';
import DustChart from '@/components/DustForcast/DustChart';
import ForcastInfo from '@/components/DustForcast/ForcastInfo';
import AirPollutionLevels from '@/components/common/DustLevel';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import type { CityDustInfo } from '@/types/dust';

const DustForecast = () => {
  const location = useLocation();
  const {
    cityName,
    fineDustScale,
    fineDustGrade,
    ultraFineDustScale,
    ultraFineDustGrade,
    dataTime,
  }: CityDustInfo = location.state;

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
        {cityName}의 {FINE_DUST} 농도는 다음과 같습니다.
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
              시간별 {FINE_DUST} 농도
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
          <DustChart cityName={cityName} />
        </Box>
        <ForcastInfo cityName={cityName} />
      </Box>
    </Box>
  );
};

export default DustForecast;
