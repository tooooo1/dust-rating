import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getDustForecast } from '@/apis/dustForcast';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import ForecastTab from './ForecastTab';

interface ForecastInfoProps {
  cityName: string;
}

const ForecastInfo = ({ cityName }: ForecastInfoProps) => {
  const { data: dustForecast } = useQuery(
    ['dust-forecast', cityName],
    getDustForecast,
    {
      staleTime: 1000 * 60 * 5,
      suspense: true,
    }
  );

  return (
    <Tabs variant="soft-rounded" colorScheme="green" isFitted>
      <TabList>
        <Tab>{FINE_DUST}</Tab>
        <Tab>{ULTRA_FINE_DUST}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {dustForecast?.fineDust && (
            <ForecastTab dustForecast={dustForecast?.fineDust} />
          )}
        </TabPanel>
        <TabPanel>
          {dustForecast?.ultraFineDust && (
            <ForecastTab dustForecast={dustForecast?.ultraFineDust} />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ForecastInfo;
