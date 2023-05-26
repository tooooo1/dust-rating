import { Box, Text, Center } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, DustFigureBar, DustState } from '@/components/common';
import { DustFigures } from '@/types/dust';
import {
  FINE_DUST,
  ROUTE,
  SIDO_NAMES,
  ULTRA_FINE_DUST,
} from '@/utils/constants';

interface RankingDetailProps {
  place: string;
  dustInfo: DustFigures;
  setGrade: Dispatch<SetStateAction<number>>;
}

const RankingDetail = ({ place, setGrade, dustInfo }: RankingDetailProps) => {
  const navigate = useNavigate();

  const handleSidoChange = (place: string) => {
    setGrade((prevGrade) => dustInfo?.fineDustGrade ?? prevGrade);

    navigate(`${ROUTE.RANKING}/${place}`);
  };
  return (
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
      <Text as="div" mt="1rem" fontSize={{ base: 14, sm: 15 }} color="#4d4d4d">
        현재의 대기질 지수는
      </Text>
      <Center my={5}>
        <DustState dustGrade={dustInfo?.fineDustGrade || 0} />
      </Center>
      <DustFigureBar
        kindOfDust={FINE_DUST}
        scale={dustInfo?.fineDustScale}
        grade={dustInfo?.fineDustGrade}
      />
      <DustFigureBar
        kindOfDust={ULTRA_FINE_DUST}
        scale={dustInfo?.ultraFineDustScale}
        grade={dustInfo?.ultraFineDustGrade}
      />
    </Box>
  );
};

export default RankingDetail;
