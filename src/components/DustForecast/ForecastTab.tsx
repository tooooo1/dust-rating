import { Flex, Box, Text, Image as ImageWrapper } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DustForecast } from '@/types/dust';

interface ForecastTabProps {
  dustForecast: DustForecast;
}

const ForecastTab = ({ dustForecast }: ForecastTabProps) => {
  const [imgSrc, setImgSrc] = useState(dustForecast.imageSrc);

  useEffect(() => {
    const img = new Image();
    img.src = dustForecast.gifImageSrc;
    img.onload = () => {
      setImgSrc(dustForecast.gifImageSrc);
    };
  }, [dustForecast.gifImageSrc]);

  return (
    <>
      <Box
        fontSize={{ base: 12, sm: 14 }}
        fontWeight={500}
        textAlign="right"
        mb={4}
      >
        {dustForecast.date} 기준
      </Box>
      <Text
        fontSize={{ base: 14, sm: 16 }}
        fontWeight={400}
        textAlign="left"
        lineHeight={1.4}
      >
        {dustForecast.informOverall}
      </Text>
      <Text
        fontSize={{ base: 14, sm: 16 }}
        fontWeight={400}
        textAlign="left"
        lineHeight={1.4}
      >
        {dustForecast.informCause}
      </Text>
      <Flex justifyContent="center" width="100%" mt={20}>
        <ImageWrapper
          src={imgSrc}
          width={imgSrc === dustForecast.imageSrc ? '84%' : '100%'}
          transform="scale(1.2)"
          ml={imgSrc === dustForecast.imageSrc ? '0.1rem' : '0'}
          mt={imgSrc === dustForecast.imageSrc ? '0.5rem' : '0'}
          mb={imgSrc === dustForecast.imageSrc ? '0.6rem' : '0'}
          alt="예보 이미지"
        />
      </Flex>
    </>
  );
};

export default ForecastTab;
