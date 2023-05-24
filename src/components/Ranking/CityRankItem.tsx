import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Rank } from '@/components/common';
import type { CityDustInfo } from '@/types/dust';
import { ROUTE } from '@/utils/constants';

interface CityRankItemProps {
  rank: number;
  sido: string;
  city: CityDustInfo;
}

const CityRankItem = ({ rank, sido, city }: CityRankItemProps) => {
  const navigate = useNavigate();

  const handlePageNavigate = () => {
    navigate(`${ROUTE.DUST_FORECAST}?sido=${sido}&city=${city.cityName}`);
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      px={4}
      py={3}
      borderRadius={8}
      borderBottom="1px solid #dadada"
      transition="all 100ms ease-out"
      _hover={{
        backgroundColor: '#e8e8e8',
        paddingX: '1.4rem',
      }}
      onClick={handlePageNavigate}
    >
      <Rank rank={rank} title={city.cityName} dustFigures={city} />
    </Flex>
  );
};

export default CityRankItem;
