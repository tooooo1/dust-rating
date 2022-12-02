import * as Styled from './styled';

const DustState = ({ dustState }) => {
  if (dustState < 2)
    return (
      <Styled.DustStateColor style={{ color: '#1E64EE' }}>
        좋음
      </Styled.DustStateColor>
    );
  else if (dustState < 3)
    return (
      <Styled.DustStateColor style={{ color: '#00D500' }}>
        보통
      </Styled.DustStateColor>
    );
  else if (dustState < 4)
    return (
      <Styled.DustStateColor style={{ color: '#F95A20' }}>
        나쁨
      </Styled.DustStateColor>
    );
  else if (isNaN(dustState))
    return (
      <Styled.DustStateColor style={{ color: '#666666' }}>
        측정중
      </Styled.DustStateColor>
    );
  else
    return (
      <Styled.DustStateColor style={{ color: '#E73532' }}>
        매우나쁨
      </Styled.DustStateColor>
    );
};

export default DustState;
