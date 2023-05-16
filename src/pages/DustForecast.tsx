import {
  Box,
  Text,
  Flex,
  keyframes,
  useMediaQuery,
  Spinner,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import AlertBox from '@/components/common/AlertBox';
import DustLevel from '@/components/common/DustLevel';
import CurrentDustInfo from '@/components/DustForcast/CurrentDustInfo';
import DustChart from '@/components/DustForcast/DustChart';
import ForcastInfo from '@/components/DustForcast/ForcastInfo';
import theme from '@/styles/theme';
import type { CityDustInfo } from '@/types/dust';
import { DUST_GRADE, FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import { getDustAverageGrade } from '@/utils/dustGrade';

const animationKeyframes = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const animation = `${animationKeyframes} 6s ease infinite`;

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

  const dustAverageGrade = getDustAverageGrade(
    fineDustGrade,
    ultraFineDustGrade
  );

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      as={motion.div}
      animation={animation}
      bgGradient={theme.backgroundColors[DUST_GRADE[dustAverageGrade]]}
      textAlign="center"
      backgroundSize="200% 200%"
    >
      <Text
        as="h1"
        fontSize={{ base: 18, sm: 20, md: 24 }}
        fontWeight={600}
        color="#ffffff"
        mt={20}
        mb={{ base: 2, sm: 3, md: 4 }}
      >
        {cityName}
        {isLargerThan480 && `의 ${FINE_DUST} 농도는 다음과 같습니다.`}
      </Text>
      <Text
        as="p"
        fontSize={{ base: 14, sm: 18, md: 20 }}
        fontWeight={300}
        color="#ffffff"
        mb={6}
      >
        {dataTime} 기준
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
            dustScale={fineDustScale}
            dustGrade={fineDustGrade}
          />
          <CurrentDustInfo
            kindOfDust={ULTRA_FINE_DUST}
            dustScale={ultraFineDustScale}
            dustGrade={ultraFineDustGrade}
          />
        </Flex>
        <Box mb={14}>
          <Flex direction="column" alignItems="center" mb={4}>
            <Text
              display={isLargerThan480 ? 'block' : 'none'}
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
          <DustChart cityName={cityName} />
        </Box>
        <Flex direction="column" alignItems="center" mt={10}>
          <Text as="p" fontSize={22} fontWeight={600} textAlign="center" mb={6}>
            대기질 예보
          </Text>
          <ErrorBoundary
            fallback={
              <AlertBox
                title="대기질 예보 정보를 불러오지 못했어요."
                description="(매일 5, 11, 17, 23시에 업데이트)"
              />
            }
          >
            <Suspense fallback={<Spinner />}>
              <ForcastInfo cityName={cityName} />
            </Suspense>
          </ErrorBoundary>
        </Flex>
      </Box>
    </Flex>
  );
};

export default DustForecast;
