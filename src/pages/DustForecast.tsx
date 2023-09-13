import {
  Box,
  Text,
  Flex,
  useMediaQuery,
  Skeleton,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { AsyncBoundary, DustLevel, ErrorFallback } from '@/components/common';
import {
  CurrentDustInfo,
  DustChart,
  ForecastInfo,
} from '@/components/DustForecast';
import { NavButton } from '@/components/Nav';
import { useCityDustInfoListQuery } from '@/hooks/useDustInfoQuery';
import theme from '@/styles/theme';
import type { CityDustInfo } from '@/types/dust';
import {
  FINE_DUST,
  ULTRA_FINE_DUST,
  DUST_GRADE,
  INIT_SIDO,
  INIT_CITY,
  INIT_DATA_TIME,
  BACKGROUND_ANIMATION,
  ERROR_MESSAGE,
} from '@/utils/constants';

const DustForecast = () => {
  const [searchParams] = useSearchParams();
  const searchedSido = searchParams.get('sido') || INIT_SIDO;
  const searchedCity = searchParams.get('city') || INIT_CITY;

  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

  const cityDustInfoList = useCityDustInfoListQuery(searchedSido, {
    suspense: true,
  });

  const dustInfo = cityDustInfoList?.find(
    (cityDustInfo) => cityDustInfo.location === searchedCity
  ) as CityDustInfo;

  return (
    <Flex
      direction="column"
      width="100%"
      minHeight="100vh"
      as={motion.div}
      animation={BACKGROUND_ANIMATION}
      bgGradient={theme.backgroundColors[DUST_GRADE[dustInfo.fineDustGrade]]}
      textAlign="center"
      backgroundSize="200% 200%"
    >
      <NavButton
        styleProps={{
          marginTop: 10,
          display: 'flex',
          justifyContent: 'center',
          minWidth: '10%',
        }}
      />
      <Text
        as="h1"
        fontSize={{ base: 16, sm: 18, md: 20 }}
        fontWeight={600}
        color="white"
        mt={10}
        mb={{ base: 2, sm: 3, md: 4 }}
      >
        {dustInfo.location}
        {isLargerThan480 && `의 ${FINE_DUST} 농도는 다음과 같습니다.`}
      </Text>
      <Text
        as="p"
        fontSize={{ base: 14, sm: 16, md: 18 }}
        fontWeight={300}
        color="white"
        mb={6}
      >
        {dustInfo.dataTime || INIT_DATA_TIME} 기준
      </Text>
      <Box
        width="100%"
        maxWidth="38rem"
        margin="0 auto"
        borderRadius={10}
        bg="white"
        mb={20}
        px={{ base: 6, sm: 14, md: 16 }}
        py={16}
      >
        <Flex
          alignItems="center"
          pb={10}
          mb={14}
          borderBottom={`1px solid ${theme.colors.BEIGE}`}
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
              fontSize={{ base: 18, sm: 20 }}
              fontWeight={600}
              textAlign="center"
              mb={4}
            >
              시간별 {FINE_DUST} 농도
            </Text>
            <DustLevel direction="row" />
          </Flex>
          <DustChart location={dustInfo.location} />
        </Box>
        <Divider borderColor={theme.colors.BEIGE} mb={14} />
        <Box width="100%">
          <Text as="p" fontSize={{ base: 18, sm: 20 }} fontWeight={600} mb={6}>
            대기질 예보
          </Text>
          <AsyncBoundary
            rejectFallback={
              <ErrorFallback errorMessage={ERROR_MESSAGE.NO_FORECAST_DATA} />
            }
            pendingFallback={
              <Skeleton
                width="100%"
                height={860}
                borderRadius={12}
                endColor={theme.colors.BEIGE}
              />
            }
          >
            <ForecastInfo location={dustInfo.location} />
          </AsyncBoundary>
        </Box>
      </Box>
    </Flex>
  );
};

export default DustForecast;
