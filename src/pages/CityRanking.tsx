import { Center, Flex, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSidoDustInfo } from '@/apis/dustInfo';
import { NavButton } from '@/components/Nav/NavButton';
import { CityRankList, RankingCard, RankingHeader } from '@/components/Ranking';
import RankingDetail from '@/components/Ranking/RankingDetail';
import theme from '@/styles/theme';
import { DUST_GRADE, INIT_SIDO, BACKGROUND_ANIMATION } from '@/utils/constants';

const CityRanking = () => {
  const { place = INIT_SIDO } = useParams();
  const [grade, setGrade] = useState(0);

  const { data: sidoDustInfo } = useQuery(
    ['sido-dust-info', place],
    () => getSidoDustInfo(place),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

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
      <RankingCard
        backgroundColor={
          theme.colors[DUST_GRADE[sidoDustInfo?.fineDustGrade || grade]]
        }
      >
        <CityRankList sido={place} />
      </RankingCard>
    </Flex>
  );
};

export default CityRanking;
