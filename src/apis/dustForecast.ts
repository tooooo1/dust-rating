import axios from 'axios';
import type { DustForcast } from '@/types/dust';
import { getTodayDate } from '@/utils/formaters';

const { VITE_DUST_FORCAST_URL, VITE_DUST_INFO_API_KEY } = import.meta.env;

const STANDARD_HOUR = 5;

export const getDustForcast = async () => {
  try {
    const response = await axios.get(
      `${VITE_DUST_FORCAST_URL}?searchDate=${getTodayDate(
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
      (forcast: DustForcast) =>
        forcast.imageUrl1 &&
        forcast.imageUrl2 &&
        forcast.imageUrl3 &&
        forcast.informCause &&
        forcast.informOverall
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
