import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { MouseEvent } from 'react';

interface SelectTabListProps {
  selectTabList: string[];
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const SelectTabList = ({
  handleClick,
  selectTabList,
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
            onClick={handleClick}
          >
            {tabItem}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default SelectTabList;
