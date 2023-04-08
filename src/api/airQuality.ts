import axios from 'axios';

const { VITE_AIR_QUALITY_URL, VITE_AIR_QUALITY_API_KEY } = import.meta.env;

export const CITY_GROUP = [
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

export const getAirQuality = async () => {
  try {
    const result = await Promise.all(
      CITY_GROUP.map((city) =>
        axios
          .get(
            `${VITE_AIR_QUALITY_URL}?sidoName=${city.cityName}&pageNo=1&numOfRows=100&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
          )
          .then((res) => {
            return res.data.response.body;
          })
      )
    );

    return CITY_GROUP.map((city) => ({
      cityName: city.cityName,
      fineDustScale: Number(result[city.cityNumber]?.items[4]?.pm10Value),
      ultraFineDustScale: Number(result[city.cityNumber]?.items[4]?.pm25Value),
    }));
  } catch (error) {
    console.error(error);
  }
};
