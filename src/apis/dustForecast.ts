import axios from 'axios';
import { getTodayDate } from '@/utils/formaters';

const { VITE_AIR_QUALITY_API_KEY, VITE_MINU_DUST_FRCST_DSPTH_URL } = import.meta
  .env;

interface DustForcast {
  imageUrl1: string;
  informCause: string;
  informOverall: string;
}

export const getDustForcast = async () => {
  try {
    const response = await axios.get(
      `${VITE_MINU_DUST_FRCST_DSPTH_URL}?searchDate=${getTodayDate()}&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&numOfRows=10&pageNo=1`
    );

    if (response.status !== 200) {
      throw new Error('API 에러');
    }

    return response.data.response.body.items.find(
      (forcast: DustForcast) =>
        forcast.imageUrl1 && forcast.informCause && forcast.informOverall
    );
  } catch (error) {
    console.error(error);
  }
};
