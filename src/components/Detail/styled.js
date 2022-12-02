import styled from 'styled-components';

export const RatingWrapper = styled.div`
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

export const RatingDetails = styled.div`
  width: 68%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

export const Rank = styled.div`
  width: 10%;
  display: flex;
  font-size: 2vh;
  font-family: 'Pretendard-SemiBold';
  color: #9dadb6;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

export const RankLocation = styled.div`
  display: flex;
  font-family: 'Pretendard-SemiBold';
  font-size: 5.5vw;
  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;

export const DustState = styled.div`
  width: 50%;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

export const DustWrapper = styled.div`
  width: 32%;
  font-family: 'Pretendard-Light';
  font-size: 3.3vw;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

export const DustWrapperFlex = styled.div`
  display: flex;
  font-family: 'Pretendard-Light';
  justify-content: space-between;
  margin: 0.5rem 0;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

export const DustFigure = styled.div`
  display: flex;
  margin-left: 2vw;
  font-family: 'Pretendard-SemiBold';
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin-left: 10px;
  }
`;

export const Top = styled.div`
  display: flex;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;
