import { useState } from 'react';
import { DustState } from '@/components/Dust';
import CityRank from './CityRank';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import styled from '@emotion/styled';

interface SidoRankProps {
  rank: number;
  sidoName: string;
  fineDustScale: number;
  ultraFineDustScale: number;
  fineDustGrade: number;
  ultraFineDustGrade: number;
}

const SidoRank = ({
  rank,
  sidoName,
  fineDustScale,
  ultraFineDustScale,
  fineDustGrade,
  ultraFineDustGrade,
}: SidoRankProps) => {
  const [isShow, setIsShow] = useState(false);

  const handleSidoClick = () => {
    setIsShow((isShow) => !isShow);
  };

  return (
    <RatingWrapper key={sidoName} onClick={handleSidoClick}>
      <Top>
        <RatingDetails>
          <RankW>{rank}</RankW>
          <RankLocation>{sidoName}</RankLocation>
          <DustStateW>
            <DustState
              fineDust={fineDustGrade}
              ultraFineDust={ultraFineDustGrade}
              kindOfDust="avg"
            />
          </DustStateW>
        </RatingDetails>
        <DustWrapper>
          <DustWrapperFlex>
            <div>{FINE_DUST}</div>
            <DustFigure>{fineDustScale}</DustFigure>
          </DustWrapperFlex>
          <DustWrapperFlex>
            <div>{ULTRA_FINE_DUST}</div>
            <DustFigure>{ultraFineDustScale}</DustFigure>
          </DustWrapperFlex>
        </DustWrapper>
      </Top>
      <Container>
        <CityRank sido={sidoName} isShow={isShow} />
      </Container>
    </RatingWrapper>
  );
};

export default SidoRank;

const RatingWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 3vh;
  text-align: center;
  border-bottom: 1px solid #dfdfdf;
  border-radius: 10px;
  padding: 1vh 0;
  flex-direction: column;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
  transition-duration: 0.3s;
  &:hover {
    background-color: #dfdfdf;
    padding-left: 10px;
    padding-right: 10px;
    opacity: 0.8;
  }
`;

const RatingDetails = styled.div`
  width: 68%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const RankW = styled.div`
  width: 10%;
  display: flex;
  font-size: 2vh;
  color: #9dadb6;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const RankLocation = styled.div`
  display: flex;
  font-size: 5.5vw;
  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;

const DustStateW = styled.div`
  width: 50%;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const DustWrapper = styled.div`
  width: 32%;
  font-weight: 500;
  font-size: 3.3vw;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const DustWrapperFlex = styled.div`
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  margin: 0.5rem 0;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

const DustFigure = styled.div`
  display: flex;
  margin-left: 2vw;
  font-weight: 800;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin-left: 10px;
  }
`;

const Top = styled.div`
  display: flex;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  background-color: #dfdfdf;
  border-radius: 10px;
  display: flex;
  position: relative;
  flex-direction: column;
`;
