import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #53CAF2;
  }
  #root>div {
      width: 100%;
      @media only screen and (min-width: 768px) {
        width: 70%;
    }
  }
`;

export const Mid = styled.div`
    margin: 0 auto;
    /* @media only screen and (min-width: 768px) {
        font-size: 60px;
    } */
`;


export const State = styled.div`
    margin-top: 8vh;
    font-size : 2.5vh;
    margin-bottom : 0.5rem;
    text-align: center;
    font-family: "Pretendard-Regular";
    color: white;
    /* @media only screen and (min-width: 768px) {
        font-size: 60px;
    } */
`;

export const Time = styled.div`
    font-size : 1.8vh;
    margin : 0 0 1.5rem 0;
    text-align: center;
    font-family: "Pretendard-Thin";
    color: white;
    /* @media only screen and (min-width: 768px) {
        font-size: 60px;
    } */
`;

export const Middle = styled.div`
    width: 80%;
    margin: 0 auto;
    text-align: center;
    border-radius: 10px 10px 0 0;
    font-family: "Pretendard-Light";
    background-color: white;
    /* @media only screen and (min-width: 768px) {
        font-size: 60px;
    } */
`;

export const Location = styled.div`
    font-size: 3vh;
    padding-top: 1.5rem;
    text-align: center;
    font-family: "Pretendard-SemiBold";
    /* @media only screen and (min-width: 768px) {
        font-size: 60px;
    } */
`;

export const Text = styled.div`
    font-size : 2vh;
    text-align: center;
    padding: 2vh 0 0.8vh 0;
    font-family: "Pretendard-Regular";
    color: #9DADB6;
    /* @media only screen and (min-width: 768px) {
        font-size: 20px;
    } */
`;

export const Dust = styled.div`
    font-size : 3vh;
    margin-bottom: 2vh;
    text-align: center;
    font-family: "Pretendard-Bold";
    color: red;
    /* @media only screen and (min-width: 768px) {
        font-size: 20px;
    } */
`;

export const Rating = styled.div`
    display: flex;
    justify-content: center;
    height: 60vh;
    background-color: #F6F6F6;
    font-size : 3vh;
    text-align: center;
    font-family: "Pretendard-Bold";
    /* @media only screen and (min-width: 768px) {
        font-size: 20px;
    } */
`;

export const DustRating = styled.div`
    display: flex;
    margin: 0 auto;
    width: 70%;
    justify-content: center;
    margin-top: 4vh;
    margin-bottom: 2vh;
    padding: 1vh 3vw;
    background-color: #44B7F7;
    border-radius: 20px;
    font-size : 2vh;
    color: white;
    text-align: center;
    font-family: "Pretendard-Regular";
    /* @media only screen and (min-width: 768px) {
        font-size: 20px;
    } */
`;