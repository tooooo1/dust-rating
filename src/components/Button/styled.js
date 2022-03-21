import styled from 'styled-components';

export const Wrapper = styled.div`
    
    margin: 0;
    padding: 0.7rem 0;
    color: #F9F9F9;
    background: ${(props) => props.background};
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 7px;
    cursor: pointer;
    user-select: none;
    transition: .3s all;
    font-family: 'Pretendard-Bold';
    &:hover, &:active {
        transform: scale(1.1);
    }
    &#list {
        margin: 10px 0;
    }
`;