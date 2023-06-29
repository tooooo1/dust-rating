import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { useSort } from '@/store/sort';

interface SelectTabListProps {
  selectTabList: string[];
}

export const SelectTabList = ({ selectTabList }: SelectTabListProps) => {
  const { setDustType } = useSort();

  return (
    <Tabs
      width="100%"
      variant="soft-rounded"
      colorScheme="gray"
      my={4}
      isFitted
    >
      <TabList>
        {selectTabList.map((tabItem) => (
          <Tab
            key={tabItem}
            value={tabItem}
            fontSize={{ base: 14, sm: 16 }}
            onClick={setDustType}
          >
            {tabItem}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default SelectTabList;
