import styled from 'styled-components';

export const RatingWrapper = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size : 3vh;
    text-align: center;
    border-bottom: 1px solid #DFDFDF;
    border-radius: 10px;
    padding: 1vh 0;
    flex-direction: column;
    @media only screen and (min-width: 768px) {
        font-size: 20px;
    }
    transition-duration: 0.3s;
    &:hover {
        background-color: #dfdfdf;
        padding-left: 10px;
        padding-right: 10px;
        opacity: 0.8;
    }
`;

export const RatingDetails = styled.div`
    width: 68%;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    @media only screen and (min-width: 768px) {
        font-size: 20px;
    }
`;

export const Rank = styled.div`
    width: 10%;
    display: flex;
    font-size : 2vh;
    color: #9DADB6;
    @media only screen and (min-width: 768px) {
        font-size: 20px;
    }
`;

export const RankLocation = styled.div`
    display: flex;
    font-size : 5.5vw;
    @media only screen and (min-width: 768px) {
        font-size: 25px;
    }
`;

export const DustState = styled.div`
    width: 50%;
    @media only screen and (min-width: 768px) {
        font-size: 20px;
    }
`;

export const DustWrapper = styled.div`
    width: 32%;
    font-family: 'Pretendard-Medium';
    font-size : 3.3vw;
    @media only screen and (min-width: 768px) {
        font-size: 20px;
    }
`;

export const DustWrapperFlex = styled.div`
    display: flex;
    font-family: 'Pretendard-Medium';
    justify-content: space-between;
    margin: 0.5rem 0;
    @media only screen and (min-width: 768px) {
        font-size: 18px;
    }
`;

export const DustFigure = styled.div`
    display: flex;
    margin-left: 2vw;
    font-family: 'Pretendard-ExtraBold';
    @media only screen and (min-width: 768px) {
        font-size: 18px;
        margin-left: 10px;
    }
`;

export const Top = styled.div`
    display: flex;
    width: 100%;
`;

export const Container = styled.div`
    width: 100%;
    background-color: #dfdfdf;
    border-radius: 10px;
    display: flex;
    position: relative;
    flex-direction: column;
    display: ${(props) => props.click && `none`};
`;