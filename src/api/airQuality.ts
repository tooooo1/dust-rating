import axios from 'axios';
import { CITY_GROUP } from '@/utils/constants';

const { VITE_AIR_QUALITY_URL, VITE_AIR_QUALITY_API_KEY } = import.meta.env;

type Flag = null | '통신장애';

interface AirQuality {
  pm10Flag: Flag;
  pm25Flag: Flag;
}

export const getAirQuality = async () => {
  try {
    return await Promise.all(
      CITY_GROUP.map(async (city) => {
        const response = await axios.get(
          `${VITE_AIR_QUALITY_URL}?sidoName=${city.cityName}&pageNo=1&numOfRows=100&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
        );

        if (response.status !== 200) {
          throw new Error('API 에러');
        }

        const airQuality = response.data.response.body.items.filter(
          ({ pm10Flag, pm25Flag }: AirQuality) => !pm10Flag && !pm25Flag
        )[0];

        return {
          cityName: city.cityName,
          fineDustScale: Number(airQuality.pm10Value),
          ultraFineDustScale: Number(airQuality.pm25Value),
        };
      })
    );
  } catch (error) {
    console.error(error);
  }
};
