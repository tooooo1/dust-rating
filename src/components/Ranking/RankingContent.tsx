import { Flex, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import {
  AsyncBoundary,
  ErrorFallback,
  ListFallback,
} from '@/components/common';
import { useSort } from '@/store/sort';
import { KIND_OF_DUST, SORT_TYPE } from '@/utils/constants';
import SelectTabList from './SelectTabList';

interface RankingContentProps {
  backgroundColor: string;
}

const RankingContent = ({
  children,
  backgroundColor,
}: PropsWithChildren<RankingContentProps>) => {
  const { dustType, setDustType, setSortType } = useSort();

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth="38rem"
      width="100%"
      margin="0 auto"
      borderRadius={20}
      bg="#ffffff"
      mb={20}
      px={{ base: '1rem', sm: 10, md: 16 }}
      py={10}
    >
      <Text
        as="p"
        fontSize={{ base: 12, sm: 14 }}
        margin="0 auto"
        px={8}
        py={3}
        borderRadius={25}
        color="#ffffff"
        bg={backgroundColor}
        transition="all 500ms ease-in-out"
      >
        지역별 {dustType} 농도 순위
      </Text>
      <SelectTabList selectTabList={KIND_OF_DUST} onClick={setDustType} />
      <SelectTabList selectTabList={SORT_TYPE} onClick={setSortType} />
      <AsyncBoundary
        rejectFallback={
          <ErrorFallback errorMessage="지역별 미세먼지 정보를 불러오지 못했어요." />
        }
        pendingFallback={<ListFallback />}
      >
        {children}
      </AsyncBoundary>
    </Flex>
  );
};

export default RankingContent;
