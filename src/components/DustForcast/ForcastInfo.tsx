import { useQuery } from '@tanstack/react-query';
import { Flex, Text, Image } from '@chakra-ui/react';
import { getDustForcast } from '@/apis/dustForecast';
import AlertBox from '../common/AlertBox';

interface ForcastInfoProps {
  cityName: string;
}

const ForcastInfo = ({ cityName }: ForcastInfoProps) => {
  const { data: dustForecast } = useQuery(
    ['dust-forcast', cityName],
    getDustForcast,
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Flex direction="column" mt={10}>
      <Text as="p" fontSize={22} fontWeight={600} textAlign="center" mb={6}>
        대기질 예보
      </Text>
      {!dustForecast && (
        <AlertBox
          title="대기질 예보 정보를 불러오지 못했어요."
          description="(매일 5, 11, 17, 23시에 업데이트)"
        />
      )}
      {dustForecast && (
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
          <Image src={dustForecast.imageUrl1} alt="대기질 예보 이미지" mt={8} />
        </>
      )}
    </Flex>
  );
};

export default ForcastInfo;
