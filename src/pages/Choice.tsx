import { Flex, Text, Select, Button, Image } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { FINE_DUST, SIDO_GROUP, INIT_SIDO, ROUTE } from '@/utils/constants';

const Choice = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState(INIT_SIDO);

  const handleResultPageNavigate = () => {
    navigate(`${ROUTE.RANKING}/${place}`);
  };

  const handleSidoRankingPageNavigate = () => {
    navigate(`${ROUTE.RANKING}`);
  };

  const handleMapPageNavigate = () => {
    navigate(ROUTE.DUST_MAP);
  };

  const handlePlaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlace(e.target.value);
  };

  return (
    <Flex
      height="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
      color="#ffffff"
      textAlign="center"
      backgroundColor="#53caf2"
    >
      <Image src="images/location.png" alt="location" width={30} height={30} />
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
          {SIDO_GROUP.map((sido) => (
            <option key={sido.sidoName} value={sido.sidoName}>
              {sido.sidoName}
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
      <Button
        rightIcon={<HiArrowRight />}
        color="#3a9cbd"
        borderColor="#3a9cbd"
        borderWidth={2}
        bg="#ffffff"
        opacity={0.8}
        borderRadius={20}
        onClick={handleSidoRankingPageNavigate}
      >
        전국 미세먼지 순위
      </Button>
    </Flex>
  );
};

export default Choice;
