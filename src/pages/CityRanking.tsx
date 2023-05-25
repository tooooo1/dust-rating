import { Flex, Box, Text, Center } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSidoDustInfo } from '@/apis/dustInfo';
import { DustFigureBar, DustState } from '@/components/common';
import Select from '@/components/common/Select';
import NaviButton from '@/components/Nav/NavButton';
import { CityRankList } from '@/components/Ranking';
import RankingCard from '@/components/Ranking/RankingCard';
import RankingHeader from '@/components/Ranking/RankingHeader';
import theme from '@/styles/theme';
import type { SortType } from '@/types/dust';
import {
  DUST_GRADE,
  FINE_DUST,
  ULTRA_FINE_DUST,
  INIT_SIDO,
  ROUTE,
  BACKGROUND_ANIMATION,
  SIDO_NAMES,
} from '@/utils/constants';

const CityRanking = () => {
  const navigate = useNavigate();

  const { place = INIT_SIDO } = useParams();
  const [selectedSortType, setSelectedSortType] = useState<SortType>(FINE_DUST);
  const [bgcolorGrade, setBgcolorGrade] = useState(0);

  const { data: sidoDustInfo } = useQuery(
    ['sido-dust-info', place],
    () => getSidoDustInfo(place),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const handleSelectedSidoChange = (place: string) => {
    setSelectedSortType(FINE_DUST);
    setBgcolorGrade(
      (prevBgcolor) => sidoDustInfo?.fineDustGrade ?? prevBgcolor
    );

    navigate(`${ROUTE.RANKING}/${place}`);
  };

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      as={motion.div}
      animation={BACKGROUND_ANIMATION}
      bgGradient={
        theme.backgroundColors[
          DUST_GRADE[sidoDustInfo?.fineDustGrade ?? bgcolorGrade]
        ]
      }
      textAlign="center"
      backgroundSize="200% 200%"
    >
      <NaviButton
        styleProps={{
          marginTop: 10,
          display: 'flex',
          justifyContent: 'center',
          minWidth: '10%',
        }}
      />
      <RankingHeader
        dustType={selectedSortType}
        dataTime={sidoDustInfo?.dataTime}
      />
      <Box
        maxWidth="30rem"
        width={{ base: '80%', sm: '80%' }}
        margin="0 auto"
        position="relative"
        borderTopRadius={10}
        textAlign="center"
        bg="rgba(255, 255, 255, 0.6)"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(7px)"
        p={{ base: 4, sm: 6 }}
      >
        <Text
          as="p"
          fontSize={{ base: 20, sm: 22 }}
          fontWeight={700}
          mb={{ base: 2, sm: 4 }}
        >
          {place}
        </Text>
        <Box position="absolute" top={4} left={4}>
          <Select options={SIDO_NAMES} onClick={handleSelectedSidoChange} />
        </Box>
        <Text
          as="div"
          mt="1rem"
          fontSize={{ base: 14, sm: 15 }}
          color="#4d4d4d"
        >
          현재의 대기질 지수는
        </Text>
        <Center my={5}>
          <DustState dustGrade={sidoDustInfo?.fineDustGrade || 0} />
        </Center>
        <DustFigureBar
          kindOfDust={FINE_DUST}
          scale={sidoDustInfo?.fineDustScale}
          grade={sidoDustInfo?.fineDustGrade}
        />
        <DustFigureBar
          kindOfDust={ULTRA_FINE_DUST}
          scale={sidoDustInfo?.ultraFineDustScale}
          grade={sidoDustInfo?.ultraFineDustGrade}
        />
      </Box>
      <RankingCard
        backgroundColor={
          theme.colors[DUST_GRADE[sidoDustInfo?.fineDustGrade || bgcolorGrade]]
        }
      >
        <CityRankList sido={place} />
      </RankingCard>
    </Flex>
  );
};

export default CityRanking;
