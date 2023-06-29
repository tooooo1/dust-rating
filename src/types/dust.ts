import {
  FINE_DUST,
  FINE_DUST_CODE,
  FINE_DUST_IMG_CODE,
  ULTRA_FINE_DUST,
  ULTRA_FINE_DUST_CODE,
  ULTRA_FINE_DUST_IMG_CODE,
} from '@/utils/constants';

type Flag = null | '통신장애';

export type GradeType = 'NONE' | 'GOOD' | 'NORMAL' | 'BAD' | 'DANGER';

export type DustType = typeof FINE_DUST | typeof ULTRA_FINE_DUST;
export type DustCode = typeof FINE_DUST_CODE | typeof ULTRA_FINE_DUST_CODE;
export type DustImgCode =
  | typeof FINE_DUST_IMG_CODE
  | typeof ULTRA_FINE_DUST_IMG_CODE;

export interface DustScale {
  pm10Value: string;
  pm25Value: string;
  pm10Grade: string;
  pm25Grade: string;
}

export interface DustValidity extends DustScale {
  pm10Flag: Flag;
  pm25Flag: Flag;
}

export interface Dust extends DustScale {
  dataTime: string;
}

export interface DustFigures {
  fineDustScale: number;
  fineDustGrade: number;
  ultraFineDustScale: number;
  ultraFineDustGrade: number;
}
export interface SidoDustInfo extends DustFigures {
  location: string;
}

export interface CityDustInfo extends DustFigures {
  location: string;
  dataTime: string;
}

export interface DustHistory extends DustFigures {
  hour: string;
}

export interface DustForecast {
  imageSrc: string;
  gifImageSrc: string;
  informCause: string;
  informOverall: string;
  date: string;
}
