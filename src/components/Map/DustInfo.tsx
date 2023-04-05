import { CSSProperties } from 'react';
import styled from '@emotion/styled';

const DUST_SCALE_COLOR = {
  DANGER: '#e64746',
  BAD: '#fda60d',
  NORMAL: '#03c73c',
  GOOD: '#30a2ff',
};

interface DustInfoProps {
  fineDust: number;
  ultraFineDust: number;
  area?: string;
  color?: CSSProperties['color'];
}

const DustInfo = ({
  fineDust,
  ultraFineDust,
  area = '서울',
  color = DUST_SCALE_COLOR.DANGER,
}: DustInfoProps) => {
  return (
    <Wrapper color={color}>
      <span>{fineDust}</span>/<span>{ultraFineDust}</span>
      <Area>{area}</Area>
    </Wrapper>
  );
};

export default DustInfo;

const Wrapper = styled.div<Pick<DustInfoProps, 'color'>>`
  position: relative;
  padding: 0.8rem 1rem;
  color: #ffffff;
  background-color: ${({ color }) => color};
  border: 0.2rem solid #ffffff;
  border-radius: 2rem;

  &:before {
    content: '';
    position: absolute;
    bottom: -0.8rem;
    left: 50%;
    width: 0;
    height: 0;
    border-width: 0.7rem 0.6rem 0;
    border-style: solid;
    border-color: transparent;
    border-top-color: #ffffff;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    width: 0;
    height: 0;
    border-width: 0.6rem 0.5rem 0;
    border-style: solid;
    border-color: transparent;
    border-top-color: ${({ color }) => color};
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
`;

const Area = styled.p`
  position: absolute;
  left: 48%;
  bottom: -2.2rem;
  font-weight: 700;
  color: #2a282f;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
`;
