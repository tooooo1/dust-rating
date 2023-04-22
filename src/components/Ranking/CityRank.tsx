import { useQuery } from '@tanstack/react-query';
import { Box, Flex, Text } from '@chakra-ui/react';
import { DustState } from '@/components/Dust';
import { getCityAirQualities } from '@/api/airQuality';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import type { CityAirQuality } from '@/type';

interface CityRankProps {
  sido: string;
  isShow: boolean;
}

const CityRank = ({ sido, isShow }: CityRankProps) => {
  const { data: cityAirQualities } = useQuery<CityAirQuality[]>(
    ['city-air-qualities', sido],
    () => getCityAirQualities(sido),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Box
      width="98%"
      margin="0 auto"
      bg="#dfdfdf"
      borderRadius={10}
      px={4}
      cursor="pointer"
    >
      {isShow &&
        cityAirQualities &&
        cityAirQualities.map((city, cityIndex) => (
          <Flex
            key={city.cityName}
            justifyContent="space-between"
            alignItems="center"
            py={3}
          >
            <Text
              as="span"
              fontSize={18}
              fontWeight={400}
              mr={4}
              color="#9dadb6"
            >
              {cityIndex + 1}
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
              {city.cityName}
            </Text>
            <DustState
              fineDust={city.fineDustGrade}
              ultraFineDust={city.ultraFineDustGrade}
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
                  {city.fineDustScale}
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
                  {city.ultraFineDustScale}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ))}
    </Box>
  );
};

export default CityRank;
