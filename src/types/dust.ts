type Flag = null | '통신장애';

export type GradeType = 'GOOD' | 'NORMAL' | 'BAD' | 'DANGER';

export interface DustValues {
  pm10Value: string;
  pm25Value: string;
}

export interface DustScale extends DustValues {
  pm10Flag: Flag;
  pm25Flag: Flag;
}

export interface Dust extends DustValues {
  pm10Grade: string;
  pm25Grade: string;
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
