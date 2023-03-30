export type DustDataType = {
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
