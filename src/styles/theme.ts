import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    DANGER: '#e64746',
    BAD: '#fda60d',
    NORMAL: '#03c73c',
    GOOD: '#30a2ff',
  },
  backgroundColors: {
    DANGER:
      'linear-gradient(77deg, rgba(255,255,180,1) 0%, rgba(246,104,103,1) 50%, rgba(230,71,70,1) 100%)',
    BAD: 'linear-gradient(77deg, rgba(255,255,180,1) 0%, rgba(255,189,74,1) 50%, rgba(253,166,13,1) 100%)',
    NORMAL:
      'linear-gradient(77deg, rgba(255,255,180,1) 0%, rgba(110,226,144,1) 50%, rgba(3,199,60,1) 100%)',
    GOOD: 'linear-gradient(77deg, rgba(255,255,180,1) 0%, rgba(83,202,242,1) 50%, rgba(48,162,255,1) 100%)',
  },
});

export default theme;
