import 'react-sweet-progress/lib/style.css';
import { Flex, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
// @ts-ignore
import { Progress } from 'react-sweet-progress';

interface ProgressBarProps {
  kindOfDust: string;
  id: string;
  state: number;
}

const ProgressBar = ({ kindOfDust, id, state }: ProgressBarProps) => {
  const percent = state * (1 / 100) * 100;
  const percentOfDustContamination = percent > 100 ? 100 : percent;

  return (
    <DustProgressWrapper id={id}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="30%"
        fontSize={{ base: '3vw', md: '1.125rem' }}
        margin={{ base: '0 1.875rem', md: '0 0.5rem' }}
        fontWeight="500"
      >
        <Box>{kindOfDust}</Box>
        <Flex
          marginLeft={{ base: '1.25rem', md: '2vw' }}
          fontWeight="800"
          fontSize={{ base: 'md', md: '1.125rem' }}
        >
          {state}
        </Flex>
      </Flex>
      <Flex width="60%" fontSize={{ base: '1.25rem', md: 'md' }}>
        <Progress
          percent={percentOfDustContamination}
          theme={{
            success: {
              symbol: ' ',
              color: 'rgb(223, 105, 180)',
            },
            active: {
              symbol: ' ',
              color: '#fbc630',
            },
            default: {
              symbol: ' ',
              color: '#fbc630',
            },
          }}
        />
      </Flex>
    </DustProgressWrapper>
  );
};

export default ProgressBar;

const DustProgressWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 7vw;
  font-size: 3vw;
  padding-bottom: 0.3125rem;
  &#first {
    padding-top: 2vh;
  }
  &#last {
    padding-bottom: 2.5vh;
  }
  @media only screen and (min-width: 768px) {
    font-size: 1.125rem;
    margin-left: 0.9375rem;
  }
`;
