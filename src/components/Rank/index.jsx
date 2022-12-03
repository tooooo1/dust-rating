import React, { useState } from 'react';

import Detail from '../Detail/index.jsx';
import DustState from '../DustState/index.jsx';
import * as Styled from './styled';

const Rank = ({ i, city, dust, ultraDust, dustState, detail }) => {
  const [click, setClick] = useState(true);
  const show = () => {
    setClick(!click);
  };
  return (
    <Styled.RatingWrapper onClick={show}>
      <Styled.Top>
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
      </Styled.Top>
      <Styled.Container click={click}>
        {detail.map((city, i) => {
          return (
            <Detail
              key={i}
              i={i + 1}
              city={city.stationName}
              dust={city.pm10Value}
              ultraDust={city.pm25Value}
              dustState={city.pm10Grade}
            />
          );
        })}
      </Styled.Container>
    </Styled.RatingWrapper>
  );
};

export default Rank;
