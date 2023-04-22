import { useNavigate } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';
import DustState from '@/components/Dust/DustState';
import { FINE_DUST, ROUTE, ULTRA_FINE_DUST } from '@/utils/constants';
import type { CityAirQuality } from '@/type';

interface RankItemProps extends CityAirQuality {
  rank: number;
}

const RankItem = ({
  cityName,
  rank,
  fineDustScale,
  fineDustGrade,
  ultraFineDustScale,
  ultraFineDustGrade,
  dataTime,
}: RankItemProps) => {
  const navigate = useNavigate();

  const handlePageNavigate = () => {
    navigate(ROUTE.DUST_FORECAST, {
      state: {
        cityName,
        fineDustScale,
        fineDustGrade,
        ultraFineDustScale,
        ultraFineDustGrade,
        dataTime,
      },
    });
  };

  return (
    <Flex
      key={cityName}
      justifyContent="space-between"
      alignItems="center"
      py={3}
      onClick={handlePageNavigate}
    >
      <Text as="span" fontSize={18} fontWeight={400} mr={4} color="#9dadb6">
        {rank}
      </Text>
      <Text
        as="p"
        width="30%"
        fontSize={24}
        fontWeight={500}
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {cityName}
      </Text>
      <DustState
        fineDust={fineDustGrade}
        ultraFineDust={ultraFineDustGrade}
        kindOfDust="avg"
      />
      <Flex direction="column" justifyContent="center" flexGrow={1}>
        <Flex justifyContent="space-between" py={1}>
          <Text
            as="p"
            fontSize={16}
            fontWeight={400}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {FINE_DUST}
          </Text>
          <Text as="p" fontSize={16} fontWeight={600}>
            {fineDustScale}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" py={1}>
          <Text
            as="p"
            fontSize={16}
            fontWeight={400}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {ULTRA_FINE_DUST}
          </Text>
          <Text as="p" fontSize={16} fontWeight={600}>
            {ultraFineDustScale}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RankItem;
