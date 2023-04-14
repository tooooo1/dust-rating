import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { DustState } from '../components/Dust';
import Progress from '../components/Progress';
import Rank from '../components/Rank';
import useFetchDustInfo, { cityGroup } from '../hooks/useFetchDustInfo';
import type { SidoDust, CityGroup } from '@/type';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants/constants';
import { useQuery } from '@tanstack/react-query';
import { Select } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

const Result = () => {
  const [selectedDust, setSelectedDust] = useState(FINE_DUST);
  const location = useLocation();
  const choiceCity = location.state;
  const { fetchDustInfo } = useFetchDustInfo();
  const { data: sidoDust, isLoading } = useQuery<SidoDust[]>({
    queryKey: [choiceCity],
    queryFn: fetchDustInfo,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  });

  const findChoiceCity = (kindOfDust: string) => {
    if (!sidoDust) return '0';

    const result = sidoDust.find(
      (temp: SidoDust) => temp.items[0].sidoName === choiceCity
    );

    if (!result) return '0';

    return calculateFineDust({ result, kindOfDust });
  };

  const calculateFineDust = ({
    result,
    kindOfDust,
  }: {
    result: SidoDust;
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

  const handleDustChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    target.value === FINE_DUST
      ? setSelectedDust(FINE_DUST)
      : setSelectedDust(ULTRA_FINE_DUST);
  };

  const sortCityByDustDensity = (cityGroup: CityGroup[]) => {
    if (!sidoDust) return [];

    return cityGroup.sort((prev, next) => {
      const prevCity = sidoDust[prev.cityNumber]?.items[4];
      const nextCity = sidoDust[next.cityNumber]?.items[4];
      if (selectedDust === FINE_DUST) {
        if (+prevCity.pm10Value < +nextCity.pm10Value) return -1;
        else if (+prevCity.pm10Value > +nextCity.pm10Value) return 1;
        else return 0;
      } else if (selectedDust === ULTRA_FINE_DUST) {
        if (+prevCity.pm25Value < +nextCity.pm25Value) return -1;
        else if (+prevCity.pm25Value > +nextCity.pm25Value) return 1;
        else return 0;
      }
      return 0;
    });
  };

  if (!sidoDust || isLoading) {
    return <Time>Loading...</Time>;
  }

  return (
    <Mid>
      <State>전국 {FINE_DUST} 농도는 다음과 같습니다</State>
      <Time>
        {sidoDust[0]?.items[0]?.dataTime ?? '0000-00-00 00:00'}
        기준
      </Time>
      <Middle>
        <Location>{choiceCity}</Location>
        <Text>현재의 대기질 지수는</Text>
        <DustState dustDensity={findChoiceCity('DustState')} kindOfDust="avg" />
        <Progress id="fineDust" state={findChoiceCity('fineDust')}>
          {FINE_DUST}
        </Progress>
        <Progress id="ultraFineDust" state={findChoiceCity('ultraFineDust')}>
          {ULTRA_FINE_DUST}
        </Progress>
      </Middle>
      <Rating>
        <RatingWidth>
          <DustRating>지역별 {FINE_DUST} 농도 순위</DustRating>
          <Select
            bg="#44b7f7"
            color="#ffffff"
            onChange={(e) => handleDustChange(e)}
          >
            <option style={{ backgroundColor: '#44b7f7', color: '#ffffff' }}>
              {FINE_DUST}
            </option>
            <option style={{ backgroundColor: '#44b7f7', color: '#ffffff' }}>
              {ULTRA_FINE_DUST}
            </option>
          </Select>
          {sortCityByDustDensity(cityGroup).map((city, cityIdx) => {
            return (
              <Rank
                key={city.cityName}
                rank={cityIdx + 1}
                city={city.cityName}
                dust={sidoDust[city.cityNumber]?.items[4]?.pm10Value}
                ultraDust={sidoDust[city.cityNumber]?.items[4]?.pm25Value}
                dustState={(
                  (parseInt(sidoDust[city.cityNumber]?.items[4]?.pm10Grade) +
                    parseInt(sidoDust[city.cityNumber]?.items[4]?.pm25Grade)) /
                  2
                ).toString()}
                detail={sidoDust[city.cityNumber]?.items}
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
