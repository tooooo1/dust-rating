export interface CityAirQuality {
  cityName: string;
  fineDustScale: number;
  fineDustGrade: number;
  ultraFineDustScale: number;
  ultraFineDustGrade: number;
  dataTime: string;
}

export interface LocalDustDetail {
  stationName: string;
  fineDustScale: number;
  fineDustGrade: number;
  ultraFineDustScale: number;
  ultraFineDustGrade: number;
  dataTime: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface CityGroup {
  cityName: string;
  cityNumber: number;
}
