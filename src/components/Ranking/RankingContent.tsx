import { Flex, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import {
  AsyncBoundary,
  ErrorFallback,
  ListFallback,
} from '@/components/common';
import { useSort } from '@/store/sort';
import { KIND_OF_DUST, ERROR_MESSAGE } from '@/utils/constants';
import SelectTabList from './SelectTabList';

interface RankingContentProps {
  backgroundColor: string;
}

const RankingContent = ({
  children,
  backgroundColor,
}: PropsWithChildren<RankingContentProps>) => {
  const { sortType } = useSort();

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth="38rem"
      width="100%"
      margin="0 auto"
      borderRadius={20}
      bg="white"
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
        color="white"
        bg={backgroundColor}
        transition="all 500ms ease-in-out"
      >
        지역별 {sortType} 농도 순위
      </Text>
      <SelectTabList selectTabList={KIND_OF_DUST} />
      <AsyncBoundary
        rejectFallback={
          <ErrorFallback errorMessage={ERROR_MESSAGE.NO_RANKING_DATA} />
        }
        pendingFallback={<ListFallback />}
      >
        {children}
      </AsyncBoundary>
    </Flex>
  );
};

export default RankingContent;
