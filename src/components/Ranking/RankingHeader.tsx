import { Text } from '@chakra-ui/react';
import { SortType } from '@/types/dust';
import { INIT_DATATIME } from '@/utils/constants';

interface RankingHeaderProps {
  dustType: SortType;
  dataTime: string;
}

const RankingHeader = ({ dataTime, dustType }: RankingHeaderProps) => {
  return (
    <>
      <Text
        as="h1"
        fontSize={{ base: 16, sm: 18, md: 20 }}
        fontWeight={600}
        color="#ffffff"
        mt={10}
        mb={{ base: 2, sm: 3, md: 4 }}
      >
        전국 {dustType} 농도는 다음과 같습니다
      </Text>
      <Text
        as="p"
        fontSize={{ base: 14, sm: 16, md: 18 }}
        fontWeight={300}
        color="#ffffff"
        mb={6}
      >
        {dataTime || INIT_DATATIME} 기준
      </Text>
    </>
  );
};

export default RankingHeader;
