import 'react-sweet-progress/lib/style.css';
// @ts-ignore
import { Progress } from 'react-sweet-progress';
import styled from '@emotion/styled';
import { Flex, useMediaQuery } from '@chakra-ui/react';

interface ProgressBarProps {
  kindOfDust: string;
  id: string;
  state: number;
}

const ProgressBar = ({ kindOfDust, id, state }: ProgressBarProps) => {
  const percent = +state * (1 / 100) * 100;
  const percentOfDustContamination = percent > 100 ? 100 : percent;
  const [isLargerThan768] = useMediaQuery('min-width: 768px');

  return (
    <DustProgressWrapper id={id}>
      <Flex
        display="flex"
        width="30%"
        fontSize={isLargerThan768 ? '3vw' : '18px'}
        alignItems="center"
        fontWeight="500"
        justifyContent="space-between"
        margin={isLargerThan768 ? ' 0 30px' : '0 0.5rem'}
      >
        <div>{kindOfDust}</div>
        <Flex
          display="flex"
          marginLeft={isLargerThan768 ? '20px' : '2vw'}
          fontWeight="800"
          fontSize={isLargerThan768 ? 'md' : '18px'}
        >
          {state}
        </Flex>
      </Flex>
      <Flex width="60%" fontSize={isLargerThan768 ? '20px' : 'md'}>
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
  padding-bottom: 5px;
  &#first {
    padding-top: 2vh;
  }
  &#last {
    padding-bottom: 2.5vh;
  }
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin-left: 15px;
  }
`;
