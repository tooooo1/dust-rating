import styled from '@emotion/styled';

interface DustStateProps {
  dustDensity: string;
  kindOfDust: string;
}

const dustRateColor = ['#1E64EE', '#00D500', '#F95A20', '#E73532'];
const dustRate = ['좋음', '보통', '나쁨', '매우 나쁨'];
const averageDustDensity = [2, 3, 4, 10];
const fineDustDensity = [80, 150, 300, 1200];
const ultraFineDustDensity = [15, 35, 75, 1200];

const KIND_OF_DUST_AVG = 'avg';
const KIND_OF_DUST_FINEDUST = 'fineDust';
const KIND_OF_DUST_ULTRAFINEDUST = 'ultraFineDust';

const DustState = ({ dustDensity, kindOfDust }: DustStateProps) => {
  if (isNaN(+dustDensity))
    return <DustStateColor style={{ color: '#666666' }}>측정중</DustStateColor>;

  let result = 0;
  if (kindOfDust === KIND_OF_DUST_AVG) {
    result = averageDustDensity.findIndex((v) => +dustDensity < +v);
  } else if (kindOfDust === KIND_OF_DUST_FINEDUST) {
    result = fineDustDensity.findIndex((v) => +dustDensity < +v);
  } else if (kindOfDust === KIND_OF_DUST_ULTRAFINEDUST) {
    result = ultraFineDustDensity.findIndex((v) => +dustDensity < +v);
  }

  return (
    <DustStateColor color={dustRateColor[result]}>
      {dustRate[result]}
    </DustStateColor>
  );
};

export default DustState;

const DustStateColor = styled.div`
  font-size: 5.5vw;
  display: flex;
  justify-content: center;
  font-weight: 700;
  color: ${(props) => props.color};
  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;
