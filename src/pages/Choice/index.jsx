import { Positioner } from '../../components/Wrapper/styled'
import { useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import Button from '../../components/Button'
import { Context } from "../../store/Store"
import * as Styled from './styled';

const Choice = () => {
    let navigate = useNavigate();
    const { place, contextDispatch } = useContext(Context);
    const city = ['선택', '서울', '부산', '대구', '인천', '광주',
        '대전', '울산', '경기', '강원', '충북', '충남', '전북',
        '전남', '경북', '경남', '제주', '세종'];

    const onChangeHandler=(e)=>{
        contextDispatch({ value: e.currentTarget.value})
    }

    const onClick = () => {
        if (place==='선택') alert("도시를 선택해주세요!")
        else navigate("/result")
    }

    return (
        <Positioner>
            <Styled.GlobalStyle />
            <Styled.Center><img src="img/location.png" alt='location' width={30} /></Styled.Center>
            <Styled.SubTitle>한 눈에 확인하는</Styled.SubTitle>
            <Styled.Title>랭킹먼지</Styled.Title>
            <Styled.Text>미세먼지 농도가 궁금한 지역은?</Styled.Text>
            <Styled.Center>
                <Styled.Select onChange={onChangeHandler} value={place}>
                    {
                        city.map((i) => (
                            <option value={i}> {i} </option>
                        ))
                    }
                </Styled.Select>
                <Button color={"#2886A6"} onClick={onClick}>검색</Button>
            </Styled.Center>
        </Positioner>
    )
};

export default Choice;