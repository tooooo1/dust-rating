import {
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { TiLocationArrow } from 'react-icons/ti';

interface SelectProps {
  options: string[];
  onClick: (value: string) => void;
}

const Select = ({ options, onClick }: SelectProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="도시 선택"
        icon={<TiLocationArrow fontSize={22} />}
      />
      <MenuList
        minW="0"
        w="100px"
        h={60}
        sx={{
          overflowY: 'scroll',
          '::-webkit-scrollbar': {
            width: '0.5rem',
            backgroundColor: 'transparent',
          },
          '::-webkit-scrollbar-thumb': {
            padding: `1rem 0`,
            backgroundColor: '#3f435040',
            borderRadius: '0.3rem',
          },
          '::-webkit-scrollbar-track': {
            backgroundColor: '#3f435025',
            borderRadius: '0.3rem',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} onClick={() => onClick(option)}>
            <Text width="100%" fontSize={16} textAlign="center">
              {option}
            </Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Select;
