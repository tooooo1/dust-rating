import axios from 'axios';
import { useState } from 'react';
import { type SidoDust } from '@/type';

const { VITE_WEATHER_API_KEY, VITE_AIR_QUALITY_URL } = import.meta.env;

export const cityGroup = [
  { cityName: '서울', cityNumber: 0 },
  { cityName: '부산', cityNumber: 1 },
  { cityName: '대구', cityNumber: 2 },
  { cityName: '인천', cityNumber: 3 },
  { cityName: '광주', cityNumber: 4 },
  { cityName: '대전', cityNumber: 5 },
  { cityName: '울산', cityNumber: 6 },
  { cityName: '경기', cityNumber: 7 },
  { cityName: '강원', cityNumber: 8 },
  { cityName: '충북', cityNumber: 9 },
  { cityName: '충남', cityNumber: 10 },
  { cityName: '전북', cityNumber: 11 },
  { cityName: '전남', cityNumber: 12 },
  { cityName: '경북', cityNumber: 13 },
  { cityName: '경남', cityNumber: 14 },
  { cityName: '제주', cityNumber: 15 },
  { cityName: '세종', cityNumber: 16 },
];

const useFetchDustInfo = () => {
  const [dustInfo, setDustInfo] = useState<SidoDust[] | []>([]);

  const fetchDustInfo = async () => {
    try {
      const result = Promise.all(
        cityGroup.map((city) =>
          axios
            .get(
              `${VITE_AIR_QUALITY_URL}?sidoName=${city.cityName}&pageNo=1&numOfRows=100&returnType=json&serviceKey=${VITE_WEATHER_API_KEY}&ver=1.0`
            )
            .then((res) => {
              return res.data.response.body;
            })
        )
      );
      setDustInfo(await result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('FetchDustInfo Error');
    }
  };

  return { dustInfo, fetchDustInfo };
};

export default useFetchDustInfo;
