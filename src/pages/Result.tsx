import { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Select } from '@chakra-ui/react';
import { DustState } from '@/components/Dust';
import ProgressBar from '@/components/ProgressBar';
import RankList from '@/components/Ranking/RankList';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import { getAirQualityByCity } from '@/api/airQuality';
import styled from '@emotion/styled';

const Result = () => {
  const { state: choiceCity } = useLocation();
  const [selectedSortKey, setSelectedSortKey] = useState(FINE_DUST);

  const { data: sidoDust, isLoading } = useQuery(
    ['dust-info', choiceCity],
    () => getAirQualityByCity(choiceCity),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const handleSortKeyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    target.value === FINE_DUST
      ? setSelectedSortKey(FINE_DUST)
      : setSelectedSortKey(ULTRA_FINE_DUST);
  };

  if (!sidoDust || isLoading) {
    return <Time>로딩 중...</Time>;
  }

  return (
    <Mid>
      <State>전국 미세 먼지 농도는 다음과 같습니다</State>
      <Time>{sidoDust[0].dataTime} 기준</Time>
      <Middle>
        <Location>{choiceCity}</Location>
        <Text>현재의 대기질 지수는</Text>
        <DustState
          fineDust={sidoDust[0].fineDustGrade}
          ultraFineDust={sidoDust[0].ultraFineDustGrade}
          kindOfDust="avg"
        />
        <ProgressBar id="fineDust" state={sidoDust[0].fineDustScale}>
          {FINE_DUST}
        </ProgressBar>
        <ProgressBar id="ultraFineDust" state={sidoDust[0].ultraFineDustScale}>
          {ULTRA_FINE_DUST}
        </ProgressBar>
      </Middle>
      <Rating>
        <RatingWidth>
          <DustRating>지역별 미세 먼지 농도 순위</DustRating>
          <Select bg="#44b7f7" color="#ffffff" onChange={handleSortKeyChange}>
            <option style={{ backgroundColor: '#44b7f7', color: '#ffffff' }}>
              {FINE_DUST}
            </option>
            <option style={{ backgroundColor: '#44b7f7', color: '#ffffff' }}>
              {ULTRA_FINE_DUST}
            </option>
          </Select>
          <RankList standard={selectedSortKey} list={sidoDust} />
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
  font-weight: 400;
  color: white;
  @media only screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const Time = styled.div`
  font-size: 3.3vw;
  margin: 0 0 1.5rem 0;
  text-align: center;
  font-weight: 100;
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
  font-weight: 300;
  background-color: white;
`;

const Location = styled.div`
  font-size: 6vw;
  padding-top: 1.5rem;
  text-align: center;
  font-weight: 600;
  @media only screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const Text = styled.div`
  font-size: 3.5vw;
  text-align: center;
  padding: 2vh 0 0.8vh 0;
  font-weight: 400;
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
  font-weight: 700;
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
  font-weight: 400;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
    padding: 10px 40px;
  }
`;
