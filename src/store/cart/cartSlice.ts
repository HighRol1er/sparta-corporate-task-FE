import { CartItem } from '@/types/cartType';
import { create } from 'zustand';
import {
  calculateTotal,
  getCartFromLocalStorage,
  resetCartAtLocalStorage,
  setCartToLocalStorage,
} from './cartUtils';

export interface CartState {
  cart: CartItem[];
  totalCount: number;
  totalPrice: number;

  initCart: (userId: string) => void;
  resetCart: (userId: string) => void;
  addCartItem: (prams: {
    item: CartItem;
    userId: string;
    count: number;
  }) => void;
  removeCartItem: (params: { itemId: string; userId: string }) => void;
  changeCartItemCount: (params: {
    itemId: string;
    count: number;
    userId: string;
  }) => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  totalCount: 0,
  totalPrice: 0,

  initCart: (userId) => {
    if (!userId) return;
    const prevCartItems = getCartFromLocalStorage(userId);
    const total = calculateTotal(prevCartItems);
    set({
      cart: prevCartItems,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
  },
  resetCart: (userId) => {
    resetCartAtLocalStorage(userId);
    set({
      cart: [],
      totalCount: 0,
      totalPrice: 0,
    });
  },
  addCartItem: ({ item, userId, count }) => {
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      let updatedCart;

      if (existingItemIndex !== -1) {
        updatedCart = [...state.cart];
        updatedCart[existingItemIndex].count += count;
      } else {
        updatedCart = [...state.cart, { ...item, count }];
      }
      const total = calculateTotal(updatedCart);
      setCartToLocalStorage(updatedCart, userId);
      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },
  removeCartItem: ({ itemId, userId }) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== itemId);
      const total = calculateTotal(updatedCart);
      setCartToLocalStorage(updatedCart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },
  changeCartItemCount: ({ itemId, count, userId }) => {
    set((state) => {
      const itemIndex = state.cart.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) return state;

      const updatedCart = [...state.cart];
      updatedCart[itemIndex].count = count;

      const total = calculateTotal(updatedCart);
      setCartToLocalStorage(updatedCart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },
}));

export default useCartStore;
