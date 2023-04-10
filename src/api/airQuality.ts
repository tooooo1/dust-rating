import axios from 'axios';
import { CITY_GROUP } from '@/utils/constants';

const { VITE_AIR_QUALITY_URL, VITE_AIR_QUALITY_API_KEY } = import.meta.env;

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
      fineDustScale: Number(result[city.cityNumber]?.items[3]?.pm10Value),
      ultraFineDustScale: Number(result[city.cityNumber]?.items[3]?.pm25Value),
    }));
  } catch (error) {
    console.error(error);
  }
};
