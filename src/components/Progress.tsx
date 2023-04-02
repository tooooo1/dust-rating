import 'react-sweet-progress/lib/style.css';

import React from 'react';
// @ts-ignore
import { Progress } from 'react-sweet-progress';
import styled from '@emotion/styled';

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
        percent={+state * (1 / 1000) * 100}
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
  /* font-family: 'Pretendard-Medium'; */
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
  /* font-family: 'Pretendard-ExtraBold'; */
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
