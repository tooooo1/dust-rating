import { Center, Flex, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavButton } from '@/components/Nav/NavButton';
import {
  CityRankList,
  RankingContent,
  RankingHeader,
} from '@/components/Ranking';
import RankingDetail from '@/components/Ranking/RankingDetail';
import { useSidoDustInfoQuery } from '@/hooks/useDustInfoQuery';
import theme from '@/styles/theme';
import { DUST_GRADE, INIT_SIDO, BACKGROUND_ANIMATION } from '@/utils/constants';

const CityRanking = () => {
  const { place = INIT_SIDO } = useParams();
  const [grade, setGrade] = useState(0);

  const sidoDustInfo = useSidoDustInfoQuery(place);

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
      animation={BACKGROUND_ANIMATION}
      bgGradient={
        theme.backgroundColors[DUST_GRADE[sidoDustInfo?.fineDustGrade ?? grade]]
      }
      textAlign="center"
      backgroundSize="200% 200%"
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
      <RankingDetail
        place={place}
        setGrade={setGrade}
        dustInfo={sidoDustInfo}
      />
      <RankingContent
        backgroundColor={
          theme.colors[DUST_GRADE[sidoDustInfo?.fineDustGrade || grade]]
        }
      >
        <CityRankList sido={place} />
      </RankingContent>
    </Flex>
  );
};

export default CityRanking;
