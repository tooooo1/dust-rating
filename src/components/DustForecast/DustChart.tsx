import { Box, Center, Spinner } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDustHistory } from '@/hooks/useDustHistory';
import theme from '@/styles/theme';
import {
  FINE_DUST,
  ULTRA_FINE_DUST,
  DUST_GRADE,
  SCROLL_STYLE,
} from '@/utils/constants';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
  responsive: false,
};

interface DustChartProps {
  location: string;
}

const DustChart = ({ location }: DustChartProps) => {
  const dustHistories = useDustHistory(location);

  if (!dustHistories) {
    return (
      <Center height={210}>
        <Spinner />
      </Center>
    );
  }

  const dustData = {
    labels: dustHistories.map((history) => history.hour),
    datasets: [
      {
        label: FINE_DUST,
        data: dustHistories.map((history) => history.fineDustScale),
        backgroundColor: dustHistories.map(
          (history) => theme.colors[DUST_GRADE[history.fineDustGrade]]
        ),
      },
      {
        label: ULTRA_FINE_DUST,
        data: dustHistories.map((history) => history.ultraFineDustScale),
        backgroundColor: dustHistories.map(
          (history) => theme.colors[DUST_GRADE[history.ultraFineDustGrade]]
        ),
      },
    ],
  };

  return (
    <Box
      sx={{
        overflowX: 'auto',
        '::-webkit-scrollbar': {
          height: '0.6rem',
          backgroundColor: 'transparent',
        },
        ...SCROLL_STYLE,
      }}
    >
      <Bar width={1000} height={200} options={options} data={dustData} />
    </Box>
  );
};

export default DustChart;
