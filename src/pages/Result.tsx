import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import { DustState } from '../components/Dust';
import Progress from '../components/Progress';
import Rank from '../components/Rank';
import useFetch, { cityGroup } from '../hooks/useFetch';

import { type DustData } from '@/type';

const Result = () => {
  const [dustData, setDustData] = useState<DustDataType[] | []>([]);
  const location = useLocation();
  const choiceCity = location.state;

  const { data, fetchData } = useFetch();
  useEffect(() => {
    setDustData(data);
  }, [data]);

  const findChoiceCity = (kindOfDust: string) => {
    const result = dustData.find(
      (temp) => temp.items[0].sidoName === choiceCity
    );

    if (!result) return '0';

    return calculateFineDust({ result, kindOfDust });
  };

  const calculateFineDust = ({
    result,
    kindOfDust,
  }: {
    result: DustData;
    kindOfDust: string;
  }) => {
    switch (kindOfDust) {
      case 'DustState':
        return (
          (parseInt(result?.items[4]?.pm10Grade) +
            parseInt(result?.items[4]?.pm25Grade)) /
          2
        ).toString();
      case 'fineDust':
        return result?.items[4]?.pm10Value;
      case 'ultraFineDust':
        return result?.items[4]?.pm25Value;
      default:
        return '0';
    }
  };

  return (
    <Mid>
      <State>전국 미세먼지 농도는 다음과 같습니다</State>
      <Time>
        {dustData[0]?.items[0]?.dataTime ?? '0000-00-00 00:00'}
        기준
      </Time>
      <Middle>
        <Location>{choiceCity}</Location>
        <Text>현재의 대기질 지수는</Text>
        <DustState dustState={findChoiceCity('DustState')} />
        <Progress id="fineDust" state={findChoiceCity('fineDust')}>
          미세먼지
        </Progress>
        <Progress id="ultraFineDust" state={findChoiceCity('ultraFineDust')}>
          초미세먼지
        </Progress>
      </Middle>
      <Rating>
        <RatingWidth>
          <DustRating>지역별 미세먼지 농도 순위</DustRating>
          {cityGroup.map((city) => {
            return (
              <Rank
                key={city.cityName}
                rank={city.cityNumber + 1}
                city={city.cityName}
                dust={dustData[city.cityNumber]?.items[4]?.pm10Value}
                ultraDust={dustData[city.cityNumber]?.items[4]?.pm25Value}
                dustState={(
                  (parseInt(dustData[city.cityNumber]?.items[4]?.pm10Grade) +
                    parseInt(dustData[city.cityNumber]?.items[4]?.pm25Grade)) /
                  2
                ).toString()}
                detail={dustData[city.cityNumber]?.items}
              />
            );
          })}
        </RatingWidth>
      </Rating>
    </Mid>
  );
};

export default Result;

const Mid = styled.div`
  height: 100vh;
`;

const State = styled.div`
  margin-top: 8vh;
  font-size: 4vw;
  margin-bottom: 0.5rem;
  text-align: center;
  /* font-family: 'Pretendard-Regular'; */
  color: white;
  @media only screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const Time = styled.div`
  font-size: 3.3vw;
  margin: 0 0 1.5rem 0;
  text-align: center;
  /* font-family: 'Pretendard-Thin'; */
  color: white;
  @media only screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

const Middle = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  border-radius: 10px 10px 0 0;
  /* font-family: 'Pretendard-Light'; */
  background-color: white;
`;

const Location = styled.div`
  font-size: 6vw;
  padding-top: 1.5rem;
  text-align: center;
  /* font-family: 'Pretendard-SemiBold'; */
  @media only screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const Text = styled.div`
  font-size: 3.5vw;
  text-align: center;
  padding: 2vh 0 0.8vh 0;
  /* font-family: 'Pretendard-Regular'; */
  color: #9dadb6;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  font-size: 3vh;
  text-align: center;
  /* font-family: 'Pretendard-Bold'; */
  @media only screen and (min-width: 768px) {
    border-radius: 20px 20px 0 0;
  }
`;

const RatingWidth = styled.div`
  width: 70%;
`;

const DustRating = styled.div`
  display: flex;
  margin: 0 auto;
  width: 70%;
  justify-content: center;
  margin-top: 4vh;
  margin-bottom: 2vh;
  padding: 1vh 3vw;
  background-color: #44b7f7;
  border-radius: 20px;
  font-size: 3.5vw;
  color: white;
  text-align: center;
  /* font-family: 'Pretendard-Regular'; */
  @media only screen and (min-width: 768px) {
    font-size: 20px;
    padding: 10px 40px;
  }
`;
