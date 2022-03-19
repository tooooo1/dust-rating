import { Positioner } from '../../components/Wrapper/styled'
import { useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import { Context } from "../../store/Store"
import * as Styled from './styled';

const Choice = () => {
    let navigate = useNavigate();
    const { place, contextDispatch } = useContext(Context);
    const city = ['서울', '부산', '대구', '인천', '광주',
        '대전', '울산', '경기', '강원', '충북', '충남', '전북',
        '전남', '경북', '경남', '제주', '세종'];
    
    // const temp = (lo) => {
    //     contextDispatch({ value:lo})
    //     navigate("/result");
    // }

    return (
        <Positioner>
            <Styled.GlobalStyle />
            <Styled.Center><img src="img/location.png" alt='location' width={30} /></Styled.Center>
            <Styled.SubTitle>한 눈에 확인하는</Styled.SubTitle>
            <Styled.Title>미먼랭킹</Styled.Title>
            <Styled.Text>미세먼지 농도가 궁금한 지역은?</Styled.Text>
            <Styled.Center>
                <Styled.Select>
                    {
                        city.map((i) => (
                            <option value={i} onChange={()=>navigate("/result")}> {i} </option>
                        ))
                    }
                </Styled.Select>
            </Styled.Center>
            {/* <div>
                먼지랭킹 {place}
                <div>
                    <select>
                        <option value="서울" onChange={()=>contextDispatch({ type: "서울", value: "서울" })}>서울</option>
                        <option value="부산" onChange={()=>contextDispatch({type:"부산", value:"부산"})}>부산</option>
                        <option value="대구">대구</option>
                    </select>
                    <button onClick={() => navigate("/result")}>다음</button>
                    <button onClick={()=>contextDispatch({ value:'부산'})}>부산</button>
                </div>
            </div> */}
        </Positioner>
    )
};

export default Choice;