import { Box, Flex, Text } from '@chakra-ui/react';
import {
  BsEmojiHeartEyes,
  BsEmojiNeutral,
  BsEmojiFrown,
  BsEmojiAngry,
} from 'react-icons/bs';
import { DUST_SCALE_COLOR } from '@/utils/map';

interface DustStateProps {
  dustGrade: number;
}

type GradeType = 'GOOD' | 'NORMAL' | 'BAD' | 'DANGER';

interface Grade {
  [key: number]: GradeType;
}

const DUST_GRADE: Grade = {
  1: 'GOOD',
  2: 'NORMAL',
  3: 'BAD',
  4: 'DANGER',
};

const DUST_STATE = {
  GOOD: '좋음',
  NORMAL: '보통',
  BAD: '나쁨',
  DANGER: '매우 나쁨',
};

const DUST_STATE_ICON = {
  GOOD: <BsEmojiHeartEyes />,
  NORMAL: <BsEmojiNeutral />,
  BAD: <BsEmojiFrown />,
  DANGER: <BsEmojiAngry />,
};

const DustState = ({ dustGrade }: DustStateProps) => {
  const state = DUST_GRADE[dustGrade];

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Box color={DUST_SCALE_COLOR[state]} mb={1}>
        {DUST_STATE_ICON[state]}
      </Box>
      <Text
        as="p"
        fontSize={20}
        fontWeight={700}
        color={DUST_SCALE_COLOR[state]}
      >
        {DUST_STATE[state]}
      </Text>
    </Flex>
  );
};

export default DustState;
