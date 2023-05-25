import { Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getSidoDustInfo } from '@/apis/dustInfo';
import { NaviButton } from '@/components/common';
import { SidoRankList } from '@/components/Ranking';
import RankingCard from '@/components/Ranking/RankingCard';
import theme from '@/styles/theme';
import { FINE_DUST, INIT_SIDO, INIT_DATATIME } from '@/utils/constants';

const SidoRanking = () => {
  const { data: sidoDustInfo } = useQuery(
    ['sido-dust-info', INIT_SIDO],
    () => getSidoDustInfo(INIT_SIDO),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

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
      <RankingCard backgroundColor={theme.backgroundColors['INIT']}>
        <SidoRankList />
      </RankingCard>
    </Flex>
  );
};

export default SidoRanking;
