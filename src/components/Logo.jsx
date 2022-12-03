import styled from 'styled-components';

const Logo = () => (
  <Img
    onClick={() => window.open('https://tooo1.tistory.com')}
    src="images/il.jpg"
    alt="il"
    width={50}
    height={50}
  />
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
