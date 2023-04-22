import { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Flex, Box, Text, Center, Select } from '@chakra-ui/react';
import { DustState } from '@/components/Dust';
import ProgressBar from '@/components/ProgressBar';
import SidoRank from '@/components/Ranking/SidoRank';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import { getSidoAirQualities, getSidoAirQuality } from '@/apis/airQuality';

type SortKey = typeof FINE_DUST | typeof ULTRA_FINE_DUST;

const Ranking = () => {
  const { state: selectedSido } = useLocation();
  const [selectedSortKey, setSelectedSortKey] = useState<SortKey>(FINE_DUST);

  const { data: sidoAirQuality } = useQuery(
    ['sido-air-quality', selectedSido],
    () => getSidoAirQuality(selectedSido),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: sidoAirQualities } = useQuery(
    ['sido-air-qualities', selectedSortKey],
    getSidoAirQualities,
    {
      select: (data) => {
        if (selectedSortKey === FINE_DUST) {
          return data?.sort(
            (prev, cur) => prev.fineDustScale - cur.fineDustScale
          );
        }
        if (selectedSortKey === ULTRA_FINE_DUST) {
          return data?.sort(
            (prev, cur) => prev.ultraFineDustScale - cur.ultraFineDustScale
          );
        }
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
    }
  );

  const handleSortKeyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    target.value === FINE_DUST
      ? setSelectedSortKey(FINE_DUST)
      : setSelectedSortKey(ULTRA_FINE_DUST);
  };

  if (!sidoAirQuality) {
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
        전국 미세 먼지 농도는 다음과 같습니다
      </Text>
      <Text as="p" fontSize={20} fontWeight={300} color="#ffffff" mb={6}>
        {sidoAirQuality.dataTime} 기준
      </Text>
      <Box
        w="80%"
        margin="0 auto"
        borderTopRadius={10}
        textAlign="center"
        bg="#ffffff"
        py={8}
      >
        <Text as="p" fontSize={30} fontWeight={700} mb={4}>
          {selectedSido}
        </Text>
        <Text as="span" fontSize={18} color="#9dadb6">
          현재의 대기질 지수는
        </Text>
        <Center my={5}>
          <DustState
            fineDust={sidoAirQuality.fineDustGrade}
            ultraFineDust={sidoAirQuality.ultraFineDustGrade}
            kindOfDust="avg"
          />
        </Center>
        <ProgressBar id="fineDust" state={sidoAirQuality.fineDustScale}>
          {FINE_DUST}
        </ProgressBar>
        <ProgressBar
          id="ultraFineDust"
          state={sidoAirQuality.ultraFineDustScale}
        >
          {ULTRA_FINE_DUST}
        </ProgressBar>
      </Box>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        borderRadius={20}
        bg="#f6f6f6"
        mb={20}
        px={20}
        py={10}
      >
        <Text
          as="p"
          fontSize={20}
          fontWeight={400}
          margin="0 auto"
          px={8}
          py={3}
          borderRadius={25}
          color="#ffffff"
          bg="#44b7f7"
        >
          지역별 미세 먼지 농도 순위
        </Text>
        <Select
          color="#3a9cbd"
          borderColor="#3a9cbd"
          borderWidth={2}
          my={4}
          onChange={handleSortKeyChange}
        >
          <option>{FINE_DUST}</option>
          <option>{ULTRA_FINE_DUST}</option>
        </Select>
        {sidoAirQualities?.map((sido, sidoIndex) => (
          <SidoRank
            key={sido.sidoName}
            rank={sidoIndex + 1}
            sidoName={sido.sidoName}
            fineDustScale={sido.fineDustScale}
            ultraFineDustScale={sido.ultraFineDustScale}
            fineDustGrade={sido.fineDustGrade}
            ultraFineDustGrade={sido.ultraFineDustGrade}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Ranking;
