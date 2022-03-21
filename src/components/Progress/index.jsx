import React from 'react';
import * as Styled from './styled';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const ProgressBar = ({children}) => (
    <Styled.DustProgressWrapper>
        <Styled.DustWrapperFlex>
                <div>{children}</div>
                <Styled.DustFigure>105</Styled.DustFigure>
        </Styled.DustWrapperFlex>
        <Styled.ProgressWrapper>
            <Progress percent={80} 
            theme={{
                success: {
                symbol: ' ',
                color: 'rgb(223, 105, 180)'
                },
                active: {
                symbol: ' ',
                color: '#fbc630'
                },
                default: {
                symbol: ' ',
                color: '#fbc630'
                }
            }}
            />
            </Styled.ProgressWrapper>
    </Styled.DustProgressWrapper>
)

export default ProgressBar;