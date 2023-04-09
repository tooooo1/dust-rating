import axios from 'axios';
import { CITY_GROUP } from '@/utils/constance';

const { VITE_KAKAO_API_KEY } = import.meta.env;

export const getAllLocation = async () => {
  try {
    const result = await Promise.all(
      CITY_GROUP.map((city) =>
        axios
          .get(
            'https://dapi.kakao.com/v2/local/search/address.json?query=' +
              encodeURIComponent(city.cityName),
            {
              headers: {
                Authorization: `KakaoAK ${VITE_KAKAO_API_KEY}`,
              },
            }
          )
          .then((res) => ({
            cityName: city.cityName,
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
      .get(
        'https://dapi.kakao.com/v2/local/search/address.json?query=' +
          encodeURIComponent(cityName),
        {
          headers: {
            Authorization: `KakaoAK ${VITE_KAKAO_API_KEY}`,
          },
        }
      )
      .then((res) => res.data.documents[0]);

    return { latitude: Number(result.x), longitude: Number(result.y) };
  } catch (error) {
    console.error(error);
  }
};
