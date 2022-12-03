import styled from 'styled-components';

const Button = ({ children, onClick, color }) => (
  <Wrapper onClick={onClick} color={color}>
    {children}
  </Wrapper>
);

export default Button;

export const Wrapper = styled.button`
  width: 25%;
  border: none;
  padding: 0.9rem 2.2rem;
  color: #f9f9f9;
  background: ${(props) => props.color};
  font-size: 1.5rem;
  border-radius: 7px;
  cursor: pointer;
  transition: 0.3s all;
  font-family: 'Pretendard-Bold';
  &:hover,
  &:active {
    transform: scale(1.1);
  }

  @media only screen and (max-width: 414px) {
    width: 150px;
  }
`;
