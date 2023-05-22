import axios from 'axios';
import type { DustForecast } from '@/types/dust';
import { getTodayDate } from '@/utils/formaters';

const { VITE_DUST_FORECAST_URL, VITE_DUST_INFO_API_KEY } = import.meta.env;

const STANDARD_HOUR = 5;

export const getDustForecast = async () => {
  try {
    const response = await axios.get(
      `${VITE_DUST_FORECAST_URL}?searchDate=${getTodayDate(
        STANDARD_HOUR
      )}&returnType=json&serviceKey=${VITE_DUST_INFO_API_KEY}&numOfRows=10&pageNo=1`
    );

    if (
      response.status !== 200 ||
      response.data.response.body.items.length === 0
    ) {
      throw new Error('API 에러');
    }

    return response.data.response.body.items.find(
      (forecast: DustForecast) =>
        forecast.imageUrl1 &&
        forecast.imageUrl2 &&
        forecast.imageUrl3 &&
        forecast.informCause &&
        forecast.informOverall
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
