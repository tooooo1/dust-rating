import { Flex, Box, Text, Center } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSidoDustInfo } from '@/apis/dustInfo';
import {
  AsyncBoundary,
  DustFigureBar,
  DustState,
  ListFallback,
} from '@/components/common';
import { SelectList, CityRankList } from '@/components/Ranking';
import theme from '@/styles/theme';
import type { SortType } from '@/types/dust';
import {
  DUST_GRADE,
  FINE_DUST,
  ULTRA_FINE_DUST,
  SIDO_GROUP,
  INIT_SIDO,
  ROUTE,
  BACKGROUND_ANIMATION,
} from '@/utils/constants';

const CityRanking = () => {
  const navigate = useNavigate();

  const { place = INIT_SIDO } = useParams();
  const [selectedSortType, setSelectedSortType] = useState<SortType>(FINE_DUST);
  const kindOfDust = [FINE_DUST, ULTRA_FINE_DUST];
  const sidoNames = SIDO_GROUP.map((sido) => sido.sidoName);

  const { data: sidoDustInfo } = useQuery(
    ['sido-dust-info', place],
    () => getSidoDustInfo(place),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const handleSortKeyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;

    target.value === FINE_DUST
      ? setSelectedSortType(FINE_DUST)
      : setSelectedSortType(ULTRA_FINE_DUST);
  };

  const handleSelectedSidoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    navigate(`${ROUTE.RANKING}/${e.target.value}`);

    setSelectedSortType(FINE_DUST);
  };

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      as={motion.div}
      animation={BACKGROUND_ANIMATION}
      bgGradient={
        theme.backgroundColors[DUST_GRADE[sidoDustInfo?.fineDustGrade ?? 0]]
      }
      textAlign="center"
      backgroundSize="200% 200%"
    >
      <Text
        as="h1"
        fontSize={{ base: 18, sm: 20, md: 24 }}
        fontWeight={600}
        color="#ffffff"
        mt={20}
        mb={{ base: 2, sm: 3, md: 4 }}
      >
        전국 미세 먼지 농도는 다음과 같습니다
      </Text>
      <Text
        as="p"
        fontSize={{ base: 14, sm: 18, md: 20 }}
        fontWeight={300}
        color="#ffffff"
        mb={6}
      >
        {sidoDustInfo ? sidoDustInfo.dataTime : '0000-00-00 00:00'} 기준
      </Text>
      <Box
        maxWidth="37.5rem"
        width={{ base: '80%', sm: '80%' }}
        margin="0 auto"
        borderTopRadius={10}
        textAlign="center"
        bg="rgba(255, 255, 255, 0.6)"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(7px)"
        px={{ base: 4, sm: 6 }}
        py={{ base: 6, sm: 8 }}
      >
        <SelectList
          handleChange={handleSelectedSidoChange}
          selectOptions={sidoNames}
          defaultValue={place}
        />
        <Text
          as="div"
          mt="1rem"
          fontSize={{ base: 16, sm: 18 }}
          color="#4d4d4d"
        >
          현재의 대기질 지수는
        </Text>
        <Center my={5}>
          <DustState
            dustGrade={sidoDustInfo ? sidoDustInfo.fineDustGrade : 0}
          />
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
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        maxWidth="47.5rem"
        width={{ base: '100%', sm: '100%' }}
        margin="0 auto"
        borderRadius={20}
        bg="#f6f6f6"
        mb={20}
        px={{ base: 6, sm: 14, md: 20 }}
        py={10}
      >
        <Text
          as="p"
          fontSize={{ base: 16, sm: 18 }}
          fontWeight={400}
          margin="0 auto"
          px={8}
          py={3}
          borderRadius={25}
          color="#ffffff"
          bg={
            theme.backgroundColors[DUST_GRADE[sidoDustInfo?.fineDustGrade ?? 0]]
          }
          transition="all 500ms ease-in-out"
        >
          지역별 미세 먼지 농도 순위
        </Text>
        <SelectList
          handleChange={handleSortKeyChange}
          selectOptions={kindOfDust}
          defaultValue={selectedSortType}
        />
        <AsyncBoundary
          title="지역별 미세먼지 정보를 불러오지 못했어요."
          suspenseFallback={<ListFallback />}
        >
          <CityRankList sido={place} sortType={selectedSortType} />
        </AsyncBoundary>
      </Flex>
    </Flex>
  );
};

export default CityRanking;
