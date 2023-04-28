import { DustValidity } from '@/types/dust';

export const dustScaleValidate = (scale: DustValidity) => {
  if (
    scale.pm10Flag ||
    scale.pm25Flag ||
    !Number(scale.pm10Value) ||
    !Number(scale.pm25Value) ||
    !Number(scale.pm10Grade) ||
    !Number(scale.pm25Grade)
  ) {
    return false;
  }
  return true;
};
