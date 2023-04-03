export interface DustData {
  items: {
    dataTime: string;
    stationName: string;
    pm10Value: string;
    pm25Value: string;
    pm10Grade: string;
    pm25Grade: string;
    sidoName: string;
  }[];
  numOfRows: number;
  totalCount: number;
  pageNo: number;
}

export interface Detail {
  dataTime: string;
  stationName: string;
  pm10Value: string;
  pm25Value: string;
  pm10Grade: string;
  pm25Grade: string;
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
