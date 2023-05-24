import type { GradeType } from '@/types/dust';

export const FINE_DUST = '미세먼지';
export const ULTRA_FINE_DUST = '초미세먼지';
export const KIND_OF_DUST = [FINE_DUST, ULTRA_FINE_DUST];

export const FINE_DUST_CODE = 'PM10';
export const ULTRA_FINE_DUST_CODE = 'PM25';

export const INIT_DATATIME = '0000-00-00 00:00';

export const DUST_GRADE: { [key: number]: GradeType } = {
  0: 'NONE',
  1: 'GOOD',
  2: 'NORMAL',
  3: 'BAD',
  4: 'DANGER',
};

export const INIT_SIDO_DUST_INFO = {
  sidoName: '정보를 불러오지 못했어요',
  fineDustScale: 9999,
  fineDustGrade: 9999,
  ultraFineDustScale: 9999,
  ultraFineDustGrade: 9999,
};

export const INIT_CITY_DUST_INFO = {
  cityName: '정보를 불러오지 못했어요',
  fineDustScale: 9999,
  fineDustGrade: 9999,
  ultraFineDustScale: 9999,
  ultraFineDustGrade: 9999,
  dataTime: INIT_DATATIME,
};
