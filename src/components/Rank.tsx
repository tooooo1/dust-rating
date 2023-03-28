import React, { useState } from 'react';
import styled from 'styled-components';

import Detail from './Detail';
import DustState from './DustState';

interface RankProps {
  i: number;
  city: string;
  dust: string;
  ultraDust: string;
  dustState: string;
  detail: {
    dataTime: string;
    stationName: string;
    pm10Value: string;
    pm25Value: string;
    pm10Grade: string;
    pm25Grade: string;
  }[];
}

const Rank = ({ i, city, dust, ultraDust, dustState, detail }: RankProps) => {
  const [click, setClick] = useState(true);
  const show = () => {
    setClick(!click);
  };
  return (
    <RatingWrapper onClick={show}>
      <Top>
        <RatingDetails>
          <RankW>{i}</RankW>
          <RankLocation>{city}</RankLocation>
          <DustStateW>
            <DustState dustState={dustState} />
          </DustStateW>
        </RatingDetails>
        <DustWrapper>
          <DustWrapperFlex>
            <div>미세먼지</div>
            <DustFigure>{dust}</DustFigure>
          </DustWrapperFlex>
          <DustWrapperFlex>
            <div>초미세먼지</div>
            <DustFigure>{ultraDust}</DustFigure>
          </DustWrapperFlex>
        </DustWrapper>
      </Top>
      <Container click={click}>
        {detail?.map((city, i) => {
          return (
            <Detail
              key={i}
              rank={i + 1}
              city={city.stationName}
              dust={city.pm10Value}
              ultraDust={city.pm25Value}
              dustState={city.pm10Grade}
            />
          );
        })}
      </Container>
    </RatingWrapper>
  );
};

export default Rank;

const RatingWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 3vh;
  text-align: center;
  border-bottom: 1px solid #dfdfdf;
  border-radius: 10px;
  padding: 1vh 0;
  flex-direction: column;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
  transition-duration: 0.3s;
  &:hover {
    background-color: #dfdfdf;
    padding-left: 10px;
    padding-right: 10px;
    opacity: 0.8;
  }
`;

const RatingDetails = styled.div`
  width: 68%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const RankW = styled.div`
  width: 10%;
  display: flex;
  font-size: 2vh;
  color: #9dadb6;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const RankLocation = styled.div`
  display: flex;
  font-size: 5.5vw;
  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;

const DustStateW = styled.div`
  width: 50%;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const DustWrapper = styled.div`
  width: 32%;
  font-family: 'Pretendard-Medium';
  font-size: 3.3vw;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const DustWrapperFlex = styled.div`
  display: flex;
  font-family: 'Pretendard-Medium';
  justify-content: space-between;
  margin: 0.5rem 0;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

const DustFigure = styled.div`
  display: flex;
  margin-left: 2vw;
  font-family: 'Pretendard-ExtraBold';
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin-left: 10px;
  }
`;

const Top = styled.div`
  display: flex;
  width: 100%;
`;

interface ContainerProps {
  click: boolean;
}

const Container = styled.div`
  width: 100%;
  background-color: #dfdfdf;
  border-radius: 10px;
  display: flex;
  position: relative;
  flex-direction: column;
  display: ${(props: ContainerProps) => props.click && `none`};
`;
