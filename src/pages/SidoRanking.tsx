import { Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChangeEvent, useState } from 'react';
import { getSidoDustInfo } from '@/apis/dustInfo';
import { AsyncBoundary, ListFallback } from '@/components/common';
import { SelectList, SidoRankList } from '@/components/Ranking';
import theme from '@/styles/theme';
import {
  FINE_DUST,
  ULTRA_FINE_DUST,
  INIT_SIDO,
  BACKGROUND_ANIMATION,
  KIND_OF_DUST,
} from '@/utils/constants';

type SortKey = typeof FINE_DUST | typeof ULTRA_FINE_DUST;

const SidoRanking = () => {
  const [selectedSortKey, setSelectedSortKey] = useState<SortKey>(FINE_DUST);

  const { data: sidoDustInfo } = useQuery(
    ['sido-dust-info', INIT_SIDO],
    () => getSidoDustInfo(INIT_SIDO),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const handleSortKeyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.target.value === FINE_DUST
      ? setSelectedSortKey(FINE_DUST)
      : setSelectedSortKey(ULTRA_FINE_DUST);
  };

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      as={motion.div}
      animation={BACKGROUND_ANIMATION}
      bgGradient={theme.backgroundColors['INIT']}
      textAlign="center"
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
        {sidoDustInfo?.dataTime || '0000-00-00 00:00'} 기준
      </Text>
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
          bg={theme.backgroundColors['INIT']}
          transition="all 500ms ease-in-out"
        >
          지역별 미세 먼지 농도 순위
        </Text>
        <SelectList
          handleChange={handleSortKeyChange}
          selectOptions={KIND_OF_DUST}
          defaultValue={selectedSortKey}
        />
        <AsyncBoundary
          title="지역별 미세먼지 정보를 불러오지 못했어요."
          suspenseFallback={<ListFallback />}
        >
          <SidoRankList sortType={selectedSortKey} />
        </AsyncBoundary>
      </Flex>
    </Flex>
  );
};

export default SidoRanking;
