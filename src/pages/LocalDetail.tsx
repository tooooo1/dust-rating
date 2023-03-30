import styled from 'styled-components';
import axios from 'axios';

const { VITE_WEATHER_API_KEY } = import.meta.env;

const LocalDetail = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month =
    date.getMonth() < 10
      ? '0' + (date.getMonth() + 1)
      : (date.getMonth() + 1).toString();
  const day = date.getDate();
  const today = year + month + day;

  const now = ('0' + date.getHours()).slice(-2) + '00';

  const fetch = async () => {
    const temp = await axios
      .get(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${VITE_WEATHER_API_KEY}&numOfRows=10&pageNo=1&base_date=${today}&base_time=${now}&nx=55&ny=127`
      )
      .then((res) => res.data.json());

    console.log(temp);
  };
  fetch();

  return (
    <>
      <TotalWrapper>
        <State>지역 상세 날씨</State>
        <div>This is LocalDetail Page</div>
      </TotalWrapper>
    </>
  );
};

export default LocalDetail;

const TotalWrapper = styled.div`
  height: 100%;
  background-color: white;
`;

const State = styled.div`
  margin-top: 8vh;
  font-size: 4vw;
  margin-bottom: 0.5rem;
  text-align: center;
  font-family: 'Pretendard-Regular';
  color: white;
  @media only screen and (min-width: 768px) {
    font-size: 30px;
  }
`;
