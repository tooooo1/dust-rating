import { Image } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const Logo = () => (
  <>
    <Image
      src="images/il.jpg"
      alt="il"
      position="absolute"
      top={4}
      left={4}
      width={50}
      height={50}
      borderRadius="50%"
      cursor="pointer"
      onClick={() => window.open('https://tooo1.tistory.com')}
    />
    <Main>
      <Outlet />
    </Main>
  </>
);

export default Logo;

export const Main = styled.main`
  width: 37.5rem;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
