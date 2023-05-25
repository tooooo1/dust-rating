import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import useDustForecastQuery from '@/hooks/useDustForecastQuery';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';
import ForecastTab from './ForecastTab';

interface ForecastInfoProps {
  location: string;
}

const ForecastInfo = ({ location }: ForecastInfoProps) => {
  const dustForecast = useDustForecastQuery(location);

  return (
    <Tabs variant="soft-rounded" colorScheme="gray" isFitted>
      <TabList>
        <Tab fontSize={{ base: 14, sm: 16 }}>{FINE_DUST}</Tab>
        <Tab fontSize={{ base: 14, sm: 16 }}>{ULTRA_FINE_DUST}</Tab>
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
