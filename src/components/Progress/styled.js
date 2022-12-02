import styled from 'styled-components';

export const DustWrapperFlex = styled.div`
  display: flex;
  width: 30%;
  font-size: 3vw;
  align-items: center;
  font-family: 'Pretendard-Medium';
  justify-content: space-between;
  margin: 0 0.5rem;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin: 0 30px;
  }
`;
export const DustFigure = styled.div`
  display: flex;
  margin-left: 2vw;
  font-family: 'Pretendard-ExtraBold';
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin-left: 20px;
  }
`;

export const ProgressWrapper = styled.div`
  display: flex;
  width: 60%;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

export const DustProgressWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 7vw;
  font-size: 3vw;
  padding-bottom: 5px;

  &#first {
    padding-top: 2vh;
  }
  &#last {
    padding-bottom: 2.5vh;
  }
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin-left: 15px;
  }
`;
