import React from 'react';
import * as Styled from './styled';

const Rank = () => (
    <Styled.RatingWrapper>
        <Styled.RatingDetails>
            <Styled.Rank>2</Styled.Rank>
            <Styled.RankLocation>지역1</Styled.RankLocation>
            <Styled.DustState>나쁨</Styled.DustState>
        </Styled.RatingDetails>
        <Styled.DustWrapper>
            <Styled.DustWrapperFlex>
                <div>미세먼지</div>
                <Styled.DustFigure>95</Styled.DustFigure>
            </Styled.DustWrapperFlex>
            <Styled.DustWrapperFlex>
                <div>초미세먼지</div>
                <Styled.DustFigure>60</Styled.DustFigure>
            </Styled.DustWrapperFlex>
        </Styled.DustWrapper>
    </Styled.RatingWrapper>
)

export default Rank;