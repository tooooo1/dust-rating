import { Box, Image } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import theme from '@/styles/theme';

const Logo = () => (
  <Box position="relative" bg={theme.backgroundColors.INIT}>
    <Image
      src="/images/il.jpg"
      alt="il"
      position="absolute"
      top={4}
      left={4}
      width={{ base: 10, sm: 12, md: 50 }}
      height={{ base: 10, sm: 12, md: 50 }}
      borderRadius="50%"
      cursor="pointer"
      onClick={() => window.open('https://tooo1.tistory.com')}
    />
    <Outlet />
  </Box>
);

export default Logo;
