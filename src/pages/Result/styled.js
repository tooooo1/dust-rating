import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #53CAF2;
  }
  #root>div {
    width: 100%;
    /* PC (해상도 1024px)*/ 
    @media all and (min-width:1024px) { 
        width: 600px;
    } /* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
    @media all and (min-width:768px) and (max-width:1023px) {
        width: 600px;
    } /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/ 
    @media all and (max-width:767px) {
        width: 100%
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
    font-size : 4vw;
    margin-bottom : 0.5rem;
    text-align: center;
    font-family: "Pretendard-Regular";
    color: white;
    @media only screen and (min-width: 768px) {
        font-size: 30px;
    }
`;

export const Time = styled.div`
    font-size : 3.3vw;
    margin : 0 0 1.5rem 0;
    text-align: center;
    font-family: "Pretendard-Thin";
    color: white;
    @media only screen and (min-width: 768px) {
        font-size: 24px;
    }
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
    font-size: 6vw;
    padding-top: 1.5rem;
    text-align: center;
    font-family: "Pretendard-SemiBold";
    @media only screen and (min-width: 768px) {
        font-size: 30px;
    }
`;

export const Text = styled.div`
    font-size : 3.5vw;
    text-align: center;
    padding: 2vh 0 0.8vh 0;
    font-family: "Pretendard-Regular";
    color: #9DADB6;
    @media only screen and (min-width: 768px) {
        font-size: 20px;
    }
`;

export const Rating = styled.div`
    display: flex;
    justify-content: center;
    background-color: #F6F6F6;
    font-size : 3vh;
    text-align: center;
    font-family: "Pretendard-Bold";
    @media only screen and (min-width: 768px) {
        border-radius: 20px 20px 0 0;
    }
`;

export const RatingWidth = styled.div`
    width: 70%;
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
    font-size : 3.5vw;
    color: white;
    text-align: center;
    font-family: "Pretendard-Regular";
    @media only screen and (min-width: 768px) {
        font-size: 20px;
        padding: 10px 40px;
    }
`;