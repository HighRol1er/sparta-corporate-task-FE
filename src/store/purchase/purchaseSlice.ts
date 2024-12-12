import { create } from 'zustand';

export interface PurchaseState {
  isLoading: boolean;
  error: string | null;

  purchaseStart: () => void;
  purchaseSuccess: () => void;
  purchaseFailure: (error: string) => void;
}

const usePurchaseStore = create<PurchaseState>((set) => ({
  isLoading: false,
  error: null,

  purchaseStart: () => {
    set({ isLoading: true, error: null });
  },
  purchaseSuccess: () => {
    set({ isLoading: false, error: null });
  },
  purchaseFailure: (error: string) => {
    set({ isLoading: false, error });
  },
}));

export default usePurchaseStore;
