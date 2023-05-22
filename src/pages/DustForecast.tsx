import { Box, Text, Flex, keyframes, useMediaQuery } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { getCityDustInfos } from '@/apis/dustInfo';
import { AsyncBoundary, DustLevel, NaviButton } from '@/components/common';
import {
  CurrentDustInfo,
  DustChart,
  ForcastInfo,
} from '@/components/DustForcast';
import theme from '@/styles/theme';
import type { CityDustInfo } from '@/types/dust';
import {
  FINE_DUST,
  ULTRA_FINE_DUST,
  DUST_GRADE,
  INIT_SIDO,
  INIT_CITY,
  INIT_DATATIME,
} from '@/utils/constants';

const animationKeyframes = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const animation = `${animationKeyframes} 6s ease infinite`;

const DustForecast = () => {
  const [searchParams] = useSearchParams();
  const searchedSido = searchParams.get('sido') || INIT_SIDO;
  const searchedCity = searchParams.get('city') || INIT_CITY;

  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

  const { data: cityDustInfos } = useQuery<CityDustInfo[]>(
    ['city-dust-infos', searchedSido],
    () => getCityDustInfos(searchedSido),
    {
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );

  const dustInfo = cityDustInfos?.find(
    (cityDustInfo) => cityDustInfo.cityName === searchedCity
  ) as CityDustInfo;

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      as={motion.div}
      animation={animation}
      bgGradient={theme.backgroundColors[DUST_GRADE[dustInfo.fineDustGrade]]}
      textAlign="center"
      backgroundSize="200% 200%"
    >
      <NaviButton
        styleProps={{
          marginTop: 10,
          display: 'flex',
          justifyContent: 'center',
          minWidth: '10%',
        }}
      />
      <Text
        as="h1"
        fontSize={{ base: 18, sm: 20, md: 24 }}
        fontWeight={600}
        color="#ffffff"
        mt={20}
        mb={{ base: 2, sm: 3, md: 4 }}
      >
        {dustInfo.cityName}
        {isLargerThan480 && `의 ${FINE_DUST} 농도는 다음과 같습니다.`}
      </Text>
      <Text
        as="p"
        fontSize={{ base: 14, sm: 18, md: 20 }}
        fontWeight={300}
        color="#ffffff"
        mb={6}
      >
        {dustInfo.dataTime || INIT_DATATIME} 기준
      </Text>
      <Box
        maxWidth="47.5rem"
        width={{ base: '100%', sm: '100%' }}
        margin="0 auto"
        borderRadius={10}
        bg="#ffffff"
        mb={20}
        px={{ base: 6, sm: 14, md: 20 }}
        py={16}
      >
        <Flex
          alignItems="center"
          pb={10}
          mb={14}
          borderBottom="1px solid #dfdfdf"
        >
          <CurrentDustInfo
            kindOfDust={FINE_DUST}
            dustScale={dustInfo.fineDustScale}
            dustGrade={dustInfo.fineDustGrade}
          />
          <CurrentDustInfo
            kindOfDust={ULTRA_FINE_DUST}
            dustScale={dustInfo.ultraFineDustScale}
            dustGrade={dustInfo.ultraFineDustGrade}
          />
        </Flex>
        <Box mb={14}>
          <Flex direction="column" alignItems="center" mb={4}>
            <Text
              as="p"
              fontSize={22}
              fontWeight={600}
              textAlign="center"
              mb={4}
            >
              시간별 {FINE_DUST} 농도
            </Text>
            <DustLevel direction="row" />
          </Flex>
          <DustChart cityName={dustInfo.cityName} />
        </Box>
        <Flex direction="column" alignItems="center" mt={10}>
          <Text as="p" fontSize={22} fontWeight={600} textAlign="center" mb={6}>
            대기질 예보
          </Text>
          <AsyncBoundary
            title="대기질 예보 정보를 불러오지 못했어요."
            description="(매일 5, 11, 17, 23시에 업데이트)"
          >
            <ForcastInfo cityName={dustInfo.cityName} />
          </AsyncBoundary>
        </Flex>
      </Box>
    </Flex>
  );
};

export default DustForecast;
