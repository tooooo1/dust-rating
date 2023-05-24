import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { SidoDustInfo } from '@/types/dust';
import { ROUTE } from '@/utils/constants';
import Rank from '../common/Rank';

interface SidoRankItemProps {
  rank: number;
  sido: SidoDustInfo;
}

const SidoRankItem = ({ rank, sido }: SidoRankItemProps) => {
  const navigate = useNavigate();

  const handlePageNavigate = () => {
    navigate(`${ROUTE.RANKING}/${sido.sidoName}`);
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
      <Rank rank={rank} title={sido.sidoName} dustFigures={sido} />
    </Flex>
  );
};

export default SidoRankItem;
