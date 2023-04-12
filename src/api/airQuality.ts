import axios from 'axios';
import { CITY_GROUP } from '@/utils/constants';

const { VITE_AIR_QUALITY_URL, VITE_AIR_QUALITY_API_KEY } = import.meta.env;

export const getAirQuality = async () => {
  try {
    return await Promise.all(
      CITY_GROUP.map(async (city) => {
        const response = await axios.get(
          `${VITE_AIR_QUALITY_URL}?sidoName=${city.cityName}&pageNo=1&numOfRows=100&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
        );

        let fineDustScale = 0;
        let ultraFineDustScale = 0;

        for (const airQuality of response.data.response.body.items) {
          if (airQuality.pm10Flag !== null || airQuality.pm25Flag !== null) {
            continue;
          }

          fineDustScale = Number(airQuality.pm10Value);
          ultraFineDustScale = Number(airQuality.pm25Value);

          break;
        }

        return {
          cityName: city.cityName,
          fineDustScale,
          ultraFineDustScale,
        };
      })
    );
  } catch (error) {
    console.error(error);
  }
};
