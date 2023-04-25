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
import { FINE_DUST, ULTRA_FINE_DUST, DUST_GRADE } from '@/utils/constants';
import styled from '@emotion/styled';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
  responsive: false,
};

interface DustHistory {
  hour: string;
  fineDustScale: number;
  fineDustGrade: number;
  ultraFineDustScale: number;
  ultraFineDustGrade: number;
}

interface DustChartProps {
  history: DustHistory[];
}

const DustChart = ({ history }: DustChartProps) => {
  const dustData = {
    labels: history.map((dust) => dust.hour),
    datasets: [
      {
        label: FINE_DUST,
        data: history.map((dust) => dust.fineDustScale),
        backgroundColor: history.map(
          (dust) => DUST_SCALE_COLOR[DUST_GRADE[dust.fineDustGrade]]
        ),
      },
      {
        label: ULTRA_FINE_DUST,
        data: history.map((dust) => dust.ultraFineDustScale),
        backgroundColor: history.map(
          (dust) => DUST_SCALE_COLOR[DUST_GRADE[dust.ultraFineDustGrade]]
        ),
      },
    ],
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
