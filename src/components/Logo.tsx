import { Image } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const Logo = () => (
  <>
    <Image
      src="images/il.jpg"
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
    <Box width={{ base: '100%', md: '37.5rem' }}>
      <Outlet />
    </Box>
  </>
);

export default Logo;
