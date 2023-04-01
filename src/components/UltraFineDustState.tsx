import styled from '@emotion/styled';

interface UltraFineDustStateProps {
  ultraFineDustState: string;
}

const UltraFineDustState = ({
  ultraFineDustState,
}: UltraFineDustStateProps) => {
  if (+ultraFineDustState < 15)
    return (
      <DustStateColor color="#1E64EE">{ultraFineDustState}좋음</DustStateColor>
    );
  if (+ultraFineDustState < 35)
    return (
      <DustStateColor color="#00D500">{ultraFineDustState}보통</DustStateColor>
    );
  if (+ultraFineDustState < 75)
    return (
      <DustStateColor color="#F95A20">{ultraFineDustState}나쁨</DustStateColor>
    );
  if (isNaN(+ultraFineDustState))
    return (
      <DustStateColor color="#666666">
        {ultraFineDustState}측정중
      </DustStateColor>
    );

  return (
    <DustStateColor color="#E73532">
      {ultraFineDustState}매우나쁨
    </DustStateColor>
  );
};

export default UltraFineDustState;

const DustStateColor = styled.div`
  font-size: 5.5vw;
  display: flex;
  justify-content: center;
  font-family: 'Pretendard-Bold';
  color: ${(props) => props.color};
  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;
