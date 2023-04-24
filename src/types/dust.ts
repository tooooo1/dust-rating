export type GradeType = 'GOOD' | 'NORMAL' | 'BAD' | 'DANGER';

export interface DustValues {
  pm10Value: string;
  pm25Value: string;
}

export interface DustGrades {
  pm10Grade: string;
  pm25Grade: string;
}

export interface Dust extends DustValues, DustGrades {
  dataTime: string;
}

export interface CityAirQuality {
  cityName: string;
  fineDustScale: number;
  fineDustGrade: number;
  ultraFineDustScale: number;
  ultraFineDustGrade: number;
  dataTime: string;
}
