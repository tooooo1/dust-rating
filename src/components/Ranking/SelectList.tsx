import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface SelectListProps {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectOptions: string[];
  defaultValue: string;
}

export const SelectList = ({
  handleChange,
  selectOptions,
  defaultValue,
}: SelectListProps) => {
  return (
    <Select
      color="#4d4d4d"
      borderColor="#7f7f7f"
      borderWidth={2}
      fontSize={{ base: 14, sm: 16 }}
      mt={6}
      _focus={{ borderColor: 'none' }}
      onChange={handleChange}
      value={defaultValue}
    >
      {selectOptions.map((selectOption) => (
        <option value={selectOption} key={selectOption}>
          {selectOption}
        </option>
      ))}
    </Select>
  );
};

export default SelectList;
