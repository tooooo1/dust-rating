import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import type { SidoDustInfo } from '@/types/dust';
import Rank from '../common/Rank';
import CityRankList from './CityRankList';

interface SidoRankItemProps {
  rank: number;
  sido: SidoDustInfo;
}

const SidoRankItem = ({ rank, sido }: SidoRankItemProps) => {
  const [isShow, setIsShow] = useState(false);

  const handleSidoClick = () => {
    setIsShow((isShow) => !isShow);
  };

  return (
    <Flex
      width="100%"
      direction="column"
      borderRadius={10}
      py={3}
      borderBottom="1px solid #dfdfdf"
      transition="all 100ms ease-in"
      cursor="pointer"
      _hover={{
        backgroundColor: '#dfdfdf',
        paddingX: '0.8rem',
        opacity: 0.8,
      }}
      onClick={handleSidoClick}
    >
      <Rank type="sido" rank={rank} title={sido.sidoName} dustFigures={sido} />
      <CityRankList sido={sido.sidoName} isShow={isShow} />
    </Flex>
  );
};

export default SidoRankItem;
