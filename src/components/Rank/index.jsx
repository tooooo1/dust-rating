import React from 'react';
import DustState from '../DustState'
import * as Styled from './styled';

const Rank = ({ i, city ,dust, ultraDust, dustState }) => (
    <Styled.RatingWrapper>
        <Styled.RatingDetails>
            <Styled.Rank>{i}</Styled.Rank>
            <Styled.RankLocation>{city}</Styled.RankLocation>
            <Styled.DustState>
                <DustState dustState={dustState} />
            </Styled.DustState>
        </Styled.RatingDetails>
        <Styled.DustWrapper>
            <Styled.DustWrapperFlex>
                <div>미세먼지</div>
                <Styled.DustFigure>{dust}</Styled.DustFigure>
            </Styled.DustWrapperFlex>
            <Styled.DustWrapperFlex>
                <div>초미세먼지</div>
                <Styled.DustFigure>{ultraDust}</Styled.DustFigure>
            </Styled.DustWrapperFlex>
        </Styled.DustWrapper>
    </Styled.RatingWrapper>
)

export default Rank;