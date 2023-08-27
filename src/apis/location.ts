import axios from 'axios';
import { SIDO_NAMES } from '@/utils/constants';

const { VITE_KAKAO_MAP_URL, VITE_KAKAO_API_KEY } = import.meta.env;

/**
 *
 * @description 17개 Sido위치를 반환하는 함수
 */
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
            location: sidoName,
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
