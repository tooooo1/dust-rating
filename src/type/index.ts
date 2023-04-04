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
