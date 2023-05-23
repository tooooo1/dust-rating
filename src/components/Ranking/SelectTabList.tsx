import { Tabs, TabList } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { SelectTabItem } from '@/components/Ranking';

interface SelectTabListProps {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  SelectTabList: string[];
  styleProps: Record<string, any>;
}

export const SelectTabList = ({
  handleClick,
  SelectTabList,
  styleProps,
}: SelectTabListProps) => {
  return (
    <Tabs width="100%" mt="2rem" variant="unstyled">
      <TabList>
        {SelectTabList.map((TabItem) => (
          <SelectTabItem
            key={TabItem}
            handleClick={handleClick}
            tabValue={TabItem}
            styleProps={styleProps}
          />
        ))}
      </TabList>
    </Tabs>
  );
};

export default SelectTabList;
