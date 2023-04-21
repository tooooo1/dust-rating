import { useQuery } from '@tanstack/react-query';
import { DustState } from '@/components/Dust';
import { getCityAirQualities } from '@/api/airQuality';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import type { CityAirQuality } from '@/type';
import styled from '@emotion/styled';

interface CityRankProps {
  sido: string;
  isShow: boolean;
}

const CityRank = ({ sido, isShow }: CityRankProps) => {
  const { data: cityAirQualities } = useQuery<CityAirQuality[]>(
    ['city-air-qualities', sido],
    () => getCityAirQualities(sido),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {isShow &&
        cityAirQualities &&
        cityAirQualities.map((city, cityIndex) => (
          <RatingWrapper key={city.cityName}>
            <Top>
              <RatingDetails>
                <Rank>{cityIndex + 1}</Rank>
                <RankLocation>{city.cityName}</RankLocation>
                <DustStateWrapper>
                  <DustState
                    fineDust={city.fineDustGrade}
                    ultraFineDust={city.ultraFineDustGrade}
                    kindOfDust="avg"
                  />
                </DustStateWrapper>
              </RatingDetails>
              <DustWrapper>
                <DustWrapperFlex>
                  <div>{FINE_DUST}</div>
                  <DustFigure>{city.fineDustScale}</DustFigure>
                </DustWrapperFlex>
                <DustWrapperFlex>
                  <div>{ULTRA_FINE_DUST}</div>
                  <DustFigure>{city.ultraFineDustScale}</DustFigure>
                </DustWrapperFlex>
              </DustWrapper>
            </Top>
          </RatingWrapper>
        ))}
    </>
  );
};

export default CityRank;

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
