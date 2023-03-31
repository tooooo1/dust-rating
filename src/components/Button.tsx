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
  border: none;
  padding: 0.9rem 2.2rem;
  color: #f9f9f9;
  background: ${(props) => props.color};
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover,
  &:active {
    transform: scale(1.05);
  }
`;
