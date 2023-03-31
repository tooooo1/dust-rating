import { CSSProperties, ReactNode } from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  children: ReactNode;
  color: CSSProperties['color'];
  onClick: () => void;
}

const Button = ({ children, color, onClick }: ButtonProps) => (
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
  &:hover,
  &:active {
    transform: scale(1.1);
  }

  @media only screen and (max-width: 414px) {
    width: 150px;
  }
`;
