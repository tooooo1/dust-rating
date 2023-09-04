import type { GradeType } from '@/types/dust';

export const FINE_DUST = '미세먼지';
export const ULTRA_FINE_DUST = '초미세먼지';
export const KIND_OF_DUST = [FINE_DUST, ULTRA_FINE_DUST];

export const FINE_DUST_CODE = 'PM10';
export const ULTRA_FINE_DUST_CODE = 'PM25';

export const FINE_DUST_IMG_CODE = 'PM10';
export const ULTRA_FINE_DUST_IMG_CODE = 'PM2P5';

export const INIT_DATA_TIME = '0000-00-00 00:00';

export const DUST_GRADE: { [key: number]: GradeType } = {
  0: 'NONE',
  1: 'GOOD',
  2: 'NORMAL',
  3: 'BAD',
  4: 'DANGER',
};

export const INIT_DUST_SCALE = 0;
export const INIT_DUST_GRADE = 0;

export const INIT_DUST_INFO = {
  fineDustScale: 0,
  fineDustGrade: 0,
  ultraFineDustScale: 0,
  ultraFineDustGrade: 0,
};

export const INIT_SIDO_DUST_INFO = {
  location: '정보를 불러오지 못했어요',
  fineDustScale: INIT_DUST_SCALE,
  fineDustGrade: INIT_DUST_GRADE,
  ultraFineDustScale: INIT_DUST_SCALE,
  ultraFineDustGrade: INIT_DUST_GRADE,
};

export const INIT_CITY_DUST_INFO = {
  location: '정보를 불러오지 못했어요',
  fineDustScale: INIT_DUST_SCALE,
  fineDustGrade: INIT_DUST_GRADE,
  ultraFineDustScale: INIT_DUST_SCALE,
  ultraFineDustGrade: INIT_DUST_GRADE,
  dataTime: INIT_DATA_TIME,
};
