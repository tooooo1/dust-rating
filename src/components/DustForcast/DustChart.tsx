import { Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getDustHistory } from '@/apis/dustHistory';
import type { DustHistory } from '@/types/dust';
import {
  FINE_DUST,
  ULTRA_FINE_DUST,
  DUST_GRADE,
  DUST_SCALE_COLOR,
} from '@/utils/constants';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
  responsive: false,
};

interface DustChartProps {
  cityName: string;
}

const DustChart = ({ cityName }: DustChartProps) => {
  const { data: dustHistories } = useQuery<DustHistory[]>(
    ['dust-history', cityName],
    () => getDustHistory(cityName),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    }
  );

  if (!dustHistories) {
    return <Spinner my={10} />;
  }

  const dustData = {
    labels: dustHistories.map((history) => history.hour),
    datasets: [
      {
        label: FINE_DUST,
        data: dustHistories.map((history) => history.fineDustScale),
        backgroundColor: dustHistories.map(
          (history) => DUST_SCALE_COLOR[DUST_GRADE[history.fineDustGrade]]
        ),
      },
      {
        label: ULTRA_FINE_DUST,
        data: dustHistories.map((history) => history.ultraFineDustScale),
        backgroundColor: dustHistories.map(
          (history) => DUST_SCALE_COLOR[DUST_GRADE[history.ultraFineDustGrade]]
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
