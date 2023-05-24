import { Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { getSidoDustInfo } from '@/apis/dustInfo';
import {
  AsyncBoundary,
  ErrorFallback,
  ListFallback,
  NaviButton,
} from '@/components/common';
import { SelectTabList, SidoRankList } from '@/components/Ranking';
import theme from '@/styles/theme';
import {
  FINE_DUST,
  ULTRA_FINE_DUST,
  INIT_SIDO,
  INIT_DATATIME,
  KIND_OF_DUST,
  DUST_GRADE,
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

  const handleSortKeyChange = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.value === FINE_DUST
      ? setSelectedSortKey(FINE_DUST)
      : setSelectedSortKey(ULTRA_FINE_DUST);
  };

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      as={motion.div}
      bg={theme.backgroundColors['INIT']}
      textAlign="center"
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
        fontSize={{ base: 16, sm: 18, md: 20 }}
        fontWeight={600}
        color="#ffffff"
        mt={10}
        mb={{ base: 2, sm: 3, md: 4 }}
      >
        전국 {FINE_DUST} 농도는 다음과 같습니다
      </Text>
      <Text
        as="p"
        fontSize={{ base: 14, sm: 16, md: 18 }}
        fontWeight={300}
        color="#ffffff"
        mb={6}
      >
        {sidoDustInfo?.dataTime || INIT_DATATIME} 기준
      </Text>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        maxWidth="38rem"
        width="100%"
        margin="0 auto"
        borderRadius={20}
        bg="#ffffff"
        mb={20}
        px={{ base: '1rem', sm: 10, md: 16 }}
        py={10}
      >
        <Text
          as="p"
          fontSize={{ base: 12, sm: 14 }}
          fontWeight={400}
          margin="0 auto"
          px={8}
          py={3}
          borderRadius={25}
          color="#ffffff"
          bg={theme.backgroundColors['INIT']}
          transition="all 500ms ease-in-out"
        >
          지역별 {FINE_DUST} 농도 순위
        </Text>
        <SelectTabList
          handleClick={handleSortKeyChange}
          selectTabList={KIND_OF_DUST}
        />
        <AsyncBoundary
          rejectFallback={
            <ErrorFallback errorMessage="지역별 미세먼지 정보를 불러오지 못했어요." />
          }
          pendingFallback={<ListFallback />}
        >
          <SidoRankList sortType={selectedSortKey} />
        </AsyncBoundary>
      </Flex>
    </Flex>
  );
};

export default SidoRanking;
