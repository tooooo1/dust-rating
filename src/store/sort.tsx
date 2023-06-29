import {
  createContext,
  useState,
  useContext,
  MouseEvent,
  PropsWithChildren,
} from 'react';
import type { DustType, SortType } from '@/types/dust';
import {
  FINE_DUST,
  ULTRA_FINE_DUST,
  ASCENDING,
  DESCENDING,
} from '@/utils/constants';

interface SortContextState {
  dustType: DustType;
  sortType: SortType;
  setDustType: (e: MouseEvent<HTMLButtonElement>) => void;
  setSortType: (e: MouseEvent<HTMLButtonElement>) => void;
}

const initialSortState: SortContextState = {
  dustType: FINE_DUST,
  sortType: ASCENDING,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDustType: () => {},
  setSortType: () => {},
};

const SortContext = createContext<SortContextState>(initialSortState);

export const useSort = () => useContext(SortContext);

const SortContextProvider = ({ children }: PropsWithChildren) => {
  const [dustType, setDustType] = useState<DustType>(FINE_DUST);
  const [sortType, setSortType] = useState<SortType>(ASCENDING);

  const handleDustTypeChange = (e: MouseEvent<HTMLButtonElement>) => {
    setDustType(
      e.currentTarget.value === FINE_DUST ? FINE_DUST : ULTRA_FINE_DUST
    );
  };

  const handleSortTypeChnage = (e: MouseEvent<HTMLButtonElement>) => {
    setSortType(e.currentTarget.value === ASCENDING ? ASCENDING : DESCENDING);
  };

  return (
    <SortContext.Provider
      value={{
        dustType,
        setDustType: handleDustTypeChange,
        sortType,
        setSortType: handleSortTypeChnage,
      }}
    >
      {children}
    </SortContext.Provider>
  );
};

export default SortContextProvider;
