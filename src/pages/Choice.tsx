import { Flex, Text, Select, Button, Image } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { BsMapFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import ChoiceNavigateButton from '@/components/Choice/ChoiceNavigateButton';
import theme from '@/styles/theme';
import { FINE_DUST, SIDO_NAMES, INIT_SIDO, ROUTE } from '@/utils/constants';

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
      backgroundColor={theme.backgroundColors.INIT}
    >
      <Image src="images/location.png" alt="location" width={30} height={30} />
      <Text as="span" fontSize={{ base: 14, sm: 16 }} fontWeight={400} mt={4}>
        한 눈에 확인하는
      </Text>
      <Text as="h1" fontSize={{ base: 48, sm: 52 }} fontWeight={700} my={4}>
        랭킹먼지
      </Text>
      <Text as="span" fontSize={14} fontWeight={400}>
        {FINE_DUST} 농도가 궁금한 지역은?
      </Text>
      <Flex gap={4} my={6}>
        <Select
          variant="filled"
          width={{ base: 24, sm: 28 }}
          fontSize={14}
          bg="#ffffff"
          color="#2a282f"
          opacity={0.8}
          cursor="pointer"
          _focus={{ bg: '#ffffff' }}
          onChange={handlePlaceChange}
          value={place}
        >
          {SIDO_NAMES.map((sidoName) => (
            <option key={sidoName} value={sidoName}>
              {sidoName}
            </option>
          ))}
        </Select>
        <Button
          color="#ffffff"
          bg="#3a9cbd"
          px={4}
          fontSize={14}
          _hover={{ bg: '#2886A6' }}
          onClick={handleResultPageNavigate}
        >
          검색
        </Button>
      </Flex>
      <Flex gap={2}>
        <ChoiceNavigateButton handleClick={handleSidoRankingPageNavigate}>
          전국 미세먼지 순위
        </ChoiceNavigateButton>
        <ChoiceNavigateButton
          icon={<BsMapFill />}
          handleClick={handleMapPageNavigate}
        >
          미세먼지 지도
        </ChoiceNavigateButton>
      </Flex>
    </Flex>
  );
};

export default Choice;
