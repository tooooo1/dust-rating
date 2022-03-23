import React, { useContext } from 'react';
import { Context } from "../../store/Store"
import Rank from '../../components/Rank'
import Progress from '../../components/Progress'
import DustState from '../../components/DustState'
import * as Styled from './styled';

const Result = () => {
    const { place, cityDustList } = useContext(Context);

    return (
        <Styled.Mid>
            <Styled.GlobalStyle />
            <div>
                <Styled.State>전국 미세먼지 농도는 다음과 같습니다</Styled.State>
                <Styled.Time>실시간 {cityDustList[0].time}  기준</Styled.Time>
                <Styled.Middle>
                    <Styled.Location>{place}</Styled.Location>
                    <Styled.Text>현재의 대기질 지수는</Styled.Text>
                    <DustState dustState={cityDustList[0].grade} />
                    <Progress id="first" state={cityDustList[10].dust}>미세먼지</Progress>
                    <Progress id="last" state={cityDustList[10].ultraDust}>초미세먼지</Progress>
                </Styled.Middle>
            </div>
            <div>
                <Styled.Rating>
                    <Styled.RatingWidth>
                        <Styled.DustRating>지역별 미세먼지 농도 순위</Styled.DustRating>
                        
                        {
                            cityDustList.map((city,i) => {
                                return (
                                    <Rank i={i + 1} city={city.place} dust={ city.dust } ultraDust= {city.ultraDust} dustState={city.grade} />
                                )
                            })
                        }
                    </Styled.RatingWidth>
                </Styled.Rating>
            </div>
        </Styled.Mid>
    )
};

export default Result;