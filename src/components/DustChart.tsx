import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';
import { DUST_SCALE_COLOR } from '@/utils/map';
import type { DustGradeType } from '@/types/dust';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface DustHistory {
  dataTime: string;
  fineDustScale: string;
  fineDustGrade: string;
  ultraFineDustScale: string;
  ultraFineDustGrade: string;
}

interface DustChartProps {
  history: DustHistory[];
}

const DustChart = ({ history }: DustChartProps) => {
  const labels = history.map((dust) => dust.dataTime.split(' ')[1]);

  const dustData = {
    labels,
    datasets: [
      {
        label: '미세먼지',
        data: history.map((dust) => dust.fineDustScale),
        backgroundColor: history.map(
          (dust) => DUST_SCALE_COLOR[dust.fineDustGrade as DustGradeType]
        ),
      },
      {
        label: '초미세먼지',
        data: history.map((dust) => dust.ultraFineDustScale),
        backgroundColor: history.map(
          (dust) => DUST_SCALE_COLOR[dust.ultraFineDustGrade as DustGradeType]
        ),
      },
    ],
  };

  const options = {
    responsive: false,
  };

  return (
    <Box overflowX="auto">
      <Bar width={1000} height={200} options={options} data={dustData} />
    </Box>
  );
};

export default DustChart;
