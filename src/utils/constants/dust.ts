import { GradeType } from '@/types/dust';

export const FINE_DUST = '미세먼지';
export const ULTRA_FINE_DUST = '초미세먼지';

export const DUST_GRADE: { [key: number]: GradeType } = {
  1: 'GOOD',
  2: 'NORMAL',
  3: 'BAD',
  4: 'DANGER',
};
