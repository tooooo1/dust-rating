import React from 'react';
import styled from 'styled-components';

import DustState from './DustState.js';

const Detail = ({ i, city, dust, ultraDust, dustState }) => (
  <RatingWrapper>
    <Top>
      <RatingDetails>
        <Rank>{i}</Rank>
        <RankLocation>{city}</RankLocation>
        <DustStateWr>
          <DustState dustState={dustState} />
        </DustStateWr>
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
  </RatingWrapper>
);

export default Detail;

const RatingWrapper = styled.div`
  position: relative;
  flex-direction: column;
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 3vh;
  text-align: center;
  border-bottom: 1px solid #dfdfdf;
  border-radius: 10px;
  padding: 1vh 0;
  width: 90%;
  margin: 0 auto;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
  transform: height 0.35s ease;
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

const Rank = styled.div`
  width: 10%;
  display: flex;
  font-size: 2vh;
  font-family: 'Pretendard-SemiBold';
  color: #9dadb6;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const RankLocation = styled.div`
  display: flex;
  font-family: 'Pretendard-SemiBold';
  font-size: 5.5vw;
  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;

const DustStateWr = styled.div`
  width: 50%;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const DustWrapper = styled.div`
  width: 32%;
  font-family: 'Pretendard-Light';
  font-size: 3.3vw;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const DustWrapperFlex = styled.div`
  display: flex;
  font-family: 'Pretendard-Light';
  justify-content: space-between;
  margin: 0.5rem 0;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

const DustFigure = styled.div`
  display: flex;
  margin-left: 2vw;
  font-family: 'Pretendard-SemiBold';
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin-left: 10px;
  }
`;

const Top = styled.div`
  display: flex;
  width: 100%;
`;
