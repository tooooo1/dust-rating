import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cityGroup } from '@/hooks/useFetch';

import styled from '@emotion/styled';
import { Flex, Text, IconButton } from '@chakra-ui/react';
import { HiArrowRight } from 'react-icons/hi';

const Choice = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState(cityGroup[0].cityName);

  const handleResultPageNavigate = () => {
    navigate('/result', { state: place });
  };

  const handlePlaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlace(e.target.value);
  };

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      color="#fff"
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
        미세먼지 농도가 궁금한 지역은?
      </Text>
      <Select onChange={handlePlaceChange} value={place}>
        {cityGroup.map((v) => (
          <Option key={v.cityName} value={v.cityName}>
            {v.cityName}
          </Option>
        ))}
      </Select>
      <IconButton
        aria-label="search"
        color="#fff"
        backgroundColor="#3a9cbd"
        px={6}
        borderRadius={20}
        icon={<HiArrowRight />}
        onClick={handleResultPageNavigate}
        _hover={{ bg: '#2886A6' }}
      />
    </Flex>
  );
};

export default Choice;

const Select = styled.select`
  margin: 1rem 0;
  font-weight: 600;
  background-color: #fff;
  opacity: 0.8;
  color: #2a282f;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 1rem 1.1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 0.1rem solid #fff;
  }
`;

const Option = styled.option`
  border-radius: 0.5rem;
`;
