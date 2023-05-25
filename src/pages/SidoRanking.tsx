import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getSidoDustInfo } from '@/apis/dustInfo';
import { NaviButton } from '@/components/common';
import { RankingHeader, SidoRankList, RankingCard } from '@/components/Ranking';
import theme from '@/styles/theme';
import { FINE_DUST, INIT_SIDO } from '@/utils/constants';

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
      <RankingHeader dustType={FINE_DUST} dataTime={sidoDustInfo?.dataTime} />
      <RankingCard backgroundColor={theme.backgroundColors['INIT']}>
        <SidoRankList />
      </RankingCard>
    </Flex>
  );
};

export default SidoRanking;
