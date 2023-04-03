import styled from '@emotion/styled';

interface DustStateProps {
  dustDensity: string;
  kindOfDust: string;
}

const DUST_RATE_COLOR = ['#1E64EE', '#00D500', '#F95A20', '#E73532'];
const DUST_RATE = ['좋음', '보통', '나쁨', '매우 나쁨'];
const AVERAGE_DUST_DENSITY = [2, 3, 4, 10];
const FINE_DUST_DENSITY = [80, 150, 300, 1200];
const ULTRA_FINE_DUST_DENSITY = [15, 35, 75, 1200];

const DUST_KIND = {
  AVG: 'avg',
  FINEDUST: 'fineDust',
  ULTRAFINEDUST: 'ultraFineDust',
};

const DustState = ({ dustDensity, kindOfDust }: DustStateProps) => {
  const DUST_DENSITY_NUMBER = +dustDensity;
  if (isNaN(DUST_DENSITY_NUMBER))
    return <DustStateColor style={{ color: '#666666' }}>측정중</DustStateColor>;

  const discriminateDust = (): number => {
    if (kindOfDust === DUST_KIND.AVG) {
      return AVERAGE_DUST_DENSITY.findIndex((v) => DUST_DENSITY_NUMBER < +v);
    } else if (kindOfDust === DUST_KIND.FINEDUST) {
      return FINE_DUST_DENSITY.findIndex((v) => DUST_DENSITY_NUMBER < +v);
    } else if (kindOfDust === DUST_KIND.ULTRAFINEDUST) {
      return ULTRA_FINE_DUST_DENSITY.findIndex((v) => DUST_DENSITY_NUMBER < +v);
    }
    return 0;
  };

  return (
    <DustStateColor color={DUST_RATE_COLOR[discriminateDust()]}>
      {DUST_RATE[discriminateDust()]}
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
