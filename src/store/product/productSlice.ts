import { create } from 'zustand';
import { ProductFilter } from '@/types/productType';
import {
  IProduct,
  NewProductDTO,
  PaginatedProductsDTO,
} from '@/api/dtos/productDTO';
import { addProductAPI, fetchProducts } from '@/api/product';

export interface ProductState {
  items: IProduct[];
  hasNextPage: boolean;
  isLoading: boolean;
  error: string | null;
  totalCount: number;

  loadProducts: (params: {
    filter: ProductFilter;
    pageSize: number;
    page: number;
    isInitial: boolean;
  }) => Promise<void>;
  addProduct: (productData: NewProductDTO) => Promise<void>;
}

const useProductStore = create<ProductState>((set) => ({
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,

  loadProducts: async ({ filter, pageSize, page, isInitial }) => {
    set({ isLoading: true, error: null });
    try {
      const result: PaginatedProductsDTO = await fetchProducts(
        filter,
        pageSize,
        page
      );
      set((state) => ({
        items: isInitial
          ? result.products
          : [...state.items, ...result.products],
        hasNextPage: result.hasNextPage,
        isLoading: false,
        error: null,
        totalCount: result.totalCount,
      }));
    } catch (error: any) {
      // unknown을 사용하면 안되는 이유가 있나.
      set({
        isLoading: false,
        error: error.message || 'Failed to load products',
      });
    }
  },

  addProduct: async (productData: NewProductDTO) => {
    set({ isLoading: true, error: null });
    try {
      const newProduct: IProduct = await addProductAPI(productData);
      set((state) => ({
        items: [newProduct, ...state.items],
        totalCount: state.totalCount + 1,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || '상품 등록에 실패하였습니다.',
      });
    }
  },
}));

export default useProductStore;
