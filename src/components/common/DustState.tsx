import { Box, Flex, Text } from '@chakra-ui/react';
import {
  BsEmojiHeartEyes,
  BsEmojiNeutral,
  BsEmojiFrown,
  BsEmojiAngry,
} from 'react-icons/bs';
import theme from '@/styles/theme';
import { DUST_GRADE } from '@/utils/constants';

interface DustStateProps {
  dustGrade?: number;
}

const DUST_STATE = {
  NONE: '측정중',
  GOOD: '좋음',
  NORMAL: '보통',
  BAD: '나쁨',
  DANGER: '매우 나쁨',
};

const DUST_GRADE_ICON = {
  NONE: <BsEmojiHeartEyes />,
  GOOD: <BsEmojiHeartEyes />,
  NORMAL: <BsEmojiNeutral />,
  BAD: <BsEmojiFrown />,
  DANGER: <BsEmojiAngry />,
};

const DustState = ({ dustGrade = 0 }: DustStateProps) => {
  const grade = DUST_GRADE[dustGrade];

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="2.5rem"
    >
      <Box color={theme.colors[grade]} mb={1}>
        {DUST_GRADE_ICON[grade]}
      </Box>
      <Text
        as="p"
        fontSize={{ base: 16, sm: 20 }}
        fontWeight={700}
        color={theme.colors[grade]}
      >
        {DUST_STATE[grade]}
      </Text>
    </Flex>
  );
};

export default DustState;
