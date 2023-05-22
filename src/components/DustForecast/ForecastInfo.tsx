import { Text, Stack, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getDustForecast } from '@/apis/dustForcast';
import { ErrorFallback } from '@/components/common';
import ForecastImages from './ForecastImages';

interface ForecastInfoProps {
  cityName: string;
}

const ForecastInfo = ({ cityName }: ForecastInfoProps) => {
  const { data: dustForecast, isError } = useQuery(
    ['dust-forecast', cityName],
    getDustForecast,
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  if (isError) {
    return <ErrorFallback title="대기질 예보 정보를 불러오지 못했어요." />;
  }

  return (
    <>
      {dustForecast ? (
        <>
          <Text
            fontSize={16}
            fontWeight={400}
            textAlign="left"
            lineHeight={1.4}
          >
            {dustForecast.informOverall}
          </Text>
          <Text
            fontSize={16}
            fontWeight={400}
            textAlign="left"
            lineHeight={1.4}
          >
            {dustForecast.informCause}
          </Text>
        </>
      ) : (
        <Stack width="100%">
          {[...Array(5).keys()].map((i) => (
            <Skeleton key={i} height={4} endColor="#dfdfdf" />
          ))}
        </Stack>
      )}
      {dustForecast ? (
        <ForecastImages dustForecast={dustForecast} />
      ) : (
        <Skeleton width="100%" height={800} mt={8} endColor="#dfdfdf" />
      )}
    </>
  );
};

export default ForecastInfo;
