export const getDustAverageGrade = (
  fineDustGrade: number,
  ultraFineDustGrade: number
) => {
  return Math.floor((fineDustGrade + ultraFineDustGrade) / 2);
};
