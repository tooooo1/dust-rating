import axios from 'axios';
import type { Dust, DustValidity } from '@/types/dust';
import { getTodayDate } from '@/utils/formaters';
import { dustScaleValidate } from '@/utils/validate';

const { VITE_DUST_HISTORY_URL, VITE_DUST_INFO_API_KEY } = import.meta.env;

interface DustHistory extends DustValidity {
  dataTime: string;
}

export const getDustHistory = async (city: string) => {
  try {
    const response = await axios.get(
      `${VITE_DUST_HISTORY_URL}?stationName=${city}&dataTerm=DAILY&pageNo=1&numOfRows=100&returnType=json&serviceKey=${VITE_DUST_INFO_API_KEY}&ver=1.3`
    );

    if (response.status !== 200) {
      throw new Error('API 오류');
    }

    const dustHistories = response.data.response.body.items.filter(
      (history: DustHistory) =>
        history.dataTime.split(' ')[0] === getTodayDate() &&
        dustScaleValidate(history)
    );

    return dustHistories
      .map((history: Dust) => {
        const time = history.dataTime.split(' ')[1];
        const hour = time.split(':')[0] + '시';

        return {
          hour,
          fineDustScale: Number(history.pm10Value),
          fineDustGrade: Number(history.pm10Grade),
          ultraFineDustScale: Number(history.pm25Value),
          ultraFineDustGrade: Number(history.pm25Grade),
        };
      })
      .reverse();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
