import 'react-sweet-progress/lib/style.css';

import React from 'react';
// @ts-ignore
import { Progress } from 'react-sweet-progress';
import styled from '@emotion/styled';

interface ProgressBarProps {
  children: React.ReactNode;
  id: string;
  state: number;
}

const ProgressBar = ({ children, id, state }: ProgressBarProps) => {
  const percent = +state * (1 / 100) * 100;
  const percentOfDustContamination = percent > 100 ? 100 : percent;

  return (
    <DustProgressWrapper id={id}>
      <DustWrapperFlex>
        <div>{children}</div>
        <DustFigure>{state}</DustFigure>
      </DustWrapperFlex>
      <ProgressWrapper>
        <Progress
          percent={percentOfDustContamination}
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
};

export default ProgressBar;

const DustWrapperFlex = styled.div`
  display: flex;
  width: 30%;
  font-size: 3vw;
  align-items: center;
  font-weight: 500;
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
  font-weight: 800;
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
