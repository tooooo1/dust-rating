import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import {
  BsEmojiHeartEyes,
  BsEmojiNeutral,
  BsEmojiFrown,
  BsEmojiAngry,
} from 'react-icons/bs';

interface DustStateProps {
  fineDust: number;
  ultraFineDust: number;
  kindOfDust: string;
}

const DUST_RATE_COLOR = ['#1E64EE', '#00D500', '#F95A20', '#E73532'];
const DUST_RATE = ['좋음', '보통', '나쁨', '매우 나쁨'];
const AVERAGE_DUST_DENSITY = [2, 3, 4, 10];
const FINE_DUST_DENSITY = [80, 150, 300, 1200];
const ULTRA_FINE_DUST_DENSITY = [15, 35, 75, 1200];
const DUST_ICON = [
  <BsEmojiHeartEyes />,
  <BsEmojiNeutral />,
  <BsEmojiFrown />,
  <BsEmojiAngry />,
];

const DUST_KIND = {
  AVG: 'avg',
  FINE_DUST: 'fineDust',
  ULTRA_FINE_DUST: 'ultraFineDust',
};

const DustState = ({ fineDust, ultraFineDust, kindOfDust }: DustStateProps) => {
  const dustDensityNumber = +fineDust;
  if (isNaN(dustDensityNumber))
    return <DustStateColor style={{ color: '#666666' }}>측정중</DustStateColor>;

  const discriminateDust = () => {
    if (kindOfDust === DUST_KIND.AVG) {
      return AVERAGE_DUST_DENSITY.findIndex((v) => dustDensityNumber < +v);
    } else if (kindOfDust === DUST_KIND.FINE_DUST) {
      return FINE_DUST_DENSITY.findIndex((v) => dustDensityNumber < +v);
    } else if (kindOfDust === DUST_KIND.ULTRA_FINE_DUST) {
      return ULTRA_FINE_DUST_DENSITY.findIndex((v) => dustDensityNumber < +v);
    }
    return 0;
  };

  return (
    <DustStateColor color={DUST_RATE_COLOR[discriminateDust()]}>
      <Box fontSize={3}>{`${
        kindOfDust === 'avg' ? `` : `${fineDust}㎍/㎥`
      }`}</Box>
      <Flex direction="column" alignItems="center">
        <div>{DUST_ICON[discriminateDust()]}</div>
        <div>{DUST_RATE[discriminateDust()]}</div>
      </Flex>
    </DustStateColor>
  );
};

export default DustState;

const DustStateColor = styled.div`
  display: flex;
  justify-content: center;
  width: 36%;
  margin-right: 1rem;
  font-size: 1.4rem;
  text-align: center;
  font-weight: 700;
  color: ${(props) => props.color};
`;
