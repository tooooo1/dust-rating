import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Rank } from '@/components/common';
import { CityDustInfo, SidoDustInfo } from '@/types/dust';

interface RankItemProps {
  rankNumber: number;
  rankTitle: string;
  rankInfo: SidoDustInfo | CityDustInfo;
  location: string;
}

const RankItem = ({
  rankNumber,
  rankTitle,
  rankInfo,
  location,
}: RankItemProps) => {
  const navigate = useNavigate();

  const handlePageNavigate = () => {
    navigate(location);
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
      <Rank rank={rankNumber} title={rankTitle} dustFigures={rankInfo} />
    </Flex>
  );
};

export default RankItem;
