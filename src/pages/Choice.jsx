import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button.jsx';
import { Context } from '../store/Store';

const Choice = () => {
  let navigate = useNavigate();
  const { place, contextDispatch } = useContext(Context);
  const city = [
    '선택',
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
    '세종',
  ];

  const onChangeHandler = (e) => {
    contextDispatch({ value: e.currentTarget.value });
  };

  const onClick = () => {
    if (place === '선택') {
      alert('도시를 선택해주세요!');
    } else {
      navigate('/result');
    }
  };

  return (
    <Wrapper>
      <img src="images/location.png" alt="location" width={30} height={30} />
      <SubTitle>한 눈에 확인하는</SubTitle>
      <Title>랭킹먼지</Title>
      <Text>미세먼지 농도가 궁금한 지역은?</Text>
      <Select onChange={onChangeHandler} value={place}>
        {city.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </Select>
      <Button color={'#2886A6'} onClick={onClick}>
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
  color: white;
`;

const Title = styled.div`
  font-size: 14vw;
  padding-bottom: 1.5rem;
  text-align: center;
  font-family: 'Pretendard-Bold';
  @media only screen and (min-width: 768px) {
    font-size: 60px;
  }
`;

const SubTitle = styled.div`
  font-size: 5vw;
  padding: 1rem 0;
  text-align: center;
  font-family: 'Pretendard-Regular';
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const Text = styled.div`
  font-size: 3.5vw;
  margin-bottom: 1.5vh;
  text-align: center;
  font-family: 'Pretendard-SemiBold';
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const Select = styled.select`
  height: 6vh;
  margin-bottom: 1rem;
  font-weight: bold;
  font-family: 'Pretendard-Medium';
  background-color: white;
  opacity: 0.8;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 10px;
  border: none;
  font-size: 16px;

  &:focus-visible {
    outline: white solid 2px;
  }

  option {
    border-radius: 8px;
    color: black;
  }
`;
