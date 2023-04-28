import { DustValidity } from '@/types/dust';

export const dustScaleValidate = (scale: DustValidity) => {
  return (
    !scale.pm10Flag &&
    !scale.pm25Flag &&
    Number(scale.pm10Value) &&
    Number(scale.pm25Value) &&
    Number(scale.pm10Grade) &&
    Number(scale.pm25Grade)
  );
};
