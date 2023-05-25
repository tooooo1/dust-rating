import {
  createContext,
  useState,
  useContext,
  MouseEvent,
  PropsWithChildren,
} from 'react';
import type { SortType } from '@/types/dust';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';

interface SortContextState {
  sortType: SortType;
  setSortType: (e: MouseEvent<HTMLButtonElement>) => void;
}

const initialSortState: SortContextState = {
  sortType: FINE_DUST,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSortType: () => {},
};

const SortContext = createContext<SortContextState>(initialSortState);

export const useSort = () => useContext(SortContext);

const SortContextProvider = ({ children }: PropsWithChildren) => {
  const [sortType, setSortType] = useState<SortType>(FINE_DUST);

  const handleSortTypeChange = (e: MouseEvent<HTMLButtonElement>) => {
    setSortType(
      e.currentTarget.value === FINE_DUST ? FINE_DUST : ULTRA_FINE_DUST
    );
  };

  return (
    <SortContext.Provider
      value={{ sortType, setSortType: handleSortTypeChange }}
    >
      {children}
    </SortContext.Provider>
  );
};

export default SortContextProvider;
