import { keyframes } from '@chakra-ui/react';

const backgroundAnimationKeyframes = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const BACKGROUND_ANIMATION = `${backgroundAnimationKeyframes} 6s ease infinite`;
