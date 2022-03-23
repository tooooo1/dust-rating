import React, { useContext } from 'react';
import { Context } from "../../store/Store"
import Rank from '../../components/Rank'
import Progress from '../../components/Progress'
import * as Styled from './styled';


const Result = () => {
    const { place, contextDispatch } = useContext(Context);
    const city = ['서울', '부산', '대구', '인천', '광주',
        '대전', '울산', '경기', '강원', '충북', '충남', '전북',
        '전남', '경북', '경남', '제주', '세종']

    return (
        <Styled.Mid>
            <Styled.GlobalStyle />
            <div>
                <Styled.State>현재 미세먼지 농도가 가장 높아요</Styled.State>
                <Styled.Time>실시간 16:00 기준</Styled.Time>
                <Styled.Middle>
                    <Styled.Location>{place}</Styled.Location>
                    <Styled.Text>현재의 대기질 지수는</Styled.Text>
                    <Styled.Dust>매우 나쁨</Styled.Dust>
                    <Progress>미세먼지</Progress>
                    <Progress id="id">초미세먼지</Progress>
                </Styled.Middle>
            </div>
            <div>
                <Styled.Rating>
                    <div>
                        <Styled.DustRating>지역별 미세먼지 농도 순위</Styled.DustRating>
                        <Rank />
                        <Rank />
                        <Rank />
                        <Rank />
                    </div>
                </Styled.Rating>
            </div>
        </Styled.Mid>
    )
};

export default Result;