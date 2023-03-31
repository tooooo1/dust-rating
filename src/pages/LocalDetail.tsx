import styled from 'styled-components';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import dfs_xy_conv from '@/components/Translate';
import DustState from '@/components/DustState';
import FineDustState from '@/components/FineDustState';
import UltraFineDustState from '@/components/UltraFineDustState';

import { LocalDetailType } from '@/type';

const { VITE_WEATHER_API_KEY, VITE_KAKAO_API_KEY } = import.meta.env;

type Location = {
  latitude: number;
  longitude: number;
};

const LocalDetail = () => {
  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [myLocation, setMyLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const date = new Date();
  const year = date.getFullYear().toString();
  const month =
    date.getMonth() < 10
      ? '0' + (date.getMonth() + 1)
      : (date.getMonth() + 1).toString();
  const day = date.getDate();
  const today = year + month + day;

  const currentTime = ('0' + date.getHours()).slice(-2) + '00';

  const location = useLocation();
  const { stationName, dust, ultraDust, dataTime, dustState }: LocalDetailType =
    location.state;
  console.log(dustState);

  // const fetchLocation = async (stationName: string) => {
  //   const result = await axios({
  //     method: 'get',
  //     url:
  //       'https://dapi.kakao.com/v2/local/search/address.json?query=' +
  //       encodeURIComponent(stationName),
  //     headers: {
  //       Authorization: `KakaoAK ${VITE_KAKAO_API_KEY}`,
  //     },
  //   }).then((res) => res.data.documents[0]);

  //   const { x, y } = result;
  //   setMyLocation({
  //     ...myLocation,
  //     latitude: x,
  //     longitude: y,
  //   });
  //   fetchWeather(myLocation);
  // };

  const parser = new XMLParser();
  const fetchWeather = async (myLocation: Location) => {
    // code : "toXY"(위경도->좌표, v1:위도, v2:경도),
    const rs = dfs_xy_conv(
      'toXY',
      Number(myLocation.latitude),
      Number(myLocation.longitude)
    );

    const { x, y } = rs;

    const result = await axios
      .get(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${VITE_WEATHER_API_KEY}&numOfRows=10&pageNo=1&base_date=${today}&base_time=${currentTime}&nx=${x}&ny=${y}`
      )
      .then((res) => res.data);

    const parsed = parser.parse(result);
    setTemperature(parsed.response.body.items.item[3].obsrValue);
    setHumidity(parsed.response.body.items.item[1].obsrValue);
  };

  const success = ({ coords }: { coords: GeolocationCoordinates }) => {
    const latitude = coords.latitude; // 위도
    const longitude = coords.longitude; // 경도

    setMyLocation({ ...myLocation, latitude, longitude });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    // fetchLocation(stationName);
  }, []);

  useEffect(() => {
    fetchWeather(myLocation);
  }, [myLocation]);

  return (
    <>
      <TotalWrapper>
        <State>해당 지역의 미세먼지 농도는 다음과 같습니다.</State>
        <Time>{dataTime} 기준</Time>
        <WeatherWrapper>
          <div>{stationName}</div>
          <div>온도 {temperature}</div>
          <div>습도 {humidity}</div>
        </WeatherWrapper>
        <DustWrapper>
          <DetailState>지역 상세 날씨</DetailState>
          <DustState dustState={dustState}></DustState>
          <DustDetailWrapper>
            <FineDustWrapper>
              <div>미세먼지</div>
              <FineDustState fineDustState={dust}></FineDustState>
            </FineDustWrapper>
            <UltraFineDustWrapper>
              <div>초미세먼지</div>
              <UltraFineDustState
                ultraFineDustState={ultraDust}
              ></UltraFineDustState>
            </UltraFineDustWrapper>
          </DustDetailWrapper>
          <DustGraphWrapper>
            <div>this is DustGraphWrapper</div>
          </DustGraphWrapper>
        </DustWrapper>
      </TotalWrapper>
    </>
  );
};

export default LocalDetail;

const TotalWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: white; */
`;

const State = styled.div`
  align-items: center;
  margin-top: 8vh;
  font-size: 4vw;
  border-radius: 20px;
  text-align: center;
  font-family: 'Pretendard-Regular';
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
  font-family: 'Pretendard-Thin';
  color: white;
  @media only screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  text-align: center;
  background-color: white;
  border-radius: 10px 10px 0px 0px;
  /* border: solid black; */
`;

const DustWrapper = styled.div`
  width: 100%;
  align-items: center;
  border-radius: 10px;
  background-color: white;
  /* border: solid black; */
`;

const DustDetailWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: row;
  /* border: solid black; */
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
  font-family: 'Pretendard-Regular';
  @media only screen and (min-width: 768px) {
    font-size: 20px;
    padding: 10px 40px;
  }
`;

const FineDustWrapper = styled.div`
  margin-left: 5rem;
`;

const UltraFineDustWrapper = styled.div`
  margin-left: 5rem;
`;

const DustInfoWrapper = styled.div`
  display: flex;
  font-size: 2rem;
`;

const DustGraphWrapper = styled.div`
  height: 100px;
  /* border: solid black; */
`;
