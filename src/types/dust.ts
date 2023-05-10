type Flag = null | '통신장애';

export type GradeType = 'GOOD' | 'NORMAL' | 'BAD' | 'DANGER';

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

export interface MarkerInfo extends DustFigures {
  name: string;
}

export interface CityDustInfo extends DustFigures {
  cityName: string;
  dataTime: string;
}

export interface DustHistory extends DustFigures {
  hour: string;
}
