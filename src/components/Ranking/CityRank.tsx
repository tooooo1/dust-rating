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
    <>
      {isShow &&
        cityAirQualities &&
        cityAirQualities.map((city, cityIndex) => (
          <Box
            key={city.cityName}
            width="95%"
            margin="0 auto"
            borderRadius={10}
            py={3}
            cursor="pointer"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text
                as="span"
                width="10%"
                fontSize={18}
                fontWeight={400}
                color="#9dadb6"
              >
                {cityIndex + 1}
              </Text>
              <Text as="p" width="26%" fontSize={24} fontWeight={500}>
                {city.cityName}
              </Text>
              <DustState
                fineDust={city.fineDustGrade}
                ultraFineDust={city.ultraFineDustGrade}
                kindOfDust="avg"
              />
              <Flex direction="column" justifyContent="center" flexGrow={1}>
                <Flex justifyContent="space-between" py={1}>
                  <Text as="p" fontSize={16} fontWeight={400}>
                    {FINE_DUST}
                  </Text>
                  <Text as="p" fontSize={16} fontWeight={600}>
                    {city.fineDustScale}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" py={1}>
                  <Text as="p" fontSize={16} fontWeight={400}>
                    {ULTRA_FINE_DUST}
                  </Text>
                  <Text as="p" fontSize={16} fontWeight={600}>
                    {city.ultraFineDustScale}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        ))}
    </>
  );
};

export default CityRank;
