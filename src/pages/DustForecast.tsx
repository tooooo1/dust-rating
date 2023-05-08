import { Box, Text, Flex, useMediaQuery } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import DustLevel from '@/components/common/DustLevel';
import DustState from '@/components/common/DustState';
import DustChart from '@/components/DustForcast/DustChart';
import ForcastInfo from '@/components/DustForcast/ForcastInfo';
import type { CityDustInfo } from '@/types/dust';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import CurrentDustInfo from '@/components/DustForcast/CurrentDustInfo';

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

  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

  return (
    <Box textAlign="center">
      <Text
        as="h1"
        fontSize={{ base: 32, sm: 30 }}
        fontWeight={600}
        color="#ffffff"
        mt={20}
        mb={4}
      >
        {isLargerThan480
          ? `${cityName}의 ${FINE_DUST} 농도는 다음과 같습니다.`
          : `${cityName}`}
      </Text>
      <Text
        as="p"
        fontSize={{ base: 16, sm: 20 }}
        fontWeight={300}
        color="#ffffff"
        mb={6}
      >
        {dataTime} 기준
      </Text>
      <Box borderRadius={10} mb={20} py={10} px={8} bg="#ffffff">
        {isLargerThan480 ? (
          <Flex
            alignItems="center"
            pb={10}
            mb={14}
            borderBottom="1px solid #dfdfdf"
          >
            <CurrentDustInfo
              kindOfDust={FINE_DUST}
              dustScale={fineDustScale}
              dustGrade={fineDustGrade}
            />
            <CurrentDustInfo
              kindOfDust={ULTRA_FINE_DUST}
              dustScale={ultraFineDustScale}
              dustGrade={ultraFineDustGrade}
            />
          </Flex>
        ) : (
          <CurrentDustInfo
            kindOfDust={FINE_DUST}
            dustScale={fineDustScale}
            dustGrade={fineDustGrade}
          />
        )}
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
            <DustLevel direction="row" />
          </Flex>
          <DustChart cityName={cityName} />
        </Box>
        <ForcastInfo cityName={cityName} />
      </Box>
    </Box>
  );
};

export default DustForecast;
