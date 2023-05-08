import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import type { DustFigures } from '@/types/dust';
import Rank from '../common/Rank';
import CityRankList from './CityRankList';

interface SidoRankItemProps extends DustFigures {
  rank: number;
  sidoName: string;
}

const SidoRankItem = ({
  rank,
  sidoName,
  fineDustScale,
  ultraFineDustScale,
  fineDustGrade,
  ultraFineDustGrade,
}: SidoRankItemProps) => {
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
      <Rank
        type="sido"
        rank={rank}
        cityName={sidoName}
        fineDustScale={fineDustScale}
        ultraFineDustScale={ultraFineDustScale}
        fineDustGrade={fineDustGrade}
        ultraFineDustGrade={ultraFineDustGrade}
      />
      <CityRankList sido={sidoName} isShow={isShow} />
    </Flex>
  );
};

export default SidoRankItem;
