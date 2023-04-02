import styled from '@emotion/styled';

interface FineDustStateProps {
  fineDustState: number;
}

const FineDustState = ({ fineDustState }: FineDustStateProps) => {
  if (fineDustState < 80)
    return <DustStateColor color="#1E64EE">{fineDustState}좋음</DustStateColor>;
  if (fineDustState < 150)
    return <DustStateColor color="#00D500">{fineDustState}보통</DustStateColor>;
  if (fineDustState < 300)
    return <DustStateColor color="#F95A20">{fineDustState}나쁨</DustStateColor>;
  if (isNaN(fineDustState))
    return (
      <DustStateColor color="#666666">{fineDustState}측정중</DustStateColor>
    );

  return (
    <DustStateColor color="#E73532">{fineDustState}매우나쁨</DustStateColor>
  );
};

export default FineDustState;

const DustStateColor = styled.div`
  font-size: 5.5vw;
  display: flex;
  justify-content: center;
  color: ${(props) => props.color};
  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;
