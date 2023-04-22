import axios from 'axios';

const { VITE_AIR_QUALITY_API_KEY, VITE_MINU_DUST_FRCST_DSPTH_URL } = import.meta
  .env;

const getTodayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;
};

interface DustForcast {
  imageUrl1: string;
  informOverall: string;
}

export const getDustForcast = async () => {
  try {
    const response = await axios.get(
      `${VITE_MINU_DUST_FRCST_DSPTH_URL}?searchDate=${getTodayDate()}&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&numOfRows=100&pageNo=1`
    );

    if (response.status !== 200) {
      throw new Error('API 에러');
    }

    return response.data.response.body.items.find(
      (forcast: DustForcast) => forcast.imageUrl1 && forcast.informOverall
    );
  } catch (error) {
    console.error(error);
  }
};
