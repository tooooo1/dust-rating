import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #53CAF2;
  }
  /* #root>div {
      width: 80%;
      @media only screen and (min-width: 768px) {
        width: 70%;
    }
  } */
`;

export const Title = styled.div`
    font-size : 8vh;
    font-weight : 1000;
    margin-bottom : 1.5rem;
    text-align: center;
    font-family: "Pretendard-Bold";
    color: white;
    @media only screen and (min-width: 768px) {
        font-size: 60px;
    }
`;

export const SubTitle = styled.div`
    font-size : 5vw;
    margin-bottom : 1.5vh;
    text-align: center;
    font-family: "Pretendard-Regular";
    color: white;
    @media only screen and (min-width: 768px) {
        font-size: 20px;
    }
`;

export const Text = styled.div`
    font-size : 4vw;
    margin-bottom : 1.5vh;
    text-align: center;
    font-family: "Pretendard-SemiBold";
    color: white;
    @media only screen and (min-width: 768px) {
        font-size: 20px;
    }
`;

export const Center = styled.div`
    text-align: center;
    margin-bottom: 1rem;
`;

export const Select = styled.select`
    height: 6vh;
    color: #9DADB6;
    margin-bottom: 1rem;
    font-weight: bold;
    font-family: "Pretendard-Regular";
    
    opacity: 0.8;
    /* -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none; */
    padding-right: 1rem;
    padding-left: 1rem;
    border-radius: 10px;
    border: none;
    font-size: 16px;

    &:focus-visible {
        outline: white solid 2px;
    }

    option {
        border-radius: 8px;
        color: black;
    }
`;