import axios from 'axios';
import { useState } from 'react';

const { VITE_AIR_QUALITY_API_KEY } = import.meta.env;

export const useFetchDustForecast = () => {
  const [dustForecase, setDustForecast] = useState('기상예보를 준비중 입니다.');

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month =
      date.getMonth() < 10
        ? '0' + (date.getMonth() + 1)
        : (date.getMonth() + 1).toString();
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const today = year + '-' + month + '-' + day;

    return today;
  };

  const fetchDustForecast = async () => {
    try {
      const today = getToday();
      console.log(today);
      const forecast = await axios
        .get(
          `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?searchDate=${today}&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&numOfRows=100&pageNo=1`
        )
        .then((res) => res.data.response.body.items[0].informOverall);
      setDustForecast(forecast);
    } catch (err) {
      console.error(err);
      throw new Error('미세먼지 기상 예보 fetch 에러');
    }
  };

  return { dustForecase, fetchDustForecast };
};

export default useFetchDustForecast;
