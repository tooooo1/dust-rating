import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DustFigureBar, DustState, Select } from '@/components/common';
import { NavButton } from '@/components/Nav/NavButton';
import {
  CityRankList,
  RankingContent,
  RankingHeader,
} from '@/components/Ranking';
import { useSidoDustInfoQuery } from '@/hooks/useDustInfoQuery';
import theme from '@/styles/theme';
import {
  DUST_GRADE,
  INIT_SIDO,
  BACKGROUND_ANIMATION,
  FINE_DUST,
  ULTRA_FINE_DUST,
  SIDO_NAMES,
  ROUTE,
} from '@/utils/constants';

const CityRanking = () => {
  const navigate = useNavigate();

  const { place = INIT_SIDO } = useParams();
  const [grade, setGrade] = useState(0);

  const sidoDustInfo = useSidoDustInfoQuery(place);

  const handleSidoChange = (place: string) => {
    setGrade((prevGrade) => sidoDustInfo?.fineDustGrade ?? prevGrade);

    navigate(`${ROUTE.RANKING}/${place}`);
  };

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
          <Select options={SIDO_NAMES} onClick={handleSidoChange} />
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
