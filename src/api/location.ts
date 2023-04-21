import axios from 'axios';
import { SIDO_GROUP } from '@/utils/constants';

const { VITE_KAKAO_API_KEY, VITE_KAKAO_MAP_URL } = import.meta.env;

export const getAllLocation = async () => {
  try {
    const result = await Promise.all(
      SIDO_GROUP.map((city) =>
        axios
          .get(VITE_KAKAO_MAP_URL + encodeURIComponent(city.sidoName), {
            headers: {
              Authorization: `KakaoAK ${VITE_KAKAO_API_KEY}`,
            },
          })
          .then((res) => ({
            cityName: city.sidoName,
            latitude: Number(res.data.documents[0].y),
            longitude: Number(res.data.documents[0].x),
          }))
      )
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getLocation = async (cityName: string) => {
  try {
    const result = await axios
      .get(VITE_KAKAO_MAP_URL + encodeURIComponent(cityName), {
        headers: {
          Authorization: `KakaoAK ${VITE_KAKAO_API_KEY}`,
        },
      })
      .then((res) => res.data.documents[0]);

    return { latitude: Number(result.x), longitude: Number(result.y) };
  } catch (error) {
    console.error(error);
  }
};
