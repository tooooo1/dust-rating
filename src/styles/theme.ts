import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '#53caf2',
        lineHeight: 1,
      },
    }),
  },
});

export default theme;
