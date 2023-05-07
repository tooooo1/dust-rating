import { Flex, Text, Progress } from '@chakra-ui/react';
import { DUST_GRADE } from '@/utils/constants';

export const DUST_GRADE_COLOR = {
  DANGER: 'red',
  BAD: 'yellow',
  NORMAL: 'green',
  GOOD: 'blue',
};

interface ProgressBarProps {
  kindOfDust: string;
  scale: number;
  grade: number;
}

const ProgressBar = ({ kindOfDust, scale, grade }: ProgressBarProps) => {
  const percent = scale * (1 / 100) * 100;
  const percentOfDustContamination = percent > 100 ? 100 : percent;
  const color = DUST_GRADE_COLOR[DUST_GRADE[grade]];

  return (
    <Flex justifyContent="center" alignItems="center" m={2}>
      <Flex
        justifyContent="space-between"
        width={{ base: '40%', sm: '30%' }}
        fontSize={{ base: 14, sm: 16 }}
        mr={{ base: 4, sm: 4, md: 6 }}
      >
        <Text fontWeight="500">{kindOfDust}</Text>
        <Text fontWeight="800">{scale}</Text>
      </Flex>
      <Progress
        width={{ base: '60%', sm: '70%' }}
        value={percentOfDustContamination}
        colorScheme={color}
        borderRadius={8}
        hasStripe
        isAnimated
      />
    </Flex>
  );
};

export default ProgressBar;
