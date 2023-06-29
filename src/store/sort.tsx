import {
  createContext,
  useState,
  useContext,
  MouseEvent,
  PropsWithChildren,
} from 'react';
import type { DustType } from '@/types/dust';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';

interface SortContextState {
  dustType: DustType;
  setDustType: (e: MouseEvent<HTMLButtonElement>) => void;
}

const initialSortState: SortContextState = {
  dustType: FINE_DUST,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDustType: () => {},
};

const SortContext = createContext<SortContextState>(initialSortState);

export const useSort = () => useContext(SortContext);

const SortContextProvider = ({ children }: PropsWithChildren) => {
  const [dustType, setDustType] = useState<DustType>(FINE_DUST);

  const handleDustTypeChange = (e: MouseEvent<HTMLButtonElement>) => {
    setDustType(
      e.currentTarget.value === FINE_DUST ? FINE_DUST : ULTRA_FINE_DUST
    );
  };

  return (
    <SortContext.Provider
      value={{ dustType, setDustType: handleDustTypeChange }}
    >
      {children}
    </SortContext.Provider>
  );
};

export default SortContextProvider;
