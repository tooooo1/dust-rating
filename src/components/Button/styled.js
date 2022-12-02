import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 25%;
  margin: 0 auto;
  padding: 1rem 0;
  color: #f9f9f9;
  background: ${(props) => props.background};
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 100px;
  cursor: pointer;
  user-select: none;
  transition: 0.3s all;
  font-family: 'Pretendard-Bold';
  &:hover,
  &:active {
    transform: scale(1.1);
  }
  &#list {
    margin: 10px 0;
  }
`;
