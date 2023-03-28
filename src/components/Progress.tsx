import 'react-sweet-progress/lib/style.css';

import React from 'react';
// react-sweet-progress의 타입을 지정하는 package가 없는것 같아서 repo를 찾아보니 ts-ignore로 처리하라는 답변을 보고 작성해둠.
// @ts-ignore
import { Progress } from 'react-sweet-progress';
import styled from 'styled-components';

interface ProgressBarProps {
  children: React.ReactNode;
  id: string;
  state: string;
}

const ProgressBar = ({ children, id, state }: ProgressBarProps) => (
  <DustProgressWrapper id={id}>
    <DustWrapperFlex>
      <div>{children}</div>
      <DustFigure>{state}</DustFigure>
    </DustWrapperFlex>
    <ProgressWrapper>
      <Progress
        percent={state}
        theme={{
          success: {
            symbol: ' ',
            color: 'rgb(223, 105, 180)',
          },
          active: {
            symbol: ' ',
            color: '#fbc630',
          },
          default: {
            symbol: ' ',
            color: '#fbc630',
          },
        }}
      />
    </ProgressWrapper>
  </DustProgressWrapper>
);

export default ProgressBar;

const DustWrapperFlex = styled.div`
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
const DustFigure = styled.div`
  display: flex;
  margin-left: 2vw;
  font-family: 'Pretendard-ExtraBold';
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin-left: 20px;
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
  width: 60%;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const DustProgressWrapper = styled.div`
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
