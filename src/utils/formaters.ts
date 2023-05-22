export const getTodayDate = (standard: number = 0) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  if (hour <= standard) {
    const yesterday = new Date(date.setDate(date.getDate() - 1)).getDate();

    return `${year}-${month < 10 ? '0' + month : month}-${
      yesterday < 10 ? '0' + yesterday : yesterday
    }`;
  }

  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;
};
