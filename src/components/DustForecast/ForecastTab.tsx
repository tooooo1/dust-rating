import { Box, Text, Image } from '@chakra-ui/react';
import { DustForecast } from '@/types/dust';

interface ForecastTabProps {
  dustForecast: DustForecast;
}

const ForecastTab = ({ dustForecast }: ForecastTabProps) => {
  return (
    <>
      <Box fontSize={14} fontWeight={500} textAlign="right" mb={4}>
        {dustForecast.informData} 기준
      </Box>
      <Text fontSize={16} fontWeight={400} textAlign="left" lineHeight={1.4}>
        {dustForecast.informOverall}
      </Text>
      <Text fontSize={16} fontWeight={400} textAlign="left" lineHeight={1.4}>
        {dustForecast.informCause}
      </Text>
      <Box width="100%" mt={8}>
        <Image src={dustForecast.imageSrc} />
      </Box>
    </>
  );
};

export default ForecastTab;
