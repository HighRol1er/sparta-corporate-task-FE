import { IUser } from '@/types/authType';
import { registerUserAPI } from '@/api/auth';
import { create } from 'zustand';

export interface AuthState {
  isLogin: boolean;
  user: IUser | null;
  registerStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  registerError: string | null;

  // Actions
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
  registerUser: (params: RegisterUserParams) => Promise<void>;
}

export interface RegisterUserParams {
  email: string;
  password: string;
  name: string;
}

const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,

  // Actions
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({ user, isLogin: true }),
  logout: () => set({ isLogin: false, user: null }),
  registerUser: async ({ email, password, name }: RegisterUserParams) => {
    set({ registerStatus: 'loading', registerError: null });

    try {
      const user = await registerUserAPI({ email, password, name });
      set({ registerStatus: 'succeeded', user, isLogin: true });
    } catch (error: any) {
      set({
        registerStatus: 'failed',
        registerError: error.message || 'Registration failed',
      });
    }
  },
}));
export default useAuthStore;
