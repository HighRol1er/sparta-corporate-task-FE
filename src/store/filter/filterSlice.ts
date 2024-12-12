import { ALL_CATEGORY_ID } from '@/constants';
import { ProductFilter } from '@/types/productType';
import { create } from 'zustand';

export interface FilterState extends ProductFilter {
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setTitle: (title: string) => void;
  setCategoryId: (categoryId: string) => void;
  resetFilter: () => void;
}

const initialState: ProductFilter = {
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,
};

// NOTE: type 정의해놓은 ProductFilter extends나 FilterState & ProductFilter 이렇게 써도 되나.
const useFilterStore = create<FilterState>((set) => ({
  ...initialState,
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setTitle: (title) => set({ title }),
  setCategoryId: (categoryId) => set({ categoryId }),
  resetFilter: () =>
    set({
      ...initialState,
    }),
}));

export default useFilterStore;
