import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { useSort } from '@/store/sort';
import { MouseEvent } from 'react';

interface SelectTabListProps {
  selectTabList: string[];
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const SelectTabList = ({
  selectTabList,
  onClick,
}: SelectTabListProps) => {
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
            onClick={onClick}
          >
            {tabItem}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default SelectTabList;
