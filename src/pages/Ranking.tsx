import {
  Flex,
  Box,
  Text,
  Center,
  Select,
  keyframes,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChangeEvent, useState, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import { getSidoDustInfo } from '@/apis/dustInfo';
import DustState from '@/components/common/DustState';
import ErrorFallback from '@/components/common/Fallback/ErrorFallback';
import ProgressBar from '@/components/common/ProgressBar';
import SidoRankList from '@/components/Ranking/SidoRankList';
import theme from '@/styles/theme';
import { DUST_GRADE, FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import { getDustAverageGrade } from '@/utils/dustGrade';

const animationKeyframes = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const animation = `${animationKeyframes} 6s ease infinite`;

type SortKey = typeof FINE_DUST | typeof ULTRA_FINE_DUST;

const Ranking = () => {
  const { state: selectedSido } = useLocation();
  const [selectedSortKey, setSelectedSortKey] = useState<SortKey>(FINE_DUST);

  const { data: sidoDustInfo } = useQuery(
    ['sido-dust-info', selectedSido],
    () => getSidoDustInfo(selectedSido),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const handleSortKeyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    target.value === FINE_DUST
      ? setSelectedSortKey(FINE_DUST)
      : setSelectedSortKey(ULTRA_FINE_DUST);
  };

  if (!sidoDustInfo) {
    return (
      <Center height="100vh" fontSize={28} fontWeight={100} color="#ffffff">
        <Spinner />
      </Center>
    );
  }

  const dustAverageGrade = getDustAverageGrade(
    sidoDustInfo.fineDustGrade,
    sidoDustInfo.ultraFineDustGrade
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
        전국 미세 먼지 농도는 다음과 같습니다
      </Text>
      <Text
        as="p"
        fontSize={{ base: 14, sm: 18, md: 20 }}
        fontWeight={300}
        color="#ffffff"
        mb={6}
      >
        {sidoDustInfo.dataTime} 기준
      </Text>
      <Box
        maxWidth="37.5rem"
        width={{ base: '80%', sm: '80%' }}
        margin="0 auto"
        borderTopRadius={10}
        textAlign="center"
        bg="rgba(255, 255, 255, 0.6)"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(7px)"
        px={{ base: 4, sm: 6 }}
        py={{ base: 6, sm: 8 }}
      >
        <Text
          as="p"
          fontSize={{ base: 22, sm: 24, md: 28 }}
          fontWeight={700}
          mb={{ base: 2, sm: 4 }}
        >
          {selectedSido}
        </Text>
        <Text as="span" fontSize={{ base: 16, sm: 18 }} color="#4d4d4d">
          현재의 대기질 지수는
        </Text>
        <Center my={5}>
          <DustState dustGrade={dustAverageGrade} />
        </Center>
        <ProgressBar
          kindOfDust={FINE_DUST}
          scale={sidoDustInfo.fineDustScale}
          grade={sidoDustInfo.fineDustGrade}
        />
        <ProgressBar
          kindOfDust={ULTRA_FINE_DUST}
          scale={sidoDustInfo.ultraFineDustScale}
          grade={sidoDustInfo.ultraFineDustGrade}
        />
      </Box>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        maxWidth="47.5rem"
        width={{ base: '100%', sm: '100%' }}
        margin="0 auto"
        borderRadius={20}
        bg="#f6f6f6"
        mb={20}
        px={{ base: 6, sm: 14, md: 20 }}
        py={10}
      >
        <Text
          as="p"
          fontSize={{ base: 16, sm: 18 }}
          fontWeight={400}
          margin="0 auto"
          px={8}
          py={3}
          borderRadius={25}
          color="#ffffff"
          bg={theme.colors[DUST_GRADE[dustAverageGrade]]}
        >
          지역별 미세 먼지 농도 순위
        </Text>
        <Select
          color="#4d4d4d"
          borderColor="#7f7f7f"
          borderWidth={2}
          fontSize={{ base: 14, sm: 16 }}
          my={6}
          _focus={{ borderColor: 'none' }}
          onChange={handleSortKeyChange}
        >
          <option>{FINE_DUST}</option>
          <option>{ULTRA_FINE_DUST}</option>
        </Select>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense
            fallback={[...Array(10).keys()].map((i) => (
              <Skeleton
                key={i}
                width="100%"
                height="3rem"
                my={3}
                endColor="#dfdfdf"
              />
            ))}
          >
            <SidoRankList sortType={selectedSortKey} />
          </Suspense>
        </ErrorBoundary>
      </Flex>
    </Flex>
  );
};

export default Ranking;
