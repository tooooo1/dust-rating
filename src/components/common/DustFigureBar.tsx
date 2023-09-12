import { Flex, Text, Progress } from '@chakra-ui/react';
import {
  FINE_DUST,
  ULTRA_FINE_DUST,
  DUST_GRADE,
  DUST_PERCENT_DENOMINATOR,
} from '@/utils/constants';

const DUST_GRADE_COLOR = {
  NONE: 'gray',
  DANGER: 'red',
  BAD: 'yellow',
  NORMAL: 'green',
  GOOD: 'blue',
};

interface DustFigureBarProps {
  kindOfDust: typeof FINE_DUST | typeof ULTRA_FINE_DUST;
  scale?: number;
  grade?: number;
}

const DustFigureBar = ({
  kindOfDust,
  scale = 0,
  grade = 0,
}: DustFigureBarProps) => {
  const percent = scale * (1 / DUST_PERCENT_DENOMINATOR) * 100;
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
        <Text fontSize={14} fontWeight="500">
          {kindOfDust}
        </Text>
        <Text fontSize={14} fontWeight="800">
          {scale}
        </Text>
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

export default DustFigureBar;
