import { DUST_GRADE } from '@/utils/constants/dust';
import { getTodayDate } from '@/utils/formaters';
import axios from 'axios';

const { VITE_AIR_QUALITY_API_KEY } = import.meta.env;

// types로 빼기

interface DustHistory {
  dataTime: string;
  pm10Value: string;
  pm10Grade: string;
  pm25Value: string;
  pm25Grade: string;
}

export const getDustHistory = async (city: string) => {
  try {
    const response = await axios.get(
      `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${city}&dataTerm=DAILY&pageNo=1&numOfRows=100&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.3`
    );

    if (response.status !== 200) {
      throw new Error('API 오류');
    }

    console.log(response, '응답');

    const dustHistories = response.data.response.body.items.filter(
      (history: DustHistory) =>
        history.dataTime.split(' ')[0] === getTodayDate()
    );

    return dustHistories
      .map((history: DustHistory) => ({
        dataTime: history.dataTime,
        fineDustScale: Number(history.pm10Value),
        fineDustGrade: DUST_GRADE[Number(history.pm10Grade)],
        ultraFineDustScale: Number(history.pm25Value),
        ultraFineDustGrade: DUST_GRADE[Number(history.pm25Grade)],
      }))
      .reverse();
  } catch (error) {
    console.error(error);
  }
};
