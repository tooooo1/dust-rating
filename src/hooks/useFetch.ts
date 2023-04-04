import axios from 'axios';
import { useEffect, useState } from 'react';
import { type DustData } from '@/type';

const { VITE_API_KEY, VITE_OPEN_URL } = import.meta.env;

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

const useFetch = () => {
  const [data, setData] = useState<DustData[] | []>([]);

  const fetchData = async () => {
    const result = await Promise.all(
      cityGroup.map((v) =>
        axios
          .get(
            `${VITE_OPEN_URL}?sidoName=${v.cityName}&pageNo=1&numOfRows=100&returnType=json&serviceKey=${VITE_API_KEY}&ver=1.0`
          )
          .then((res) => {
            return res.data.response.body;
          })
      )
    );

    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // if (!data[0]) fetchData();

  return { data, fetchData };
};

export default useFetch;
