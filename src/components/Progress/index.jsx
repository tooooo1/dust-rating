import 'react-sweet-progress/lib/style.css';

import React from 'react';
import { Progress } from 'react-sweet-progress';

import * as Styled from './styled';

const ProgressBar = ({ children, id, state }) => (
  <Styled.DustProgressWrapper id={id}>
    <Styled.DustWrapperFlex>
      <div>{children}</div>
      <Styled.DustFigure>{state}</Styled.DustFigure>
    </Styled.DustWrapperFlex>
    <Styled.ProgressWrapper>
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
    </Styled.ProgressWrapper>
  </Styled.DustProgressWrapper>
);

export default ProgressBar;
