import styled from 'styled-components';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { useState, useEffect } from 'react';

const { VITE_WEATHER_API_KEY } = import.meta.env;

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

  // 강남구 신사동로 nx ny 값 고정상태.
  const parser = new XMLParser();
  const fetchWeather = async (myLocation: Location) => {
    const result = await axios
      .get(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${VITE_WEATHER_API_KEY}&numOfRows=10&pageNo=1&base_date=${today}&base_time=${currentTime}&nx=${myLocation.latitude}&ny=${myLocation.longitude}`
      )
      .then((res) => res.data);

    const parsed = parser.parse(result);
    console.log(parsed);
    setTemperature(parsed.response.body.items.item[3].obsrValue);
    setHumidity(parsed.response.body.items.item[1].obsrValue);
  };

  const success = ({ coords }: { coords: GeolocationCoordinates }) => {
    const latitude = Math.floor(coords.latitude); // 위도
    const longitude = Math.floor(coords.longitude); // 경도

    setMyLocation({ ...myLocation, latitude, longitude });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    fetchWeather(myLocation);
  }, [myLocation]);

  console.log(myLocation);

  return (
    <>
      <TotalWrapper>
        <State>지역 상세 날씨</State>
        <WeatherWrapper>
          <div>this is WeatherWrapper</div>
          <div>온도 {temperature}</div>
          <div>습도 {humidity}</div>
        </WeatherWrapper>
        <DustWrapper>
          <div> this is DustWrapper</div>
          <DustDetailWrapper>
            <div> this is DustDetailWrapper</div>
            <div>미세먼지</div>
            <div>초미세먼지</div>
            <div>업데이트 날짜</div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

const State = styled.div`
  align-items: center;
  margin-top: 8vh;
  font-size: 4vw;
  margin-bottom: 1rem;

  width: 50%;
  text-align: center;
  font-family: 'Pretendard-Regular';
  color: white;
  background-color: #53caf2;
  @media only screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const WeatherWrapper = styled.div`
  background-color: white;
  border: solid black;
`;

const DustWrapper = styled.div`
  height: 200px;
  border: solid black;
`;

const DustDetailWrapper = styled.div`
  display: flex;
  border: solid black;
`;

const DustGraphWrapper = styled.div`
  height: 100px;
  border: solid black;
`;
