import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DUST_SCALE_COLOR } from '@/utils/map';
import type { DustGradeType } from '@/types/dust';
import styled from '@emotion/styled';

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
    <Wrapper>
      <Bar width={1000} height={200} options={options} data={dustData} />
    </Wrapper>
  );
};

export default DustChart;

const Wrapper = styled.div`
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 0.6rem;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    padding: 1rem 0;
    background-color: #3f435040;
    border-radius: 0.3rem;
  }
  &::-webkit-scrollbar-track {
    background-color: #3f435025;
    border-radius: 0.3rem;
  }
`;
