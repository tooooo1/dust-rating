import { Box, Flex, Text } from '@chakra-ui/react';
import {
  BsEmojiHeartEyes,
  BsEmojiNeutral,
  BsEmojiFrown,
  BsEmojiAngry,
} from 'react-icons/bs';
import { DUST_SCALE_COLOR } from '@/utils/map';
import { DUST_GRADE } from '@/utils/constants';

interface DustStateProps {
  dustGrade: number;
}

const DUST_STATE = {
  GOOD: '좋음',
  NORMAL: '보통',
  BAD: '나쁨',
  DANGER: '매우 나쁨',
};

const DUST_GRADE_ICON = {
  GOOD: <BsEmojiHeartEyes />,
  NORMAL: <BsEmojiNeutral />,
  BAD: <BsEmojiFrown />,
  DANGER: <BsEmojiAngry />,
};

const DustState = ({ dustGrade }: DustStateProps) => {
  const grade = DUST_GRADE[dustGrade];

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Box color={DUST_SCALE_COLOR[grade]} mb={1}>
        {DUST_GRADE_ICON[grade]}
      </Box>
      <Text
        as="p"
        fontSize={20}
        fontWeight={700}
        color={DUST_SCALE_COLOR[grade]}
      >
        {DUST_STATE[grade]}
      </Text>
    </Flex>
  );
};

export default DustState;
