import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@/components/Button';
import { cityGroup } from '@/hooks/useFetchDustInfo';

const Choice = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState('서울');

  const handleResultPageNavigate = () => {
    navigate('/result', { state: place });
  };

  const handlePlaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlace(e.target.value);
  };

  return (
    <Wrapper>
      <img src="images/location.png" alt="location" width={30} height={30} />
      <SubTitle>한 눈에 확인하는</SubTitle>
      <Title>랭킹먼지</Title>
      <Text>미세먼지 농도가 궁금한 지역은?</Text>
      <Select onChange={handlePlaceChange} value={place}>
        {cityGroup.map((v) => (
          <Option key={v.cityName} value={v.cityName}>
            {v.cityName}
          </Option>
        ))}
      </Select>
      <Button color={'#2886A6'} onClick={handleResultPageNavigate}>
        검색
      </Button>
    </Wrapper>
  );
};

export default Choice;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 14vw;
  padding-bottom: 1.5rem;
  font-weight: 600;
  @media only screen and (min-width: 768px) {
    font-size: 3.7rem;
  }
`;

const SubTitle = styled.p`
  font-size: 5vw;
  padding: 1rem 0;
  @media only screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Text = styled.span`
  font-size: 3.5vw;
  margin-bottom: 1.5vh;
  font-weight: 600;
  @media only screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Select = styled.select`
  height: 6vh;
  margin: 1rem 0;
  font-weight: 600;
  background-color: #fff;
  opacity: 0.8;
  color: #2a282f;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 0 1rem;
  border-radius: 0.6rem;
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
