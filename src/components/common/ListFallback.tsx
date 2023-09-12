import { Skeleton } from '@chakra-ui/react';
import theme from '@/styles/theme';

interface ListFallbackProps {
  count?: number;
}

const SIDO_COUNT = 17;

const ListFallback = ({ count = SIDO_COUNT }: ListFallbackProps) => {
  return (
    <>
      {[...Array(count).keys()].map((i) => (
        <Skeleton
          key={i}
          width="100%"
          height="3rem"
          my={3}
          endColor={theme.colors.BEIGE}
        />
      ))}
    </>
  );
};

export default ListFallback;
