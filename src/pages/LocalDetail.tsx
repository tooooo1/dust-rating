import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { DustState } from '@/components/Dust';
import type { LocalDustDetail } from '@/type';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import useFetchDustForecast from '@/hooks/useFetchDustForecast';
import { useEffect } from 'react';

const LocalDetail = () => {
  const location = useLocation();
  const {
    stationName,
    fineDust,
    ultraDust,
    dataTime,
    dustState,
  }: LocalDustDetail = location.state;

  const { dustForecase, fetchDustForecast } = useFetchDustForecast();

  useEffect(() => {
    fetchDustForecast();
  }, [stationName]);

  return (
    <TotalWrapper>
      <State>
        {stationName}의 {FINE_DUST} 농도는 다음과 같습니다.
      </State>
      <Time>{dataTime} 기준</Time>
      <WeatherWrapper>
        <div>온도 {20}</div>
        <div>습도 {20}</div>
      </WeatherWrapper>
      <DustWrapper>
        <DetailState>지역 상세 날씨</DetailState>
        <DustState dustDensity={dustState} kindOfDust="avg" />
        <DustDetailWrapper>
          <FineDustWrapper>
            <div>{FINE_DUST}</div>
            <DustState dustDensity={fineDust} kindOfDust="fineDust" />
          </FineDustWrapper>
          <UltraFineDustWrapper>
            <div>{ULTRA_FINE_DUST}</div>
            <DustState dustDensity={ultraDust} kindOfDust="ultraFineDust" />
          </UltraFineDustWrapper>
        </DustDetailWrapper>
        <DustForecastWrapper>
          <div>{dustForecase}</div>
        </DustForecastWrapper>
      </DustWrapper>
    </TotalWrapper>
  );
};

export default LocalDetail;

const TotalWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const State = styled.div`
  align-items: center;
  margin-top: 8vh;
  font-size: 4vw;
  border-radius: 20px;
  text-align: center;
  font-weight: 400;
  color: white;
  background-color: #53caf2;
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

const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  text-align: center;
  background-color: white;
  border-radius: 10px 10px 0px 0px;
`;

const DustWrapper = styled.div`
  width: 50%;
  align-items: center;
  background-color: white;
`;

const DustDetailWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: row;
`;

const DetailState = styled.div`
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

const FineDustWrapper = styled.div`
  padding: 0 10% 0 10%;
  width: 100%;
`;

const UltraFineDustWrapper = styled.div`
  padding: 0 10% 0 10%;
  width: 100%;
`;

const DustForecastWrapper = styled.div`
  padding: 10%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
