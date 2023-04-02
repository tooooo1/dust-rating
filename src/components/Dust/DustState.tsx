import styled from '@emotion/styled';

interface DustStateProps {
  dustState: string;
}

const DustState = ({ dustState }: DustStateProps) => {
  if (+dustState < 2)
    return <DustStateColor style={{ color: '#1E64EE' }}>좋음</DustStateColor>;
  if (+dustState < 3)
    return <DustStateColor style={{ color: '#00D500' }}>보통</DustStateColor>;
  if (+dustState < 4)
    return <DustStateColor style={{ color: '#F95A20' }}>나쁨</DustStateColor>;
  if (isNaN(+dustState))
    return <DustStateColor style={{ color: '#666666' }}>측정중</DustStateColor>;

  return <DustStateColor style={{ color: '#E73532' }}>매우나쁨</DustStateColor>;
};

export default DustState;

const DustStateColor = styled.div`
  font-size: 5.5vw;
  display: flex;
  justify-content: center;
  font-weight: 700;
  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;
