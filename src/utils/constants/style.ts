import { keyframes } from '@chakra-ui/react';

const backgroundAnimationKeyframes = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const BACKGROUND_ANIMATION = `${backgroundAnimationKeyframes} 6s ease infinite`;

export const SCROLL_STYLE = {
  '::-webkit-scrollbar-thumb': {
    padding: `1rem 0`,
    backgroundColor: '#3f435040',
    borderRadius: '0.3rem',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: '#3f435025',
    borderRadius: '0.3rem',
  },
};
