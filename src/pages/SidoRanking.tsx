import { Center, Flex, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NavButton } from '@/components/Nav';
import {
  RankingHeader,
  SidoRankList,
  RankingContent,
} from '@/components/Ranking';
import { useSidoDustInfoQuery } from '@/hooks/useDustInfoQuery';
import theme from '@/styles/theme';
import { INIT_SIDO } from '@/utils/constants';

const SidoRanking = () => {
  const sidoDustInfo = useSidoDustInfoQuery(INIT_SIDO);

  if (!sidoDustInfo)
    return (
      <Center height="100vh">
        <Spinner />
      </Center>
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
      <RankingContent backgroundColor={theme.backgroundColors['INIT']}>
        <SidoRankList />
      </RankingContent>
    </Flex>
  );
};

export default SidoRanking;
