import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import SidoDustDetail from './SidoDustDetail';
import { DustState } from '@/components/Dust';
import { type DustDetail } from '@/type';

interface RankProps {
  rank: number;
  city: string;
  dust: string;
  ultraDust: string;
  dustState: string;
  detail: {
    dataTime: string;
    stationName: string;
    pm10Value: string;
    pm25Value: string;
    pm10Grade: string;
    pm25Grade: string;
  }[];
}

const Rank = ({
  rank,
  city,
  dust,
  ultraDust,
  dustState,
  detail,
}: RankProps) => {
  const [showDetail, setShowDetail] = useState(true);
  const navigate = useNavigate();
  const handleClickShowDetail = () => {
    setShowDetail(!showDetail);
  };
  const handleClickSidoDustDetail = ({
    dataTime,
    stationName,
    pm10Value,
    pm25Value,
    pm10Grade,
    pm25Grade,
  }: DustDetail) => {
    const dustState = (
      (parseInt(pm10Grade) + parseInt(pm25Grade)) /
      2
    ).toString();
    navigate(`/LocalDetail`, {
      state: {
        stationName,
        fineDust: pm10Value,
        ultraDust: pm25Value,
        dustState,
        dataTime,
      },
    });
  };
  return (
    <RatingWrapper onClick={handleClickShowDetail}>
      <Top>
        <RatingDetails>
          <RankW>{rank}</RankW>
          <RankLocation>{city}</RankLocation>
          <DustStateW>
            <DustState dustDensity={dustState} kindOfDust="avg" />
          </DustStateW>
        </RatingDetails>
        <DustWrapper>
          <DustWrapperFlex>
            <div>미세먼지</div>
            <DustFigure>{dust}</DustFigure>
          </DustWrapperFlex>
          <DustWrapperFlex>
            <div>초미세먼지</div>
            <DustFigure>{ultraDust}</DustFigure>
          </DustWrapperFlex>
        </DustWrapper>
      </Top>
      <Container showDetail={showDetail}>
        {detail?.map((city, detailIndex) => {
          return (
            <SidoDustDetail
              key={city + detailIndex.toString()}
              rank={detailIndex + 1}
              city={city.stationName}
              fineDust={city.pm10Value}
              ultraFineDust={city.pm25Value}
              dustState={city.pm10Grade}
              onClickSidoDustDetail={() =>
                handleClickSidoDustDetail({
                  dataTime: city.dataTime,
                  stationName: city.stationName,
                  pm10Value: city.pm10Value,
                  pm25Value: city.pm25Value,
                  pm10Grade: city.pm10Grade,
                  pm25Grade: city.pm25Grade,
                })
              }
            />
          );
        })}
      </Container>
    </RatingWrapper>
  );
};

export default Rank;

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

interface ContainerProps {
  showDetail: boolean;
}

const Container = styled.div`
  width: 100%;
  background-color: #dfdfdf;
  border-radius: 10px;
  display: flex;
  position: relative;
  flex-direction: column;
  display: ${(props: ContainerProps) => props.showDetail && `none`};
`;
