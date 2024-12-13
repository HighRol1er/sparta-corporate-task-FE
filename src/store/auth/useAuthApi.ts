import { registerUserAPI } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import useAuthStore, { RegisterUserParams } from './authstore';

const useRegisterUser = () => {
  return useMutation({
    mutationFn: async ({ email, password, name }: RegisterUserParams) => {
      return await registerUserAPI({ email, password, name });
    },
    onMutate: () => {
      const { setRegisterStatus, setRegisterError } = useAuthStore.getState();
      setRegisterStatus('loading');
      setRegisterError(null);
    },
    onSuccess: () => {
      const { setRegisterStatus } = useAuthStore.getState();
      setRegisterStatus('succeeded');
    },
    onError: (error: any) => {
      const { setRegisterError, setRegisterStatus } = useAuthStore.getState();
      setRegisterError(error.message || 'Registration failed');
      setRegisterStatus('failed');
    },
  });
};

export default useRegisterUser;
