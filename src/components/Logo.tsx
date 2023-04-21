import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

const Logo = () => (
  <>
    <Img
      onClick={() => window.open('https://tooo1.tistory.com')}
      src="images/il.jpg"
      alt="il"
      width={50}
      height={50}
    />
    <Main>
      <Outlet />
    </Main>
  </>
);

export default Logo;

export const Img = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  border-radius: 100px;
  cursor: pointer;
`;

export const Main = styled.main`
  width: 37.5rem;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
