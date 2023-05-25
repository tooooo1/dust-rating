import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NavButton } from '@/components/Nav';
import {
  RankingHeader,
  SidoRankList,
  RankingContent,
} from '@/components/Ranking';
import { useSidoDustInfo } from '@/hooks/useDustInfo';
import theme from '@/styles/theme';
import { INIT_SIDO } from '@/utils/constants';

const SidoRanking = () => {
  const sidoDustInfo = useSidoDustInfo(INIT_SIDO);

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
      {sidoDustInfo && <RankingHeader dataTime={sidoDustInfo?.dataTime} />}
      <RankingContent backgroundColor={theme.backgroundColors['INIT']}>
        <SidoRankList />
      </RankingContent>
    </Flex>
  );
};

export default SidoRanking;
