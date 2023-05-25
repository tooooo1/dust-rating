import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getSidoDustInfo } from '@/apis/dustInfo';
import { NavButton } from '@/components/Nav';
import { RankingHeader, SidoRankList, RankingCard } from '@/components/Ranking';
import theme from '@/styles/theme';
import { INIT_SIDO } from '@/utils/constants';

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
      <NavButton
        styleProps={{
          marginTop: 10,
          display: 'flex',
          justifyContent: 'center',
          minWidth: '10%',
        }}
      />
      <RankingHeader dataTime={sidoDustInfo?.dataTime} />
      <RankingCard backgroundColor={theme.backgroundColors['INIT']}>
        <SidoRankList />
      </RankingCard>
    </Flex>
  );
};

export default SidoRanking;
