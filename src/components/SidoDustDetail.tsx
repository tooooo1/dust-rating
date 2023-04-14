import styled from '@emotion/styled';
import { DustState } from '@/components/Dust';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';

interface SidoDustDetailProps {
  rank: number;
  city: string;
  fineDust: string;
  ultraFineDust: string;
  dustState: string;
  onClickSidoDustDetail: () => void;
}

const SidoDustDetail = ({
  rank,
  city,
  fineDust,
  ultraFineDust,
  dustState,
  onClickSidoDustDetail,
}: SidoDustDetailProps) => {
  return (
    <RatingWrapper onClick={onClickSidoDustDetail}>
      <Top>
        <RatingDetails>
          <Rank>{rank}</Rank>
          <RankLocation>{city}</RankLocation>
          <DustStateWrapper>
            <DustState dustDensity={dustState} kindOfDust="avg" />
          </DustStateWrapper>
        </RatingDetails>
        <DustWrapper>
          <DustWrapperFlex>
            <div>{FINE_DUST}</div>
            <DustFigure>{fineDust}</DustFigure>
          </DustWrapperFlex>
          <DustWrapperFlex>
            <div>{ULTRA_FINE_DUST}</div>
            <DustFigure>{ultraFineDust}</DustFigure>
          </DustWrapperFlex>
        </DustWrapper>
      </Top>
    </RatingWrapper>
  );
};

export default SidoDustDetail;

const RatingWrapper = styled.div`
  position: relative;
  flex-direction: column;
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 3vh;
  text-align: center;
  border-bottom: 1px solid #dfdfdf;
  border-radius: 10px;
  padding: 1vh 0;
  width: 90%;
  margin: 0 auto;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
  transform: height 0.35s ease;
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

const Rank = styled.div`
  width: 10%;
  display: flex;
  font-size: 2vh;
  font-weight: 600;
  color: #9dadb6;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const RankLocation = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 5.5vw;
  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;

const DustStateWrapper = styled.div`
  width: 50%;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const DustWrapper = styled.div`
  width: 32%;
  font-weight: 300;
  font-size: 3.3vw;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const DustWrapperFlex = styled.div`
  display: flex;
  font-weight: 300;
  justify-content: space-between;
  margin: 0.5rem 0;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

const DustFigure = styled.div`
  display: flex;
  margin-left: 2vw;
  font-weight: 600;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin-left: 10px;
  }
`;

const Top = styled.div`
  display: flex;
  width: 100%;
`;
