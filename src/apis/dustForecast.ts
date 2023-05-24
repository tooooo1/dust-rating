import axios from 'axios';
import type { DustCode } from '@/types/dust';
import { FINE_DUST_CODE, ULTRA_FINE_DUST_CODE } from '@/utils/constants';
import { getTodayDate } from '@/utils/formaters';

const { VITE_DUST_FORECAST_URL, VITE_DUST_INFO_API_KEY } = import.meta.env;

const STANDARD_HOUR = 5;

interface DustForecastData {
  imageUrl1: string;
  informCode: DustCode;
  informCause: string;
  informOverall: string;
  informData: string;
}

const getGifImage = (dustForecast: DustForecastData): string => {
  return Object.values(dustForecast).find(
    (value) => typeof value === 'string' && value.includes('gif')
  );
};

const validateDustForecast = (
  dustForecast: DustForecastData,
  dustCode: DustCode
) => {
  if (
    dustForecast.informCode !== dustCode ||
    !dustForecast.informCause ||
    !dustForecast.informOverall ||
    !dustForecast.informData ||
    !getGifImage(dustForecast)
  ) {
    return false;
  }

  return true;
};

export const getDustForecast = async () => {
  try {
    const response = await axios.get(
      `${VITE_DUST_FORECAST_URL}?searchDate=${getTodayDate(
        STANDARD_HOUR
      )}&returnType=json&serviceKey=${VITE_DUST_INFO_API_KEY}&numOfRows=10&pageNo=1&ver=1.1`
    );

    if (
      response.status !== 200 ||
      response.data.response.body.items.length === 0
    ) {
      throw new Error('API 에러');
    }

    const fineDust: DustForecastData = response.data.response.body.items.find(
      (forecast: DustForecastData) =>
        validateDustForecast(forecast, FINE_DUST_CODE)
    );

    const ultraFineDust: DustForecastData =
      response.data.response.body.items.find((forecast: DustForecastData) =>
        validateDustForecast(forecast, ULTRA_FINE_DUST_CODE)
      );

    return {
      fineDust: {
        imageSrc: fineDust.imageUrl1,
        gifImageSrc: getGifImage(fineDust),
        informCause: fineDust.informCause,
        informOverall: fineDust.informOverall,
        date: fineDust.informData,
      },
      ultraFineDust: {
        imageSrc: ultraFineDust.imageUrl1,
        gifImageSrc: getGifImage(ultraFineDust),
        informCause: ultraFineDust.informCause,
        informOverall: ultraFineDust.informOverall,
        date: ultraFineDust.informData,
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
