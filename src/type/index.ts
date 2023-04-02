export type DustData = {
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
};

export type Detail = {
  dataTime: string;
  stationName: string;
  pm10Value: string;
  pm25Value: string;
  pm10Grade: string;
  pm25Grade: string;
};

export type LocalDetailType = {
  stationName: string;
  fineDust: string;
  ultraDust: string;
  dataTime: string;
  dustState: string;
};
