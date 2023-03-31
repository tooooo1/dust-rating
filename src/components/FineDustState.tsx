import styled from 'styled-components';

interface FineDustStateProps {
  fineDustState: string;
}

const FineDustState = ({ fineDustState }: FineDustStateProps) => {
  if (+fineDustState < 50)
    return <DustStateColor style={{ color: '#1E64EE' }}>좋음</DustStateColor>;
  if (+fineDustState < 100)
    return <DustStateColor style={{ color: '#00D500' }}>보통</DustStateColor>;
  if (+fineDustState < 250)
    return <DustStateColor style={{ color: '#F95A20' }}>나쁨</DustStateColor>;
  if (isNaN(+fineDustState))
    return <DustStateColor style={{ color: '#666666' }}>측정중</DustStateColor>;

  return <DustStateColor style={{ color: '#E73532' }}>매우나쁨</DustStateColor>;
};

export default FineDustState;

const DustStateColor = styled.div`
  font-size: 5.5vw;
  display: flex;
  justify-content: center;
  font-family: 'Pretendard-Bold';
  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;
