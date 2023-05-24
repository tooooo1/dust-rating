import axios from 'axios';
import { SIDO_NAMES } from '@/utils/constants';

const { VITE_KAKAO_MAP_URL, VITE_KAKAO_API_KEY } = import.meta.env;

export const getAllLocation = async () => {
  try {
    const result = await Promise.all(
      SIDO_NAMES.map((sidoName) =>
        axios
          .get(VITE_KAKAO_MAP_URL + encodeURIComponent(sidoName), {
            headers: {
              Authorization: `KakaoAK ${VITE_KAKAO_API_KEY}`,
            },
          })
          .then((res) => ({
            sidoName,
            latitude: Number(res.data.documents[0].y),
            longitude: Number(res.data.documents[0].x),
          }))
      )
    );

    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export const getLocation = async (city: string) => {
  try {
    const result = await axios
      .get(VITE_KAKAO_MAP_URL + encodeURIComponent(city), {
        headers: {
          Authorization: `KakaoAK ${VITE_KAKAO_API_KEY}`,
        },
      })
      .then((res) => res.data.documents[0]);

    return { latitude: Number(result.x), longitude: Number(result.y) };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
