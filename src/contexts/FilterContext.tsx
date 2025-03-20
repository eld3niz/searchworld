import { createContext, useContext, useState, useCallback } from 'react';
import type { FilterOptions } from '../types';

interface FilterContextType {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterOptions>({
    distance: undefined,
    languages: []
  });

  const clearFilters = useCallback(() => {
    setFilters({ distance: undefined, languages: [] });
  }, []);

  return (
    <FilterContext.Provider value={{ filters, setFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
