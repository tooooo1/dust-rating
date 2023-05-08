import { Flex, Box, Text, Center, Select } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSidoDustInfo } from '@/apis/dustInfo';
import DustState from '@/components/common/DustState';
import ProgressBar from '@/components/common/ProgressBar';
import SidoRankList from '@/components/Ranking/SidoRankList';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import { getDustAverageGrade } from '@/utils/dustGrade';

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
        로딩 중...
      </Center>
    );
  }

  const dustAverageGrade = getDustAverageGrade(
    sidoDustInfo.fineDustGrade,
    sidoDustInfo.ultraFineDustGrade
  );

  return (
    <Box textAlign="center">
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
        w="80%"
        margin="0 auto"
        borderTopRadius={10}
        textAlign="center"
        bg="rgba(255, 255, 255, 0.6)"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(7px)"
        px={{ base: 3, sm: 6 }}
        py={8}
      >
        <Text
          as="p"
          fontSize={{ base: 22, sm: 24, md: 28 }}
          fontWeight={700}
          mb={4}
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
          bg="#44b7f7"
        >
          지역별 미세 먼지 농도 순위
        </Text>
        <Select
          color="#3a9cbd"
          borderColor="#3a9cbd"
          borderWidth={2}
          fontSize={{ base: 14, sm: 16 }}
          my={6}
          onChange={handleSortKeyChange}
        >
          <option>{FINE_DUST}</option>
          <option>{ULTRA_FINE_DUST}</option>
        </Select>
        <SidoRankList sortType={selectedSortKey} />
      </Flex>
    </Box>
  );
};

export default Ranking;
