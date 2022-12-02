import React, { useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import DustState from '../../components/DustState/index.jsx';
import Progress from '../../components/Progress/index.jsx';
import Rank from '../../components/Rank/index.jsx';
import { Context } from '../../store/Store';

const Result = () => {
  const { place, cityDustList } = useContext(Context);
  let curDust, curUltraDust, curGrade;

  cityDustList.map((i) => {
    if (i.place === place) {
      curDust = i.dust;
      curUltraDust = i.ultraDust;
      curGrade = i.grade;
    }
    return 0;
  });

  return (
    <Mid>
      <GlobalStyle />
      <div>
        <State>전국 미세먼지 농도는 다음과 같습니다</State>
        <Time>{cityDustList[0].time} 기준</Time>
        <Middle>
          <Location>{place}</Location>
          <Text>현재의 대기질 지수는</Text>
          <DustState dustState={curGrade} />
          <Progress id="first" state={curDust}>
            미세먼지
          </Progress>
          <Progress id="last" state={curUltraDust}>
            초미세먼지
          </Progress>
        </Middle>
      </div>
      <div>
        <Rating>
          <RatingWidth>
            <DustRating>지역별 미세먼지 농도 순위</DustRating>
            {cityDustList.map((city, i) => {
              return (
                <Rank
                  key={i}
                  i={i + 1}
                  city={city.place}
                  dust={city.dust}
                  ultraDust={city.ultraDust}
                  dustState={city.grade}
                  detail={city.detail}
                  click={false}
                />
              );
            })}
          </RatingWidth>
        </Rating>
      </div>
    </Mid>
  );
};

export default Result;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #53CAF2;
  }
  #root>div {
    width: 100%;
    /* PC (해상도 1024px)*/ 
    @media all and (min-width:1024px) { 
        width: 600px;
    } /* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
    @media all and (min-width:768px) and (max-width:1023px) {
        width: 600px;
    } /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/ 
    @media all and (max-width:767px) {
        width: 100%
    }
  }
`;

const Mid = styled.div`
  margin: 0 auto;
  /* @media only screen and (min-width: 768px) {
        font-size: 60px;
    } */
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

const Time = styled.div`
  font-size: 3.3vw;
  margin: 0 0 1.5rem 0;
  text-align: center;
  font-family: 'Pretendard-Thin';
  color: white;
  @media only screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

const Middle = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  border-radius: 10px 10px 0 0;
  font-family: 'Pretendard-Light';
  background-color: white;
  /* @media only screen and (min-width: 768px) {
        font-size: 60px;
    } */
`;

const Location = styled.div`
  font-size: 6vw;
  padding-top: 1.5rem;
  text-align: center;
  font-family: 'Pretendard-SemiBold';
  @media only screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const Text = styled.div`
  font-size: 3.5vw;
  text-align: center;
  padding: 2vh 0 0.8vh 0;
  font-family: 'Pretendard-Regular';
  color: #9dadb6;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  font-size: 3vh;
  text-align: center;
  font-family: 'Pretendard-Bold';
  @media only screen and (min-width: 768px) {
    border-radius: 20px 20px 0 0;
  }
`;

const RatingWidth = styled.div`
  width: 70%;
  /* @media only screen and (min-width: 768px) {
        font-size: 20px;
    } */
`;

const DustRating = styled.div`
  display: flex;
  margin: 0 auto;
  width: 70%;
  justify-content: center;
  margin-top: 4vh;
  margin-bottom: 2vh;
  padding: 1vh 3vw;
  background-color: #44b7f7;
  border-radius: 20px;
  font-size: 3.5vw;
  color: white;
  text-align: center;
  font-family: 'Pretendard-Regular';
  @media only screen and (min-width: 768px) {
    font-size: 20px;
    padding: 10px 40px;
  }
`;
