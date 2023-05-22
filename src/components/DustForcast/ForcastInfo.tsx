import { Text, Stack, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getDustForcast } from '@/apis/dustForecast';
import { ErrorFallback } from '@/components/common';
import ForcastImages from './ForcastImages';

interface ForcastInfoProps {
  cityName: string;
}

const ForcastInfo = ({ cityName }: ForcastInfoProps) => {
  const { data: dustForcast, isError } = useQuery(
    ['dust-forcast', cityName],
    getDustForcast,
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  if (isError) {
    return <ErrorFallback title="대기질 예보 정보를 불러오지 못했어요." />;
  }

  return (
    <>
      {dustForcast ? (
        <>
          <Text
            fontSize={16}
            fontWeight={400}
            textAlign="left"
            lineHeight={1.4}
          >
            {dustForcast.informOverall}
          </Text>
          <Text
            fontSize={16}
            fontWeight={400}
            textAlign="left"
            lineHeight={1.4}
          >
            {dustForcast.informCause}
          </Text>
        </>
      ) : (
        <Stack>
          {[...Array(5).keys()].map((i) => (
            <Skeleton key={i} height={4} endColor="#dfdfdf" />
          ))}
        </Stack>
      )}
      {dustForcast ? (
        <ForcastImages dustForcast={dustForcast} />
      ) : (
        <Skeleton height={800} mt={8} endColor="#dfdfdf" />
      )}
    </>
  );
};

export default ForcastInfo;
