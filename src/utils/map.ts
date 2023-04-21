export const DUST_SCALE_COLOR = {
  DANGER: '#e64746',
  BAD: '#fda60d',
  NORMAL: '#03c73c',
  GOOD: '#30a2ff',
};

export const getDustScaleColor = (scale: number) => {
  if (scale >= 151) {
    return DUST_SCALE_COLOR.DANGER;
  } else if (scale >= 81) {
    return DUST_SCALE_COLOR.BAD;
  } else if (scale >= 30) {
    return DUST_SCALE_COLOR.NORMAL;
  } else {
    return DUST_SCALE_COLOR.GOOD;
  }
};
