export interface SidoDust {
  items: DustDetail[];
  numOfRows: number;
  totalCount: number;
  pageNo: number;
}

export interface DustDetail {
  dataTime: string;
  stationName: string;
  pm10Value: string;
  pm25Value: string;
  pm10Grade: string;
  pm25Grade: string;
  sidoName?: string;
}

export interface AirQualities {
  cityName: string;
  fineDustScale: number;
  fineDustGrade: number;
  ultraFineDustScale: number;
  ultraFineDustGrade: number;
  dataTime: string;
}

export interface LocalDustDetail {
  stationName: string;
  fineDust: string;
  ultraDust: string;
  dataTime: string;
  dustState: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface CityGroup {
  cityName: string;
  cityNumber: number;
}
