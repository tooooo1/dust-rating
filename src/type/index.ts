export type dustDataType = {
  items: {
    dataTime: string;
    stationName: string;
    pm10Value: string;
    pm25Value: string;
    pm10Grade: string;
    pm25Grade: string;
  }[];
  numOfRows: number;
  totalCount: number;
  pageNo: number;
}[];

export type DetailType = {
  dataTime: string;
  stationName: string;
  pm10Value: string;
  pm25Value: string;
  pm10Grade: string;
  pm25Grade: string;
};
