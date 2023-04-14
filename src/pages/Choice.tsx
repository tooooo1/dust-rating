import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FINE_DUST } from '@/utils/constants';
import { cityGroup } from '@/hooks/useFetchDustInfo';
import { Flex, Text, Select, Button } from '@chakra-ui/react';
import { HiArrowRight } from 'react-icons/hi';

const Choice = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState(cityGroup[0].cityName);

  const handleResultPageNavigate = () => {
    navigate('/result', { state: place });
  };

  const handleMapPageNavigate = () => {
    navigate('/dust-map');
  };

  const handlePlaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlace(e.target.value);
  };

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      color="#ffffff"
      textAlign="center"
    >
      <img src="images/location.png" alt="location" width={30} height={30} />
      <Text as="span" fontSize={18} fontWeight={400} mt={4}>
        한 눈에 확인하는
      </Text>
      <Text as="h1" fontSize={62} fontWeight={700} my={4}>
        랭킹먼지
      </Text>
      <Text as="span" fontSize={18} fontWeight={400} lineHeight="2rem">
        {FINE_DUST} 농도가 궁금한 지역은?
      </Text>
      <Flex gap={4} my={6}>
        <Select
          variant="filled"
          width={28}
          bg="#ffffff"
          color="#2a282f"
          opacity={0.8}
          cursor="pointer"
          _focus={{ bg: '#ffffff' }}
          onChange={handlePlaceChange}
          value={place}
        >
          {cityGroup.map((city) => (
            <option key={city.cityName} value={city.cityName}>
              {city.cityName}
            </option>
          ))}
        </Select>
        <Button
          color="#ffffff"
          bg="#3a9cbd"
          px={4}
          _hover={{ bg: '#2886A6' }}
          onClick={handleResultPageNavigate}
        >
          검색
        </Button>
      </Flex>
      <Button
        rightIcon={<HiArrowRight />}
        color="#3a9cbd"
        borderColor="#3a9cbd"
        borderWidth={2}
        bg="#ffffff"
        opacity={0.8}
        borderRadius={20}
        onClick={handleMapPageNavigate}
      >
        미세먼지 지도
      </Button>
    </Flex>
  );
};

export default Choice;
