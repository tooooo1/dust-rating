import axios from 'axios';
import { CITY_GROUP } from '@/utils/constants';

const { VITE_AIR_QUALITY_URL, VITE_AIR_QUALITY_API_KEY } = import.meta.env;

type Flag = null | '통신장애';

interface AirQualityScale {
  pm10Flag: Flag;
  pm25Flag: Flag;
  pm10Value: string;
  pm25Value: string;
}

interface AirQuality {
  stationName: string;
  pm10Value: string;
  pm10Grade: string;
  pm25Value: string;
  pm25Grade: string;
  dataTime: string;
}

export const getAirQuality = async () => {
  try {
    return await Promise.all(
      CITY_GROUP.map(async (city) => {
        const response = await axios.get(
          `${VITE_AIR_QUALITY_URL}?sidoName=${city.cityName}&pageNo=1&numOfRows=10&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
        );

        if (response.status !== 200) {
          throw new Error('API 에러');
        }

        const airQuality = response.data.response.body.items.find(
          ({ pm10Flag, pm25Flag, pm10Value, pm25Value }: AirQualityScale) =>
            !pm10Flag && !pm25Flag && pm10Value && pm25Value
        );

        return {
          cityName: city.cityName,
          fineDustScale: Number(airQuality.pm10Value),
          fineDustGrade: Number(airQuality.pm10Grade),
          ultraFineDustScale: Number(airQuality.pm25Value),
          ultraFineDustGrade: Number(airQuality.pm25Grade),
        };
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const getAirQualityByCity = async (city: string) => {
  try {
    const response = await axios.get(
      `${VITE_AIR_QUALITY_URL}?sidoName=${city}&pageNo=1&numOfRows=10&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
    );

    if (response.status !== 200) {
      throw new Error('API 에러');
    }

    const airQuality = response.data.response.body.items.find(
      ({ pm10Flag, pm25Flag, pm10Value, pm25Value }: AirQualityScale) =>
        !pm10Flag && !pm25Flag && pm10Value && pm25Value
    );

    return {
      cityName: airQuality.stationName,
      fineDustScale: Number(airQuality.pm10Value),
      fineDustGrade: Number(airQuality.pm10Grade),
      ultraFineDustScale: Number(airQuality.pm25Value),
      ultraFineDustGrade: Number(airQuality.pm25Grade),
      dataTime: airQuality.dataTime,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getAllAirQualityByCity = async (city: string) => {
  try {
    const response = await axios.get(
      `${VITE_AIR_QUALITY_URL}?sidoName=${city}&pageNo=1&numOfRows=250&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
    );

    if (response.status !== 200) {
      throw new Error('API 에러');
    }

    const airQualities = response.data.response.body.items.filter(
      ({ pm10Flag, pm25Flag, pm10Value, pm25Value }: AirQualityScale) =>
        !pm10Flag && !pm25Flag && pm10Value && pm25Value
    );

    return airQualities.map(
      ({
        stationName,
        pm10Value,
        pm10Grade,
        pm25Value,
        pm25Grade,
        dataTime,
      }: AirQuality) => ({
        cityName: stationName,
        fineDustScale: Number(pm10Value),
        fineDustGrade: Number(pm10Grade),
        ultraFineDustScale: Number(pm25Value),
        ultraFineDustGrade: Number(pm25Grade),
        dataTime,
      })
    );
  } catch (error) {
    console.error(error);
  }
};
