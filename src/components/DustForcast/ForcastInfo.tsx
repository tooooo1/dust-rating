import { Text, Image } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getDustForcast } from '@/apis/dustForecast';

interface ForcastInfoProps {
  cityName: string;
}

const ForcastInfo = ({ cityName }: ForcastInfoProps) => {
  const { data: dustForecast } = useQuery(
    ['dust-forcast', cityName],
    getDustForcast,
    {
      staleTime: 1000 * 60 * 5,
      suspense: true,
    }
  );

  return (
    <>
      <Text fontSize={16} fontWeight={400} textAlign="left" lineHeight={1.4}>
        {dustForecast.informOverall}
      </Text>
      <Text fontSize={16} fontWeight={400} textAlign="left" lineHeight={1.4}>
        {dustForecast.informCause}
      </Text>
      <Image src={dustForecast.imageUrl1} alt="대기질 예보 이미지" mt={8} />
    </>
  );
};

export default ForcastInfo;
