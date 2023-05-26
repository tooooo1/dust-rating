import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { DustState } from '@/components/common';
import { CityDustInfo, SidoDustInfo } from '@/types/dust';
import { FINE_DUST, ROUTE, ULTRA_FINE_DUST } from '@/utils/constants';

interface RankItemProps {
  rank: number;
  info: SidoDustInfo | CityDustInfo;
}

const RankItem = ({ rank, info }: RankItemProps) => {
  const navigate = useNavigate();
  const { place: sido } = useParams();

  const handlePageNavigate = () => {
    if (sido) {
      navigate(`${ROUTE.DUST_FORECAST}?sido=${sido}&city=${info.location}`);
      return;
    }

    navigate(`${ROUTE.RANKING}/${info.location}`);
  };

  return (
    <Flex
      width="100%"
      direction="column"
      px={4}
      py={3}
      borderRadius={8}
      borderBottom="1px solid #dadada"
      transition="all 100ms ease-in"
      cursor="pointer"
      _hover={{
        backgroundColor: '#e8e8e8',
        paddingX: '1.4rem',
      }}
      onClick={handlePageNavigate}
    >
      <Flex flex={1} alignItems="center">
        <Text
          as="span"
          fontSize={{ base: 14, sm: 16 }}
          fontWeight={400}
          mr={4}
          color="#9dadb6"
          width="8%"
        >
          {rank}
        </Text>
        <Text
          as="p"
          width="30%"
          fontSize={{ base: 16, sm: 18 }}
          fontWeight={700}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          title={rankTitle.length > 7 ? rankTitle : ''}
        >
          {info.location}
        </Text>
        <Box width="26%" mr={8}>
          <DustState dustGrade={info.fineDustGrade} />
        </Box>
        <Flex direction="column" justifyContent="center" flexGrow={1}>
          <Flex justifyContent="space-between" alignItems="center" py={1}>
            <Text
              as="p"
              mr={2}
              fontSize={{ base: 12, sm: 14 }}
              fontWeight={500}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {FINE_DUST}
            </Text>
            <Text as="p" fontSize={{ base: 10, sm: 12 }} fontWeight={800}>
              {info.fineDustScale}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" py={1}>
            <Text
              as="p"
              mr={2}
              fontSize={{ base: 12, sm: 14 }}
              fontWeight={500}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {ULTRA_FINE_DUST}
            </Text>
            <Text as="p" fontSize={{ base: 10, sm: 12 }} fontWeight={800}>
              {info.ultraFineDustScale}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RankItem;
