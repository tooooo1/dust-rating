import { Tab } from '@chakra-ui/react';
import { MouseEvent } from 'react';

interface SelectTabItemProps {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  tabValue: string;
  styleProps: Record<string, any>;
}

export const SelectTabItem = ({
  handleClick,
  tabValue,
  styleProps,
}: SelectTabItemProps) => {
  return (
    <Tab
      _selected={{
        ...styleProps,
        boxShadow: 'inset 1rem ',
        borderRadius: '1rem',
      }}
      width="50%"
      onClick={handleClick}
      value={tabValue}
    >
      {tabValue}
    </Tab>
  );
};

export default SelectTabItem;
