import axios from 'axios';
import type { DustValidity, Dust } from '@/types/dust';
import { SIDO_GROUP } from '@/utils/constants';
import { dustScaleValidate } from '@/utils/validate';
import { DEFAULT_SIDO_DUST_INFO } from '@/utils/constants/dust';

const { VITE_DUST_INFO_URL, VITE_DUST_INFO_API_KEY } = import.meta.env;

interface DustStation extends Dust {
  stationName: string;
}

export const getSidoDustInfos = async () => {
  return await Promise.all(
    SIDO_GROUP.map(async (sido) => {
      try {
        const response = await axios.get(
          `${VITE_DUST_INFO_URL}?sidoName=${sido.sidoName}&pageNo=1&numOfRows=10&returnType=json&serviceKey=${VITE_DUST_INFO_API_KEY}&ver=1.0`
        );

        if (response.status !== 200 || !response.data.response) {
          throw new Error('getSidoDustInfos API 에러');
        }

        const dustInfo = response.data.response.body.items.find(
          (scale: DustValidity) => dustScaleValidate(scale)
        );

        return {
          sidoName: sido.sidoName,
          fineDustScale: Number(dustInfo.pm10Value),
          fineDustGrade: Number(dustInfo.pm10Grade),
          ultraFineDustScale: Number(dustInfo.pm25Value),
          ultraFineDustGrade: Number(dustInfo.pm25Grade),
        };
      } catch (error) {
        console.error(error);
        return DEFAULT_SIDO_DUST_INFO;
      }
    })
  );
};

export const getSidoDustInfo = async (sido: string) => {
  try {
    const response = await axios.get(
      `${VITE_DUST_INFO_URL}?sidoName=${sido}&pageNo=1&numOfRows=10&returnType=json&serviceKey=${VITE_DUST_INFO_API_KEY}&ver=1.0`
    );

    if (response.status !== 200 || !response.data.response) {
      throw new Error('getSidoDustInfo API 에러');
    }

    const dustInfo = response.data.response.body.items.find(
      (scale: DustValidity) => dustScaleValidate(scale)
    );

    return {
      cityName: dustInfo.stationName,
      fineDustScale: Number(dustInfo.pm10Value),
      fineDustGrade: Number(dustInfo.pm10Grade),
      ultraFineDustScale: Number(dustInfo.pm25Value),
      ultraFineDustGrade: Number(dustInfo.pm25Grade),
      dataTime: dustInfo.dataTime,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export const getCityDustInfos = async (sido: string) => {
  try {
    const response = await axios.get(
      `${VITE_DUST_INFO_URL}?sidoName=${sido}&pageNo=1&numOfRows=250&returnType=json&serviceKey=${VITE_DUST_INFO_API_KEY}&ver=1.0`
    );

    if (response.status !== 200 || !response.data.response) {
      throw new Error('getCityDustInfos API 에러');
    }

    const dustInfos = response.data.response.body.items.filter(
      (scale: DustValidity) => dustScaleValidate(scale)
    );

    return dustInfos.map((dustInfo: DustStation) => ({
      cityName: dustInfo.stationName,
      fineDustScale: Number(dustInfo.pm10Value),
      fineDustGrade: Number(dustInfo.pm10Grade),
      ultraFineDustScale: Number(dustInfo.pm25Value),
      ultraFineDustGrade: Number(dustInfo.pm25Grade),
      dataTime: dustInfo.dataTime,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
