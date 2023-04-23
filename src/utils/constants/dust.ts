export const FINE_DUST = '미세먼지';
export const ULTRA_FINE_DUST = '초미세먼지';

export type GradeType = 'GOOD' | 'NORMAL' | 'BAD' | 'DANGER';

export interface Grade {
  [key: number]: GradeType;
}

export const DUST_GRADE: Grade = {
  1: 'GOOD',
  2: 'NORMAL',
  3: 'BAD',
  4: 'DANGER',
};
