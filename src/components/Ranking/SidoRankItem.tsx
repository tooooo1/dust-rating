import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import type { SidoDustInfo } from '@/types/dust';
import Rank from '../common/Rank';

interface SidoRankItemProps {
  rank: number;
  sido: SidoDustInfo;
}

const SidoRankItem = ({ rank, sido }: SidoRankItemProps) => {
  const handleSidoClick = () => {};

  return (
    <Flex
      width="100%"
      direction="column"
      borderRadius={10}
      py={3}
      borderBottom="1px solid #dadada"
      transition="all 100ms ease-in"
      cursor="pointer"
      _hover={{
        backgroundColor: '#e8e8e8',
        paddingX: '0.6rem',
      }}
      onClick={handleSidoClick}
    >
      <Rank rank={rank} title={sido.sidoName} dustFigures={sido} />
    </Flex>
  );
};

export default SidoRankItem;
